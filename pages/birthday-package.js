import Head from "next/head";
import Image from "next/image";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import Link from "next/link";
import SEOHeader from "../components/Common/SEOHeader";

export default function BirthdayPackage(props) {
  const { page } = props;
  const { fillable } = true;

  return (
    <>
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

      <section className="pizz-class wt_list_detail pad">
        <div className="container">
          <div className="row detail_content space30">
            <div className="col-md-8">
              <h2 className="patr title  mbtm0 ">{page.acf.big_title}</h2>
              <p className="sub_tit space10">{page.acf.sub_title}</p>

              <div
                className="space30"
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: page.content }}
              ></div>
            </div>

            <div className="col-md-4">
              <div className="call_bx">
                <p>
                  Celebrate with us during your birthday month and we’ll treat
                  you to 7% OFF your total bill, a FREE cake from our in-house
                  La Patisserie.
                </p>
                <Link legacyBehavior href="/reservation">
                  <a className="blockbtn bgblack space20">BOOK NOW</a>
                </Link>
              </div>

              <div className="wt_bx grid_bx trans mt-4">
                <div className="wt_img overflow-hidden">
                  <Image
                    src="/img/birthday-pkg.jpg"
                    className="img-fluid trans object-cover"
                    width={358}
                    height={358}
                    fill={fillable ? 1 : 0}
                    alt="Birthday Package"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=birthday-package`
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
