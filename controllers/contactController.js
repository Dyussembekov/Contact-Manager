const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = Contact.find()
    res.status(200).json(contacts)
})

//@desc Create New contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const {name, email, phone} = req.body
    if (!name || !email || !phone) {
        res.status(400)  
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name, 
        email,
        phone
    })
    res.status(201).json(contact)
}) 

//@desc Get contact
//@route GET /api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})


//@desc Update contact by id
//@route PUT /api/contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

//@desc Delete contact
//@route DELETE /api/contacts
//@access public

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update other user contacts");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
  });



module.exports = { 
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
  }