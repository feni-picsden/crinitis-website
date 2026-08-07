import { React, useState, useEffect } from "react";
import { FaCircleXmark, FaChevronRight, FaChevronLeft } from "react-icons/fa6";

export default function GalleryImage({ images }) {
    const { gallery = [] } = images;
    const [slideNumber, setSlideNumber] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [index, setIndex] = useState(0)

    const handleOpenModal = (index) => {
        setSlideNumber(index)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const prevSlide = () => {
        slideNumber === 0
            ? setSlideNumber(images.length - 1)
            : setSlideNumber(slideNumber - 1)
    }


    const nextSlide = () => {
        slideNumber + 1 === images.length
            ? setSlideNumber(0)
            : setSlideNumber(slideNumber + 1)
    }

    if (!images) {
        return '';
    }

    return (
        <div>
            {
                openModal &&
                <div className='sliderWrap transition duration-300'>
                    <FaCircleXmark className='btnClose' onClick={handleCloseModal} />
                    <FaChevronLeft className='btnPrev' onClick={prevSlide} />
                    <FaChevronRight className='btnNext' onClick={nextSlide} />
                    <div className='fullScreenImage'>
                        <img src={images[slideNumber].url} alt="Gallery Image" />
                    </div>
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {images.map((item, i) =>
                (
                    <div className="TemplateParent-Item relative" key={i} onClick={() => handleOpenModal(index)} >
                        <img src={item.url} className="img-fluid h-80 object-cover trans" alt="Gallery Image" />

                        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 icon-overlay rounded-md cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                        </div>
                    </div>
                )
                )}
            </div>
        </div>
    )
}