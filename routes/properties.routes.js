const express = require('express');
const router = express.Router();

const Property = require("../models/Property.model");
const fileUploader = require('../config/cloudinary.config');
 
// GET route to display the form to create a new movie
router.get('/property/create', (req, res) => res.render('property-views/property-create'));
 
router.get('/property', (req, res) => {
    Property.find()
      .then(propertyFromDB => {
        // console.log(FromDB);
        res.render('property-views/property-list.hbs', { property: propertiesFromDB });
      })
      .catch(err => console.log(`Error while getting the propreties from the DB: ${err}`));
  });

  router.post('/property/create', fileUploader.single('property-cover-image'), (req, res) => {
    const { title, description } = req.body;
    console.log('req.file', req.file)
   
    Property.create({ title, description, imageUrl: req.file.path })
      .then(newlyCreatedPropertyFromDB => {
        console.log(newlyCreatedPropertyFromDB);
        res.redirect('/properties')
      })
      .catch(error => console.log(`Error while creating a new property: ${error}`));
  });

  router.get('/property/:id/edit', (req, res) => {
    const { id } = req.params;
   
    Property.findById(id)
      .then(propertyToEdit => res.render('property-views/property-edit', propertyToEdit))
      .catch(error => console.log(`Error while getting a single property for edit: ${error}`));
  });

  // POST route to save changes after updates in a specific 
router.post('/property/:id/edit', fileUploader.single('property-cover-image'), (req, res) => {
  const { id } = req.params;
  const { title, description, existingImage } = req.body;
 
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }
 
  Property.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
    .then(() => res.redirect(`/properties`))
    .catch(error => console.log(`Error while updating a single property: ${error}`));
});
module.exports = router;