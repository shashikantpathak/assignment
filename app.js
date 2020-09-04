const stationListUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
const stationStatusUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
const systemInformationUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/system_information.json"

const header = { header: { "Client-Identifier": "mittfirma-reiseplanlegger" } }

var result1, result2, newList, start, end, checkApiStatus
start = 0
end = 6
checkLoad = false


const stationList = () => fetch(stationListUrl, header)
    .then((response) => response.json()
        .then((result => {
            result1 = result.data.stations
            fetch(stationStatusUrl, header)
                .then(response => response.json()
                    .then((result) => {
                        result2 = result.data.stations
                        newList = result1.map((item, i) => Object.assign({}, item, result2[i]));
                        newList.slice(start, start + end).map((item) => {
                            document.querySelector(".list_station").innerHTML += `
                            <li class="items">
                                <div class="station_card">
                                    <div class="image"></div>
                                    <div class="content">
                                        <div class="name">${item.name}</div>
                                        <p class="address">${item.address}</p>
                                        <div class="bike_info">
                                        <div>Available-${item.num_bikes_available }</div>
                                        <div> Free Space-${item.num_docks_available}</div>
                                        </div>
                                    </div>
                                </div>
                            </li>`
                        })

                        checkLoad = true
                    }))
        }))).catch((err) => {
        alert("Api Failed to Load")

    })

const systemInformation = fetch(systemInformationUrl, header)
    .then(response => response.json())
    .then(result => {
        document.querySelector(".service").textContent = result.data.name
        document.querySelector(".operator").textContent = result.data.operator + "  " + result.data.phone_number
    }).catch(err => {
        alert('Api Failed to Load')
    })


document.querySelector(".load_button").addEventListener('click', function() {
    if (checkLoad) {
        start += end
        if (start < newList.length - end) {
            stationList()
        } else {
            document.querySelector(".load_button").style.display = 'None'
        }
    } else {
        document.querySelector(".load_button").style.display = 'None'
    }
})

stationList()