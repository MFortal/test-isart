import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";

import { MainLayout } from "components/MainLayout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";

export default function CreateProduct() {
  const [load, setLoad] = useState();
  const [status, setStatus] = useState();
  const router = useRouter();

  const handleClick = async (values) => {
    fetch("https://fakestoreapi.com/users", {
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
        setStatus({
          success: true,
          description: "Товар добавлен",
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((err) => {
        alert(err);
        setStatus({
          success: false,
          description: "Товар не добавлен",
        });
      })
      .finally(() => setLoad(false));
  };
  return (
    <>
      <MainLayout title={"Добавление товара"}>
        <h1>Добавление товара</h1>
        {load && <p>Ждем ответа от сервера...</p>}
        {status && <div className="status">{status.description}</div>}
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
              setLoad(true);
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
                  required
                />
                <Input
                  value={props.values.description}
                  name={"description"}
                  type={"text"}
                  id={"description"}
                  labelText={"Описание"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  required
                />
                <Input
                  value={props.values.price}
                  name={"price"}
                  type={"text"}
                  id={"price"}
                  labelText={"Цена"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  required
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
                  required
                />

                <Input
                  value={props.values.rate}
                  name={"rate"}
                  type={"text"}
                  id={"rate"}
                  labelText={"Рейтинг"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  required
                />

                <Input
                  value={props.values.count}
                  name={"count"}
                  type={"text"}
                  id={"count"}
                  labelText={"Количество"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  required
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
