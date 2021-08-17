import chalk from 'chalk'
import uniqid from 'uniqid'

class OrderService {
  constructor (data) {
    this.data = data
  }

  async getDiscont (data) {
    try {
      const discount = data.total.amount / 100 * 20 // 20 is pecent %
      data.total.discount = { discount: '20%', amount: discount, discountId: uniqid() }
      return data
    } catch (err) {
      console.error(chalk.red(err))
    }
  }
}

export default new OrderService()
