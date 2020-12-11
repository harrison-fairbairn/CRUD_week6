db = {
  customer: [],
  address: [],
};

function readCustomers() {
  return db.customer;
}

function readCustomer(id) {
  return db.customer.find((customer) => {
    return customer.id === id;
  });
}

function createCustomer(customer) {
  return db.customer.push(customer);
}

function updateCustomer(customer) {
  
  let foundCustomer = db.customer.find((x) => {
    return x.id === customer.id;
  });

  if (foundCustomer) {
    db.customer[db.customer.findIndex( x => x.id === foundCustomer.id)] = foundCustomer;
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
  db.customer.find(findCustomer);
  const index = db.customer.findIndex(findCustomer);
  db.customer.splice(index, 1);
}

class Customer {
  constructor(name, address, phone) {
    this.name = name;
    this.address = address;
    this.phone = phone;
  }

  
}