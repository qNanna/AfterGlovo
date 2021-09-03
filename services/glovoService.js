import fetch from 'node-fetch';

import config from '../config/index';

const routes = {
  estimate: `${config.glovoAPIDomain}/estimate`,
};

class GlovoService {
  async estimateOrder(data) {
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
}

export default new GlovoService();
