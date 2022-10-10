import fetch from 'node-fetch';

import config from '../config/index';

class LocationService {
  async transferLocation(data) {
    const result = await fetch(`${config.locationApiUrl}/transfer?address=${data}`);
    return result.json();
  }
}

export default new LocationService();
