
import Head from 'next/head'
import Link from 'next/link'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '/components/header/PageTitle'
import GalleryCarousel from '/components/Gallery/GalleryCarousel'
import SEOHeader from '../../components/Common/SEOHeader'

export default function LocationDetails({ post, page, locationGallery }) {

  const content = post[0];
  const locGallery = locationGallery[0];

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
          subTitle={content.title.rendered} />

        <section className="location_detail pad">
          <div className="container">
            <div className="row  space30">
              <div className="col-md-8">
                <h2 className="patr title mbtm0">{content.acf.location_title}</h2>
                <p className="text-[18px] text-[#333333] font-bold space10 flex">
                  {content.acf.location_sub_title}
                </p>
                <div>
                  <div className='mt-4'>
                      <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: content.acf.short_description }}></div>
                  </div>

               
                </div>
                <div>
                </div>
              </div>

              <div className="col-md-4">

                <div className="call_bx">
                  <span className="patr title fsize16 title">Opening hours</span> <br></br>
                  <div className='text-[14px] ddin mt-1'>
                    {JSON.parse(content.acf.opening_hours).map((location, key) => (
                      <span key={key}>{location.label}: {location.value} <br></br></span>
                    ))}
                  </div>
                  <div>
                    <ul className="list-inline  mt-6 mb-2">
                      <li>
                        <Link legacyBehavior href="#reservation">
                          <a className="blockbtn bgblack block">
                            Book A Table
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link legacyBehavior href={content.acf.order_now_url}>
                          <a target="_blank" className="blockbtn bgblack block">
                            Order Now
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="call_bx">
                  <span className="patr title fsize16 title">Phone and Email</span> <br></br>

                  <p className='text-[14px] ddin mt-1'>
                    <a href={`tel:+61${content.acf.phone_number}`}>
                      {content.acf.phone_number}
                    </a>
                    <a href={`mailto:${content.acf.email_address}`}>
                      {content.acf.email_address}
                    </a>
                  </p>
                </div>
                <div className='bg-[#f9f9f9] text-center mt-3'>
                  {/* {`${content.acf.google_map_address}`} */}
                  <div className='grayscale'>
                    {content.slug == 'brighton-le-sands' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.1451013205283!2d151.1556475!3d-33.9631098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b7bf98cc801d%3A0x9569e7cb3fc19129!2sCriniti&#39;s%20Brighton-Le-Sands!5e0!3m2!1sen!2sin!4v1674544113582!5m2!1sen!2sin" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.1451013205283!2d151.1556475!3d-33.9631098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12b7bf98cc801d%3A0x9569e7cb3fc19129!2sCriniti&#39;s%20Brighton-Le-Sands!5e0!3m2!1sen!2sin!4v1674544113582!5m2!1sen!2sin" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }

                    {content.slug == 'parramatta' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.0201344707207!2d151.00204511553395!3d-33.81179348067203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a31e88df4da1%3A0x6be4d2738ad67a23!2sCriniti&#39;s%20Parramatta!5e0!3m2!1sen!2sau!4v1674785513761!5m2!1sen!2sau" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.0201344707207!2d151.00204511553395!3d-33.81179348067203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a31e88df4da1%3A0x6be4d2738ad67a23!2sCriniti&#39;s%20Parramatta!5e0!3m2!1sen!2sau!4v1674785513761!5m2!1sen!2sau" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }

                    {content.slug == 'castle-hill' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.0903484616465!2d151.00250621553232!3d-33.732479780694206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a10c0050146b%3A0x1eeb9e5fa68d2ed5!2sCriniti&#39;s%20Castle%20Hill!5e0!3m2!1sen!2sau!4v1674785432162!5m2!1sen!2sau" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.0903484616465!2d151.00250621553232!3d-33.732479780694206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a10c0050146b%3A0x1eeb9e5fa68d2ed5!2sCriniti&#39;s%20Castle%20Hill!5e0!3m2!1sen!2sau!4v1674785432162!5m2!1sen!2sau" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }

                    {content.slug == 'wetherill-park' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.245831567146!2d150.89668481553502!3d-33.85755488065935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12970c4b9450eb%3A0x8ad0f1d3b912bae9!2sCriniti&#39;s%20Wetherill%20Park!5e0!3m2!1sen!2sau!4v1674785370827!5m2!1sen!2sau" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.245831567146!2d150.89668481553502!3d-33.85755488065935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12970c4b9450eb%3A0x8ad0f1d3b912bae9!2sCriniti&#39;s%20Wetherill%20Park!5e0!3m2!1sen!2sau!4v1674785370827!5m2!1sen!2sau" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }

                    {content.slug == 'kotara' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.3678296791672!2d151.70921051551485!3d-32.94129678092277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b7315e334da2ae9%3A0xe1253b395ab6ca50!2sCriniti&#39;s%20Kotara!5e0!3m2!1sen!2sau!4v1674785290661!5m2!1sen!2sau" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.3678296791672!2d151.70921051551485!3d-32.94129678092277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b7315e334da2ae9%3A0xe1253b395ab6ca50!2sCriniti&#39;s%20Kotara!5e0!3m2!1sen!2sau!4v1674785290661!5m2!1sen!2sau" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }

                    {content.slug == 'carlton' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.6392885313594!2d144.96568061562778!3d-37.79849237975508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642d692423417%3A0x733f5c849810744c!2sCriniti&#39;s%20Carlton!5e0!3m2!1sen!2sau!4v1674785207654!5m2!1sen!2sau" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.6392885313594!2d144.96568061562778!3d-37.79849237975508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642d692423417%3A0x733f5c849810744c!2sCriniti&#39;s%20Carlton!5e0!3m2!1sen!2sau!4v1674785207654!5m2!1sen!2sau" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }

                    {content.slug == 'southbank' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.660522069971!2d144.96005371562825!3d-37.82141987975096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b2a3cf0ed3%3A0x343ede01bed4f991!2sCriniti&#39;s%20Southbank!5e0!3m2!1sen!2sau!4v1674784507241!5m2!1sen!2sau" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.660522069971!2d144.96005371562825!3d-37.82141987975096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b2a3cf0ed3%3A0x343ede01bed4f991!2sCriniti&#39;s%20Southbank!5e0!3m2!1sen!2sau!4v1674784507241!5m2!1sen!2sau" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }

                    {content.slug == 'carousel' ?
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.8112129905!2d115.93595481549485!3d-32.02022718120706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bc2c5bb7448f%3A0xa4d813038483cac4!2sCriniti&#39;s%20Carousel!5e0!3m2!1sen!2sau!4v1674784438933!5m2!1sen!2sau" data-attr-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.8112129905!2d115.93595481549485!3d-32.02022718120706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bc2c5bb7448f%3A0xa4d813038483cac4!2sCriniti&#39;s%20Carousel!5e0!3m2!1sen!2sau!4v1674784438933!5m2!1sen!2sau" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      : ''
                    }
                  </div>
                </div>
              </div>
               {(content.acf.dashify_event_url !== null && content.acf.dashify_event_url !== "" ) &&
              <div className="col-md-12">
                 <div id="reservation" className='mt-10'>
                    <iframe data-id="nbi-widget" width="100%" height="1150" src={`${content.acf.dashify_event_url}`}></iframe>
                  </div>
              </div>
              }
            </div>

            {locGallery?.acf?.gallery != null ?
              <>
                <div className='mt-10'>
                  <h2 className="patr uppercase mb-3 text-black text-3xl">Food & Gallery</h2>
                  <GalleryCarousel
                    photos={JSON.parse(locGallery?.acf?.gallery)} />
                </div>
              </>
              : ''
            }

          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const results = await fetch(
    "https://cr.crinitis.com.au/wp-json/wp/v2/location?per_page=10"
  ).then((response) => response.json());

  const paths = results.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=locations`
    ).then((response) => response.json());

    const post = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/location?slug=${params.slug}`
    ).then((response) => response.json());

    const locationGallery = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/gallery?slug=${params.slug}`
    ).then((response) => response.json());

    return {
      props: { post: post, page, locationGallery },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        post: [],
        page: {},
        locationGallery: [],
        error: true
      },
      revalidate: 60
    }
  }

}

