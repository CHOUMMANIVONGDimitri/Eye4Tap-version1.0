const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  getAllScore() {
    return this.connection.query(`select score.value_score, users.pseudo
      from ${this.table}
      join users
      on score.id_user = users.id order by score.value_score desc`);
  }

  insertScore(score, idUser) {
    return this.connection.query(
      `insert into ${this.table} (id_user, value_score) values (?, ?)`,
      [idUser, score.value_score]
    );
  }
}

module.exports = UsersManager;
