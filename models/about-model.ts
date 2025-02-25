import { model, models, Schema } from 'mongoose';

const aboutSchema = new Schema({
    description: {
        type: String,
        required: true
    }
})

const AboutModel = models?.AboutModel || model('AboutModel', aboutSchema);

export default AboutModel;