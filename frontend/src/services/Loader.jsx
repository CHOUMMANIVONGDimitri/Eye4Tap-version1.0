import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";

function Loader({ foldername, filename }) {
  const DynamicComponent = lazy(() =>
    import(`./../${foldername}/${filename}.jsx`)
  );

  return (
    <Suspense fallback={<Spinner />}>
      <DynamicComponent />
    </Suspense>
  );
}
export default Loader;

Loader.propTypes = {
  foldername: PropTypes.string,
  filename: PropTypes.string,
};
Loader.defaultProps = {
  foldername: "",
  filename: "",
};
