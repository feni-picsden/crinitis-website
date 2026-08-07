export default function HomeFooterImage() {

  return (
    <>
      <section id="plain_banner" className="footer_banner h-[40rem] bg-fixed hidden lg:block" style={{ backgroundImage: 'url(/img/banners/last-banner-homepage.jpg)' }}>
      </section>
      <section id="plain_banner" className=" lg:hidden">
        <img src='/img/banners/last-banner-homepage-mobile.jpg' alt="Events at Criniti's" className="img-responsive" />
      </section>
    </>
  )
}

