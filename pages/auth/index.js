import { useContext, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/router";

import { Context } from "../context";
import { MainLayout } from "@/components/MainLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Auth() {
  const [load, setLoad] = useState();
  const [status, setStatus] = useState();
  const { addToken } = useContext(Context);
  const router = useRouter();

  const handleClick = async (values) => {
    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        username: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        addToken(res.data.token);
        setStatus({ success: true, description: "Вход успешно осуществлен" });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        alert(err);
        setStatus({
          success: false,
          description: "Вход не осуществлен. Попробуйте снова",
        });
      })
      .finally(() => setLoad(false));
  };

  const validate = (values) => {
    const errors = {};
    if (values.password?.length < 5) {
      errors.password = "Пароль должен быть больше 5 символов";
    }
    return errors;
  };

  return (
    <>
      <MainLayout title={"Авторизация"}>
        <h1>Авторизация</h1>
        <details>
          <summary>Показать чёткие данные</summary>
          <div className="details__div">
            <span>Логин: mor_2314</span>
            <span>Пароль: 83r5^_</span>
          </div>
        </details>
        {load && <p>Ждем ответа от сервера...</p>}
        {status && <div className="status">{status.description}</div>}
        <section className="create-section">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validate}
            onSubmit={(values) => {
              setLoad(true);
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
                  required
                />

                <Input
                  value={props.values.password}
                  name={"password"}
                  type={"password"}
                  id={"password"}
                  labelText={"Пароль"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  required
                />
                {props.errors.password && (
                  <div className="feedback">{props.errors.password}</div>
                )}
                <Button buttonText={"Войти"} />
              </form>
            )}
          </Formik>
        </section>
      </MainLayout>
    </>
  );
}
