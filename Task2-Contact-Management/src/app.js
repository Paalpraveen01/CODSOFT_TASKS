
require("dotenv").config();

const express = require("express");
const pool = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Contact Management System API is running"
    });
});

app.use("/contacts", contactRoutes);

const PORT = process.env.PORT || 5001;

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log("MySQL database connected successfully");
        connection.release();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
