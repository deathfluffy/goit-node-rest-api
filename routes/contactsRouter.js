import express from "express";
import 
  conctactsControllers
 from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import  isValidId  from '../middlewares/isValidId.js';
import  authenticate  from "../middlewares/authentication.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate)

contactsRouter.get("/",   conctactsControllers.getAllContacts);

contactsRouter.get("/:id",  isValidId, conctactsControllers.getOneContact);

contactsRouter.post("/",  conctactsControllers.createContact, validateBody(createContactSchema));

contactsRouter.delete("/:id",  isValidId, conctactsControllers.deleteContact);

contactsRouter.put("/:id",  isValidId, conctactsControllers.updateContact, validateBody(updateContactSchema));

contactsRouter.patch("/:id/favorite", isValidId, conctactsControllers.updateStatusContact, validateBody(updateFavoriteSchema));

export default contactsRouter;
