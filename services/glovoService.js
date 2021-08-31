import fetch from 'node-fetch';

import config from '../config/index';

const routes = {
  estimate: `${config.glovoAPIDomain}b2b/orders/estimate`,
  oneWay: `${config.glovoAPIDomain}b2b/orders`,
};

class GlovoService {
  async estimateOrder(from, to) {
    const data = this.buildData({ from, to });
    const request = await fetch(routes.estimate, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.glovoAPIKey,
      },
    });
    return request.json();
  }

  getDiscount(value) {
    const data = value;
    const discount = value.total.amount - (value.total.amount / 100) * config.discount;
    data.total.amount = discount;
    return data;
  }

  buildData(data, description = 'A 30cm by 30cm box', label = 'Empty') {
    return {
      scheduleTime: null,
      description,
      addresses: [
        {
          type: 'PICKUP', lat: data.from.lat, lon: data.from.lon, label,
        },
        {
          type: 'DELIVERY', lat: data.to.lat, lon: data.to.lon, label,
        },
      ],
    };
  }
}

export default new GlovoService();
