
const express = require("express");

const {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
