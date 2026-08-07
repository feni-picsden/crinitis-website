import React, { useState, useRef } from 'react';
import MenuData from '/components/Menu//MenuData'
import MenuFilter from '/components/Menu/MenuFilter'
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

export default function MenuList() {
  const [sticky, setSticky] = useState(false);

  const addStickyClass = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY >= 50) {
        setSticky(true);
      }
      else {
        setSticky(false);
      }
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener("scroll", addStickyClass);
  }


  const [items, setItems] = useState(MenuData);

  return (
    <>
      <Tab.Group>
        <Tab.List className={`${sticky ? "sticky" : ""} flex top-20 bg-white z-10 justify-center py-4 border-b border-gray-200 space-x-6`}>
          {
            items.map((item) => (
              <Tab as={Fragment} key={item}>
                {({ selected }) => (
                  <button
                    className={`${selected ? 'bg-black text-white' : ''} px-3 md:px-6 py-1.5  inline-block text-center text-sm md:text-base font-bold focus:outline-none tracking-wide  uppercase border-3  transtion duration-300 
                        `}
                  >
                    {item.cateroryName}
                  </button>
                )}
              </Tab>
            ))
          }
        </Tab.List>

        <MenuFilter />

        <Tab.Panels>
          {
            items.map((item) => (
              <Tab.Panel key={item}>
                <div className={`${sticky ? "sticky" : ""} top-16 category-nav top-sticky md:top-20 lg:top-40 z-10 shadow-md text-gray-500 font-semibold  bg-white  py-2 md:py-4  flex justify-center uppercase space-x-4 md:space-x-8  tracking-widest text-sm md:text-sm font-championfeather`}>
                  {
                    item.subCategories.map((cat, i) => (
                      <Link legacyBehavior
                        activeClass="active"
                        to={cat.name}
                        spy={true}
                        smooth={true}
                        offset={-225}
                        duration={500}
                        key={i}
                      >
                        <span className='cursor-pointer'>{cat.name}</span>
                      </Link>
                    ))
                  }
                </div>

                {
                  item.subCategories.map((cat, j) => (
                    <div id={cat.name} title={cat.name} className='mt-16 px-32' key={j} >
                      <div className='flex justify-between border-l-4 border-red-600 py-2 px-3'>
                        <h3 className='uppercase tracking-widest text-xl m-0 font-semibold'>
                          {cat.name}
                        </h3>
                      </div>

                      <div className='flex'>
                        <div className='w-2/12 mt-6 mr-6'>
                          <div className='h-full flex relative overflow-hidden'>
                            <img
                              src={`${"img/menu/" + cat.imgUrl}`}
                              width="100%"
                              height="100%"
                              className='object-cover'
                              alt="Menu"
                            />
                          </div>
                        </div>

                        <div className='w-10/12'>
                          <ul className='mt-6 gap-6 grid md:grid-cols-2 2xl:grid-cols-3 items-stretch justify-items-stretch'>
                            {
                              cat.itemData.map((fItem, k) => (
                                <li key={k} className='text-black-light menu-box  border border-gray-100'>

                                  <div className="items-center flex justify-between p-3">
                                    <div className="right-aside flex items-start">
                                      <h4 className="item-name text-black text-xl font-semibold">{fItem.itemName}</h4>
                                    </div>

                                    <div className="left-aside">
                                      <div className="inner_left">
                                        <h5 className="item-price text-lg">{fItem.itemPrice}</h5>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="item-ingri px-3 pb-3">
                                    {fItem.itemDescription}
                                  </div>

                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </Tab.Panel>
            ))
          }
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
