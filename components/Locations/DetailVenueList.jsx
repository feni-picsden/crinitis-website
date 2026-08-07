import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LocationData from "/components/Locations/LocationData";

export default function DetailVenueList() {
  const [items, setItems] = useState(LocationData);

  return (
    <div className="row">
      {items.map((location) => (
        <div className="col-lg-4 col-md-6" key={location.name}>
          <div className="venue_bx grid_bx trans">
            <div className="venue_img">
              <Image
                src={location.imageUrl}
                className="img-fluid trans"
                width={348}
                height={348}
                alt="DARLING HARBOUR"
              />
            </div>

            <div className="venue_detail grid_cat">
              <h2 className="mbtm0">
                <span className="title patr fsize24">{location.name}</span>
              </h2>
              <p className="location_address mbtm0">{location.address}</p>

              <div className="open_hour">
                <div className="mbtm0 flex hr_badge">
                  <Image
                    src="/img/icon/hour.png"
                    className="img-fluid trans"
                    width={20}
                    height={20}
                    alt="Clock  Icon"
                  />

                  <span>Opening Hours</span>

                  <div className="hour_bx trans">
                    <ul className="list-unstyled">
                      <li>
                        <h2>OPENING HOURS</h2>
                        <p>
                          <span>Mon - Thu</span>
                          <span>11:00am - 9:30pm</span>
                        </p>
                        <p>
                          <span>Fri - Sat</span>
                          <span>11:00am - 9:30pm</span>
                        </p>
                        <p>
                          <span>Sun</span>
                          <span>11:00am - 9:30pm</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <ul className="list-inline text-center space15">
                <li>
                  <Link legacyBehavior href={location.mapUrl}>
                    <a className="blockbtn bgblack" target="_blank">
                      View on map
                    </a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href={location.bookNowUrl}>
                    <a className="blockbtn bgblack">Book Now</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
