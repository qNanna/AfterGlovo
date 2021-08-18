import chalk from 'chalk'
import crypto from 'crypto'

class OrderService {
  constructor (data) {
    this.data = data
  }

  async getDiscont (data) {
    try {
      const discount = data.total.amount / 100 * 20 // 20 is pecent %
      const discountId = crypto.randomUUID()
      data.total.discount = { discount: '20%', amount: data.total.amount - discount, discountId: discountId }
      console.log(chalk.yellow('New discount:', discountId))
      return data
    } catch (err) {
      console.error(chalk.red(err))
    }
  }
}

export default new OrderService()
