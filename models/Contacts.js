import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false });


ContactSchema.post("save", handleSaveError);
ContactSchema.pre("findOneAndUpdate", setUpdateSettings);
ContactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", ContactSchema);

export default Contact;
