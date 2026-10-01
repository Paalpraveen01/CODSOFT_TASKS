const express = require("express");
const pool = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const app = express();

app.use(express.json());
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Record Management API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    try {
        const connection = await pool.getConnection();
        console.log("MySQL database connected successfully");
        connection.release();
    } catch (error) {
        console.error("MySQL connection failed:", error.message);
    }
});