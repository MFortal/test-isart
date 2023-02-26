import Head from "next/head";

export function MainLayout({ children, title = "Интернет магазин" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="main">{children}</main>
    </>
  );
}
