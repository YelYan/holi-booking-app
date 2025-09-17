import Joi from "joi";

export const userSchemaValidate = Joi.object({
    name : Joi.string()
    //.alphanum() // Must contain only alphanumeric characters
    .min(3)
    .max(30)
    .required()
    .messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 1 character long.",
    "string.max": "Name must not exceed 255 characters.",
    "any.required": "Name is required.",
  }), 

password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .min(6)
  .max(25)
  .required()
  .messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password cannot exceed 25 characters.",
    "string.pattern.base": "Password must contain only letters and numbers.",
    "any.required": "Password is required."
  }),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) // Validate email format
    .required() 
    .messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required."
  })
})

export const loginSchemaValidate = Joi.object({
    password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .min(6)
  .max(25)
  .required()
  .messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password cannot exceed 25 characters.",
    "string.pattern.base": "Password must contain only letters and numbers.",
    "any.required": "Password is required."
  }),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) // Validate email format
    .required() 
    .messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required."
  })
})

export const forgotPassSchemaValidate = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) // Validate email format
    .required() 
    .messages({
    "string.base": "Email must be a string.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required."
  })
})

export const resetPasswordSchemaValidate = Joi.object({
    password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .min(6)
  .max(25)
  .required()
  .messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password cannot exceed 25 characters.",
    "string.pattern.base": "Password must contain only letters and numbers.",
    "any.required": "Password is required."
  }),
  resetToken: Joi.string()
    .min(3)
    .required()
    .messages({
    "string.base": "Reset Token must be a string.",
    "string.empty": "Reset Token cannot be empty.",
    "string.min": "Reset Token must be at least 1 character long.",
    "any.required": "Reset Token is required.",
  }), 
})


export const hotelFormSchemaValidate = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must not exceed 100 characters.",
      "any.required": "Name is required.",
    }),

  city: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "City must be a string.",
      "string.empty": "City cannot be empty.",
      "string.min": "City must be at least 3 characters long.",
      "string.max": "City must not exceed 100 characters.",
      "any.required": "City is required.",
    }),

  country: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Country must be a string.",
      "string.empty": "Country cannot be empty.",
      "string.min": "Country must be at least 2 characters long.",
      "string.max": "Country must not exceed 100 characters.",
      "any.required": "Country is required.",
    }),

  description: Joi.string()
    .min(10)
    .max(1000)
    .optional()
    .allow("")
    .messages({
      "string.base": "Description must be a string.",
      "string.min": "Description must be at least 10 characters long.",
      "string.max": "Description must not exceed 1000 characters.",
    }),

  type: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Type must be a string.",
      "string.empty": "Type cannot be empty.",
      "string.min": "Type must be at least 3 characters long.",
      "string.max": "Type must not exceed 100 characters.",
      "any.required": "Type is required.",
    }),

  pricePerNight: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      "number.base": "Price per night must be a number.",
      "number.positive": "Price per night must be positive.",
      "any.required": "Price per night is required.",
    }),

  starRating: Joi.number()
    .min(1)
    .max(5)
    .required()
    .messages({
      "number.base": "Star rating must be a number.",
      "number.min": "Star rating must be at least 1.",
      "number.max": "Star rating cannot exceed 5.",
      "any.required": "Star rating is required.",
    }),

  facilities: Joi.array()
    .items(Joi.string().min(2).max(100))
    .optional()
    .messages({
      "array.base": "Facilities must be an array of strings.",
    }),

  // imageFiles: Joi.array()
  //   .items(
  //     Joi.object({
  //       originalname: Joi.string().required(),
  //       mimetype: Joi.string()
  //         .valid("image/jpeg", "image/png", "image/webp")
  //         .required(),
  //       size: Joi.number().max(5 * 1024 * 1024).required(), // 5 MB limit
  //       path: Joi.string().required(),
  //     })
  //   )
  //   .optional(),
  // imageUrls: Joi.array()
  //   .items(Joi.string().uri().messages({
  //     "string.uri": "Each image URL must be a valid URI.",
  //   }))
  //   .optional(),

  adultCount: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Adult count must be a number.",
      "number.min": "There must be at least 1 adult.",
      "any.required": "Adult count is required.",
    }),

  childCount: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      "number.base": "Child count must be a number.",
      "number.min": "Child count cannot be negative.",
    }),
});






