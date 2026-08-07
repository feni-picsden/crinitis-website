
import { useState } from 'react'
import LocationPickerModal from './LocationPickerModal'

/* ponytail: hero art is fixed brand imagery now, so the ACF slider props are
   ignored. Wire them back in if marketing needs to swap it from the CMS. */
export default function Welcome({ locations = [] }) {
  const [picker, setPicker] = useState(null)

  return (
    <div id='carousel' className="hero-banner">
      <div className="hero-inner active">
        <div>
          <div>
            <div className="dsk_img">
              <img
                src="/img/banners/home-hero.jpg"
                className="img-fluid"
                width={2560}
                height={1600}
                alt="Criniti's restaurant interior"
              />
            </div>

            <div className="mb_img">
              <img
                src="/img/banners/home-hero.jpg"
                className="img-fluid"
                width={768}
                height={800}
                alt="Criniti's restaurant interior"
              />
            </div>

            <div className="carousel-caption text-center">
              <div className="flex">
                <h5 className="title mbtm0 hero-script">
                  <span>When you&#39;re here,</span>
                  <span>you&#39;re family</span>
                </h5>

                <div className="coach">
                  <button
                    type="button"
                    className="blockbtn hero-cta"
                    onClick={() => setPicker('order')}
                  >
                    ORDER NOW
                  </button>
                  <button
                    type="button"
                    className="blockbtn hero-cta"
                    onClick={() => setPicker('book')}
                  >
                    BOOK A TABLE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LocationPickerModal
        open={picker === 'book'}
        onClose={() => setPicker(null)}
        title="MAKE A RESERVATION"
        subtitle="Select your preferred restaurant to book your table."
        ctaLabel="BOOK A TABLE"
        locations={locations}
        urlKey="dashify_event_url"
        fallbackKey="dimmi_url"
      />

      <LocationPickerModal
        open={picker === 'order'}
        onClose={() => setPicker(null)}
        title="ORDER ONLINE"
        subtitle="Select your preferred restaurant to start your order."
        ctaLabel="ORDER NOW"
        locations={locations}
        urlKey="order_now_url"
      />
    </div>
  )
}
