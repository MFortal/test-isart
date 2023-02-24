import { MainLayout } from "components/MainLayout";
import { Formik } from "formik";

export default function Auth({}) {
  async function handleClick(values) {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "mor_2314@fsjfl",
        password: "83r5^_",
      }),
    })
      .then(() => {
        alert("Товар добавлен");
        router.push("/");
      })
      .catch(() => {
        alert("Что-то пошло не так");
      });

    console.log(response);
  }
  return (
    <>
      <MainLayout title={"Авторизация"}>
        <h1>Авторизация</h1>
        <section className="create-section">
          <Formik
            initialValues={{ password: "", email: "" }}
            onSubmit={(values) => {
              console.log("ki");
              handleClick(values);
              console.log("ki2");
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
