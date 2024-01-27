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

//Route to edit the property

router.get('/details/:id/edit' , (req, res) => {
 const id = req.params.id;
 console.log('lobo estas?')
 Property.findById(id)
 .then(propertyToEdit => res.render('property/property-edit',{ propertyToEdit, userInSession: req.session.currentUser}))
 .catch(error => console.log(`Error while getting a single property for edit: ${error}`));
});

 
// POST that creates a property:
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

  // Post route to delete a specific property

router.post('/details/:id/delete', (req, res) => {
  Property.findByIdAndDelete(req.params.id)
      .then(() => res.redirect('/property/property'))
      .catch(err => console.log(err))
});

// router.get('/details/:id/delete', (req, res,) => {
//  const id = req.params.id;
//  Property.findByIdAndDelete(id)
//       .then(propertyToDelete => res.render('property/property-delete',{ propertyToDelete, userInSession: req.session.currentUser}))
//       .catch(error => console.log(`Error while getting a single property for edit: ${error}`));
//       // .then(() => res.redirect('property/property'))
//       // .catch(err => console.log(err))
// });

module.exports = router;






































//  router.get('/details/:id/edit', (req, res) => {
//    const id = req.params.id;
//    Property.findById(id)
//      .then(propertyToEdit => res.render('property/property-edit', {propertyToEdit, userInSession: req.session.currentUser}))
//      .catch(error => console.log(`Error while getting a single property for edit: ${error}`));
//  });

  

//   // POST route to save changes after updates in a specific property
// router.post('/details/:id/edit', fileUploader.single('property-cover-image'), (req, res) => {
//   const { id } = req.params.id;
//   const { title, description, existingImage } = req.body;
 
//   let imageUrl;
//   if (req.file) {
//     imageUrl = req.file.path;
//   } else {
//     imageUrl = existingImage;
//   }
 
//   Property.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
//     .then(() => res.redirect('/property-list'))
//     .catch(error => console.log(`Error while updating a single property: ${error}`));
// });


// Post route that deletes the property.