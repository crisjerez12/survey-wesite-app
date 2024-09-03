import mongoose from "mongoose";

const firstSectionSchema = new mongoose.Schema({
  age: { type: String, required: true },
  clientType: { type: String, required: true },
  gender: { type: String, required: true },
  region: { type: String, required: true },
  serviceAvailed: { type: String, required: true },
});

const secondSectionSchema = new mongoose.Schema({
  first: { type: String, required: true },
  second: { type: String, required: true },
  third: { type: String, required: true },
});

const thirdSectionSchema = new mongoose.Schema({
  order: { type: String, required: true },
  question: { type: String, required: true },
  response: { type: String, required: true },
});

const responseSchema = new mongoose.Schema(
  {
    firstSection: { type: firstSectionSchema, required: true },
    secondSection: { type: secondSectionSchema, required: true },
    thirdSection: { type: [thirdSectionSchema], required: true },
  },
  { timestamps: true }
);

const Response =
  mongoose.models.Response || mongoose.model("Response", responseSchema);

export default Response;
