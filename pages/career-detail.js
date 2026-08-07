import Head from 'next/head'
import Image from 'next/image'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '/components/PageTitle/PageTitle'

export default function CareerDetail() {
  return (
    <>

      <Header />
      <div id="events">
        <PageTitle
          title="LA FAMIGLIA"
          bannerImg="la-famiglia-2560x900.jpg"
           btnUrl="/birthday-package"
          btntext="Birthday package" />


        <section className="career-detail pad">
          <div className="container">
            <div className="reservation_crinit ">
              <div className='row'>
                <div className='col-md-8'>
                  <div className=" detail_content ">
                    <div>
                      <h2 className="patr title  mbtm0 ">Waitstaff</h2>
                      <p className="sub_tit">
                        Crinitis Group - Castle Hill NSW
                        <span className="block space10">$21 - $28 an hour</span>
                      </p>


                      <div className="summary space30">
                        <p>
                          Wait Staff will start from the position of runner, with constant learning and customer service progress to order taker, representing the face of the company, must have a strong customer focus in all tasks, keeping in mind that they may be the only staff the customer has
                          interaction with. ensuring customer satisfaction. Your responsibilities will be not limited to those items described below.
                        </p>

                        <p className='mt-3'>
                          Key Responsibilities & Accountabilities:
                        </p>


                        <ul className='key-point'>
                          <li>Ensure adherence to company policy and procedures in regards to the reliability, punctuality, efficiency and smooth functioning of the restaurant.</li>
                          <li>Create smooth, efficient, happy and informative experience for customers</li>
                          <li>Prepare tables for customers, greet all customers coming to restaurants and present menu to customers and administer orders for all.</li>
                          <li>Understand and expand knowledge on available items on menu and side dishes and ensure optimal level of services to customers.</li>
                          <li>Assist customers to select appropriate side dishes and drinks and communicate any special requirement of staff to kitchen.</li>
                          <li>Ensure appropriate record of customer orders to ensure no billing discrepancies.</li>
                          <li>Provide assistance and administer all cleaning as per cleaning schedule.</li>
                          <li>Develop and maintain friendly relationshi p with regular patrons of restaurant.</li>
                          <li>Manage and ensure appropriate resolution of all customer queries.</li>
                          <li>Coordinate with kitchen staff and customers and ensure timely delivery of all services.</li>
                        </ul>

                        <p className='mt-3'>
                          Capabilities:
                        </p>

                        <ul className='key-point'>
                          <li>Great customer service and communication skills</li>
                          <li>Strong work ethic</li>
                          <li>Positive attitude, enthusiastic personality and winning smile</li>
                          <li>Immaculate personal grooming and presentation</li>
                          <li>Demonstration of organisation behaviour and values</li>
                          <li>Adhering to Trust and Teamwork</li>
                        </ul>

                        <div className='mt-3'>
                          <p>Job Types: Part-time, Casual</p>
                          <p>Salary: $21.00 – $28.00 per hour</p>
                        </div>


                        <p className='mt-3'>
                          Schedule:
                        </p>

                        <ul className='key-point'>
                          <li>Day shift</li>
                          <li>Evening shift</li>
                          <li>Weekend availability</li>
                        </ul>

                        <p className='mt-3'>
                          Experience:
                        </p>

                        <ul className='key-point'>
                          <li>Customer service: 1 year (Preferred)</li>
                        </ul>

                        <p className='mt-3'>
                          Work Authorisation:
                        </p>

                        <ul className='key-point'>
                          <li>Australia (Preferred)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-md-4 mt-4 md:mt-0">
                  <div className="call_bx">
                    <p>Select the Criniti&#39;s Restaurant you would like to book from below & follow the
                      prompts</p>

                    <a href="#" className="blockbtn bgblack space20" title="Call Us">
                      Apply Now
                    </a>
                  </div>

                  <div className="space20"></div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
