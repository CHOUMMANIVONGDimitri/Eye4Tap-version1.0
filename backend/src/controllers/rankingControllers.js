const models = require("../models");

const browseRank = (req, res) => {
  models.score
    .getAllScore()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addRank = (req, res) => {
  const idUser = req.params.id;
  const valueScore = req.body;
  // TODO validations (length, format...)
  models.score
    .insertScore(valueScore, idUser)
    .then(([result]) => {
      res.location(`/ranking/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browseRank,
  addRank,
};
