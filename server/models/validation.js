import Joi from "joi";

export const BlogSchema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  headline: Joi.string().max(50).required(),
  story: Joi.string().min(20).max(200).required(),
  titleImage: Joi.string(),
  createdBy: Joi.string().required(),
});
