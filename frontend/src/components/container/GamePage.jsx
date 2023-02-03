/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ButtonInterface from "@components/ButtonInterFace";
import ModalRanking from "@components/ModalRanking";

import { useAuth } from "../../contexts/useAuth";

function Eye4Tap({
  title,
  handleKeySpace,
  setPressSpace,
  setStartGame,
  switchButton,
  pauseEye,
  resumeEye,
  selectArea,
  score,
  children,
}) {
  const [timerCount, setTimerCount] = useState(3);
  const [displayGame, setDisplayGame] = useState(false);

  useEffect(() => {
    if (timerCount === -3) {
      return setDisplayGame(true);
    }
    const timerId = setInterval(() => {
      setTimerCount(timerCount - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timerCount]);

  return (
    <div>
      {displayGame ? (
        <div
          id="area"
          role="button"
          tabIndex={0}
          onKeyDown={handleKeySpace}
          onKeyUp={() => setPressSpace(false)}
          className="focus:outline-none focus:ringfocus:ring-violet-500 fixed top-0 bottom-12 left-0 right-0 flex flex-wrap z-20 bg-[#2F4555] "
        >
          <div className="fixed top-4 text-center text-white text-4xl w-fit font-extrabold w-full">
            <div className="border-4 rounded-lg w-fit flex items-center justify-center p-2 mx-auto gap-4">
              <span className="font-light">Time</span>

              {children}
            </div>
          </div>
          <div className="animate-goUp z-50 fixed bottom-0 border-t-4 bg-[#2f4555] flex flex-row justify-center h-24 w-screen">
            {/* left menu */}
            <div>
              <ButtonInterface
                name="Quit"
                method={() => {
                  setStartGame(false);
                  pauseEye();
                }}
              />
            </div>
            {/* title glitch */}
            <div className="mb-20">
              <div className="wrapper">
                <h1 className="glitch">{title}</h1>
              </div>
            </div>
            {/* right menu */}
            <div>
              {switchButton ? (
                <ButtonInterface name="Resume" method={resumeEye} />
              ) : (
                <ButtonInterface name="Pause" method={pauseEye} />
              )}
            </div>
          </div>

          {/* selected area */}

          {selectArea + 1 === 1 ? (
            <div className="border-4 border-[#2F4555] rounded-xl w-1/2 h-1/2 text-center align-middle bg-[#742599] transition ease-in-out duration-300" />
          ) : (
            <div className="border-4 border-[#2F4555] w-1/2 h-1/2 text-center align-middle" />
          )}
          {selectArea + 1 === 2 ? (
            <div className="border-4 border-[#2F4555] rounded-xl w-1/2 h-1/2 text-center align-middle bg-[#742599] transition" />
          ) : (
            <div className="border-4 border-[#2F4555] w-1/2 h-1/2 text-center align-middle" />
          )}
          {selectArea + 1 === 3 ? (
            <div className="border-4 border-[#2F4555] rounded-xl w-1/2 h-1/2 text-center align-middle bg-[#742599] transition" />
          ) : (
            <div className="border-4 border-[#2F4555] w-1/2 h-1/2 text-center align-middle" />
          )}
          {selectArea + 1 === 4 ? (
            <div className="border-4 border-[#2F4555] rounded-xl w-1/2 h-1/2 text-center align-middle bg-[#742599] transition" />
          ) : (
            <div className="border-4 border-[#2F4555] w-1/2 h-1/2 text-center align-middle" />
          )}

          {/* Score & Actual area */}
          <div className="fixed w-full h-full flex justify-center items-center flex-col">
            <div className="text-center font-light text-white absolute z-50 top-[30vh] border-2 bg-[#AF28EE] py-2 px-4 rounded-lg w-24 h-24 rotate-45 flex justify-center items-center">
              <p className="-rotate-45">
                <span className="animate-pulse"> Score </span> <br />{" "}
                <span className="animate-pulse text-2xl font-bold">
                  {score}
                </span>
              </p>
            </div>
            <div className=" h-fit w-fit transform bg-[#2F4555] py-4 px-7 border-2 rotate-45 rounded-lg">
              {" "}
              <p className="animate-scaleUp text-white font-bold text-5xl">
                {selectArea + 1}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="focus:outline-none focus:ringfocus:ring-violet-500 fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center z-50 bg-[#2F4555] active:bg-[#1d2830]">
          <h2 className="animate-goRight text-5xl font-extrabold text-white uppercase">
            Get Ready
          </h2>
          <div className="mt-4 border-4 rounded-full h-[200px] w-[200px] text-center flex justify-center items-center">
            <p className="text-5xl font-extrabold text-white animate-ping">
              {timerCount >= 0 ? timerCount : "0"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

Eye4Tap.propTypes = {
  title: PropTypes.string.isRequired,
  handleKeySpace: PropTypes.func.isRequired,
  setPressSpace: PropTypes.func.isRequired,
  setStartGame: PropTypes.func.isRequired,
  switchButton: PropTypes.bool.isRequired,
  pauseEye: PropTypes.func.isRequired,
  resumeEye: PropTypes.func.isRequired,
  selectArea: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

function GamePage({ title }) {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [pressSpace, setPressSpace] = useState(false);
  const [switchButton, setSwitchButton] = useState(false);
  const [activateCam, setActivateCam] = useState(false);
  const [showModalRank, setShowModalRank] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [score, setScore] = useState(0);
  // add +6 s for the timeCount
  const [chrono, setChrono] = useState(36);
  const [selectArea, setSelectArea] = useState(null);
  // const [condition]
  const webGazer = window.webgazer;

  const { user } = useAuth();

  function sendDateScore(userId, valueScore) {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(import.meta.env.VITE_NAME_COOKIE))
      ?.split("=Bearer%20")[1];
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = {
      value_score: valueScore,
    };
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/ranking/${userId}`,
        data,
        config
      )
      .then((res) => console.warn(res))
      .catch((err) => console.error(err));
  }

  const setupEye = () => {
    webGazer
      .setGazeListener((data) => {
        if (data == null) {
          return;
        }
        setPositionX(data.x);
        setPositionY(data.y);
      })
      .showVideoPreview(true)
      .begin();
  };

  const pauseEye = () => {
    webGazer.pause();
    setSwitchButton(true);
  };

  const resumeEye = () => {
    webGazer.resume();
    setSwitchButton(false);
  };

  const endEye = () => {
    webGazer.showVideoPreview(false).end();
  };

  const handleKeySpace = (event) => {
    if (event.code === "Space") {
      setPressSpace(true);
    }
  };

  function checkEyePosition(div, x, y, size, press, callBack, value) {
    if (div !== null && press) {
      if (x > size.x1 && x < size.x2 && y > size.y1 && y < size.y2) {
        callBack(value + 1);
      } else if (value > 0) {
        callBack(value - 1);
      } else {
        callBack(value - 0);
      }
    }
  }

  useEffect(() => {
    const areaSurface = document.getElementById("area");

    let widthTotal = 0;
    let heightTotal = 0;

    if (areaSurface !== null) {
      widthTotal = areaSurface.clientWidth;
      heightTotal = areaSurface.clientHeight;
    }

    const areaData = [
      {
        x1: 0, //
        x2: widthTotal / 2,
        y1: 0,
        y2: heightTotal / 2,
      },
      {
        x1: widthTotal / 2,
        x2: widthTotal,
        y1: 0,
        y2: heightTotal / 2,
      },
      {
        x1: 0,
        x2: widthTotal / 2,
        y1: heightTotal / 2,
        y2: heightTotal,
      },
      {
        x1: widthTotal / 2,
        x2: widthTotal,
        y1: heightTotal / 2,
        y2: heightTotal,
      },
    ];

    checkEyePosition(
      areaSurface,
      positionX,
      positionY,
      areaData[selectArea],
      pressSpace,
      setScore,
      score
    );
  }, [pressSpace]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSelectArea(Math.floor(Math.random() * 4));
    }, 1500);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const chronoId = setInterval(() => {
      if (startGame) {
        setChrono(chrono - 1);
      }
    }, 1000);

    if (chrono <= 0) {
      sendDateScore(user.id, score);
      setStartGame(false);
      setChrono(30);
      pauseEye();
      setScore(0);
    }

    return () => clearInterval(chronoId);
  }, [chrono, startGame]);

  return startGame ? (
    <Eye4Tap
      title={title}
      handleKeySpace={handleKeySpace}
      setPressSpace={setPressSpace}
      setStartGame={setStartGame}
      switchButton={switchButton}
      pauseEye={pauseEye}
      resumeEye={resumeEye}
      selectArea={selectArea}
      score={score}
    >
      <p className={chrono <= 10 ? "animate-ping text-rose-500" : ""}>
        {chrono}
      </p>
    </Eye4Tap>
  ) : (
    <div className="z-0 fixed top-12 bottom-0 left-0 right-0 bg-[#2F4555] flex justify-center items-center">
      {showModalRank && (
        <ModalRanking>
          <>
            <div className="animate-ping border-4 rounded-lg absolute right-0.5 -top-1.5 h-16 w-16 rotate-45" />
            <button
              type="button"
              className="absolute right-4 top-4 font-medium text-xl hover:scale-125 ease-in duration-300 transition"
              onClick={() => {
                setShowModalRank(!showModalRank);
              }}
            >
              Close
            </button>
          </>
        </ModalRanking>
      )}
      <div className="wrapper flex flex-col lg:flex-row gap-10 lg:gap-2">
        {showInstruction && (
          <div className="z-50 fixed left-2 top-20 right-2 bottom-2 border-4 rounded-lg">
            <button
              type="button"
              onClick={() => {}}
              className="absolute text-7xl top-[25vh] left-10 text-blue-500"
            >
              +
            </button>
            <button
              type="button"
              className="absolute text-7xl top-5 right-10 text-blue-500"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="absolute text-7xl bottom-5 left-10 text-blue-500"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="absolute text-7xl bottom-5 right-10 text-blue-500"
            >
              +
            </button>
            <div className="fixed top-[15vh] left-[50vw]">
              <ButtonInterface
                name="End Calibrate"
                method={() => {
                  setShowInstruction(false);
                }}
              />
            </div>
            <p className="wrapper text-white font-light text-lg p-10">
              <ol className="bg-[#2F4555] md:w-1/3 animate-slideMenu border-4 absolute right-2 md:right-10 px-4 py-12 rounded-xl flex flex-col gap-2 text-xl">
                <h2>Instructions :</h2>
                <li>1/ Attentez que la caméra s'affiche</li>
                <li>2/ Attendez que le pointeur rouge s'affiche</li>
                <li>
                  3/ Positionnez votre visage au center du carré dans
                  l'affichage de la caméra (elle deviendra vert lorsque votre
                  visage est détecter)
                </li>
                <li>
                  4/ Calibez votre pointer en cliquant frénétiquement sur les
                  croix bleu et en vous focalisant sur le curseur (Attention! Ne
                  bougez pas votre visage lors du calibrage, seuls vos yeux
                  doivent bouger)
                </li>
                <li>
                  5/ Une fois que votre calibrage vous convient, appuyez sur End
                  Calibrate pour valider vos paramètres
                </li>
                <p>
                  Attention! Gardez votre visage dans la même configuration lors
                  vous démarrerez le jeu
                </p>
              </ol>
            </p>
          </div>
        )}
        {!activateCam && <h1 className="glitch">{title}</h1>}
        <p className="fixed bottom-10 text-white font-light text-xl">
          Activate the{" "}
          <span className="text-[#903599] font-bold uppercase">
            eye tracking
          </span>{" "}
          and Click on the{" "}
          <span className="text-[#903599] font-bold uppercase">start</span>{" "}
          button
        </p>
        {activateCam && (
          <ButtonInterface
            name="Start Game"
            method={() => {
              setStartGame(true);
              resumeEye();
            }}
          />
        )}
        {!activateCam ? (
          <ButtonInterface
            name="Activate Eye Tracking"
            method={() => {
              setupEye();
              setActivateCam(true);
              setShowInstruction(true);
            }}
          />
        ) : (
          <ButtonInterface
            name="Desactivate Eye Tracking"
            method={() => {
              endEye();
              setActivateCam(false);
              window.location.reload();
            }}
          />
        )}
        <ButtonInterface
          name="Ranking"
          method={() => {
            setShowModalRank(!showModalRank);
          }}
        />
      </div>
    </div>
  );
}
export default GamePage;

GamePage.propTypes = {
  title: PropTypes.string.isRequired,
};
