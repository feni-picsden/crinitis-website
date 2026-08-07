import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'

export default function MenuCategoryList(props) {

  return (
    <>
      <div className="row">
        {props.menus.map((menu) => (
          <div className="col-lg-4 col-md-6" key={menu.ID}>
            <div className="res_bx grid_bx trans">
              <div className="wt_img overflow-hidden">
                <Image
                  src={menu.acf.thumb_image}
                  className="img-fluid trans object-cover "
                  width={348}
                  height={348}
                  style={{ height: '348px' }} 
                  alt="Menu"
                />
              </div>

              <div className="venue_detail  p-4">
                <div>
                  <h2 className="mbtm0">
                    <span className="title patr fsize24">{menu.post_title}</span>
                  </h2>

                  <p className="location_address mbtm0 min-h-[50px]">{menu.post_content}</p>
                </div>

                <ul className="list-inline text-center space15">
                  <li>
                    <Link legacyBehavior href={menu.id == 3 ? "/locations/wetherill-park#reservation" : "/reservation"}>
                      <a className="blockbtn bgblack">
                        {props.button1_title}
                      </a>
                    </Link>
                  </li>

                  {menu?.acf?.type === 'PDF' && menu?.acf?.pdf !== null && menu?.acf?.pdf !== '' &&
                    <li>
                      <Link legacyBehavior href={`${menu.acf.pdf}`}>
                        <a className="blockbtn bgblack" target="_blank">
                          {props.button2_title}
                        </a>
                      </Link>
                    </li>
                  }

                  {menu?.acf?.type === 'Link' && menu?.acf?.link !== null && menu?.acf?.link !== '' &&
                    <li>
                      <Link legacyBehavior href={`${menu.acf.link}`}>
                        <a className="blockbtn bgblack">
                          {props.button2_title}
                        </a>
                      </Link>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
