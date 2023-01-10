pages = {
  Home: {
    Home: "Home.jsx",
    Test: {
      Contact: "Contact.jsx",
    },
  },
};

let routes = [];

function addChildren(json) {
  Object.values(json).reduce((acc, file) => {
    // initialisation variables
    let childrenroutes = [];
    if (typeof file === "object") {
      let acc2 = { ...acc };
      const file2 = addChildren(typeof file);
      acc2 = { children: file2 };
      acc = { ...acc, ...acc2 };
      return acc;
    }
    acc = [
      {
        path: `/${acc}
                .toLocaleLowerCase()
                .replace("home", "")}`,
        element: "element",
        errorElement: "<ErrorPage />",
        children: acc,
      },
    ];
    return { ...acc, children: file };
  }, {});
}
addChildren(pages);
console.log(acc);
