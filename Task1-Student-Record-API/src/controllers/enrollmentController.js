const pool = require("../config/db");

const createEnrollment = async (req, res) => {
    try {
        const { student_id, course_id, enrollment_date } = req.body;

        if (!student_id || !course_id || !enrollment_date) {
            return res.status(400).json({
                message: "Student ID, course ID and enrollment date are required"
            });
        }

        if (!Number.isInteger(Number(student_id)) || !Number.isInteger(Number(course_id))) {
            return res.status(400).json({
                message: "Student ID and course ID must be valid numbers"
            });
        }

        if (isNaN(Date.parse(enrollment_date))) {
            return res.status(400).json({
                message: "Invalid enrollment date"
            });
        }

        const [student] = await pool.execute(
            "SELECT student_id FROM students WHERE student_id = ?",
            [student_id]
        );

        if (student.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const [course] = await pool.execute(
            "SELECT course_id FROM courses WHERE course_id = ?",
            [course_id]
        );

        if (course.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO enrollments
            (student_id, course_id, enrollment_date)
            VALUES (?, ?, ?)`,
            [student_id, course_id, enrollment_date]
        );

        res.status(201).json({
            message: "Enrollment created successfully",
            enrollment_id: result.insertId
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Student is already enrolled in this course"
            });
        }

        res.status(500).json({
            message: "Failed to create enrollment"
        });
    }
};
const getAllEnrollments = async (req, res) => {
    try {
        const {
            student_id,
            course_id,
            sort = "enrollment_id",
            order = "asc"
        } = req.query;

        const page = Math.max(parseInt(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(parseInt(req.query.limit) || 10, 1),
            100
        );

        const offset = (page - 1) * limit;

        const allowedSortFields = {
            enrollment_id: "enrollment_id",
            student_id: "student_id",
            course_id: "course_id",
            enrollment_date: "enrollment_date"
        };

        const sortField =
            allowedSortFields[sort] || "enrollment_id";

        const sortOrder =
            order.toLowerCase() === "desc"
                ? "DESC"
                : "ASC";

        let whereClause = "";
        let conditions = [];
        let params = [];

        if (student_id) {
            conditions.push("student_id = ?");
            params.push(student_id);
        }

        if (course_id) {
            conditions.push("course_id = ?");
            params.push(course_id);
        }

        if (conditions.length > 0) {
            whereClause = "WHERE " + conditions.join(" AND ");
        }

        const [enrollments] = await pool.execute(
            `SELECT * FROM enrollments
             ${whereClause}
             ORDER BY ${sortField} ${sortOrder}
             LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        const [countResult] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM enrollments
             ${whereClause}`,
            params
        );

        const total = countResult[0].total;

        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: enrollments
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch enrollments"
        });
    }
};

const getEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const [enrollments] = await pool.execute(
            "SELECT * FROM enrollments WHERE enrollment_id = ?",
            [id]
        );

        if (enrollments.length === 0) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }

        res.status(200).json(enrollments[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch enrollment"
        });
    }
};

const updateEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const { student_id, course_id, enrollment_date } = req.body;

        const [result] = await pool.execute(
            `UPDATE enrollments
             SET student_id = ?, course_id = ?, enrollment_date = ?
             WHERE enrollment_id = ?`,
            [student_id, course_id, enrollment_date, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }

        res.status(200).json({
            message: "Enrollment updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update enrollment"
        });
    }
};

const deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            "DELETE FROM enrollments WHERE enrollment_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Enrollment not found"
            });
        }

        res.status(200).json({
            message: "Enrollment deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete enrollment"
        });
    }
};

module.exports = {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
};