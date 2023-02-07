/* eslint-disable import/no-unresolved */
import { React, useState } from "react";
import { Link } from "react-router-dom";
import ButtonInterface from "@components/ButtonInterFace";
import api from "../../services/api";
import { useAuth } from "../../contexts/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [errorConnect, setErrorConnect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputemail = e.target.email;
    const regex1 = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const inputpassword = e.target.password;
    const regex2 =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex1.test(inputemail.value)) {
      if (regex2.test(inputpassword.value)) {
        const email = inputemail.value;
        const password = inputpassword.value;
        const body = { email, password };
        const sendForm = async () => {
          const response = await api.apipostmysql(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            body
          );
          if (response.status === 200) {
            const logInfo = await response.json();
            login({
              email,
              picture: logInfo.picture,
              pseudo: logInfo.pseudo,
              id: logInfo.id,
            });
          } else {
            setErrorConnect(true);
          }
        };
        sendForm();
      }
    }
  };

  // useEffect(() => {}, [setErrotConnect]);

  return errorConnect ? (
    <>
      <div className="bg-[#2F4555] h-screen" />
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 p-4 h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center items-center backdrop-blur"
      >
        <div className="w-full max-w-md md:h-auto">
          <div className="animate-goDown relative bg-[#2F4555] rounded-lg shadow border-4">
            <div className="p-12 text-center flex flex-col gap-8 items-center">
              <h3 className="mb-5 text-4xl font-extrabold text-white uppercase">
                Error Connexion
              </h3>
              <ButtonInterface
                name="Fermer"
                method={() => setErrorConnect(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="wrapper w-full h-full bg-[#2F4555]">
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="max-w-sm p-4 bg-[#2F4555] border-4 border-[#AF28EE] rounded-lg shadow-md sm:p-6 md:p-10">
          <div className="">
            <h1 className="-mt-20 mb-20 text-5xl text-white text-center font-extrabold">
              EYE4TAP
            </h1>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="uppercase block mb-2 text-sm font-extrabold md:text-3xl font-medium text-white"
              >
                Your email
              </label>
              <input
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                placeholder="Email"
                required
                id="email"
                name="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="uppercase block mb-2 text-sm font-extrabold md:text-3xl font-medium text-white"
              >
                Your password
              </label>
              <input
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                placeholder="Password"
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
              <span className="text-rose-500 text-md">
                Minimum 8 caracteres, une majuscule, une minuscule, un chiffre,
                un caractère spécial.
              </span>
            </div>
            <button
              type="submit"
              className="w-full text-white uppercase font-extrabold rounded-lg text-sm md:text-xl px-5 py-2.5 text-center border-2 hover:scale-125 transition ease-in duration-150"
            >
              LogIn
            </button>
            <div className="text-sm md:text-md font-medium text-gray-500">
              Not registered?{" "}
              <span href="#" className="text-blue-500 hover:underline">
                {" "}
                <Link to="/register">Don't have an account yet? Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
