import knex from '../../dataBase/index';

class UserController {
  async createUser(req, res) {
    const { Firstname, Lastname, Email } = req.query;
    this.user = await knex.find('Email', Email, 'users');

    if (!this.user) {
      this.user = 'Something wrong. Please try later.';
    } else if (!this.user.length) {
      await knex.insertToTable({ Firstname, Lastname, Email }, 'users');
      this.user = 'Registration successful';
    } else {
      this.user = `User with email: ${Email} already exists`;
    }

    res.send(this.user);
  }
}

export default new UserController();
