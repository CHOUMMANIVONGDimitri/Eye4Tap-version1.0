import * as React from "react";
import { useAuth } from "../../contexts/useAuth";
import api from "../../services/api";

function LoginPage() {
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputEmail = e.target.email;
    const regex1 = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const inputPassword = e.target.password;
    const regex2 =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (regex1.test(inputEmail.value) && regex2.test(inputPassword.value)) {
      const email = inputEmail.value;
      const password = inputPassword.value;
      const firstname = e.target.firstname.value;
      const lastname = e.target.lastname.value;
      const pseudo = e.target.pseudo.value;
      const picture = "no picture";
      const body = {
        firstname,
        lastname,
        email,
        password,
        pseudo,
        picture,
      };
      const sendForm = async () => {
        const resRegister = await api.apipostmysql(
          `${import.meta.env.VITE_BACKEND_URL}/register`,
          body
        );
        if (resRegister.status === 201) {
          const body2 = { email, password };
          const reslogin = await api.apipostmysql(
            `${import.meta.env.VITE_BACKEND_URL}/login`,
            body2
          );
          console.warn(reslogin);
          login({
            email,
          });
        }
      };
      sendForm();
    } else if (
      regex1.test(inputEmail.value) === !true ||
      regex2.test(inputPassword.value) === !true
    ) {
      console.warn("Erreur input");
    }
  };

  return (
    <div className="w-full h-full wrapper">
      <div className="w-full my-28 mx-auto bg-[#2F4555] max-w-sm px-12 py-10 border-4 border-[#AF28EE]  rounded-lg shadow-md  text-white">
        <div>
          <h1 className="-mt-20 mb-20 text-5xl text-white text-center font-extrabold">
            EYE4TAP
          </h1>
          <p className=" text-xl text-white text-center font-light uppercase">
            create an account
          </p>
        </div>

        <form noValidate className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="firstname"
              className="uppercase block mb-2 text-sm font-light md:text-xl text-white"
            >
              Firstname
            </label>
            <input
              required
              name="firstname"
              label="Firstname"
              type="text"
              id="firstname"
              autoComplete="current-firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="uppercase block mb-2 text-sm font-light md:text-xl text-white"
            >
              Lastname
            </label>
            <input
              required
              name="lastname"
              label="Lastname"
              type="text"
              id="lastname"
              autoComplete="current-lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="pseudo"
              className="uppercase block mb-2 text-sm font-light md:text-xl text-white"
            >
              Pseudo
            </label>
            <input
              required
              name="pseudo"
              label="pseudo"
              type="type"
              id="pseudo"
              autoComplete="current-lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="uppercase block mb-2 text-sm font-light md:text-xl text-white"
            >
              Email
            </label>
            <input
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="uppercase block mb-2 text-sm font-light md:text-xl text-white"
            >
              Password
            </label>
            <input
              pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <span className="text-rose-500 text-md">
              Minimum 8 caracteres, une majuscule, une minuscule, un chiffre, un
              caractère spécial.
            </span>
          </div>
          <button
            type="submit"
            className="w-full text-white uppercase font-extrabold rounded-lg text-sm md:text-xl px-5 py-2.5 text-center border-2 hover:scale-125 transition ease-in duration-150"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
