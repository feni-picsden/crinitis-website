import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import Image from "next/image";
import PageTitle from "../components/header/PageTitle";
import SEOHeader from "../components/Common/SEOHeader";

export default function EventEnquiry(props) {
  const { page } = props;
  const { fillable } = true;

  return (
    <>
      <Head>
        <SEOHeader acf={page.acf} />
      </Head>
      <Header />
      <PageTitle
        title={page.post_title}
        bannerImg={page.acf.page_banner}
        btntext="Book Now"
      />

      <section className="pizz-class wt_list_detail pad">
        <div className="container">
          <div className="row detail_content space30">
            <div className="col-md-8">
              <h2 className="patr title  mbtm0 ">{page.acf.big_title}</h2>
              <p className="sub_tit space10">{page.acf.sub_title}</p>

              <div className="summary space30">
                <p>
                  Whatever the cause for your celebration, our knowledgeable
                  team can help you bring your event ideas to life.
                </p>

                <p>
                  From the food and drink, to the location and styling, we can
                  create a customised function and seamlessly deliver an
                  unforgettable experience for you and your guests. Whether
                  you’re planning an intimate gathering, a large scale corporate
                  event, or a special celebration to mark an important day, let
                  us take care of everything.
                </p>

                <p>
                  When you choose Criniti’s we make it our purpose to make you
                  happy… because when you’re here, you’re family.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="call_bx">
                <p>
                  Select the Criniti&#39;s Restaurant you would like to book
                  from below & follow the prompts
                </p>

                <a
                  href="tel:0280267700"
                  className="blockbtn bgblack space20"
                  title="Call Us"
                >
                  Call Us
                </a>
              </div>

              <div className="wt_bx grid_bx trans mt-4">
                <div className="wt_img">
                  <Image
                    src="/img/location/Layer-7.png"
                    className="img-fluid trans"
                    width={348}
                    height={348}
                    fill={fillable ? 1 : 0}
                    alt="Criniti's Event Enquiry"
                  />
                </div>
              </div>

              <div className="wt_bx grid_bx trans">
                <div className="wt_img">
                  <Image
                    src="/img/location/Southbank.jpg"
                    className="img-fluid trans"
                    width={348}
                    height={348}
                    fill={fillable ? 1 : 0}
                    alt="Criniti's Event Enquiry"
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=event-enquiry`
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
