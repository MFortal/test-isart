import Head from "next/head";

export function MainLayout({ children, title = "Next App" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="main">{children}</main>
    </>
  );
}
