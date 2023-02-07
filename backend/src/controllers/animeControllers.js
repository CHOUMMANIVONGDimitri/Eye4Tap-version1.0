const axios = require("axios");

const browseAnime = (req, res) => {
  const options = {
    method: "GET",
    url: process.env.API_URL,
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  browseAnime,
};
