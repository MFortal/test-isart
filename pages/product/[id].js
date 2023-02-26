import Image from "next/image";

import { MainLayout } from "components/MainLayout";

export default function Product({ product }) {
  return (
    <>
      <MainLayout title="Просмотр товара">
        <h1>{product.title}</h1>
        <section className="view">
          <Image
            className="item__img"
            src={product.image}
            alt={product.title}
            width={300}
            height={400}
          />
          <div className="view-block">
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
