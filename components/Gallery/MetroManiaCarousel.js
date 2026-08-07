
import dynamic from 'next/dynamic'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

// for 
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

const Images = [
  {
    imgUrl: "_Q4A5033.jpg"
  },
  {
    imgUrl: "_Q4A4972.jpg",
  },
  {
    imgUrl: "_Q4A5036.jpg",
  },
  {
    imgUrl: "_Q4A5059.jpg",
  },
  {
    imgUrl: "_Q4A4968.jpg",
  }, {
    imgUrl: "_Q4A5039.jpg",
  }

]

export default function MetroManiaCarousel(photos) {
  return (
    <>
      <div id="mania-carousel" className='pt-0 pb-14 md:pb-44 mt-12'>
        <div className=" mx-auto">
          <div className="owl-container">
            <OwlCarousel className="owl branch_slider owl-carousel owl-theme" responsive={Responsive} loop items={3} margin={30} autoplay smartSpeed={4000} autoplayTimeout={6000}
              dots={false} nav={true} mouseDrag={true} >
              {Images.map((item, key) => (
                <div className='item' key={key}>
                  <div className="item_bx">
                    <img
                      src={"/img/metromania/" + item.imgUrl}
                      className="object-cover h-96"
                      alt={item.imgUrl}
                    />
                  </div>
                </div>
              )
              )}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </>
  )
}
