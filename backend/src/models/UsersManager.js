const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(users) {
    return this.connection.query(
      `insert into ${this.table}(lastname, firstname, email, password, pseudo, picture) values (?, ?, ?, ?, ?, ?);`,
      [
        users.lastname,
        users.firstname,
        users.email,
        users.hashedPassword,
        users.pseudo,
        users.picture,
      ]
    );
  }

  readForLogin(users) {
    return this.connection.query(
      `select * from ${this.table} where email = ?;`,
      [users.email]
    );
  }

  update(users) {
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ? , email = ?, password = ?, pseudo = ?, picture = ? where id = ?`,
      [
        users.firstname,
        users.lastname,
        users.email,
        users.hashedPassword,
        users.pseudo,
        users.picture,
        users.id,
      ]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = UsersManager;
