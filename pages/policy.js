import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";

export default function Policy({ terms, subtitle, locations }) {
  return (
    <>
      <Head>
        <title>Booking Policy</title>
        <meta name="title" content="Booking Policy" />
      </Head>

      <Header />
      <div id="privacy">
        <section className="about-content pad">
          <div className="container">
            <div className="reservation_crinit">
              <div className="row">
                <div className="col-lg-8">
                  <div className="detail_content mt-20">
                    <div>
                      <h2 className="patr title mbtm0">TERMS & CONDITIONS </h2>
                      <p className="sub_tit space10">{subtitle}</p>
                      <div
                        className="summary space20"
                        style={{ whiteSpace: "pre-wrap" }}
                        dangerouslySetInnerHTML={{ __html: terms }}
                      />
                    </div>
                  </div>
                </div>
                {locations && locations.length > 0 && (
                  <div className="col-lg-4 mt-20">
                    <div className="av_location">
                      <h2 className="title fsize16 patr mbtm0 lspace2">
                        AVAILABLE AT THE BELOW LOCATIONS
                      </h2>
                      <div className="space20"></div>
                      {locations.map((item) => (
                        <div key={item.ID} className="location_bx">
                          <h2 className="fsize16 font600">{item.post_title}</h2>
                          <div className="st_name">
                            <span>
                              {item.acf?.full_address || "No address"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
    const pageRes = await fetch(
      "https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=policy"
    );
    const page = await pageRes.json();
    const subtitle = page?.acf?.sub_title ?? "";
    const terms =
      typeof page?.post_content === "string" ? page.post_content : "";
    const locationsRes = await fetch(
      "https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=location"
    );
    const locationsData = await locationsRes.json();
    const locations = Array.isArray(locationsData) ? locationsData : [];

    return {
      props: {
        terms: terms || "",
        subtitle: subtitle || "",
        locations,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        terms: "",
        subtitle: "",
        locations: [],
      },
      revalidate: 60,
    };
  }
}
