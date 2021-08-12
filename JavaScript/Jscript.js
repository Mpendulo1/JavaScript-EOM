// Get the modal
var modal = document.getElementById("id01");
var modal = document.getElementById("id02");
var modal = document.getElementById('id03');


fetch("https://vast-escarpment-76787.herokuapp.com/show-Vehicle")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    dealership(data);
  });

function dealership(vehicle) {
  let vehicle_container = document.querySelector(".vehicle-container");
  vehicle_container.innerHTML = "";
  vehicle.data.forEach((car) => {
    vehicle_container.innerHTML += `
    
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
        <button onclick="addToCart(${car.id})" class="purchase text-bold">PURCHASE</button>
        
        </div>
            
    </div>
    
    </div>

    `;
  });
//* Add to cart functions*//
function addToCart(id) {
  let vehicle_container = vehicle.data.find((item) => {
    return (item.id = id);
  });
  console.log(vehicle_container);
  cart.push(vehicle_container);
  console.log("See Cart Items Here: ", cart);
}  
}


// ------------------------------       --------------------------------

