const stationListUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
const stationStatusUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"

const header = { header: { "Client-Identifier": "mittfirma-reiseplanlegger" } }


var resultJso = []
var resultJso2 = []
const stationList = fetch(stationListUrl, header)
    .then((result) => result.json()
        .then((resultJson => {
            resultJso = resultJson.data.stations
            fetch(stationStatusUrl, header)
                .then(result2 => result2.json()
                    .then((resultJson2) => {
                        resultJso2 = resultJson2.data.stations
                        let arr3 = resultJso.map((item, i) => Object.assign({}, item, resultJso2[i]));
                        console.log(arr3);
                        arr3.slice(0, 5).map((item) => {
                            document.querySelector(".stationsList").innerHTML += `<div>
                        <small>${item.name} </small>
                        <small>${item.address} </small>
                        <small>${item.num_bikes_available} </small>
                         <small>${item.num_docks_available} </small>
                        </div>`
                        })

                    }))
        })))