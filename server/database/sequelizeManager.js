export default class Database {
  constructor() {}

  init() {
    const db = require('../../sequelize/models');

    db.sequelize.sync({ force: false });
  }
}
