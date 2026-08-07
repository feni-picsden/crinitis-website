import Head from 'next/head'
import Image from 'next/image'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '../components/header/PageTitle'
import JoinForm from '../components/Forms/JoinForm'
import LoyaltyCard from '../components/Forms/LoyaltyCard'
import SEOHeader from '../components/Common/SEOHeader'

export default function LaFamiglia(props) {
  const { page } = props;
  const { fillable } = true;
  const contentWithoutImages = props.page.content;


  return (
    <>
      <Head>
        <SEOHeader acf={page.acf} />
      </Head>

      <Header />
      <div id="events">

        <PageTitle
          title="LA FAMIGLIA"
          bannerImg={page.acf.page_banner}
          btntext={page.acf.pr_button_text}
          btnUrl={page.acf.pr_button_url} />

        <section className="la-famglia pad">
          <div className="container">
            <div className="reservation_crinit space20">
              <div className='row'>
                {/* <div className='col-lg-8'>
                  <div className=" detail_content ">
                    <div>
                      <h2 className="patr title  mbtm0 ">{page.acf.big_title} </h2>
                      <p className="sub_tit space10">{page.acf.sub_title} </p>

                      <div className="space30" dangerouslySetInnerHTML={{ __html: page.content }}></div>
                    </div>
                  </div>

                  <div className='space50'></div>
                  <JoinForm />
                </div> */}
                    {/* <div className="col-md-8">
                  <div className="trans text-center h-100 ">
                    <div className = "flex align-items-center justify-content-center h-100 ">
                      <Image
                        src="/img/lafamiglia.jpg"
                        className="img-fluid trans mobile-mb-10"
                        width={620}
                        height={448}
                        fill={fillable ? 1 : 0}
                        alt="Criniti's La Famiglia"
                      />
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-md-8">
                <div
              style={{
                overflow: "hidden",
                marginTop: "0px",
                mixBlendMode: "multiply",
              }}
            >
              <iframe
                src="https://app.squareup.com/loyalty/MLGSKJY8DHNCQ"
                width="100%"
                height="800px"
                style={{
                  overflowY: "hidden",
                  // marginTop: "-105px",
                }}
                className="gift-card-box"
              ></iframe>
            </div> */}
            {/* </div> */}
            <div className="col-md-8 right-line"> 
                <LoyaltyCard />
            </div>
                <div className="col-md-4">
                 

                  {/* <div className="space20"></div> */}

                  <div className="trans text-center h-100">
                      <Image
                        src="/img/logo-la-famiglia.png"
                        className="img-fluid trans img-height"
                        width={348}
                        height={458}
                        fill={fillable ? 1 : 0}
                        alt="Criniti's La Famiglia"
                      />
                  </div>
                </div>
              </div>
              <div className="space30" dangerouslySetInnerHTML={{ __html: contentWithoutImages }}></div>
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
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=la-famiglia-vip-membership/`
    ).then((response) => response.json());

    // WP returns a 404 JSON body (not an HTTP throw) when the page is missing,
    // so acf is absent and the render below would crash the whole build.
    if (!page?.acf) {
      return { notFound: true, revalidate: 60 };
    }

    return {
      props: { page },
      revalidate: 60,
    };
  } catch (err) {
   return {
      props: {
        page: {},
        error: true
      },
      revalidate: 60
    }
  }
}