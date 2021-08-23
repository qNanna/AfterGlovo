import redis from '../../redis/index';
import config from '../../config/index';
import utils from '../../utils/index';
import glovoService from '../../services/glovoService';
import locationService from '../../services/locationLqService';

class OrderController {
  async oneWay(req, res) {
    res.json(this.result = 'not yet');
  }

  async estimate(req, res) {
    this.key = utils.getHash(req.body);
    let data = await redis.get(this.key);
    if (!data) {
      const locationArr = Object.entries(req.body).map(async ([key, el]) => {
        if (key === 'from' || key === 'to') {
          const locations = await locationService.getLocation(el);
          // eslint-disable-next-line no-param-reassign
          el = { lat: locations.lat, lon: locations.lon };
        }
        return [key, el];
      });
      const location = Object.fromEntries(await Promise.all(locationArr));
      const order = await glovoService.estimateOrder(location.from, location.to);
      data = glovoService.getDiscount(order);
      await redis.setEx(this.key, config.redisDataLifeTime, data);
    }
    res.json({ data });
  }
}

export default new OrderController();
