import { models, model, Schema } from "mongoose";

const skillModel = new Schema({
  skillImages: [
    {
      skillImage: { type: String, required: true },
      cloudinaryId: { type: String, required: true },
    },
  ],
});

const SkillModel = models?.SkillModel || model("SkillModel", skillModel);

export default SkillModel;
