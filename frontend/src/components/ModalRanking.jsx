import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import defaultPicture from "../assets/picture/default-profile-picture.png";

function ModalRanking({ children }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(import.meta.env.VITE_NAME_COOKIE))
      ?.split("=Bearer%20")[1];
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ranking`, config)
      .then((res) => setRanking(res.data))
      .catch((err) => console.error(err));
  }, [ranking]);

  return (
    <div className="fixed z-50 border-4 bg-[#2F4555] text-white h-1/2 w-full md:w-2/3 max-w-xl rounded-lg overflow-y-auto">
      {children}
      <h2 className="text-4xl font-extrabold uppercase border text-center py-5">
        ranking
      </h2>
      <ul className="overflow-scroll h-full w-full pb-10">
        {ranking.length > 0
          ? ranking.map((score) => (
              <li
                key={score.id}
                className="border-2 flex justify-between items-center py-2"
              >
                <div className="ml-4 flex gap-4 flex-row justify-center items-center">
                  <img
                    src={score.picture || defaultPicture}
                    className="h-10 w-10 rounded-full"
                    alt="neutrale"
                  />
                  <p className="text-[#993599] font-extrabold text-xl">
                    {score.pseudo}
                  </p>
                </div>
                <p className="font-extrabold mr-4 w-1/3">{score.value_score}</p>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default ModalRanking;

ModalRanking.propTypes = {
  children: PropTypes.node.isRequired,
};
