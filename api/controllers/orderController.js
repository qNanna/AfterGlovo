import chalk from 'chalk';

import glovoService from '../../services/glovoService';
import locationService from '../../services/locationService';

class OrderController {
  async estimate(req, res, next) {
    try {
      const { from, to } = req.body;
      const [locationFrom, locationTo] = [
        await locationService.transferLocation(from),
        await locationService.transferLocation(to),
      ];
      const token = req.headers.authorization;
      const order = await glovoService.estimateOrder({ locationFrom, locationTo }, token);
      res.json({ order });
    } catch (err) {
      console.error(chalk.red(err));
      next(err);
    }
  }
}

export default new OrderController();
