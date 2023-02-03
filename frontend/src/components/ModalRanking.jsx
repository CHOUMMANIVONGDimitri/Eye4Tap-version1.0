import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

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
    <div className="fixed z-50 border-4 bg-[#2F4555] text-white h-1/2 w-1/3 rounded-lg overflow-hidden">
      {children}
      <h2 className="text-4xl font-extrabold uppercase border text-center py-5">
        ranking
      </h2>
      <ul className="overflow-scroll h-full w-full">
        {ranking.length > 0
          ? ranking.map((score) => (
              <li
                key={score.id}
                className="border-2 flex justify-around items-center py-2"
              >
                <p className="text-[#993599] font-extrabold text-xl">
                  {score.pseudo}
                </p>
                <p className="font-extrabold">{score.value_score}</p>
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
