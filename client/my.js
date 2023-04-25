const contentBox = document.getElementById("contentBox");
const modalContent = document.getElementById("modalContent");
const modalTitle = document.getElementById("modalTitle");

class Car {
  constructor(
    name = null,
    licenceNumber = null,
    hourlyRate = null,
    outOfTraffic = false,
    driverId = null
  ) {
    this.name = name;
    this.licenceNumber = licenceNumber;
    this.hourlyRate = hourlyRate;
    this.outOfTraffic = outOfTraffic;
    this.driverId = driverId;
  }
}

let editableCar = new Car();
let state = "view";
let selectedCarId = null;

function getHome() {
  let htmlElement = `
    <h1>Home</h1>
    <p>Ez egy főoldal</p>
    `;

  contentBox.innerHTML = htmlElement;
}

function getAbout() {
  let htmlElement = `
    <h1>About</h1>
    <p>Ez egy about</p>
    `;
  contentBox.innerHTML = htmlElement;
}

function getContact() {
  let htmlElement = `
    <h1>Contact</h1>
    <p>Ez egy contact</p>
    `;

  contentBox.innerHTML = htmlElement;
}

async function getTable() {
  state = "view";
  //lekérjük az adatokat
  const url = "http://localhost:3000/carsWithDrivers";
  const response = await fetch(url);
  const data = await response.json();
  const cars = data.data;

  //vizualizáljuk
  let htmlElement = `
    <table class="table table-striped table-hover table-bordered w-auto">
        <thead>
            <tr>
                <th>
                    <button type="button" class="btn btn-outline-success btn-sm"
                        data-bs-toggle="modal" data-bs-target="#modalCard"
                        onclick="onClickNewButton()"
                    >
                        Új autó
                    </button>
                </th>
                <th>név</th>
                <th>rendszám</th>
                <th>tarifa</th>
                <th>vezető</th>
                <th>Forgalmon<br>kívül</th>
            </tr>
        </thead>
        <tbody>

    `;
  //ciklus
  for (const car of cars) {
    htmlElement += `
            <tr>
                <td class="text-nowrap">
                    <button type="button" 
                        class="btn btn-outline-danger btn-sm"
                        data-bs-toggle="modal" data-bs-target="#modalCard"
                        onclick="onClickDeleteButton(${car.id})"
                    >
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                    <button type="button" 
                        class="btn btn-outline-warning btn-sm"
                        data-bs-toggle="modal" data-bs-target="#modalCard"
                        onclick="onClickEditButton(${car.id})"
                    >
                    <i class="bi bi-pencil-fill"></i>
                    </button>
                </td>
                <td>${car.name}</td>
                <td>${car.licenceNumber}</td>
                <td>${car.hourlyRate}</td>
                <td>${car.driverName}</td>
                <td>${car.outOfTraffic}</td>
            </tr>
        `;
  }
  //maradék
  htmlElement += `
        </tbody>
    </table>
`;
  contentBox.innerHTML = htmlElement;
}

async function getCards() {
  //lekérjük az adatokat
  const url = "http://localhost:3000/carsWithDrivers";
  const response = await fetch(url);
  const data = await response.json();
  const cars = data.data;

  //vizualizáljuk
  let htmlElement = `
    <h1>Kártyák</h1>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" data-masonry='{"percentPosition": true }' >
      <!-- ezt ismételgetjük -->
    `;
  //ciklus
  for (const car of cars) {
    htmlElement += `
        <div class="col">
        <div class="card">
          <img src="./images/${car.name}.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${car.name}</h5>
            <ul>
              <li>${car.licenceNumber}</li>
            </ul>

            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modalCard"
              onclick="onClickCardButton(${car.id})"  

            >
              Részletek
            </button>
      
          </div>
        </div>        
      </div>
        `;
  }
  //maradék
  htmlElement += `
    </div>

`;

  contentBox.innerHTML = htmlElement;
}

