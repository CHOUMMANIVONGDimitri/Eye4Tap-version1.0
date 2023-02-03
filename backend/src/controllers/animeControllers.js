const axios = require("axios");

const browseAnime = (req, res) => {
  const options = {
    method: "GET",
    url: "https://any-anime.p.rapidapi.com/anime",
    headers: {
      "X-RapidAPI-Key": "04324e4ce8msh3aee1e303c40e63p1444d5jsn36dcd3dfd86d",
      "X-RapidAPI-Host": "any-anime.p.rapidapi.com",
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
