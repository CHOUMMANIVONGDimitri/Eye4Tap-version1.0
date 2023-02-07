const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "score" });
  }

  getAllScore() {
    return this.connection
      .query(`select score.value_score, users.pseudo, users.picture
      from ${this.table}
      join users
      on score.id_user = users.id order by score.value_score desc limit 100`);
  }

  insertScore(score, idUser) {
    return this.connection.query(
      `insert into ${this.table} (id_user, value_score) values (?, ?)`,
      [idUser, score.value_score]
    );
  }
}

module.exports = UsersManager;
