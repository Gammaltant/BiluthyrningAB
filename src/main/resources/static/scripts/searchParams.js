
//Funktion för att ta bort parametrar i URLen som är tomma, detta så att man kan få en korrekt
//lista med bilar man söker för.
function removeEmptyParamsFromURL(formData) {
    const urlParams = new URLSearchParams(window.location.search);
    let newParamsString = '';
//Man tar den URLen som skapas och loopar igenom alla keys. Kollar ifall varje key har en value och isåfall
//lägger till den i en ny String newParamsString.
    for (const [key, value] of urlParams.entries()) {
        if (value.trim() !== '') {
            if (newParamsString !== '') {
                newParamsString += '&';
            }
            newParamsString += `${key}=${value}`;
        }
    }

    //Sätter in den nya Stringen i URLen så man får den fri ifrån tomma parametrar.
    const newUrl = `${location.origin}/searchAllCars?${newParamsString}`;


    window.location.href = newUrl;
}

//Här kopplar man så att funktonen ovan körs när man klickar på knappen som hör till formen searchForm på
// searchCars.html. Initierar en formData som skapar ett objekt av formen och sparar alla värden man skrivit in.
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            console.log('Form submitted');
            event.preventDefault();


            const carName = document.getElementById("carName").value.trim();
            const carBrand = document.getElementById("carBrand").value.trim();
            const milage = document.getElementById("milage").value.trim();
            const automatic = document.getElementById("automatic").value.trim();
            const carSeats = document.getElementById("carSeats").value.trim();
            const carYear = document.getElementById("carYear").value.trim();
            const engineType = document.getElementById("engineType").value.trim();
            const carType = document.getElementById("carType").value.trim();
            const pricePerDay = document.getElementById("pricePerDay").value.trim();




            let newParamsString = '';
            if (carName !== '') {
                newParamsString += `carName=${carName}&`;
            }
            if (carBrand !== '') {
                newParamsString += `carBrand=${carBrand}&`;
            }
            if (milage !== '') {
                newParamsString += `milage=${milage}&`;
            }
            if (automatic !== '') {
                  newParamsString += `automatic=${automatic}&`;
            }
            if (carSeats !== '') {
                newParamsString += `carSeats=${carSeats}&`;
            }
            if (carYear !== '') {
                newParamsString += `carYear=${carYear}&`;
            }
            if (engineType !== '') {
                newParamsString += `engineType=${engineType}&`;
            }
            if (carType !== '') {
                newParamsString += `carType=${carType}&`;
            }
            if (pricePerDay !== '') {
                newParamsString += `pricePerDay=${pricePerDay}&`;
            }


            if (newParamsString.endsWith('&')) {
                newParamsString = newParamsString.slice(0, -1);
            }


            const newUrl = `${location.origin}/searchAllCars?${newParamsString}`;


            //window.location.href = newUrl;


            fetch(newUrl)
                            .then(response => response.json())
                            .then(data => {

                                const cars = data.map(carData => {
                                    return new Car(
                                        carData.licensePlate,
                                        carData.carName,
                                        carData.carBrand,
                                        carData.milage,
                                        carData.automatic,
                                        carData.carSeats,
                                        carData.carYear,
                                        carData.engineType,
                                        carData.carType,
                                        carData.pricePerDay
                                    );
                                });

                               //Just nu så visas bilarna enbart i konsolen.
                                displayCars(cars);
                            })
                            .catch(error => {
                                console.error('Error fetching data:', error);
                            });


        });
    }
});





function displayCars(cars) {
    const container = document.getElementById('carListContainer');
    container.innerHTML = ''; // Clear the container

    if (cars.size == 0) {
        const emptyText = document.createElement('p');
        emptyText.textContent = 'Found Nothing Matching The Criteria';
        container.appendChild(emptyText);
    } else {
        cars.forEach(car => {
            const productContainer = document.createElement("div");
            container.appendChild(productContainer);
            productContainer.setAttribute("class", "productcontainer");

            // Add event listeners to handle hover events
            productContainer.addEventListener("mouseenter", () => {
                this.showFullInfo(car, productContainer);
            });
            productContainer.addEventListener("mouseleave", () => {
                hideFullInfo(infoPanel);
            });

            // Your existing code to create car elements goes here...
            const productPictureContainer = document.createElement("div");
            productPictureContainer.setAttribute("class", "imgcontainer");
            productContainer.appendChild(productPictureContainer);

            //Picture
            const productPicture = document.createElement("img");
            productPicture.setAttribute("class", "carimg");
            productPicture.setAttribute("src", "images/car" + car.licensePlate + ".png");
            productPictureContainer.appendChild(productPicture);

            // Create the description panel for each car
            const infoPanel = document.createElement("div");
            infoPanel.setAttribute("class", "info-panel");
            productContainer.appendChild(infoPanel);
        });
    }
}

function showFullInfo(car, productContainer) {
    const infoPanel = productContainer.querySelector(".info-panel");
    // Display the info panel
    infoPanel.innerHTML = `
        <p>Märke: ${car.getCarBrand()}</p>
        <p>Pris: ${car.getPricePerDay()} kr/Dag</p>
        <p>RegNr: ${car.licensePlate}</p>
        <p>Modell: ${car.getCarName()}</p>
        <p>Miltal: ${car.getMilage()}</p>
        <p>Växellåda: ${car.getAutomatic()}</p>
        <p>Säten: ${car.getCarSeats()}</p>
        <p>Modell År: ${car.getCarYear()}</p>
    `;
    infoPanel.style.display = "block";
    infoPanel.style.top = productContainer.offsetHeight + "px"; // Position info panel underneath product container
}





function hideFullInfo(infoPanel) {
    // Hide the info panel
    infoPanel.style.display = "none";
}



