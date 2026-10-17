
const pool = require("../config/db");

const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validPhone = /^\d{10,15}$/;

const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        if (
            typeof name !== "string" || !name.trim() ||
            typeof email !== "string" || !email.trim() ||
            typeof phone !== "string" || !phone.trim()
        ) {
            return res.status(400).json({
                message: "Name, email and phone are required"
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone.trim();

        if (!validEmail.test(cleanEmail)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (!validPhone.test(cleanPhone)) {
            return res.status(400).json({
                message: "Phone must contain 10 to 15 digits"
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO contacts (name, email, phone)
             VALUES (?, ?, ?)`,
            [cleanName, cleanEmail, cleanPhone]
        );

        return res.status(201).json({
            message: "Contact created successfully",
            contact_id: result.insertId
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        console.error(error);
        return res.status(500).json({
            message: "Failed to create contact"
        });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const {
            search = "",
            sort = "contact_id",
            order = "asc"
        } = req.query;

        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(
            Math.max(parseInt(req.query.limit, 10) || 10, 1),
            100
        );
        const offset = (page - 1) * limit;

        const allowedSortFields = {
            contact_id: "contact_id",
            name: "name",
            email: "email",
            phone: "phone",
            created_at: "created_at"
        };

        const sortField = allowedSortFields[sort] || "contact_id";
        const sortOrder = order.toLowerCase() === "desc" ? "DESC" : "ASC";

        let whereClause = "";
        let params = [];

        if (search.trim()) {
            whereClause = `
                WHERE name LIKE ?
                   OR email LIKE ?
                   OR phone LIKE ?
            `;
            const value = `%${search.trim()}%`;
            params = [value, value, value];
        }

        const [contacts] = await pool.execute(
            `SELECT * FROM contacts
             ${whereClause}
             ORDER BY ${sortField} ${sortOrder}
             LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        const [countRows] = await pool.execute(
            `SELECT COUNT(*) AS total
             FROM contacts ${whereClause}`,
            params
        );

        const total = countRows[0].total;

        return res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: contacts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch contacts"
        });
    }
};

const getContactById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid contact ID"
            });
        }

        const [contacts] = await pool.execute(
            "SELECT * FROM contacts WHERE contact_id = ?",
            [id]
        );

        if (contacts.length === 0) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        return res.status(200).json(contacts[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch contact"
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, email, phone } = req.body;

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid contact ID"
            });
        }

        if (
            typeof name !== "string" || !name.trim() ||
            typeof email !== "string" || !email.trim() ||
            typeof phone !== "string" || !phone.trim()
        ) {
            return res.status(400).json({
                message: "Name, email and phone are required"
            });
        }

        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone.trim();

        if (!validEmail.test(cleanEmail)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        if (!validPhone.test(cleanPhone)) {
            return res.status(400).json({
                message: "Phone must contain 10 to 15 digits"
            });
        }

        const [result] = await pool.execute(
            `UPDATE contacts
             SET name = ?, email = ?, phone = ?
             WHERE contact_id = ?`,
            [name.trim(), cleanEmail, cleanPhone, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        return res.status(200).json({
            message: "Contact updated successfully"
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        console.error(error);
        return res.status(500).json({
            message: "Failed to update contact"
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({
                message: "Invalid contact ID"
            });
        }

        const [result] = await pool.execute(
            "DELETE FROM contacts WHERE contact_id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        return res.status(200).json({
            message: "Contact deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to delete contact"
        });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
};
