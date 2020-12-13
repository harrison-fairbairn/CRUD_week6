/* jshint esversion: 6 */

// new library: pouchDB
// https://pouchdb.com/getting-started.html
// https://github.com/pouchdb/pouchdb-server
// This would technically sync across systems, 
// if we installed a back-end database for it.

const  db = new PouchDB('customerCRUD_db');

// Util Function for Math.random()
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// cat avatars for customers
function getCatPicture() {
  let size = getRandomArbitrary(0, 500);
  return `https://placekitten.com/g/${size}/${size}`;
}

function createCustomer(newName, newPhone, newAddress, newEmail) {
  db.post({
    _id: newName + getRandomArbitrary(0, 1000).toString(),
    name: newName,
    phone: newPhone,
    address: newAddress,
    email: newEmail
  });
}
// Pass object as input, then map to the database to update existing data
function updateCustomer(customer, editID) {
  let editButton = $(`#${editID}`);
  editButton.on('click', () => {
    let newName = nameInput.val();
    let newPhone = phoneInput.val();
    let newAddress = addressInput.val();
    let newEmail = emailInput.val();
    // db.get finds the customer in DB
    db.get(customer._id).then((doc) => {
      let updatedCustomer = {
        _id: customer._id,
        _rev: doc._rev,
        name: newName,
        phone: newPhone,
        address: newAddress,
        email: newEmail
      }
      // db.put updates the doc (it can also be used to make a new doc but post is better for that)
      return db.put(updatedCustomer, {force: true});
    });
    
    location.reload();
  });
}

function deleteCustomer(customer, listItemID, deleteID) {
  let deleteButton = $(`#${deleteID}`);
  deleteButton.on('click', () => {
    db.get(customer._id).then((doc) => {
      db.remove(doc);
      $(`#${listItemID}`).remove();
    });
  });
}