import utils from '../../utils/index';

class ServiceController {
  async getDevDependencies(req, res) {
    if (!this.proj) this.proj = await utils.readFile('./package.json');
    res.send(Object.keys(this.proj.dependencies));
  }
}

export default new ServiceController();
