import redis from '../../redis/index';
import config from '../../config/index';
import utils from '../../utils/index';
import glovoService from '../../services/glovoService';
import locationService from '../../services/locationLqService';

class OrderController {
  async oneWay(req, res) {
    res.json(this.message = 'not yet');
  }

  async estimate(req, res) {
    this.key = utils.getHash(req.body);
    let data = await redis.get(this.key);

    if (!data) {
      const locationArr = Object.entries(req.body).map(async ([key, el]) => {
        if (key === 'from' || key === 'to') {
          const location = await locationService.getLocation(el);
          if (!location) return {};
          el = { lat: location.lat, lon: location.lon };
        }
        return [key, el];
      });

      const locations = Object.fromEntries(await Promise.all(locationArr));
      const order = await glovoService.estimateOrder(locations);
      if (order && !order.error) {
        data = await glovoService.getDiscount(order);
        await redis.setEx(this.key, config.redisDataLifeTime, data);
      } else data = order;
    }
    res.json({ data });
  }
}

export default new OrderController();
