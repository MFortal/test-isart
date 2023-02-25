import { Formik } from "formik";
import { useRouter } from "next/router";
import { MainLayout } from "components/MainLayout";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";

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
                <Input
                  value={props.values.title}
                  name={"title"}
                  type={"text"}
                  id={"title"}
                  labelText={"Наименование"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <Input
                  value={props.values.description}
                  name={"description"}
                  type={"text"}
                  id={"description"}
                  labelText={"Описание"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <Input
                  value={props.values.price}
                  name={"price"}
                  type={"text"}
                  id={"price"}
                  labelText={"Цена"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />

                <Select
                  name={"category"}
                  value={props.values.category}
                  id={"category"}
                  labelText={"Категория"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />

                <Input
                  value={props.values.image}
                  name={"image"}
                  type={"text"}
                  id={"image"}
                  labelText={"Изображение"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />

                <Input
                  value={props.values.rate}
                  name={"rate"}
                  type={"text"}
                  id={"rate"}
                  labelText={"Рейтинг"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />

                <Input
                  value={props.values.count}
                  name={"count"}
                  type={"text"}
                  id={"count"}
                  labelText={"Количество"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                />
                <Button buttonText={"Добавить товар"} />
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
