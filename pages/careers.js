import React from 'react';
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '/components/PageTitle/PageTitle'
import CareerList from '/components/Careers/CareerList'

export default function ContactUs() {

  return (
    <>

      <Header />
      <div id="events">
        <PageTitle
          title="Contact"
          bannerImg="contact-crinitis.jpg"
          btntext="Join la famiglia" 
          btnUrl="/careers"
          />

        <section className="career pad">
          <div className="container">
            <div className="career-list">
              <div className='row'>
                <div className='col-lg-12'>
                  <div className=" detail_content">
                    <div>
                      <h2 className="patr title  mbtm0 ">JOB OPPORTUNITIES</h2>
                      <p className="sub_tit space10">contact the team</p>

                      <div className="summary space30">
                        <p>We’d love to hear from you!</p>
                        <p>Grow your career with Crinitis.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <form className='md:flex mt-6 gap-5 space-y-4 md:space-y-0 bg-gray-50  shadow-sm p-4 border border-gray-200 justify-between  items-end search-bar'>
                <div className='w-full'>
                  <label className='text-base'>Category</label>
                  <div className="select-box">
                    <select>
                      <option>Category</option>
                      <option>Waitstaff</option>
                      <option>Supervisor/Assistant Manager</option>
                      <option>Bartender/Server</option>
                      <option>Bar Manager</option>
                      <option>Chef/Cook/Breakfast Chef</option>
                      <option>Venue Manager</option>
                      <option>Assistant Manager</option>
                      <option>Restaurant Host/Hostess</option>
                    </select>
                  </div>
                </div>

                <div className='w-full'>
                  <label className='text-base'>Location</label>
                  <div className="select-box">
                    <select>
                      <option>Location</option>
                      <option>Castle Hill NSW</option>
                      <option>Darling Harbour NSW</option>
                      <option>Parramatta NSW</option>
                      <option>Wetherill Park NSW</option>
                      <option>Castle Hill NSW</option>
                      <option>Southbank VIC</option>
                      <option>Kotara NSW</option>
                      <option>Perth WA</option>
                    </select>
                  </div>
                </div>

                <div className='w-full'>
                  <label className='text-base'>Work Type</label>
                  <div className="select-box">
                    <select>
                      <option>Work Type</option>
                      <option>Part-time</option>
                      <option>Full-time</option>
                      <option>Permanent</option>
                    </select>
                  </div>
                </div>

                <div className='fle items-end'>
                  <button className="blockbtn w-full text-lg md:text-base">
                    Search
                  </button>
                </div>
              </form>

              <CareerList />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
