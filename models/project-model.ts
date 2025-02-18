import { model, models, Schema } from "mongoose";

const projectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },

    projectDescription: {
        type: String,
        required: true
    },

    projectImage: {
        type: String,
        required: true
    },

    technologyUsed: {
        type: [String],
        required: true
    },

    cloudinaryId: {
        type: String,
        required: true
    },

    projectUrl: {
        type: String,
        required: true
    }
})

const ProjectModel = models?.ProjectModel || model('ProjectModel', projectSchema);

export default ProjectModel;