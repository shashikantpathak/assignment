const stationListUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
const stationStatusUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
const systemInformationUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/system_information.json"

const header = { header: { "Client-Identifier": "mittfirma-reiseplanlegger" } }


var resultJso = []
var resultJso2 = []
var i = 0
var arr3
const stationList = () => fetch(stationListUrl, header)
    .then((result) => result.json()
        .then((resultJson => {
            resultJso = resultJson.data.stations
            fetch(stationStatusUrl, header)
                .then(result2 => result2.json()
                    .then((resultJson2) => {
                        resultJso2 = resultJson2.data.stations
                        arr3 = resultJso.map((item, i) => Object.assign({}, item, resultJso2[i]));
                        console.log(arr3);
                        arr3.slice(i, i + 6).map((item) => {
                            document.querySelector(".cards").innerHTML += `
                            <li class="cards__item">
                                <div class="card">
                                    <div class="card__image card__image--fence"></div>
                                    <div class="card__content">
                                        <div class="card__title">${item.name}</div>
                                        <p class="card__text">${item.address}</p>
                                        <button class="btn btn--block">
                                        <div>Available-${item.num_bikes_available }</div>
                                        <div> Free Space-${item.num_docks_available}</div>
                                        </button>
                                    </div>
                                </div>
                            </li>
                          `

                        })

                    }))
        })))

const systemInformation = fetch(systemInformationUrl, header)
    .then(res => res.json())
    .then(resJson => {
        console.log(resJson.data)
        document.querySelector(".service").textContent = resJson.data.name
        document.querySelector(".operator").textContent = resJson.data.operator + "  " + resJson.data.phone_number


    })

document.querySelector(".load_button").addEventListener('click', function() {
    i += 6
    if (i <= arr3.length - 6) {
        stationList()
        console.log(i)
    } else {
        document.querySelector(".load_button").style.display = 'None'
    }

})

stationList()