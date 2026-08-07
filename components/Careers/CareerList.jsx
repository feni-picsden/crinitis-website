import React, { useState } from "react";
import Link from "next/link";
import CareerData from "../Careers/CareerData";

export default function CareerList() {
  const [items, setItems] = useState(CareerData);

  return (
    <>
      <div className="job-list mt-9">
        <ul
          role="list"
          className="divide-y grid lg:grid-cols-2 gap-6 divide-gray-200"
        >
          {items.map((elem) => (
            <li key={elem.title}>
              <Link legacyBehavior href="/career-detail">
                <a className="block shadow-md rounded-md border h-full border-gray-100 hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="md:flex w-full items-center justify-between">
                      <h3 className="text-xl 2xl:text-2xl font-medium patr text-black">
                        {elem.title}
                      </h3>

                      <div className="md:ml-2 md:mt-0 mt-1 mb-1 md:mb-0">
                        <p className="px-2 inline-flex mb-0 text-xs 2xl:text-sm tracking-wider leading-5 font-semibold  bg-gray-200 text-gray-500">
                          {elem.jobType}
                        </p>
                      </div>
                    </div>

                    <div className="sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="mt-1 flex items-center text-sm text-gray-500">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {elem.location}
                        </p>
                      </div>
                    </div>

                    <div className="short-desc">
                      <p className="mt-2 mb-0">{elem.description}</p>

                      <span className="block mt-2 text-gray-500">More...</span>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
