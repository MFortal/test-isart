import { MainLayout } from "components/MainLayout";
import Image from "next/image";

export default function Home({ products }) {
  return (
    <>
      <MainLayout title={"Главная"}>
        <h1>Список товаров</h1>
        <section className="catalog">
          {products.map((product) => (
            <div key={product.id} className="catalog-item">
              <Image
                className="catalog-item__img"
                src={product.image}
                alt={product.title}
                width={150}
                height={200}
              />
              <span className="catalog-item__category">{product.category}</span>
              <p className="catalog-item__title">{product.title}</p>
              <p className="catalog-item__desc">{product.description}</p>
              <div className="catalog-item__info">
                <span>{product.price} $</span>
                <div className="catalog-item__info_rating">
                  <span>Рейтинг: {product.rating.rate}</span>
                  <span>Количество: {product.rating.count}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return { props: { products } };
}
