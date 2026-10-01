const express = require("express");

const {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment
} = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/", createEnrollment);
router.get("/", getAllEnrollments);
router.get("/:id", getEnrollmentById);
router.put("/:id", updateEnrollment);
router.delete("/:id", deleteEnrollment);

module.exports = router;