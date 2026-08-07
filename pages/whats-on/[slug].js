import Link from "next/link";
import Script from "next/script";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "/components/header/PageTitle";
import WhatsOnCarousel from "/components/WhatsOn/WhatsOnCarousel";
import { useRouter } from "next/router";
import WhatsOnForm from "../../components/Forms/WhatsOnForm";
import { useEffect } from "react";

export default function WhatsonDetail(props) {
  const router = useRouter();

  useEffect(() => {
    if (props?.whatsOn?.post_name === "gnocchi-making-classes-wetherill-park") {
      const script = document.createElement("script");
      script.src = "https://forms.contacta.io/66c6cf71511664cb8f47d7d6.js"; // Replace with your Contacta.io script URL
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup on unmount
      };
    }

    if (props?.whatsOn?.post_name === "pizza-making-classes-wetherill-park") {
      const script = document.createElement("script");
      script.src = "https://forms.contacta.io/648fe2bb6a08c331690e7e18.js"; // Replace with your Contacta.io script URL
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup on unmount
      };
    }

    if (props?.whatsOn?.post_title === "Metro Mania Pizza Challenge 2025") {
      const contactaScript = document.createElement("script");
      contactaScript.src =
        "https://forms.contacta.io/6825b5f4c78a2bc9ced11c6d.js";
      contactaScript.async = true;
      document.body.appendChild(contactaScript);

      return () => {
        document.body.removeChild(contactaScript);
      };
    }
  }, []);

  const { whatsOn, locations = [] } = props;

  const googleAdsTag = (
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
    </>
  );

  if (router.isFallback || !whatsOn?.acf) {
    return googleAdsTag;
  }

  const locationIds = (whatsOn.acf.locations || []).map((item) => item.ID);

  return (
    <>
      {googleAdsTag}

      <Header />
      <div id="events">
        <PageTitle
          bannerImg={whatsOn.acf.full_image}
          mobileImg={whatsOn.acf.mobile_banner_image}
          btntext={whatsOn.acf.pr_button_text}
          btnUrl={whatsOn.acf.pr_button_url}
          title="What&#39;s On"
          subTitle={whatsOn.post_title}
          slug="whats-on"
        />

        <section className="about-content pad">
          <div className="container">
            <div className="reservation_crinit space20">
              <div className="row">
                <div className="col-lg-8">
                  <div className="detail_content">
                    <div>
                      <h2 className="patr title  mbtm0 ">
                        {whatsOn.post_title}
                      </h2>
                      <p className="sub_tit space10">{whatsOn.acf.sub_title}</p>

                      <div
                        className="summary space30"
                        style={{ whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{
                          __html: whatsOn.post_content,
                        }}
                      />

                      {whatsOn.post_name ===
                        "gnocchi-making-classes-wetherill-park" && (
                        <div id="CONTACTA_66c6cf71511664cb8f47d7d6"></div>
                      )}

                      {whatsOn.post_name ===
                        "pizza-making-classes-wetherill-park" && (
                        <div id="CONTACTA_648fe2bb6a08c331690e7e18"></div>
                      )}

                      {whatsOn.post_title ===
                        "Metro Mania Pizza Challenge 2025" && (
                        <div id="CONTACTA_6825b5f4c78a2bc9ced11c6d"></div>
                      )}
                    </div>
                  </div>

                  {whatsOn.post_name === "crinitis-21st-anniversary" && (
                    <WhatsOnForm />
                  )}
                </div>

                {(whatsOn.acf.locations?.length ?? 0) > 0 && (
                  <div className="col-lg-4 mt-10 lg:mt-0">
                    <div className="av_location">
                      <h2 className="title fsize16 patr mbtm0 lspace2">
                        AVAILABLE AT THE BELOW LOCATIONS
                      </h2>

                      <div className="space20"></div>

                      <WhatsOnLocation
                        locations={locations}
                        ids={locationIds}
                      />
                    </div>
                  </div>
                )}
              </div>

              {whatsOn.post_title !== "Metro Mania Pizza Challenge 2025" && (
                <WhatsOnTC tc={whatsOn.acf.terms_and_condition} />
              )}
              {whatsOn?.acf?.images?.length > 0 && (
                <WhatsOnCarousel images={whatsOn?.acf?.images} />
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

const WhatsOnTC = ({ tc }) => {
  if (!tc) {
    return false;
  }
  return (
    <div className="term space40 px-6">
      <h2 className="title patr fsize16 lspace2">TERMS & CONDITIONS</h2>

      <div
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: tc }}
      ></div>
    </div>
  );
};

const WhatsOnLocation = ({ locations, ids }) => {
  if (!locations || !ids) {
    return "";
  }

  return locations.map((item) => {
    if (ids.includes(item.ID)) {
      return (
        <div key={item.ID} className="location_bx">
          <h2 className="fsize16 font600">{item.post_title}</h2>

          <div className="st_name">
            <span>{item.acf.full_address}</span>
          </div>
        </div>
      );
    }
  }, ids);
};

export async function getStaticPaths() {
  const whatsOns = await fetch(
    `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=whatson`
  ).then((response) => response.json());

  const paths = whatsOns.map((whatsOn) => {
    return {
      params: { slug: whatsOn.post_name },
    };
  });
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const whatsOn = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=whatson&slug=${params.slug}`
    ).then((response) => response.json());

    const locations = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=location`
    ).then((response) => response.json());

    if (!whatsOn?.acf || !whatsOn?.post_title) {
      return { notFound: true, revalidate: 60 };
    }

    return {
      props: { whatsOn, locations },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        whatsOn: {},
        locations: [],
        error: true
      },
      revalidate: 60
    };
  }
}
