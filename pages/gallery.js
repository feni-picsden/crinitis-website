import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import GalleryBlock from "/components/Gallery/GalleryBlock";
import SEOHeader from "../components/Common/SEOHeader";

export default function Gallery(props) {
  const { page, galleries } = props;

  return (
    <>
      <Head>
        <SEOHeader acf={page.acf} />
      </Head>
      <Head>
        <title>Gallery | Criniti&#x27;s</title>
        <meta
          name="title"
          content="Italian Restaurant - Sydney, Newcastle, Melbourne | Criniti&#x27;s"
        />
        <meta
          name="description"
          content="Authentic Italian wood fired pizza and pasta in Sydney, Newcastle &amp; Melbourne. With a range of dishe"
        />
        <meta name="keywords" content="" />
      </Head>

      <Header />
      <section className="gallery-list pad">
        <PageTitle
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url}
          title={page.post_title}
        />

        <div className="pad space30">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className=" detail_content space30">
                  <div>
                    <h2 className="patr title  mbtm0 ">THE GALLERY</h2>
                    <p className="sub_tit space10">
                      check out snaps from all our venues
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="row">
                {galleries.map((gallery, key) => (
                  <GalleryBlock key={key} gallery={gallery} />
                ))}
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=gallery`
    ).then((response) => response.json());

    const galleries = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=gallery`
    ).then((response) => response.json());

    return {
      props: { page, galleries },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        page: {},
        galleries: [],
        error: true
      },
      revalidate: 60
    };
  }
}
