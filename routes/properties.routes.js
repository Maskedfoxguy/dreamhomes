const express = require('express');
const router = express.Router();

const Property = require("../models/Property.model");
const fileUploader = require('../config/cloudinary.config');
 
// GET route to display the form to create a new property
router.get('/create', (req, res) => {
  console.log(req.session.currentUser)
  res.render('property/property-create' ,  {userInSession: req.session.currentUser._id} );
});
router.get('/property', (req, res) => {
  console.log("testing property get route")
    Property.find()
      .then(propertyFromDB => {
        // console.log(FromDB);
        res.render('property/property-list.hbs', { property: propertyFromDB, userInSession: req.session.currentUser });
      })
      .catch(err => console.log(`Error while getting the propreties from the DB: ${err}`));
  });

  router.get('/details/:id/edit' , (req, res) => {
    const id = req.params.id;
    console.log('lobo estas?')
    Property.findById(id)
    .then(propertyToEdit => res.render('property/property-edit',{ propertyToEdit, userInSession: req.session.currentUser}))
    .catch(error => console.log(`Error while getting a single property for edit: ${error}`));
   });

 
// POST that creates a property:
router.post('/create', fileUploader.single('property-cover-image'), (req, res) => {
  const { title, description } = req.body;
  console.log('req.file', req.file)
  
  Property.create({ title, description, imageUrl: req.file.path , owner: req.session.currentUser })
    .then(newlyCreatedPropertyFromDB => {
      console.log(newlyCreatedPropertyFromDB);
      res.redirect('/property/property')

    })

    .catch((error) => console.log(`Error while creating a new property: ${error}`));
});

 // Get the property edit page
//  /Route to edit the property

 router.get('/details/:id/edit' , (req, res) => {
  const id = req.params.id;
  console.log('lobo estas?')
  Property.findById(id)
  .then(propertyToEdit => res.render('property/property-edit',{ propertyToEdit, userInSession: req.session.currentUser}))
  .catch(error => console.log(`Error while getting a single property for edit: ${error}`));
 });
  

  // POST route to save changes after updates in a specific property
  router.post('/details/:id/edit', fileUploader.single('property-cover-image'), (req, res) => {
    const id = req.params.id;
    const { title, description, existingImage } = req.body;
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
    Property.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
      .then(() => res.redirect('/property/property'))
      .catch(error => console.log(`Error while updating a single property: ${error}`));
  });


// Post route that deletes the property.

module.exports = router;