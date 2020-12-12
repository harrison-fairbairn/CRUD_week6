/* jshint esversion: 6 */

// new library: pouchDB
// https://pouchdb.com/getting-started.html
// https://github.com/pouchdb/pouchdb-server
// This would technically sync across systems, 
// if we installed a back-end database for it.

var db = new PouchDB('customerCRUD_db');

// Util Function for Math.random()
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// cat avatars for customers
function getCatPicture() {
  return `https://http.cat/${getRandomArbitrary(0, 500)}`;
}

function showCustomers() {
  return db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    return doc.rows;
  });
}

function readCustomer(customer) {
  // Searches for ID selector in DB
  return db.find({
    selector: {
      _id: customer._id
    }
  });
}

function createCustomer(newName, newPhone, newAddress, newEmail) {
  db.post({
    name: newName,
    phone: newPhone,
    address: newAddress,
    email: newEmail
  }).then((resp) => {
    console.log(resp);
  }).catch((err) => {
    console.log(err);
  });
}
// Pass object as input, then map to the database to update existing data
function updateCustomer(customer) {
  // db.get finds the customer in DB
  db.get(customer._id).then((doc) => {
    // db.put updates the doc (it can also be used to make a new doc but post is better for that)
    return db.put({
      _id: customer._id,
      _rev: doc.rev,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      email: customer.email
    });
  });
}

db.changes({
  since: 'now',
  live: true
}).on('change', updateCustomer);

function deleteCustomer(customer) {
  db.get(customer._id).then((doc) => {
    db.remove(doc);
  }).catch((err) => {
    console.log(err);
  });
}