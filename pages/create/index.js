import { MainLayout } from "components/MainLayout";
import { Formik } from "formik";
import { useRouter } from "next/router";

export default function CreateProduct({ products }) {
  const router = useRouter();

  async function handleClick(values) {
    const response = await fetch("https://fakestoreapi.com/users", {
      method: "POST",
      body: JSON.stringify({
        title: values.title,
        price: values.price,
        description: values.description,
        category: values.category,
        image: values.image,
        rating: { rate: values.rate, count: values.count },
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
      {JSON.stringify(products, null, 2)}
      <MainLayout title={"Добавление товара"}>
        <h1>Добавление товара</h1>
        <section className="create-section">
          <Formik
            initialValues={{
              title: "",
              description: "",
              price: "",
              category: "",
              image: "",
              rate: "",
              count: "",
            }}
            onSubmit={(values) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
              }, 1000);
              handleClick(values);
            }}>
            {(props) => (
              <form onSubmit={props.handleSubmit} className="form">
                <div className="field">
                  <label htmlFor="title" className="field__label">
                    Наименование
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.title}
                  />
                </div>
                <div className="field">
                  <label htmlFor="description" className="field__label">
                    Описание
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.description}
                  />
                </div>
                <div className="field">
                  <label htmlFor="price" className="field__label">
                    Цена
                  </label>
                  <input
                    type="text"
                    name="price"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.price}
                  />
                </div>

                <div className="field">
                  <label htmlFor="category" className="field__label">
                    Категория
                  </label>
                  <select
                    name="category"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.category}>
                    <option value="men's clothing">men&apos;s clothing</option>
                    <option value="jewelery">jewelery</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">
                      women&apos;s clothing
                    </option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="image" className="field__label">
                    Изображение
                  </label>
                  <input
                    type="text"
                    name="image"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.image}
                  />
                </div>

                <div className="field">
                  <label htmlFor="rate" className="field__label">
                    Рейтинг
                  </label>
                  <input
                    type="text"
                    name="rate"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.rate}
                  />
                </div>

                <div className="field">
                  <label htmlFor="count" className="field__label">
                    Количество
                  </label>
                  <input
                    type="text"
                    name="count"
                    className="field__input"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.count}
                  />
                </div>

                <div className="field">
                  <input
                    type="submit"
                    value="Добавить товар"
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
