const contentBox = document.getElementById("contentBox")
const modalContent = document.getElementById("modalContent")
const modalTitle = document.getElementById("modalTitle")



function getHome(){
    let htmlElement = `
    <h1>Home</h1>
    <p>Ez egy főoldal</p>
    `

    contentBox.innerHTML = htmlElement;
}

function getAbout(){
    let htmlElement = `
    <h1>About</h1>
    <p>Ez egy about</p>
    `
    contentBox.innerHTML = htmlElement;
}

function getContact(){
    let htmlElement = `
    <h1>Contact</h1>
    <p>Ez egy contact</p>
    `

    contentBox.innerHTML = htmlElement;
}

async function getTable(){
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
                        >
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                    <button type="button" class="btn btn-outline-warning btn-sm"
                        data-bs-toggle="modal" data-bs-target="#modalCard"
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
        `
    }
    //maradék
    htmlElement +=`
    </tbody>
    </table>
`
    contentBox.innerHTML = htmlElement;
}

async function getCards(){
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
    `
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
        `
    }
    //maradék
    htmlElement +=`
    </div>

`

    contentBox.innerHTML = htmlElement;

}

async function onClickCardButton(id){
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
    `
    modalContent.innerHTML=htmlElement;
    modalTitle.innerHTML="Autók adatai"
}
