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
      const { from, to } = req.body;
      const locationFrom = await locationService.getLocation(from);
      const locationTo = await locationService.getLocation(to);
      const order = await glovoService.estimateOrder(locationFrom, locationTo);

      if (order && !order.error) {
        data = await glovoService.getDiscount(order);
        await redis.setEx(this.key, config.redisDataLifeTime, data);
      } else {
        data = order;
      }
    }
    res.json({ data });
  }
}

export default new OrderController();
