const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const Contect = require("../models/Contect");

router.get("/", auth, async (req, res) => {
  try {
    const contects = await Contect.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contects);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});



router.post(
    '/',
    auth,
    check('name', 'Name is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, phone, type } = req.body;
  
      try {
        const newContact = new Contect({
          name,
          email,
          phone,
          type,
          user: req.user.id
        });
  
        const contact = await newContact.save();
  
        res.json(contact);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );


  router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
  
    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
  
    try {
      let contact = await Contect.findById(req.params.id);
  
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });
  
      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      contact = await Contect.findByIdAndUpdate(
        req.params.id,
        { $set: contactFields },
        { new: true }
      );
  
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  router.delete('/:id', auth, async (req, res) => {
    try {
      const contact = await Contect.findById(req.params.id);
  
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });
  
      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      await Contect.findByIdAndRemove(req.params.id);
  
      res.json({ msg: 'Contact removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;
