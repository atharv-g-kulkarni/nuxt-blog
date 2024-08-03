import Joi from "joi";

export const BlogSchema = Joi.object({
  title: Joi.string().min(5).max(500).required(),
  headline: Joi.string().max(1200).required(),
  story: Joi.string().min(20).max(2000).required(),
  titleImage: Joi.string(),
  createdBy: Joi.string().required(),
});
