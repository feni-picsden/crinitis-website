
import dynamic from 'next/dynamic'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const Responsive = {
  0: {
    items: 1
  },
  740: {
    items: 2
  },
  1600: {
    items: 3
  },
  2000: {
    items: 3
  }
};

export default function LocationGalleryCarousel({photos}) {
  return (
    <>
      <div id="events-carousel" className='pt-0 pb-14 md:pb-44'>
        <div className=" mx-auto">
          <div className="owl-container">
            <OwlCarousel className="owl branch_slider owl-carousel owl-theme" responsive={Responsive} loop items={3} margin={30} autoplay smartSpeed={4000} autoplayTimeout={6000}
              dots={false} nav={true} mouseDrag={true} >
              {photos.map((item, key) => (
  <div className='item' key={key}>
    <div className="item_bx">
      <img src={item.url} alt={item.title} className="object-cover h-96" />
    </div>
  </div>
))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </>
  )
}
