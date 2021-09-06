import fetch from 'node-fetch';

import config from '../config/index';

const routes = {
  estimate: `${config.glovoAPIDomain}/api/v1/orders/estimate`,
};

class GlovoService {
  async estimateOrder(data, token) {
    const request = await fetch(routes.estimate, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    return request.json();
  }
}

export default new GlovoService();
