import * as contactsService  from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js"

export const getAllContacts = async(req, res, next) => {
    try {
        const result = await contactsService.listContacts()

        res.json(result)
    }
    catch (error) {
        next(error);
    }
};

export const getOneContact = async(req, res, next) => {
    try{
        const { id }  = req.params;
        const result = await contactsService.getContactById(id);
        if (!result){
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result)
    }
  
    catch (error) {
        next(error);
    }
};
export const deleteContact = async(req, res, next) => {
    try{
        const { id }  = req.params;
        const result = await contactsService.deleteContact(id);
        if (!result){
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result)
    }
  
    catch (error) {
        next(error);
    }
};

export const createContact = async(req, res, next) => {
    try {
        const { name, email, phone } = req.body; 
        const { error } = createContactSchema.validate({ name, email, phone }); 
        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await contactsService.createContact(name, email, phone); 

        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};


export const updateContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const { error } = updateContactSchema.validate({ name, email, phone }); 
        if (error) {
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await contactsService.updateContactById(id, name, email, phone);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }

        res.json(result);
    }
    catch(error) {
        next(error);
    }
};
