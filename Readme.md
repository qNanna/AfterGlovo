By default, **npm install** will install all modules listed as dependencies in package.json.

Operation | Method | Url
------------ | ------------ | -------------
One way order | POST | 127.0.0.1:3051/api/v1/orders/oneWayOrder
Estimate order | POST | 127.0.0.1:3051/api/v1/orders/estimateOrder

### Data to send for estimate order:
```
{
  "scheduleTime": null,
  "description": "A 30cm by 30cm box",
  "addresses": [
    {
      "type": "PICKUP",
      "lat": 1,
      "lon": 1,
      "label": "Calle la X, 29"
    },
    {
      "type": "DELIVERY",
      "lat": 1,
      "lon": 1,
      "label": "Calle la X, 30"
    }
  ],
  "address": {
    "from": "Vatslava Havela Boulevard 6, Kiev, Kyiv city",
    "to": "Velyka Vasylkivska Street 22, Kiev, Kyiv city"
  }
}
```
>[link to GlovoAPI](https://api-docs.glovoapp.com/b2b/index.html#getting-started)