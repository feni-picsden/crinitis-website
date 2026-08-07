import Head from "next/head";
import Header from "/components/header/header";
import Footer from "/components/Footer/Footer";
import PageTitle from "../components/header/PageTitle";
import EventBookingBlock from "../components/Events/EventBookingBlock";
import SEOHeader from "../components/Common/SEOHeader";

export default function EventBooking(props) {
  const { page, locations } = props;

  return (
    <>
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
                <h2 className="patr title  mbtm0 ">{page.acf.big_title}</h2>
                <p className="sub_tit space10">{page.acf.sub_title}</p>

                <div className="summary space30">
                  <p>
                    We&apos;re excited to celebrate your special day with you!
                  </p>
                  <p>
                    To complete your booking, simply fill out the following
                    deposit form below.
                  </p>

                  <ul className="list-disc pl-4">
                    <li>
                      Please ensure you have confirmed availability for your
                      reservation of 10+ guests with the reservations team &amp;
                      you have thoroughly read over the following information
                      before completing &amp; submitting this form.
                    </li>
                    <li>
                      Booking Deposit &amp; Payment. To secure your event
                      booking a deposit of $350 or $500.00 is required for
                      reservations of 20 – 39 guests and a deposit of $1000.00
                      for 40+ guests.
                    </li>
                    <li>
                      Please complete the following Deposit Form to make
                      payment. The final payment can be paid in full on the day
                      of your event, less the deposit amount. This deposit is
                      non-refundable (with exception to the cancellation policy)
                      &amp; will not be reimbursed in any other format
                    </li>
                    <li>
                      The amount will strictly only be deducted from the final
                      bill at your event
                    </li>
                    <li>
                      Please note, deposits cannot be paid with gift cards
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="reservation_crinit space50">
              <div className="row">
                {locations.map((location, key) => (
                  <EventBookingBlock
                    key={key}
                    location={location}
                    Butoon1text="View on Map"
                    Butoon2text=" Book Event"
                  />
                ))}
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=event-booking`
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
