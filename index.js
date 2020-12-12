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

function readCustomer(id) {
  // Searches for ID selector in DB
  return db.find({
    selector: {
      _id: id
    }
  });
}

function createCustomer(newName, newPhone, newAddress, newEmail) {
  let customer = {
    _id: new Date().toISOString(),
    name: newName,
    phone: newPhone,
    address: newAddress,
    email: newEmail
  };

  db.put(customer, (err, res) => {
    if (!err) {
      console.log(`CustomerCRUD: Loaded Data into pouchDB Database Successfully`);
    }
  });

}

function updateCustomer(customer) {
  db.put(customer, (err, res) => {
    if (!err) {
      console.log(`CustomerCRUD: Updated customer ${customer}`);
    }
  });
}

db.changes({
  since: 'now',
  live: true
}).on('change', updateCustomer);

function deleteCustomer(customer) {
  db.remove(customer);
}