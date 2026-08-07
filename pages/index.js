import Head from 'next/head'
import Header from '/components/header/header'
import HomePopup from '/components/Home/HomePopup'
import Hero from '/components/Home/Hero'
import Welcome from '/components/Home/HomeWelcome'
import HomeLocationSlider from '/components/Home/HomeLocationSlider'
import HomeMenu from '../components/Home/HomeMenu'
import HomeFooterImage from '/components/Home/HomeImageBackground'
import HomeBirthday from '/components/Home/HomeBirthday'
import Footer from '/components/Footer/Footer'
import dynamic from 'next/dynamic'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Script from 'next/script'
import { schemaData } from '../data/schema';
import SEOHeader from '../components/Common/SEOHeader'

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const Responsive = {
  0: {
    items: 1
  },
  400: {
    items: 1
  },
  740: {
    items: 2
  },
  940: {
    items: 2
  },
  1199: {
    items: 3
  },
  1450: {
    items: 4
  },
  1600: {
    items: 5
  }
};


export default function Home(props) {

  const { page, locations } = props; 
 
  return (
    <>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-7FR3EJ986G`}></Script>
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
        <title>Criniti's</title>
        <meta name="facebook-domain-verification" content="e5lndead9f94d02mgo04p7cr4w70wl" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      </Head>

      <Header />

      <HomePopup
        home_popup_link={page.acf.home_popup_link}
        home_popup_image={page.acf.home_popup_image} />

      <Hero locations={locations} />

      <Welcome />

      <section id="our_branch">
        <div className="row">
          <div className="col-md-12">
            <div className="owl-container">
              <OwlCarousel className="owl branch_slider owl-carousel owl-theme" responsive={Responsive} loop items={4} margin={30} autoplay smartSpeed={4000} autoplayTimeout={6000}
                dots={false} nav={true} mouseDrag={true} >
                {locations.map((location, key) => (
                  <HomeLocationSlider key={key} location={location}
                  />
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>

      <HomeMenu home_images = {page.acf.add_menus_mangia_image}/>

      <HomeFooterImage />

      <HomeBirthday acf={page.acf} />

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=home`
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
