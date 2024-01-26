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
        res.render('property/property-list', { property: propertyFromDB, userInSession: req.session.currentUser });
      })
      .catch(err => console.log(`Error while getting the propreties from the DB: ${err}`));
  });

router.get('/details/:id' , (req, res) => {
 
 const { id } = req.params.id;
 Property.findById(id)
  .then(propertyFound => res.render('property/property-details' , {propertyFound, id: id, userInSession: req.session.currentUser}))
  .catch(error => console.log(error))
});

 
// POST that creates a property:
router.post('/create', fileUploader.single('property-cover-image'), (req, res) => {
  const { title, description } = req.body;
  console.log('req.file', req.file)
  
  Property.create({ title, description, imageUrl: req.file.path , owner: req.session.currentUser._id })
    .then(newlyCreatedPropertyFromDB => {
      console.log(newlyCreatedPropertyFromDB);
      res.redirect('/property/property')

    })

    .catch((error) => console.log(`Error while creating a new property: ${error}`));
});

 // Get the property edit page
  router.get('/details/:id/edit', (req, res) => {
    const id = req.params.id;
   
    Property.findById(id)
      .then(propertyToEdit => res.render('property/property-edit', propertyToEdit))
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
    .then(() => res.redirect('/properties'))
    .catch(error => console.log(`Error while updating a single property: ${error}`));
});

router.post('/property/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Property.findByIdAndDelete(property_id)
      .then(() => res.redirect('property/property-list'))
      .catch(err => console.log(err))
})



// Post route that deletes the property.

module.exports = router;