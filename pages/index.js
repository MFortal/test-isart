import { MainLayout } from "components/MainLayout";
import Image from "next/image";
import Link from "next/link";

export default function Home({ products }) {
  return (
    <>
      <MainLayout title={"Главная"}>
        <h1>Список товаров</h1>
        <section className="catalog">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/[id]}`}
              as={`/product/${product.id}`}
              className="item">
              <Image
                className="item__img"
                src={product.image}
                alt={product.title}
                width={150}
                height={200}
              />
              <span className="item__category">{product.category}</span>
              <p className="item__title">{product.title}</p>
              <p className="item__desc">{product.description}</p>
              <div className="item__info">
                <span>{product.price} $</span>
                <div className="item__info_rating">
                  <span>Рейтинг: {product.rating.rate}</span>
                  <span>Количество: {product.rating.count}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return { props: { products } };
}
