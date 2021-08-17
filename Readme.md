
Method | Url
------------ | -------------
POST | 127.0.0.1:3051/api/v1/orders/estimateOrder

### Data to send:
```
{
  "scheduleTime": null,
  "description": "A 30cm by 30cm box",
  "addresses": [
    {
      "type": "PICKUP",
      "lat": 50.447422,
      "lon": 30.421321,
      "label": "Calle la X, 29"
    },
    {
      "type": "DELIVERY",
      "lat": 50.439747,
      "lon": 30.516735,
      "label": "Calle la X, 30"
    }
  ]
}
```
>[link to GlovoAPI](http://google.com)