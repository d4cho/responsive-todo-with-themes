const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema(
  {
    isDark: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Theme', ThemeSchema);
