import { useContext } from "react";
import { MainLayout } from "components/MainLayout";
import Image from "next/image";
import Link from "next/link";
import { Context } from "./context";

export default function Home({ products }) {
  const { getToken } = useContext(Context);
  return (
    <>
      <MainLayout title={"Главная"}>
        <header className="header">
          <Link className="header__item" href={"/create/"}>
            Добавить товар
          </Link>
          {(!getToken() && (
            <Link className="header__item" href={"/auth/"}>
              Авторизоваться
            </Link>
          )) || <p className="header__item">Вы авторизованы</p>}
        </header>
        <h1>Список товаров</h1>
        <section className="catalog">
          {products.map((product) => (
            <div key={product.id} className="item">
              <div className="icons">
                <Link href={`/update/${product.id}`} className="icons__item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="30px"
                    height="30px">
                    {" "}
                    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z" />
                  </svg>
                </Link>
                <Link href={`/delete/${product.id}`} className="icons__item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="30px"
                    height="30px">
                    {" "}
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
                  </svg>
                </Link>
              </div>
              <Image
                className="item__img"
                src={product.image}
                alt={product.title}
                width={150}
                height={200}
              />
              <span className="item__category">{product.category}</span>
              <Link href={`/product/${product.id}`} className="item__title">
                {product.title}
              </Link>
              <p className="item__desc">{product.description}</p>
              <div className="item__info">
                <span>{product.price} $</span>
                <div className="item__info_rating">
                  <span>Рейтинг: {product.rating.rate}</span>
                  <span>Количество: {product.rating.count}</span>
                </div>
              </div>
            </div>
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
