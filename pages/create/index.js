import { Formik } from "formik";
import { MainLayout } from "components/MainLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";

export default function CreateProduct({ products }) {
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
