By default, **npm install** will install all modules listed as dependencies in package.json.

Operation | Method | Url
------------ | ------------ | -------------
One way order | POST | 127.0.0.1:3051/api/v1/orders/oneWayOrder
Estimate order | POST | 127.0.0.1:3051/api/v1/orders/estimateOrder
Get Dependencies | GET | 127.0.0.1:3051/api/dependencies/getDependencies

### Data to send for estimate order:
```
{
   from: “Vatslava Havela Boulevard 6, Kiev, Kyiv city”,
   to: ”Velyka Vasylkivska Street 22, Kiev, Kyiv city”
}
```
>[link to GlovoAPI](https://api-docs.glovoapp.com/b2b/index.html#getting-started)
>[link to LocationLQAPI](https://locationiq.com/docs)