import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { MainLayout } from "components/MainLayout";

export default function ProductDelete({ product }) {
  const router = useRouter();
  const [load, setLoad] = useState();
  const [status, setStatus] = useState();

  const handleDelete = async (id) => {
    setLoad(true);
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setStatus({
          success: true,
          description: "Товар успешно удален",
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch(() => {
        alert(err);
        setStatus({
          success: false,
          description: "Товар не удален. Попробуйте снова",
        });
      })
      .finally(() => setLoad(false));
  };

  const handleCancel = () => {
    setStatus({
      success: false,
      description: "Товар не удален",
    });
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <>
      <MainLayout title="Удаление товара">
        {load && <p>Ждем ответа от сервера...</p>}
        {status && <div className="status">{status.description}</div>}
        <section className="delete">
          <h3>Удалить товар &quot;{product.title}&quot;?</h3>
          <div className="btns">
            <button
              className="field__button btns__btn"
              onClick={() => {
                handleDelete(product.id);
              }}>
              Да
            </button>
            <button
              className="field__button field__button_err btns__btn"
              onClick={() => {
                handleCancel();
              }}>
              Нет
            </button>
          </div>
        </section>
        <details>
          <summary>Показать товар</summary>
          <section className="view details-view">
            <h1 className="details-view__title">{product.title}</h1>
            <div className="view-block details-view__block">
              <Image
                className="item__img"
                src={product.image}
                alt={product.title}
                width={300}
                height={400}
              />
              <div className="details-view__block_info">
                <span className="item__category view__category">
                  {product.category}
                </span>
                <p>{product.description}</p>
                <div className="item__info">
                  <span>{product.price} $</span>
                  <div className="item__info_rating">
                    <span>Рейтинг: {product.rating.rate}</span>
                    <span>Количество: {product.rating.count}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </details>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const response = await fetch(`https://fakestoreapi.com/products/${query.id}`);
  const product = await response.json();

  return { props: { product } };
}
