import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import PizzaClass from "/components/PizzaClass/PizzaClass";
import SEOHeader from "../components/Common/SEOHeader";

export default function PizzaClasses(props) {
  const { page } = props;

  return (
    <>
      <Head>
        <SEOHeader acf={page.acf} />
      </Head>

      <Header />
      <div id="events">
        <PageTitle
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url}
          title={page.post_title}
        />

        <PizzaClass page={page} />
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=pizza-classes`
    ).then((response) => response.json());

    return {
      props: { page },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        page: {},
        error: true
      },
      revalidate: 60
    };
  }
}
