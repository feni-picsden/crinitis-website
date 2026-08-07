import Link from 'next/link'
export default function HomeBirthday({ acf = {} }) {

  return (
    <>
      <section id="birthday" className="pad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="content_bx">
                <h2 className="title">Birthdays
                  <span className="sign">Lets party</span>
                </h2>
                <div className="space40"></div>
                <p className="para" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: acf.home_birthday_package }} />
                <Link legacyBehavior href="/events">
                  <a className="vw_menu">
                    Enquire Now
                  </a>
                </Link>

              </div>
            </div>
            <div className="col-lg-6">
              <div className="content_img text-right">
                <div className="row">
                  <div className="col-12">
                    <div className="menu_img home_menu_img">
                      <img className="img-fluid" src={acf.home_birthday_package_image} alt="Birthdays" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
