/* jshint esversion: 6 */
let db = [];

function readCustomers() {
  return db;
}

function readCustomer(id) {
  return db.find((customer) => {
    return customer.id === id;
  });
}

function createCustomer(customerData) {
  db.push(customerData);
}

function updateCustomer(customer) {
  
  let foundCustomer = db.find((el) => {
    return el.id === customer.id;
  });

  if (foundCustomer) {
    db[db.findIndex( el => el.id === foundCustomer.id)] = foundCustomer;
  }
}

function deleteCustomer(id) {
  let findCustomer = (el) => {
    if (el.id === id) {
      return true;
    } else {
      return false;
    }
  };
  db.find(findCustomer);
  const index = db.findIndex(findCustomer);
  db.splice(index, 1);
}

class Customer {
  constructor(name, address, phone) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }

  
}