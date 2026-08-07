import Head from "next/head";
import Script from "next/script";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "/components/header/PageTitle";
import LocationBox from "../components/Locations/LocationBox";
import { useRef, useState } from "react";
import SEOHeader from "../components/Common/SEOHeader";
import LocationsMap from "../components/Locations/LocationsMap";

export default function Locations(props) {
  const { page, locations } = props;
  const [locationId, setLocationId] = useState(null);
  const myRef = useRef(null);

  const changeLocation = (e, id) => {
    e.preventDefault();
    setLocationId(id);
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <SEOHeader acf={page.acf} />
      </Head>

      <Header />
      <div id="events-booking">
        <PageTitle
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url}
          title={page.post_title}
        />

        <section className="wt_list_detail pad">
          <div className="container">
            <div className="row detail_content space30">
              <div className="col-md-12">
                <h2 className="patr title mbtm0">{page.post_title}</h2>
                <p className="sub_tit space10">{page.acf.sub_title}</p>
                <div
                  className="summary space30"
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
            </div>

            <div className="reservation_crinit space50">
              <div className="row">
                {locations.map((location, key) => (
                  <LocationBox
                    key={key}
                    location={location}
                    Butoon2text=" Book Now"
                    changeLocation={changeLocation}
                  />
                ))}
              </div>
            </div>

            <div ref={myRef} />
            {locationId !== null && locationId !== "" && (
              <div className="text-center mt-3">
                <div className="">
                  <iframe
                    data-id="nbi-widget"
                    width="100%"
                    height="780"
                    src={`${locationId}`}
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <div className="container-fluid mt-5">
        <LocationsMap />
      </div>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=locations`,
    ).then((response) => response.json());

    const locations = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=location`,
    ).then((response) => response.json());

    return {
      props: { page, locations },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: {
        page: {},
        locations: [],
        error: true,
      },
      revalidate: 60,
    };
  }
}
