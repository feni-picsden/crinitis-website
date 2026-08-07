import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import SEOHeader from "../components/Common/SEOHeader";

export default function Reservation(props) {
  const { page } = props;

  if (!page?.acf) {
    return null;
  }

  return (
    <>
      <Head>
        <SEOHeader acf={page.acf} />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-996911395"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-996911395');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `gtag('event', 'conversion', {'send_to': 'AW-996911395/ZNMhCL7EyIkYEKPSrtsD'});`,
          }}
        />
      </Head>

      <Header />
      <div id="reservation">
        <PageTitle
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url}
          title={page.post_title}
        />

        <section className="wt_list_detail pad">
          <div className="container">
            <div className="row detail_content space30">
              <div className="col-md-8">
                <h2 className="patr title  mbtm0 ">BOOK A TABLE</h2>
                <p className="sub_tit space10">experience Criniti&#39;s</p>

                <div className="summary space30">
                  <p>We can&#39;t wait to feed you!</p>
                  <p>
                    Make a reservation at Criniti’s & skip the waiting line to
                    indulge in the flavours of Italy.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="call_bx">
                  <p>
                    Select the Criniti&#39;s Restaurant you would like to book
                    from below & follow the prompts
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#f9f9f9] text-center mt-3">
              <div>
                <iframe
                  data-id="nbi-widget"
                  width="100%"
                  height="1250"
                  src={page.acf.booking_url}
                ></iframe>
              </div>
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=reservation`
    ).then((response) => response.json());

    if (!page?.acf || !page?.post_title) {
      return { notFound: true, revalidate: 60 };
    }

    return {
      props: { page },
      revalidate: 60,
    };
  } catch (err) {
    return { notFound: true, revalidate: 60 };
  }
}
