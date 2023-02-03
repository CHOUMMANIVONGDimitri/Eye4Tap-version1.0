function FooterBar() {
  return (
    <footer className="p-4 rounded-lg shadow md:px-6 md:py-8 border-t-4">
      <div className="sm:flex sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center mb-6 text-md text-white sm:mb-0 ">
          <li>
            <a
              href="https://github.com/CHOUMMANIVONGDimitri"
              className="mr-4 hover:underline md:mr-6"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://webgazer.cs.brown.edu/"
              className="mr-4 hover:underline md:mr-6 "
              target="_blank"
              rel="noreferrer"
            >
              WebGazerAPI
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Bouman/react-repo-base"
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Template Repo
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 sm:mx-auto  lg:my-8 border-2 rounded-full border-[#AF28EE]" />
      <span className="block text-sm text-white sm:text-center ">
        Eye-4-Tap™ version alpha 1.0{" "}
        <a
          href="https://www.linkedin.com/in/dimitri-choummanivong-507669228/"
          className="hover:underline"
        >
          CHOUMMANIVONG X. Dimitri, KUROTSUME©
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
export default FooterBar;
