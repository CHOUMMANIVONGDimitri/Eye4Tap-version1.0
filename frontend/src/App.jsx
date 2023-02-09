import { useRoutes } from "react-router-dom";
import { Suspense, useContext } from "react";
import Loader from "./services/Loader";
import { FolderContext } from "./contexts/Folder";
import ErrorPage from "./pages/Error";

function App() {
  const { pages } = useContext(FolderContext);

  // // Array pour les routes du dossier pages
  let routes = [];
  Object.values(pages).forEach((element, index) => {
    let childrenroutes = [];
    const folder = Object.keys(pages)[index];
    Object.keys(element).forEach((files) => {
      childrenroutes = [
        ...childrenroutes,
        {
          path: `${files.toLocaleLowerCase().replace("home", "/")}`,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Loader foldername={`pages/${folder}`} filename={files} />
            </Suspense>
          ),
          errorElement: <ErrorPage />,
        },
      ];
    });

    routes = [
      ...routes,
      {
        path: `/${folder
          .toLocaleLowerCase()
          .replace("home", "")
          .replace("protected", "user")}`,
        element: (
          <Suspense
            fallback={<p className="h-fit w-fit text-4xl">Loading...</p>}
          >
            <Loader foldername="components" filename={`${folder}Layout`} />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: childrenroutes,
      },
    ];
  });
console.log(routes);
  /// On rajoute les components dans les sous-routes
  const element = useRoutes(routes);
  return element;
}
export default App;
