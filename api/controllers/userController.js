import knex from '../../dataBase/index';

class UserController {
  async createUser(req, res) {
    const { Firstname, Lastname, Email } = req.query;
    this.user = await knex.find(Email, 'users');

    if (this.user.length > 0) {
      this.user = `User with email: ${Email} already exists`;
    } else {
      await knex.insertToTable({ Firstname, Lastname, Email }, 'users');
      this.user = 'Registration successful';
    }

    res.send(this.user);
  }
}

export default new UserController();
