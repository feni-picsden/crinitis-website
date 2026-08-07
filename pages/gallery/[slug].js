
import Head from 'next/head'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '/components/header/PageTitle'
import GalleryImage from '/components/Gallery/GalleryImage'
import SEOHeader from '../../components/Common/SEOHeader'

export default function GalleryDetails({ page, gallery }) {

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
          subTitle={gallery.post_name} />

        <section id="lgparent" className="gallery_album pad space50">
          <div className="container">
            <div className="TemplateParent" data-lgparent>
              <div className="galleryWrap">
                <GalleryImage images={JSON.parse(gallery.acf.gallery)} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}


export async function getStaticPaths() {
  const results = await fetch(
    `https://cr.crinitis.com.au/wp-json/wp/v2/get_data?post_type=gallery`
  ).then((response) => response.json());

  const paths = results.map((post) => {
    return {
      params: { slug: post.post_name },
    };
  });

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const page = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=page&slug=gallery`
    ).then((response) => response.json());
    const gallery = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/get_post_data?post_type=gallery&slug=${params.slug}`
    ).then((response) => response.json());
    return {
      props: { page, gallery },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        page: {},
        gallery: {},
        error: true
      },
      revalidate: 60
    }
  }
}

