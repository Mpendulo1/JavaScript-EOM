let vehicles = [];
let cart = [];
console.log(cart);

// Get the modal
var modal = document.getElementById("id01");
var modal = document.getElementById("id02");
var modal = document.getElementById("id001");
var modal = document.getElementById("id04");
var modal = document.getElementById("id05");
var modal = document.getElementById("id06");

fetch("https://vast-escarpment-76787.herokuapp.com/show-Vehicle")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    dealership(data);
    vehicles = data;
    dealership(vehicles);
  });

function dealership(vehicles) {
  let vehicleContainer = document.querySelector(".vehicle-container");
  vehicleContainer.innerHTML = "";
  vehicles.data.forEach((car) => {
    vehicleContainer.innerHTML += `
    
    <div class = "vehicle">
    <div class="card">
    <div class="box-image">
    <div class="circle">
      <p id="car-id" class="vehicle-id">${car.id}</p>
      </div>
        <img src="${car.image_url}" class="vehicle-image size1">
        </div>
        <div class="box-content text-center">
        <h4 class="vehicle-name"> ${car.name}</h4>
        <p class="vehicle-brand">Brand:  ${car.brand}</p>
        <p class="vehicle-price">Price: R${car.price} </p>
        <p class="vehicle-type">Type: ${car.type}</p>
        <p class="vehicle-year">Year: ${car.year}</p>
        <button class="btn btn-primary shot-item-button purchase text-bold" type="button" onclick="addToCart(${car.id})" >PURCHASE</button>
        
        </div>
            
    </div>
    
    </div>

    `;
  });

  //* Add to cart functions*//
}

function renderCart(cartItemContainer) {
  let cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "";
  if (cartItemContainer.length > 0) {
    cartItemContainer.map((cartItem) => {
      cartContainer.innerHTML += `
    <div class = "vehicle">
    <div class="card">
    <div class="box-image">
    <div class="circle">
      <p id="car-id" class="vehicle-id">${cartItem.id}</p>
      </div>
        <img src="${cartItem.image_url}" class="vehicle-image size1">
        </div>
        <div class="box-content text-center">
        <h4 class="vehicle-name"> ${cartItem.name}</h4>
        <p class="vehicle-brand">Brand:  ${cartItem.brand}</p>
        <p class="vehicle-price">Price: R${cartItem.price} </p>
        <p class="vehicle-type">Type: ${cartItem.type}</p>
        <p class="vehicle-year">Year: ${cartItem.year}</p>
        <button onclick="removeItem()" class="remove-btn purchase text-bold">Remove</button>
        </div>
            
    </div>
    
    </div>

    `;
    });
    let totalVehiclePrice = cartItemContainer.reduce((total, item) => total + parseInt(item.price), 1);
    console.log(totalVehiclePrice)
    cartContainer.innerHTML +=`<h5>Total: R ${totalVehiclePrice}</h5>`;
  } else {
    cartContainer.innerHTML = "<h2>No items on cart</h2>";
  }
}

function removeItem(id) {
  // vehicles = data
  // removeItem(data)
  // removeItem(vehicles)
  let product = vehicles.data.find((item) => {
    return item.id == id;
  });
  //console.log(product);

  cart.splice(
    cart.findIndex((a) => a.id === product.id),
    1
  );
  renderCart(cart);
}


function addToCart(id) {
  let vehicle = vehicles.data.find((item) => {
    return item.id == id;
  });
  console.log(vehicle);
  cart.push(vehicle);
  console.log(cart);
  renderCart(cart);
}
// Remove Items From Cart
//  ------------------------------       --------------------------------

function searchVehicles() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);
  let foundVehicles = vehicles.data.filter((vehicles) =>
    vehicles.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(foundVehicles);
  let vehicleContainer = document.querySelector(".vehicle-container");
  vehicleContainer.innerHTML = "";
  foundVehicles.forEach((car) => {
    console.log(car);
    vehicleContainer.innerHTML += `
    
    <div class = "vehicle">
    <div class="card">
    <div class="box-image">
    <div class="circle">
      <p id="car-id" class="vehicle-id">${car.id}</p>
      </div>
        <img src="${car.image_url}" class="vehicle-image size1">
        </div>
        <div class="box-content text-center">
        <h4 class="vehicle-name"> ${car.name}</h4>
        <p class="vehicle-brand">Brand:  ${car.brand}</p>
        <p class="vehicle-price">Price: R${car.price} </p>
        <p class="vehicle-type">Type: ${car.type}</p>
        <p class="vehicle-year">Year: ${car.year}</p>
        <button class="btn btn-primary shot-item-button purchase text-bold" type="button" onclick="addToCart(${car.id})" >PURCHASE</button>        
        </div>
            
    </div>
    
    </div>

    `;
  });
}
// --------------------------------------------
function deleteProduct(carId) {
  let vehicleId = vehicles.data.find((item) => {
    return item.id == carId;
  });
  let vehicle_id = vehicles.data.id;
  console.log(vehicleId);

  fetch("https://vast-escarpment-76787.herokuapp.com/delete-car", {
    method: "POST",
    body: JSON.stringify({
      id: vehicleId,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (
        data["Notification"] ==
        "The Vehicle Has Been Removed From The Dealership."
      ) {
        alert("Deleted succesfully");
      } else {
        alert("We could Not Remove The Vehicle");
      }
    });
}
