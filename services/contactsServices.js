import Contact from "../models/Contacts.js";

export const listContacts = () => Contact.find();

export const getContactById = (id, owner) => Contact.findOne({ _id: id, owner });

export const deleteContact = (id, owner) => Contact.findOneAndDelete({_id: id, owner});

export const createContact = ({ name, email, phone, favorite }, owner) =>
  Contact.create({ name, email, phone, favorite, owner });

export const updateContactById = (id, name, email, phone, favorite, owner) => {
  const updateData = { name, email, phone, favorite };
  return Contact.findOneAndUpdate({_id: id, owner}, updateData, {
    new: true,
    runValidators: true,
  });
};

export const updateStatusContact = (id, favorite, owner) => {
  const updateData = { favorite };
  return Contact.findOneAndUpdate({_id: id, owner}, updateData, {
    new: true,
    runValidators: true,
  });
};
