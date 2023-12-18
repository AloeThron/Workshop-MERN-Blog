// keep token / username => session storage
export const authenticate = (res, next) => {
  if (window !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(res.data.token));
    sessionStorage.setItem("username", JSON.stringify(res.data.username));
  }
  next();
};

export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("username")) {
      return JSON.parse(sessionStorage.getItem("username"));
    } else {
      return false;
    }
  }
};

export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
  }
  next()
};
