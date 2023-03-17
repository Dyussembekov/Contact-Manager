const express = require("express")
const router = express.Router()
const { 
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
 } = require("../controllers/contactController")

router.route("/").get(getAllContacts).post(createContact)

router.route("/:id").get(getContact).delete(deleteContact).put(updateContact)

module.exports = router