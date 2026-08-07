import React, { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'

export default function LiveChat() {
  const [chatPopup, setChatPopup] = useState(false);

  function ToggleChat() {
    setChatPopup(prevState => !prevState);
  }

  return (
    <div className='fixed z-[999] right-4 bottom-6'>
      <div className={`${chatPopup ? "visible opacity-100 bottom-0" : "invisible opacity-0 -bottom-10"} z-[99] absolute transition-all duration-300 shadow-xl rounded-xl w-[350px] md:w-[360px] right-0`}>
        <div className='bg-black relative text-white !p-6 px-6 rounded-tr-xl rounded-tl-xl'>
          <img
            src="/img/logos/crinitis-logo-pridexxx.png"
            className='w-28'
            alt='Famiglia logo'
          />
          <h3 className='text-base mt-2'> Italian Restaurant - Sydney, Newcastle, Melbourne, Perth (WA) | Crinitis</h3>
          <p className='text-[13px] text-[#d7d7d7] pt-1.5'>Authentic Italian wood fired pizza and pasta in Sydney, Newcastle, Melbourne & Perth (WA). With a range of dishes from steaks & burgers, to fresh seafood & gourmet salads. Lunch, Dinner, Dessert and Cocktails!</p>

          <button
            onClick={ToggleChat}
            className="absolute right-3 top-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#c0c0c0" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className='bg-[#eee8e1]  rounded-br-xl rounded-bl p-4'>
          <div className='chat-wrap relative w-64 bg-white px-3 py-2 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17" fill="#fff" className='absolute -left-1 top-0'>
              <path d="M0.772965 3.01404C-0.0113096 1.68077 0.950002 0 2.49683 0H9V17L0.772965 3.01404Z" fill="#fff"></path>
            </svg>

            <p className='!text-[15px]'>
              Hi there 👋
            </p>
            <p className='pt-1 !text-[15px]'>
              How can I help you?
            </p>
          </div>

          <div className=' mt-8  mx-auto !flex justify-center items-center space-x-4 divide-x divide-gray-600 uppercase'>
            <Link legacyBehavior href="https://wa.me/61402412215?text=Booking%20enquiry%20from%20website">
              <a className='!flex space-x-1 text-black text-center font-medium text-sm justify-center patr items-center hover:!underline' target="_blank">
                <span className="whitespace-nowrap block">
                  Booking Enquiry
                </span>
              </a>
            </Link>

            <Link legacyBehavior href="https://wa.me/61402412215?text=Function%20booking%20enquiry%20from%20website">
              <a className='!flex space-x-1 text-black text-center font-medium text-sm justify-center patr items-center pl-3 hover:!underline' target="_blank">
                <span className="whitespace-nowrap block">
                  Event/Function Enquiry
                </span>
              </a>
            </Link>

            {/* <Link legacyBehavior href="https://wa.me/61402412215?text=Inquiry%20from%20website">
              <a  className='!flex space-x-1  text-center rounded-full font-medium py-2.5 px-4 bg-black justify-center items-center' target="_blank">
                <div className='w-9 h-6 rounded-full '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 90 90" className="w-6 h-6"><path d="M90 43.841c0 24.213-19.779 43.841-44.182 43.841a44.256 44.256 0 0 1-21.357-5.455L0 90l7.975-23.522a43.38 43.38 0 0 1-6.34-22.637C1.635 19.628 21.416 0 45.818 0 70.223 0 90 19.628 90 43.841zM45.818 6.982c-20.484 0-37.146 16.535-37.146 36.859 0 8.065 2.629 15.534 7.076 21.61L11.107 79.14l14.275-4.537A37.122 37.122 0 0 0 45.819 80.7c20.481 0 37.146-16.533 37.146-36.857S66.301 6.982 45.818 6.982zm22.311 46.956c-.273-.447-.994-.717-2.076-1.254-1.084-.537-6.41-3.138-7.4-3.495-.993-.358-1.717-.538-2.438.537-.721 1.076-2.797 3.495-3.43 4.212-.632.719-1.263.809-2.347.271-1.082-.537-4.571-1.673-8.708-5.333-3.219-2.848-5.393-6.364-6.025-7.441-.631-1.075-.066-1.656.475-2.191.488-.482 1.084-1.255 1.625-1.882.543-.628.723-1.075 1.082-1.793.363-.717.182-1.344-.09-1.883-.27-.537-2.438-5.825-3.34-7.977-.902-2.15-1.803-1.792-2.436-1.792-.631 0-1.354-.09-2.076-.09s-1.896.269-2.889 1.344c-.992 1.076-3.789 3.676-3.789 8.963 0 5.288 3.879 10.397 4.422 11.113.541.716 7.49 11.92 18.5 16.223C58.2 65.771 58.2 64.336 60.186 64.156c1.984-.179 6.406-2.599 7.312-5.107.9-2.512.9-4.663.631-5.111z"></path></svg>
                </div>

                <span className="whitespace-nowrap block text-white text-base">
                  Start Chat
                </span>
              </a>
            </Link> */}
          </div>
        </div>
      </div>

      <div
        onClick={ToggleChat}
        className={`${chatPopup ? "invisible" : ""} cursor-pointer float-btn relative rounded-full  shadow-lg}`}>
        <div className='relative z-10 px-3 w-16 h-16 py-1 text-sm text-black border-2 border-white rounded-full bg-black hover:bg-[#333] transition-all duration-300  inline-flex font-semibold md:flex items-center justify-center space-x-2'>
          <div className='rounded-full flex items-center justify-center'>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#000" viewBox="0 0 90 90" className="w-5 h-5"><path d="M90 43.841c0 24.213-19.779 43.841-44.182 43.841a44.256 44.256 0 0 1-21.357-5.455L0 90l7.975-23.522a43.38 43.38 0 0 1-6.34-22.637C1.635 19.628 21.416 0 45.818 0 70.223 0 90 19.628 90 43.841zM45.818 6.982c-20.484 0-37.146 16.535-37.146 36.859 0 8.065 2.629 15.534 7.076 21.61L11.107 79.14l14.275-4.537A37.122 37.122 0 0 0 45.819 80.7c20.481 0 37.146-16.533 37.146-36.857S66.301 6.982 45.818 6.982zm22.311 46.956c-.273-.447-.994-.717-2.076-1.254-1.084-.537-6.41-3.138-7.4-3.495-.993-.358-1.717-.538-2.438.537-.721 1.076-2.797 3.495-3.43 4.212-.632.719-1.263.809-2.347.271-1.082-.537-4.571-1.673-8.708-5.333-3.219-2.848-5.393-6.364-6.025-7.441-.631-1.075-.066-1.656.475-2.191.488-.482 1.084-1.255 1.625-1.882.543-.628.723-1.075 1.082-1.793.363-.717.182-1.344-.09-1.883-.27-.537-2.438-5.825-3.34-7.977-.902-2.15-1.803-1.792-2.436-1.792-.631 0-1.354-.09-2.076-.09s-1.896.269-2.889 1.344c-.992 1.076-3.789 3.676-3.789 8.963 0 5.288 3.879 10.397 4.422 11.113.541.716 7.49 11.92 18.5 16.223C58.2 65.771 58.2 64.336 60.186 64.156c1.984-.179 6.406-2.599 7.312-5.107.9-2.512.9-4.663.631-5.111z"></path></svg> */}
            <Image
              src="/img/logos/crinitislogo-badge.png"
              className='w-10'
              width={24}
              height={24}
              alt='Famiglia logo'
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="w-4 bottom-3 right-2 absolute">
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
            </svg>
          </div>

          {/* <div>
            <span className="whitespace-nowrap text-base tracking-wide">Live Chat</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}
