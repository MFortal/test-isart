import { MainLayout } from "components/MainLayout";
import { Formik } from "formik";
import { useRouter } from "next/router";

export default function UpdateProduct({ product }) {
  const router = useRouter();

  async function handleClick(product) {
    const response = await fetch(
      `https://fakestoreapi.com/products/${product.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: { rate: product.rate, count: product.count },
        }),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        alert("Товар изменен");
        router.push("/");
      })
      .catch((err) => alert(err));
  }
  return (
    <>
      <MainLayout title={"Изменение товара"}>
        <h1>Изменение товара</h1>
        <section className="create-section">
          <Formik
            initialValues={{
              id: product.id,
              title: product.title,
              description: product.description,
              price: product.price,
              category: product.category,
              image: product.image,
              rate: product.rating.rate,
              count: product.rating.count,
            }}
            onSubmit={(values) => {
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
                    value="Изменить товар"
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

export async function getServerSideProps({ query }) {
  const response = await fetch(`https://fakestoreapi.com/products/${query.id}`);
  const product = await response.json();

  return { props: { product } };
}
