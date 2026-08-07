import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import WonkForm from "../components/Forms/WonkForm";
import WonkaCarousel from "../components/Gallery/WonkaCarousel";
import WonkaTermsCondition from "../components/Terms/WonkaTermsCondition";
import Script from "next/script";
import SEOHeader from "../components/Common/SEOHeader";

export default function Wonka(props) {
  const {page, locations} = props;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://player.vimeo.com/api/player.js`}
      ></Script>

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

        <section className="wt_list_detail pad">
          <div className="container">
            <div className="reservation_crinit space20">
              <div className="row">
                <div className="col-lg-8">
                  <div className=" detail_content mb-6">
                    <div>
                      <h2 className="patr title  mbtm0 ">
                        {page.acf.big_title}{" "}
                      </h2>
                      <p className="sub_tit space10">{page.acf.sub_title} </p>
                      <div
                        className="summary space30"
                        style={{ whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                      ></div>
                    </div>
                  </div>
                  <WonkForm locations={locations} />
                </div>
                <div className="col-lg-4 mt-6 md:mt-24 block">
                  <WonkaCarousel />
                </div>
              </div>
              <WonkaTermsCondition />
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=wonka`
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
