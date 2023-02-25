import { useContext } from "react";
import { Formik } from "formik";
import axios from "axios";
import { Context } from "../context";
import { MainLayout } from "@/components/MainLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Auth() {
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
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              handleClick(values);
            }}>
            {(props) => (
              <form onSubmit={props.handleSubmit} className="form">
                <Input
                  value={props.values.email}
                  name={"email"}
                  type={"text"}
                  id={"email"}
                  labelText={"Email"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />

                <Input
                  value={props.values.password}
                  name={"password"}
                  type={"password"}
                  id={"password"}
                  labelText={"Пароль"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <Button buttonText={"Войти"} />
              </form>
            )}
          </Formik>
        </section>
      </MainLayout>
    </>
  );
}