async function onClickCardButton(id) {
  console.log(id);
  //lekérjük az adatokat
  const url = `http://localhost:3000/carsWithDrivers/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  const car = data.data[0];
  let htmlElement = `
        <h5 class="card-title">${car.name}</h5>
        <img src="./images/${car.name}.jpg" class="card-img-top" alt="...">
        <ul>
            <li>${car.licenceNumber}</li>
            <li>${car.hourlyRate}</li>
            <li>${car.driverName}</li>
            <li>${car.outOfTraffic}</li>
        </ul>
    `;
  modalContent.innerHTML = htmlElement;
  modalTitle.innerHTML = "Autók adatai";
}

async function onClickNewButton() {
  state = "new";
  modalTitle.innerHTML = "Új autó bevitele";
  buttonShowHide("saveButton", true);
  const url = "http://localhost:3000/driversAbc";
  const response = await fetch(url);
  const data = await response.json();
  const drivers = data.data;

  let htmlElement = `
    <div class="col-12">
        <label for="name" class="form-label">Autó neve:</label>
        <input type="text" class="form-control" id="name">
    </div>
    
    <div class="col-6">
        <label for="licenceNumber" class="form-label">Rendszám:</label>
        <input type="text" class="form-control" id="licenceNumber">
    </div>
    <div class="col-5">
        <label for="hourlyRate" class="form-label">Tarifa (Ft/óra):</label>
        <input type="number" class="form-control" id="hourlyRate">
    </div>
    

    <div class="form-check col-6">
        <input class="form-check-input" type="checkbox" value="" id="outOfTraffic">
        <label class="form-check-label" for="outOfTraffic">
        Forgamon kívül
        </label>
    </div>

    <select class="form-select" aria-label="Default select example" id="driverId">`;
  // ciklus
  for (const driver of drivers) {
    htmlElement += `<option value="${driver.id}">${driver.driverName}</option>`;
  }

  //vége
  htmlElement += `</select>`;

  modalContent.innerHTML = htmlElement;
}

function onClickDeleteButton(id) {
  state = "delete";
  modalTitle.innerHTML = "Autó törlése";
  modalContent.innerHTML = "Valóban törölni akarod?";
  buttonShowHide("yesButton", true);
  selectedCarId = id;
}

function onClickEditButton() {
  state = "edit";
  modalTitle.innerHTML = "Autó módosítása";
  buttonShowHide("saveButton", true);
}

async function onClickSaveButton() {
  buttonShowHide("saveButton", false);
  buttonShowHide("yesButton", false);

  //olvassuk ki az űrlap adatait
  editableCar.name = document.getElementById("name").value;
  editableCar.licenceNumber = document.getElementById("licenceNumber").value;
  editableCar.hourlyRate = document.getElementById("hourlyRate").value;
  editableCar.outOfTraffic = document.getElementById("outOfTraffic").checked;
  editableCar.driverId = document.getElementById("driverId").value;
  //obj to json konverzió
  editableCar = JSON.stringify(editableCar);

  if (state === "new") {
    //Ajax kéréssel küldjünk post-ot
    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: editableCar,
    };

    const url = "http://localhost:3000/cars";
    const response = await fetch(url, config);
  } else if (state === "edit") {
  }

  //lássuk hogy bővült a táblázat
  getTable();
}

//ide építjük be törlés ajax kérést
async function onClickYesButton() {
  buttonShowHide("saveButton", false);
  buttonShowHide("yesButton", false);
  //Ajax kéréssel küldjünk post-ot
  const config = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  };

  const url = `http://localhost:3000/cars/${selectedCarId}`;
  const response = await fetch(url, config);
  //lássuk hogy tölrődött a sor
  getTable();
}

function onClickCancelButton() {
  //Eltünteti: Save, és Yes gombokat
  buttonShowHide("saveButton", false);
  buttonShowHide("yesButton", false);
}

function buttonShowHide(buttonId, ShowHide) {
  const button = document.getElementById(buttonId);
  if (ShowHide) {
    //megjelenít
    button.classList.remove("d-none");
  } else {
    //Eltüntet
    button.classList.add("d-none");
  }
}
