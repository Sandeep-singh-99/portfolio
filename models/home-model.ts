import { model, models, Schema } from "mongoose";

const homeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String], // Change to an array for multiple values
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  resumeFile: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
});

const HomeModel = models.HomeModel || model("HomeModel", homeSchema);

export default HomeModel;
