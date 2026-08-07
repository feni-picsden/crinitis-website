import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '/components/PageTitle/PageTitle'

export default function BlogDetail({ post }) {
  const content = post[0];

  return (
    <>
      <Header />

      <PageTitle
        title="Blogs"
        slug="blogs"
        subTitle={content.title.rendered}
        bannerImg="blog.jpg"
         btnUrl="/reservation"
        btntext="Book Now" />

      <section className="blog-detail pad">
        <div className='container'>
          <div className='pad '>
            <div>
              <h2 className="patr title  mb-10 " dangerouslySetInnerHTML={{ __html: content.title.rendered }}>
              </h2>
              <>
                <div style={{ whiteSpace: 'pre-wrap' }}  dangerouslySetInnerHTML={{ __html: content.content.rendered }}></div>
              </>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const results = await fetch(
    "https://cr.crinitis.com.au/wp-json/wp/v2/blog?per_page=100"
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
    const post = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/blog?slug=${params.slug}`
    ).then((response) => response.json());

    return {
      props: { post: post },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        post: [],
        pageKey: new Date().toString(),
        error: true
      },
      revalidate: 60
    }
  }

}