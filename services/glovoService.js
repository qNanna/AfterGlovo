import chalk from 'chalk';
import fetch from 'node-fetch';

import config from '../config/index';

const routes = {
  estimate: `${config.glovoAPIDomain}b2b/orders/estimate`,
  oneWay: `${config.glovoAPIDomain}b2b/orders`,
};

class GlovoService {
  async estimateOrder({ from, to }) {
    try {
      const data = this.buildData(from, to);
      this.request = await fetch(routes.estimate, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.glovoAPIKey,
        },
      });
    } catch (err) {
      console.error(chalk.red(err));
    }
    return this.request.json();
  }

  getDiscount(data) {
    this.data = data;
    this.discount = data.total.amount - (data.total.amount / 100) * config.discount;
    this.data.total.amount = this.discount;
    return this.data;
  }

  buildData(from, to, description = 'A 30cm by 30cm box', label = 'Empty') {
    try {
      this.obj = {
        scheduleTime: null,
        description,
        addresses: [
          {
            type: 'PICKUP', lat: from.lat, lon: from.lon, label,
          },
          {
            type: 'DELIVERY', lat: to.lat, lon: to.lon, label,
          },
        ],
      };
      return this.obj;
    } catch (err) {
      console.error(chalk.red(err));
      return null;
    }
  }
}

export default new GlovoService();
