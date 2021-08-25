import utils from '../../utils/index';

class ServiceController {
  getDependencies(req, res) {
    if (!this.dependencies) this.dependencies = utils.readFile('./package.json');
    res.send(Object.keys(this.dependencies));
  }

  getUptime(req, res) {
    this.healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: new Date().toLocaleString(),
    };

    try {
      res.send(this.healthcheck);
    } catch (e) {
      this.healthcheck.message = e;
      res.status(503).send();
    }
  }
}

export default new ServiceController();
