const asyncHandler = require("express-async-handler");
const ContactM = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
    const contacts = ContactM.find({ user_id: user.id });
    res.status(200).json(contacts);
})

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const newContact = await ContactM.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(newContact) // 201 - created
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await ContactM.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact details not found")
    }
    res.status(200).json(contact)
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await ContactM.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact details not found")
    }

    if (contact.user_id.toString() !== req.user_id) {
        res.status(403)
        throw new Error("User does not have the authentication to update other contacts")
    }

    const updatedContact = await ContactM.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact)
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await ContactM.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user_id) {
        res.status(403);
        throw new Error("User does not have authentication to delete this record")
    }

    await ContactM.deleteOne({ _id: req.params.id });
    res.status(200).json(contact)
})

module.exports = {
    createContact,
    getContact,
    getContacts,
    updateContact,
    deleteContact
}