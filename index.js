/* jshint esversion: 6 */

// Util Function for Math.random()
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// cat avatars for customers
function getCatPicture() {
  return `https://http.cat/${getRandomArbitrary(0, 1000)}`;
}

// on load stuff
$(document).on('load', () => {
  const display = $("#displayCustomers");
  const customerForm = $("#customerForm");
  const nameInput = $('#customerNameInput');
  const phoneInput = $('#customerPhoneInput');
  const addressInput = $('#customerAddressInput');
  const emailInput = $('#customerEmailInput');

  // function for cleaning out customer inputs
  function resetCustomerInput() {
    nameInput.val('');
    phoneInput.val('');
    addressInput.val('');
    emailInput.val('');
  }

  customerForm.on("submit", () => {
    let newCustomer = {
      name: nameInput.val(),
      address: addressInput.val(),
      phone: phoneInput.val(),
      email: emailInput.val()
    };
    createCustomer(newCustomer);
  });

  
  // Template for customer display lines with edit & delete options
  const buildTemplate = (customer) => {
    return `<li class="list-group-item bg-dark text-white" id="entry_${customer.id}">
    <div class="row">
      <div class="col-md-4" id="title_${customer.id}"><img src="${getCatPicture()}" class="avatar rounded-large float-left border border-secondary m-2 p-2" alt="Customer Avatar"></div>
      <div class="col-md-4"></div>  
      <div class="col-auto text-right p-4">
        <button type="button" class="btn btn-secondary" id="edit_${customer.id}"><i class="fas fa-user-edit"></i> Edit</button>
        <button type="button" class="btn btn-danger" id="del_${customer.id}"><i class="fas fa-trash"></i> Delete</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xl">
        <ul class="list-group">
          <li class="list-group-item list-group-item-dark active">Customer: ${customer.name}</li>
          <li class="list-group-item list-group-item-dark">Phone Number: ${customer.phone}</li>
          <li class="list-group-item list-group-item-dark">Address: ${customer.address}</li>
        </ul>
      </div>
    </div>
  </li>`;
  };
  // old code, maybe reuse for IDs?
  // const buildIDs = (customer) => {
  //   return {
  //     editID:     "edit_" + customer._id,
  //     deleteID:   "delete_" + customer._id,
  //     listItemID: "listItem_" + customer._id,
  //     itemID:     "item_" + customer._id
  //   };
  // };

  const displayCustomers = () => {
    db.customer.forEach((currCustomer) => {
      // push active data to arrays for display
      display.append(buildTemplate(currCustomer));
      updateCustomer(customer, currCustomer.editID); // Call functions to add event listeners on new template's buttons for edit and delete
      deleteCustomer(currCustomer.id, currCustomer.deleteID);
    });
  };

});