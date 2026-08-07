import Head from "next/head";
import Script from "next/script";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import MenuList from "/components/MenuDetail/MenuList";
import PageTitle from "/components/header/PageTitle";
import SEOHeader from "../components/Common/SEOHeader";

export default function Menu(props) {
  const { page, menu, menuItems } = props;

  return (
    <div>
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-7FR3EJ986G`}
        ></Script>
        <Script id="" strategy="lazyOnload">
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-7FR3EJ986G', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>
      </>
      <Head>
        <SEOHeader acf={page.acf} />
      </Head>
      <Header />

      <PageTitle
        bannerImg={page.acf.page_banner}
        btntext={page.acf.pr_button_text}
        btnUrl={page.acf.pr_button_url}
        title={page.post_title}
      />

      <section className="full-menu pb-28">
        <div>
          <MenuList menu={menu} menuItems={menuItems} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export async function getStaticProps(params) {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=menu`
    ).then((response) => response.json());

    const menu = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=menu`
    ).then((response) => response.json());

    const menuItems = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=menus`
    ).then((response) => response.json());

    return {
      props: { page, menu, menuItems },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        page: {},
        menu: [],
        menuItems: [],
        error: true
      },
      revalidate: 60
    };
  }
}
