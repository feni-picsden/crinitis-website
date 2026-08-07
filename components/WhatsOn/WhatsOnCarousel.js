
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


export default function WhatsOnCarousel({ images }) {
  const parsedImages = typeof images === "string"
  ? JSON.parse(images)
  : images;
  const formattedImages = parsedImages.map((url, index) => ({
  url,
  title: `image-${index}`
}));

  console.log(formattedImages)

  return (
    <>
      <div className='pb-14 pt-14 md:pb-10'>
        <div className=" mx-auto">
          <div className="owl-container">
            <OwlCarousel className="owl branch_slider owl-carousel owl-theme" responsive={Responsive} loop items={3} margin={30} autoplay smartSpeed={4000} autoplayTimeout={6000}
              dots={false} nav={true} mouseDrag={true} >
              {formattedImages.map((item, key) => (
                <div className='item' key={key}>
                  <div className="item_bx">
                    <img
                      src={item.url}
                      className="object-cover h-96"
                      alt={item.title}
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
