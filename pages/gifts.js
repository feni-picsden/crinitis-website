import Head from 'next/head'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '../components/header/PageTitle'
import GiftVoucher from '../components/Gifts/GiftVouchers';
import SEOHeader from '../components/Common/SEOHeader';

export default function Gifts(props) {
  const { page } = props;

  return (
    <>
      <Head>
        <SEOHeader acf={page.acf} />
      </Head>
      <Header />

      <div id="gifts">
        <PageTitle
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url}
          title={page.post_title} />

        <section className="pizz-class wt_list_detail pad">
          <div className="container">
            <div className="row detail_content space30">
              <div className="col-md-8">

                <h2 className="patr title  mbtm0 ">{page.acf.big_title} </h2>
                <p className="sub_tit space10">{page.acf.sub_title} </p>

                <div className="space30">
                  <GiftVoucher></GiftVoucher>
                </div>

              </div>
            </div>

          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=gifts`
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
    }
  }
}