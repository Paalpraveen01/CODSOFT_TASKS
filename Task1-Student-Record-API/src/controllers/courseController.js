const pool = require("../config/db");

const createCourse = async (req, res) => {
    try {
        const { course_name, course_code, description } = req.body;

        if (!course_name || !course_code) {
            return res.status(400).json({
                message: "Course name and course code are required"
            });
        }

        if (course_code.length < 3 || course_code.length > 20) {
            return res.status(400).json({
                message: "Course code must be between 3 and 20 characters"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO courses
            (course_name, course_code, description)
            VALUES (?, ?, ?)`,
            [course_name, course_code, description]
        );

        res.status(201).json({
            message: "Course created successfully",
            course_id: result.insertId
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Course code already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create course"
        });
    }
};
const getAllCourses = async (req, res) => {
    try {
        const {
            search,
            sort = "course_id",
            order = "asc"
        } = req.query;

        const page = Math.max(parseInt(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(parseInt(req.query.limit) || 10, 1),
            100
        );

        const offset = (page - 1) * limit;

        const allowedSortFields = {
            course_id: "course_id",
            course_name: "course_name",
            course_code: "course_code",
            created_at: "created_at"
        };

        const sortField =
            allowedSortFields[sort] || "course_id";

        const sortOrder =
            order.toLowerCase() === "desc"
                ? "DESC"
                : "ASC";

        let whereClause = "";
        let params = [];

        if (search) {
            whereClause = `
                WHERE course_name LIKE ?
                OR course_code LIKE ?
                OR description LIKE ?
            `;

            const searchValue = `%${search}%`;

            params = [
                searchValue,
                searchValue,
                searchValue
            ];
        }

        const [courses] = await pool.execute(
            `SELECT * FROM courses
             ${whereClause}
             ORDER BY ${sortField} ${sortOrder}
             LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        const [countResult] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM courses
             ${whereClause}`,
            params
        );

        const total = countResult[0].total;

        res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: courses
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
};

const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        const [courses] = await pool.execute(
            "SELECT * FROM courses WHERE course_id = ?",
            [id]
        );

        if (courses.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(courses[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch course"
        });
    }
};
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { course_name, course_code, description } = req.body;

        const [result] = await pool.execute(
            `UPDATE courses
             SET course_name = ?, course_code = ?, description = ?
             WHERE course_id = ?`,
            [course_name, course_code, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json({
            message: "Course updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update course"
        });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse
};