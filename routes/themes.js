const express = require('express');
const Theme = require('../models/Theme');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const theme = await Theme.find();

    // if no theme, create theme
    if (theme.length === 0) {
      const newTheme = await Theme.create({ isDark: true });

      return res.status(200).json({
        success: true,
        data: [newTheme]
      });
    }

    return res.status(200).json({
      success: true,
      data: theme
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Could not get theme from DB'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    // find theme by id
    const theme = await Theme.findById(req.body.id);

    // remove theme from DB
    await theme.remove();

    // create new theme with given settings from req
    const newTheme = await Theme.create({ isDark: req.body.isDark });

    return res.status(200).json({
      success: true,
      data: newTheme
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Could not toggle theme'
    });
  }
});

module.exports = router;
