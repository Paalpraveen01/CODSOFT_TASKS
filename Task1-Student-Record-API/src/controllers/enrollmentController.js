const pool = require("../config/db");

const createEnrollment = async (req, res) => {
    try {
        const { student_id, course_id, enrollment_date } = req.body;

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

        res.status(500).json({
            message: "Failed to create enrollment"
        });
    }
};

const getAllEnrollments = async (req, res) => {
    try {
        const [enrollments] = await pool.execute(
            "SELECT * FROM enrollments"
        );

        res.status(200).json(enrollments);
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