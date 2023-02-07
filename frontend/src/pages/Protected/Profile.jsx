/* eslint-disable import/no-unresolved */
import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonInterface from "@components/ButtonInterFace";
import api from "../../services/api";
import { useAuth } from "../../contexts/useAuth";
import Spinner from "../../components/Spinner";
import defaultPicture from "../../assets/picture/default-profile-picture.png";

function ProfilUser() {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState("");
  const [userPicture, setUserPicture] = useState("no picture");
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      const getUser = await api.apigetmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`
      );
      setData(getUser);
      setUserEmail(getUser.email);
      setUserFirstName(getUser.firstname);
      setUserLastName(getUser.lastname);
      setUserPicture(getUser.picture);
      setIsLoaded(true);
    };
    getUserData(); // lance la fonction getUserData
  }, [isLoaded]);

  const getAnimeImg = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith(import.meta.env.VITE_NAME_COOKIE))
      ?.split("=Bearer%20")[1];
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/anime`, config)
      .then((res) => {
        setUserPicture(res.data.stuff[0].image);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
      password: userPassword,
      pseudo: user.pseudo,
      picture: userPicture,
    };

    const updateUserData = async () => {
      const updateUser = await api.apiputmysql(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`,
        body
      );
      if (updateUser.status === 204) {
        setIsSubmit(true);
        setIsLoaded(false);
      }
    };
    updateUserData();
    setShowInput(!showInput);
  };

  return isLoaded ? (
    <div className="wrapper">
      {isSubmit && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 p-4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center backdrop-blur"
        >
          <div className="w-full max-w-md md:h-auto">
            <div className="relative bg-[#2F4555] rounded-lg shadow">
              <div className="p-6 text-center">
                <h3 className="mb-5 text-lg font-normal text-white">
                  Update Completed!
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-calypso hover:bg-calypsoLight font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => {
                    navigate("/user/profile", { replace: true });
                  }}
                >
                  Comeback to profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-screen border-5 flex justify-center items-center">
        <div className="max-w-7xl py-6 px-4 sm:p-6 lg:pb-8 bg-[#2F4555] border-4 border-[#AF28EE]  shadow sm:rounded-lg ">
          <h2 className="-mt-20 mb-20 text-5xl text-white text-center font-extrabold uppercase">
            Profile
          </h2>
          <div className="h-fit w-fit flex items-end">
            {showInput ? (
              <img
                className={
                  userPicture !== "no picture"
                    ? "rounded-full border-4 h-[200px] w-[200px]"
                    : "text-transparent  rounded-full border-4 h-[200px] w-[200px]"
                }
                src={
                  userPicture !== "no picture" ? userPicture : defaultPicture
                }
                alt="Anime API"
              />
            ) : (
              <img
                className={
                  data.picture !== "no picture"
                    ? "rounded-full border-4 h-[200px] w-[200px]"
                    : "text-transparent rounded-full border-4 h-[200px] w-[200px]"
                }
                src={
                  data.picture !== "no picture" ? data.picture : defaultPicture
                }
                alt="Anime API"
              />
            )}
            {showInput ? (
              <div className="-ml-32">
                <ButtonInterface
                  name="change image"
                  method={() => setUserPicture(getAnimeImg())}
                />
              </div>
            ) : null}
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6 grow pl-10">
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="first-name"
                className="uppercase block mb-2 text-sm font-extrabold md:text-xl font-light text-white"
              >
                Firstname
              </label>
              {showInput ? (
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  defaultValue={userFirstName}
                  onChange={(event) => setUserFirstName(event.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              ) : (
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                  {data.firstname}
                </div>
              )}
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="last-name"
                className="uppercase block mb-2 text-sm font-extrabold md:text-xl font-light text-white"
              >
                Lastname
              </label>
              {showInput ? (
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  defaultValue={userLastName}
                  onChange={(event) => setUserLastName(event.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              ) : (
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                  {data.lastname}
                </div>
              )}
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="email"
                className="uppercase block mb-2 text-sm font-extrabold md:text-xl font-light text-white"
              >
                Email
              </label>
              {showInput ? (
                <input
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              ) : (
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                  {data.email}
                </div>
              )}
            </div>
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="password"
                className="uppercase block mb-2 text-sm font-extrabold md:text-xl font-light text-white"
              >
                Password
              </label>
              {showInput ? (
                <input
                  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                  type="password"
                  id="passwword"
                  name="password"
                  defaultValue={userPassword}
                  onChange={(event) => setUserPassword(event.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
              ) : (
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-200">
                  ●●●●●●●●
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center">
          {showInput && (
            <ButtonInterface name="Confirm" method={handleSubmit} />
          )}

          <ButtonInterface
            name={showInput ? "Come Back Into Profile" : "Edit Profile"}
            method={() => setShowInput(!showInput)}
          />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
export default ProfilUser;
