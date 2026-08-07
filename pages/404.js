import React from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from '/components/header/header'
import Footer from '/components/Footer/Footer'
import PageTitle from '/components/PageTitle/PageTitle'
import CareerList from '/components/Careers/CareerList'

export default function ContactUs() {

  return (
    <>
      <Header />
      <div id="error">
        <PageTitle
          title="404"
          bannerImg="404.jpg"
          btnUrl="/join-la-famiglia"
          btntext="Join la famiglia" />

        <section className="career  pad">
          <div className="mx-auto max-w-max">
            <div className="flex py-36  items-center">
              <div>
                <div className="sm:flex h-full  items-center">
                  <p className="text-4xl font-bold tracking-tight  patr text-red-600 sm:text-7xl -mt-8">404</p>
                  <div className="sm:ml-6">
                    <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                      <h1 className="text-3xl font-bold patr tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                      <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-center space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <ul className="list-inline space-x-2 text-center space15">
                    <li>
                      <Link legacyBehavior href="/whats-on">
                        <a className=" bg-red-600 text-[#fff] hover:text-[#fff] patr text-lg uppercase py-2.5  px-8 hover:bg-black">
                          What&apos;s On
                        </a>
                      </Link>
                    </li>
                    <li>

                      <Link legacyBehavior href="/menu">
                        <a className=" bg-black text-[white] hover:text-[#fff] patr text-lg uppercase py-2.5  px-8 hover:bg-red-600">
                          View Menu
                        </a>
                      </Link>
                    </li>
                  </ul>
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
