function api() {
  let token;
  const checktoken = () => {
    if (document.cookie.match(import.meta.env.VITE_NAME_COOKIE)) {
      token = document.cookie
        .split("; ")
        .find((row) => row.startsWith(import.meta.env.VITE_NAME_COOKIE))
        ?.split("=Bearer%20")[1];
    }
  };

  const apigetmysql = async (url) => {
    checktoken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    // eslint-disable-next-line no-return-await
    return await res.json();
  };

  const apipostmysql = async (url, body) => {
    checktoken();
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
      credentials: "include",
    });
    return await res;
  };

  const apiputmysql = async (url, body) => {
    checktoken();
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
      credentials: "include",
    });
    return await res;
  };

  const apideletemysql = async (url, body) => {
    checktoken();
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
      credentials: "include",
    });
    return await res;
  };

  return {
    apigetmysql,
    apipostmysql,
    apiputmysql,
    apideletemysql,
  };
}

export default api();
