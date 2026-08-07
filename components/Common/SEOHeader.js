
export default function SEOHeader({ acf = {} }) {

  return (
    <>
      <title>{acf.header_title}</title>
      <meta name="title" content={acf.header_title} />
      <meta name="description" content={acf.header_description} />
      <meta name="keywords" content={acf.header_keywords} />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={acf.header_title} />
      <meta itemProp="description" content={acf.header_description} />
      <meta itemProp="image" content="/img/crinitis-logo.png" />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content="https://crinitis.com.au" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={acf.header_title} />
      <meta property="og:description" content={acf.header_description} />
      <meta property="og:image" content="/img/crinitis-logo.png" />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={acf.header_title} />
      <meta name="twitter:description" content={acf.header_description} />
      <meta name="twitter:image" content="/img/crinitis-logo.png"></meta>

      {/* <!-- Domain verification with Pinterest --> */}
      <meta name="p:domain_verify" content="987f21ff728534cf7e620898313f8a3f" />

      <link rel="apple-touch-icon" href="/img/crinitis-logo.png"></link>
    </>
  )
}
