import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact
} from "../controllers/contactsControllers.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../middlewares/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.patch('/:id/favorite', updateStatusContact)

contactsRouter.get("/:id", getOneContact, isValidId);

contactsRouter.delete("/:id", deleteContact, isValidId);

contactsRouter.post("/", createContact, validateBody(createContactSchema));

contactsRouter.put("/:id", updateContact, isValidId);

export default contactsRouter;
