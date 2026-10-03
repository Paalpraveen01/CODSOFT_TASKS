const pool = require("../config/db");

const createStudent = async (req, res) => {
    try {
        const { name, email, phone, date_of_birth } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (phone && !/^\d{10,15}$/.test(phone)) {
            return res.status(400).json({
                message: "Phone number must contain 10 to 15 digits"
            });
        }

        if (date_of_birth && isNaN(Date.parse(date_of_birth))) {
            return res.status(400).json({
                message: "Invalid date of birth"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO students
            (name, email, phone, date_of_birth)
            VALUES (?, ?, ?, ?)`,
            [name, email, phone, date_of_birth]
        );

        res.status(201).json({
            message: "Student created successfully",
            student_id: result.insertId
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create student"
        });
    }
};
const getAllStudents = async (req, res) => {
    try {
        const { search } = req.query;

        let query = "SELECT * FROM students";
        let params = [];

        if (search) {
            query += `
                WHERE name LIKE ?
                OR email LIKE ?
                OR phone LIKE ?
            `;

            const searchValue = `%${search}%`;

            params = [
                searchValue,
                searchValue,
                searchValue
            ];
        }

        const [students] = await pool.execute(query, params);

        res.status(200).json(students);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
};

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;

        const [students] = await pool.execute(
            "SELECT * FROM students WHERE student_id = ?",
            [id]
        );

        if (students.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(students[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch student"
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, date_of_birth } = req.body;

        const [result] = await pool.execute(
            `UPDATE students
             SET name = ?, email = ?, phone = ?, date_of_birth = ?
             WHERE student_id = ?`,
            [name, email, phone, date_of_birth, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update student"
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            "DELETE FROM students WHERE student_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete student"
        });
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};