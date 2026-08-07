import Head from 'next/head'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '../components/header/PageTitle'
import EventList from '/components/Events/EventList'
import SEOHeader from '../components/Common/SEOHeader'

export default function Events(props) {
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

        <EventList />
      </div>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=events`
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
    }
  }
}