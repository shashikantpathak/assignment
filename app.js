const stationListUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
const stationStatusUrl = "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"

const header = { header: { "Client-Identifier": "mittfirma-reiseplanlegger" } }


var list = []
var availableCycle = []
var resultJso = []
var resultJso2 = []
const stationList = fetch(stationListUrl, header).
then((result) => {
    return result.json();
}).then((resultJson => {
    resultJso = resultJson.data.stations
        // list=resultJso.map((item)=>item.name)
    fetch(stationStatusUrl, header)
        .then((result2) => {
            return result2.json()
        }).then((resultJson2) => {
            resultJso2 = resultJson2.data.stations
            resultJso.slice(0, 5).map((item) => {
                document.querySelector(".stationsList").innerHTML += `<div>
                    <em>${item.name} </em>
                    </div>`
            })
            resultJso2.slice(0, 5).map((item) => {
                document.querySelector(".stationsList").innerHTML += `<div class="stationList" >
                    <em>${item.num_bikes_available} </em>
                    </div>`
            })

        })
}))


// resultJso2.filter(o => resultJso.find((o2) => {
//     if (o.station_id === o2.station_id) {
//         // console.log(o.station_id, o2.station_id)
//         document.querySelector("#stationsList").innerHTML += `<div>
//         <em>${name} </em>
//         <em>${item.address} </em>
//         </div>`
//     }
// }))