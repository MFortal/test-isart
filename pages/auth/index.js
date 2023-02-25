import { MainLayout } from "components/MainLayout";
import { Formik } from "formik";
import axios from "axios";
import { Context } from "../context";
import { useContext } from "react";

export default function Auth({}) {
  const { addToken, getToken } = useContext(Context);

  async function handleClick(values) {
    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        username: "mor_2314",
        password: "83r5^_",
      },
    }).then((res) => {
      addToken(res.data.token);
    });
  }
  return (
    <>
      <MainLayout title={"Авторизация"}>
        <h1>Авторизация</h1>
        <section className="create-section">
          <Formik
            initialValues={{ password: "", email: "" }}
            onSubmit={(values) => {
              handleClick(values);
            }}>
            {(props) => (
              <form onSubmit={props.handleSubmit} className="form">
                <div className="field">
                  <label htmlFor="email" className="field__label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                  />
                </div>
                <div className="field">
                  <label htmlFor="password" className="field__label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                  />
                </div>
                <div className="field">
                  <input
                    type="submit"
                    value="Войти"
                    className="field__button"
                  />
                </div>
              </form>
            )}
          </Formik>
        </section>
      </MainLayout>
    </>
  );
}
