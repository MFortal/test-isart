import "styles/normalize.css";
import "styles/main.scss";
import { Context } from "./context.js";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState("6467");

  const getToken = () => {
    return token;
  };

  const addToken = (token) => {
    setToken(token);
  };

  return (
    <Context.Provider value={{ getToken, addToken }}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}
