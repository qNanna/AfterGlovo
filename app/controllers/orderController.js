const fetch = require('node-fetch')

class Order {
    async oneWayOrder(data) {
        try {
            let request = await fetch('https://api.glovoapp.com/b2b/orders', {
                method: 'POST', 
                body: JSON.stringify(data), 
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': ' Basic MTU5NDAyMTA1MDk2MzcyOjdjNDk3NWYyMDQ2OTQ1OWFiMDQ0ZGNmOTE0ZGFkMmE0'
                }
            })
            return (await request).json()
        }
        catch(err) {
            throw err
        }      
    }
}

module.exports = new Order()

//-------------------------------------------------

// let data = {
//     "scheduleTime": null,
//     "description": "A 30cm by 30cm box",
//     "reference": {
//       "id": "your internal reference"
//     },
//     "addresses": [
//       {
//         "type": "PICKUP",
//         "lat": 50.447422,
//         "lon": 30.421321, // from: “Vatslava Havela Boulevard 6, Kiev, Kyiv city”
//         "label": "Calle la X, 29",
//         "details": "2nd Floor",
//         "contactPhone": "+34622334455",
//         "contactPerson": "Sam Romero",
//         "instructions": "Use the stairs to access this address"
//       },
//       {
//         "type": "DELIVERY",
//         "lat": 50.439747,
//         "lon": 30.516735, // to: ”Velyka Vasylkivska Street 22, Kiev, Kyiv city”
//         "label": "Calle la X, 30",
//         "details": "Blue button of the intercom",
//         "contactPhone": "+34622334455",
//         "contactPerson": "Alex Smith",
//         "instructions": "If recipient is unavailable leave next door"
//       }
//     ]
//   }