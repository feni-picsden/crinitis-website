import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import WhatsOnBlock from "/components/WhatsOn/WhatsOnBlock";
import Script from "next/script";
import SEOHeader from "../components/Common/SEOHeader";

export default function WhatsOn(props) {
  const { whatsOns = [], page, pageKey } = props;

  const meta = {
    header_title:
      "What&#x27;s On | Criniti&#x27;s Italian Restaurant | Sydney, Melbourne, Newcastle Perth and Brisbane",
    header_description:
      "Authentic Italian pizza and pasta in Sydney, Melbourne &amp; Newcastle. With a range of dishes from steaks &amp; burgers, to seafood &amp; salads.",
    header_keywords:
      "pizza, pasta, Italian, Italian cuisine, take away, restaurant, breakfast, lunch, dinner, dessert, coffee, drinks, cocktails, steak, seafood, gluten free, spaghetti, best Italian, birthday dinner, Sydney, Parramatta, darling harbour, darling harbour, castle hill, Newcastle, Melbourn, Perth, Brisbane, functions",
  };

  return (
    <>
      <Script
        async
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-996911395"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-996911395');
        `}
      </Script>

      <Head>
        <SEOHeader acf={meta} />
      </Head>

      <Header />
      <div id="whats_on" key={pageKey}>
        <PageTitle
          title={page.post_title}
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url}
        />

        <section className="wt_list_list pad space50">
          <div className="container">
            <div className="row">
              {whatsOns.map((whatsOn, key) => (
                <WhatsOnBlock key={key} whatsOn={whatsOn} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=whats-on`
    ).then((response) => response.json());

    const whatsOns = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=whatson&per_page=100`
    ).then((response) => response.json());

    const whatsonData = whatsOns.sort(function (a, b) {
      let x = parseInt(a.acf.order_no);
      let y = parseInt(b.acf.order_no);

      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    });

    const pageKey = new Date();

    return {
      props: { whatsOns: whatsonData, page, pageKey: pageKey.toString() },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        whatsOns: [],
        page: {},
        pageKey: new Date().toString(),
        error: true
      },
      revalidate: 60
    };
  }
}
