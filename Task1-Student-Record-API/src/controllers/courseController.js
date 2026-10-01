const pool = require("../config/db");

const createCourse = async (req, res) => {
    try {
        const { course_name, course_code, description } = req.body;

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

        res.status(500).json({
            message: "Failed to create course"
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const [courses] = await pool.execute(
            "SELECT * FROM courses"
        );

        res.status(200).json(courses);
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