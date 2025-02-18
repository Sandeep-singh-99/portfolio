import { model, models, Schema } from "mongoose";

const contactSchema = new Schema({
    url: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    cloudinaryId: {
        type: String,
        required: true
    }
})

const ContactModel = models?.ContactModel || model('ContactModel', contactSchema);

export default ContactModel;