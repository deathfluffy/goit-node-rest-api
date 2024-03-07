import Contact from "../models/Contacts.js";

export const listContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);

export const deleteContact = (id) => Contact.findByIdAndDelete(id);

export const createContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });

export const updateContactById = (id, name, email, phone, favorite) => {
  const updateData = { name, email, phone, favorite };
  return Contact.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const updateStatusContact = (id, favorite) => {
  const updateData = { favorite };
  return Contact.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};
