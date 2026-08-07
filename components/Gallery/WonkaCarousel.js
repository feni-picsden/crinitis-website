
import dynamic from 'next/dynamic'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });



const Images = [
  {
    imgUrl: "crinitis-20-years-kotara-newcastle-nsw-15.jpg"
  },
  {
    imgUrl: "crinitis-20-years-kotara-newcastle-nsw-18.jpg",
  },
  {
    imgUrl: "crinitis-20-years-kotara-newcastle-nsw-27.jpg",
  },
]

export default function WonkaCarousel(photos) {
  return (
    <>
      <div id="mania-carousel" className='pt-0 pb-4 md:pb-44'>
        <div className=" mx-auto">
          <div className="owl-container">
            <OwlCarousel className="owl branch_slider owl-carousel owl-theme" loop items={1} margin={30} autoplay smartSpeed={3000} autoplayTimeout={5000}
              dots={false} nav={false} mouseDrag={true} >
              {Images.map((item, key) => (
                <div className='item' key={key}>
                  <div className="item_bx">
                    <img
                      src={"/img/wonka/" + item.imgUrl}
                      className="object-cover h-80 lg:h-[40rem]"
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
