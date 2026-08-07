import Header from "/components/header/header";
import Head from "next/head";
import Image from "next/image";
import Footer from "/components/Footer/Footer";
import PageTitle from "../../components/header/PageTitle";
import Link from "next/link";
import SEOHeader from "../../components/Common/SEOHeader";


export async function getServerSideProps() {
  const res = await fetch(
    "https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=kids-pizza-classes",
  );

  const data = await res.json();
  const html = data.content;
  const contentWithoutImages = data.content.replace(/<img[^>]*>/g, "");
  const images = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((x) => x[1]);

  return {
    props: {
      page: data,
      images,
      contentWithoutImages
    },
  };
}

export default function adults({
  page,
  images,
  contentWithoutImages
}) {
  return (
    <>
    <Head>
        <SEOHeader acf={page.acf} />
      </Head>
      <Header />

      <PageTitle
        title="Pizza Classes"
        slug="pizza-classes"
        bannerImg={page.acf.page_banner}
        subTitle={page.acf.banner_text}
        btnUrl={page.acf.pr_button_url}
        btntext={page.acf.pr_button_text}
      />

      <section className="pizz-class wt_list_detail pad">
        <div className="container">
          <div className="row detail_content space30">
            <div className="col-md-8">
              <h2 className="patr title  mbtm0 ">{page.acf.big_title}</h2>
              <p className="sub_tit space10">{page.acf.sub_title}</p>
                <div
                className="space30"
                dangerouslySetInnerHTML={{ __html: contentWithoutImages }}
              ></div>
            </div>

            <div className="col-md-4">
              {images[0] && (
                <div className="wt_bx grid_bx trans">
                  <div className="wt_img overflow-hidden">
                    <Image
                      src={images[0]}
                      className="img-fluid trans"
                      width={348}
                      height={348}
                      alt=""
                    />
                  </div>
                </div>
              )}

              {images[1] && (
                <div className="wt_bx grid_bx trans">
                  <div className="wt_img overflow-hidden">
                    <Image
                      src={images[1]}
                      className="img-fluid trans"
                      width={348}
                      height={348}
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
