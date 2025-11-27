// src/models/user.js

import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// username за замовчуванням = email при створенні користувача
userSchema.pre('save', function (next) {
  if (this.isNew && !this.username) {
    this.username = this.email;
  }
  next();
});

// не віддавати пароль у відповіді
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
