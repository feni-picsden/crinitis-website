import Head from 'next/head'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '../components/header/PageTitle'
import ContactUsForm from '../components/Forms/ContactUsForm'
import SEOHeader from '../components/Common/SEOHeader'

const contactbox = [
  {
    title: 'Reservations',
    time: 'Monday to Sunday 10am - 9pm',
    phone: '2 8026 7700',
    email: 'reservations@crinitis.com.au'
  },
  {
    title: 'FUNCTIONS',
    phone: '2 8026 7700',
    email: 'functions@crinitis.com.au'
  },
  {
    title: 'CAREERS',
    time: 'Monday to Sunday 9am - 10pm',
    phone: '2 8026 7700',
    email: 'careers@crinitis.com.au'
  },
  {
    title: 'MARKETING/PR/COLLABORATIONS',
    time: 'Monday to Friday 9am - 5pm',
    phone: '2 8026 7700',
  },
  {
    title: 'ACCOUNTS',
    time: 'Monday to Friday 9am - 5pm',
    phone: '2 8026 7700',
    email: 'accounts@crinitis.com.au'
  },
]

export default function ContactUs(props) {

  const { page } = props;

  return (
    <>
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

        <section className="wt_list_detail pad">
          <div className="container">
            <div className="reservation_crinit space20">
              <div className='row'>
                <div className='col-lg-8'>
                  <div className=" detail_content mb-6">
                    <div>
                      <h2 className="patr title  mbtm0 ">
                        {page.acf.big_title}
                      </h2>
                      <p className="sub_tit space10">
                        {page.acf.sub_title}
                      </p>

                      <div className="space30" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: page.content }}></div>
                    </div>
                  </div>

                  <ContactUsForm />
                </div>

                <div className='col-lg-4'>
                  {contactbox.map((contact) => (
                    <div className="call_bx" key={contact.title}>
                      <span className="patr title fsize16 title">{contact.title}</span> <br></br>
                      <p className='text-[14px] ddin'>{contact.time}</p>
                      <p className='text-[14px] ddin'>
                        <a href={"tel:+61" + contact.phone}>
                          {"0" + contact.phone}
                        </a>
                        <a href={"mailto:" + contact.email}>
                          {contact.email}
                        </a>
                      </p>
                    </div>
                  ))}
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=contact`
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