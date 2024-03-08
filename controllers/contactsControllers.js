import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.deleteContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error } = createContactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsService.createContact({
      name,
      email,
      phone,
      favorite,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { error } = updateContactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateContactById(
      id,
      name,
      email,
      phone,
      favorite
    );
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const result = await contactsService.updateStatusContact(id, favorite);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact : ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
}