function FooterBar() {
  return (
    <footer className="p-4 rounded-lg shadow md:px-6 md:py-8 border-t-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center mb-6 text-md md:text-xl font-light text-white sm:mb-0 ">
          <li>
            <a
              href="https://github.com/CHOUMMANIVONGDimitri/Eye4Tap-version1.0"
              className="mr-4 hover:underline hover:text-[#AF28EE] md:mr-6"
              target="_blank"
              rel="noreferrer"
            >
              Github EYE4TAP
            </a>
          </li>
          <li>
            <a
              href="https://webgazer.cs.brown.edu/"
              className="mr-4 hover:underline hover:text-[#AF28EE] md:mr-6 "
              target="_blank"
              rel="noreferrer"
            >
              WebGazerAPI
            </a>
          </li>
          <li>
            <a
              href="https://rapidapi.com/Kurizu/api/any-anime"
              className="mr-4 hover:underline hover:text-[#AF28EE] md:mr-6 "
              target="_blank"
              rel="noreferrer"
            >
              Any Anime API
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Bouman/react-repo-base"
              className="hover:underline hover:text-[#AF28EE]"
              target="_blank"
              rel="noreferrer"
            >
              Template Repo, Thanks to Yannick B.
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 sm:mx-auto  lg:my-8 border-2 rounded-full border-[#AF28EE]" />
      <span className="block text-sm text-white md:text-lg font-light sm:text-center ">
        Eye-4-Tap™ version alpha 1.0{" "}
        <a
          href="https://www.linkedin.com/in/dimitri-choummanivong-507669228/"
          className="hover:underline hover:text-[#AF28EE]"
        >
          CHOUMMANIVONG X. Dimitri, KUROTSUME ©
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
export default FooterBar;
