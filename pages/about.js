import Head from "next/head";
import Link from "next/link";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import Script from "next/script";
import SEOHeader from "../components/Common/SEOHeader";

export default function AboutUs(props) {
  const { page, locations } = props;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-7FR3EJ986G`}
      ></Script>
      <Script id="" strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-7FR3EJ986G', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

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
        <section className="about-content pad">
          <div className="container">
            <div className="reservation_crinit space20">
              <div className="row">
                <div className="col-lg-8">
                  <div className=" detail_content">
                    <div>
                      <h2 className="patr title  mbtm0 ">
                        {page.acf.big_title}
                      </h2>
                      <p className="sub_tit space10">{page.acf.sub_title}</p>

                      <div className="summary space30">
                        <p>
                          Traditional Italian meets contemporary dining at
                          Criniti&apos;s, a multi-award winner of
                          &apos;Australia&apos;s Favourite Italian&apos;.
                          Criniti&apos;s was originally established in 2003 in
                          Parramatta, within Sydney&apos;s west by Criniti
                          Family, were driven by a passion for fine quality food
                          & cultivated success. Their yearning & hard driven
                          aspirations developed dramatically over the years,
                          which resulted in a popular go-to spot amongst the
                          locals. It didn&apos;t take long for the news to
                          spread south, east and north of the border. Patrons
                          travelled from all areas of Sydney to see what all
                          &quot;the fuss&quot; was about. After much success &
                          rave reviews, Criniti&apos;s decided it was time to
                          spread its wings east of the border.
                        </p>
                        <p>
                          In August of 2009 it opened their doors in
                          Sydney&apos;s east with an immaculate location in the
                          world famous Darling Harbour; cementing its position
                          as the Harbour&apos;s favourite Italian. With breath
                          taking views & ample open air terrace seating, this
                          location will please the most discerning of local and
                          international guests.
                        </p>
                        <p>
                          Open 7 days a week for breakfast, lunch & dinner,
                          Criniti&apos;s allows you to truly explore & ignite
                          your senses through the variety of crowd-pleasing
                          dishes. Inspired by traditional Criniti family
                          recipes, the menus combine traditional Southern
                          Italian & contemporary Australian cuisine to bring you
                          a unique range of flavours. Despite the deeply
                          established Southern Italian roots, Criniti&apos;s
                          caters to a range of dietary requirements including
                          vegetarian dishes. Our passionate head chef leads a
                          team driven to seek culinary excellence; &quot;our
                          philosophy is to seek the best ingredients, produced
                          by like minded suppliers with consistency,
                          sustainability & most importantly quality in
                          mind&quot;. Although our dishes maintain the use of
                          traditional Italian techniques, constant innovation
                          drives our passion to push the boundaries.{" "}
                        </p>
                        <p>
                          The experience of sharing food with family & friends
                          is one that is very sacred & should be cherished &
                          remembered, which is why at Criniti&apos;s we say,
                          when you&apos;re here, you&apos;re family… salute!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="av_location">
                    <h2 className="title fsize16 patr mbtm0 lspace2">
                      AVAILABLE AT THE BELOW LOCATIONS
                    </h2>

                    <div className="space20"></div>

                    {locations.map((location, _key) => (
                      <div className="location_bx" key={location.post_name}>
                        <Link legacyBehavior href="/locations">
                          <a>
                            <h2 className="fsize16 font600 capitalize">
                              {location.post_name}
                            </h2>

                            <div className="st_name mt-1 ddin">
                              <span>{location.acf.full_address}</span>
                            </div>
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=about`
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
