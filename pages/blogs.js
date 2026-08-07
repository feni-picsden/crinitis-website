import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '/components/PageTitle/PageTitle'

export default function Blogs(props) {

  const { blogs = [], pageKey } = props;


  return (
    <>
      <Header />
      <section className="blog-list pad">
        <PageTitle
          title="Blogs"
          bannerImg="blog.jpg"
          btnUrl="/reservation"
          btntext="Book A Table" />

        <div className='pad space30'>
          <div className="container">
            <div className="row" key={pageKey}>
              {blogs.map((blog, key) => (
                <div key={key} className="col-lg-4 col-md-6 flex">
                  <Link legacyBehavior href={`/blogs/${blog.slug}`}>
                    <div className="venue_bx grid_bx trans">
                      <div className="venue_img overflow-hidden">
                        <Image
                          src={blog._embedded['wp:featuredmedia']['0'].source_url}
                          className="img-fluid trans object-cover"
                          width={600}
                          height={348}
                          style={{ height: '348px' }} 
                          alt={blog.title.rendered} />
                      </div>

                      <div className="venue_detail grid_cat p-3">
                        <h2 className="mbtm0 leading-[22px] mb-2 min-h-[56px]">
                          <span className="title patr fsize20" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: blog.title.rendered }}></span>
                        </h2>

                        <p className="mt-2 text-[#717171] text-[12px] leading-[20px]">
                          <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered.substring(0, 100) }}></div>
                        </p>

                        <ul className="list-inline  space10">
                          <li className='p-0'>
                            <Link legacyBehavior href={`/blogs/${blog.slug}`}>
                              <a className="blockbtn bgblack">
                                Read More
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const blogs = await fetch(
      `https://cr.crinitis.com.au/wp-json/wp/v2/blog?_embed&per_page=100`
    ).then((response) => response.json());

    const pageKey = new Date();
    return {
      props: { blogs: blogs, pageKey: pageKey.toString() },
      revalidate: 60,
    };
  }   catch (err) {
    return {
      props: {
        blogs: [],
        pageKey: new Date().toString(),
        error: true
      },
      revalidate: 60
    }
  }
}
