import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import OrderOnlineBlock from "../components/OrderOnline/OrderOnlineBlock";
import SEOHeader from "../components/Common/SEOHeader";

export default function OrderOnline(props) {
  const { page, locations } = props;

  return (
    <>
      <Head>
        <SEOHeader acf={page.acf} />
      </Head>

      <Header />

      <div id="order-online">
        <PageTitle
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url}
          title={page.post_title}
        />

        <section className="order-online wt_list_detail pad">
          <div className="container">
            <div className="row detail_content space30">
              <div className="col-md-8">
                <h2 className="patr title  mbtm0 ">{page.acf.big_title}</h2>
                <p className="sub_tit space10">{page.acf.sub_title}</p>

                <div
                  className="space30 summary"
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{ __html: page.content }}
                ></div>
              </div>
            </div>

            <div className="reservation_crinit space50">
              <div className="row">
                {locations.map((location, key) => (
                  <OrderOnlineBlock
                    key={key}
                    location={location}
                    Butoon1text="Pick up in store"
                    Butoon2text=" Home Delivery"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps(params) {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=order-online`
    ).then((response) => response.json());

    const locations = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=location`
    ).then((response) => response.json());

    return {
      props: { page, locations },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        page: {},
        locations: [],
        error: true
      },
      revalidate: 60
    };
  }
}
