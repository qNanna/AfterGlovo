import chalk from 'chalk';

import redis from '../../redis/index';
import config from '../../config/index';
import utils from '../../utils/index';
import glovoService from '../../services/glovoService';
import locationService from '../../services/locationService';

class OrderController {
  async estimate(req, res, next) {
    try {
      const key = utils.getHash(req.body);
      let data = await redis.get(key);

      if (!data) {
        const { from, to } = req.body;
        const [locationFrom, locationTo] = [
          await locationService.transferLocation(from),
          await locationService.transferLocation(to),
        ];
        const order = await glovoService.estimateOrder({ locationFrom, locationTo });

        if (order && !order.error) {
          data = await glovoService.getDiscount(order);
          await redis.setEx(key, config.redisDataLifeTime, data);
        } else {
          data = order;
        }
      }
      res.json({ data });
    } catch (err) {
      console.error(chalk.red(err));
      next(err);
    }
  }
}

export default new OrderController();
