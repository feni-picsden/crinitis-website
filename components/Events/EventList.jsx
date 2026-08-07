import Link from "next/link";
import Image from "next/image";

export default function EventList() {
  const { fillable } = true;

  return (
    <section>
      <div className="container">
        <div className="row pad">
          <div className="col-md-6">
            <div className="content_bx">
              <h2 className="title">
                BIRTHDAY
                <span className="sign">Celebration </span>
              </h2>

              <p className="para">
                Join La Famiglia and let us spoil you on your special day - you
                deserve it! Celebrate with us during your birthday month and
                we’ll treat you to 7% OFF your total bill, a FREE cake from our
                in-house La Patisserie.
              </p>

              <ul className="list-inline list-unstyled space30">
                <li>
                  <Link legacyBehavior href="/birthday-package">
                    <a className="blockbtn bgblack">read more</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/event-booking">
                    <a className="blockbtn bgblack">Book now</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="content_slider">
              <div className="owl-container">
                <div className="owl event_slider">
                  <div className="item">
                    <div className="item_bx">
                      <Image
                        src="/img/event/Birthday-Cake.jpg"
                        width={540}
                        height={540}
                        className="res_img"
                        alt="Birthday celebration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pad">
          <div className="col-md-6">
            <div className="content_slider">
              <div className="owl-container">
                <div className="owl event_slider">
                  <div className="item">
                    <div className="item_bx">
                      <Image
                        src="/img/event/kidspizza.jpg"
                        width={540}
                        height={540}
                        className="res_img"
                        alt="Birthday celebration"
                        fill={fillable ? 1 : 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="content_bx">
              <h2 className="title">
                KIDS
                <span className="sign">Pizza Classes Fun! </span>
              </h2>

              <p className="para">
                Whether it’s for a birthday, special occasion or just a fun day
                out, keep the little ones creative as our very own pizza chefs
                teach them how to prepare traditional wood fire pizza. They’ll
                learn how we make our famous wood-fired pizza step by step, from
                kneading the dough to customising their creation with their
                favourite toppings.
              </p>

              <ul className="list-inline list-unstyled space30">
                <li>
                  <Link legacyBehavior href="/pizza-classes/kids">
                    <a className="blockbtn bgblack">read more</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/event-booking">
                    <a className="blockbtn bgblack">Book now</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row pad">
          <div className="col-md-6">
            <div className="content_bx">
              <h2 className="title">
                CORPORATE
                <span className="sign">Pizza Classes Fun! </span>
              </h2>

              <p className="para">
                Looking for a memorable corporate team bonding experience? We’ve
                got you covered – book your next corporate event!
                Criniti&#39;shas been voted “Australia’s Favourite Italian
                Restaurant” & now you can see why as you learn the secrets from
                our very own pizza chefs!
              </p>

              <ul className="list-inline list-unstyled space30">
                <li>
                  <Link legacyBehavior href="/pizza-classes/adults">
                    <a className="blockbtn bgblack">read more</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/event-booking">
                    <a className="blockbtn bgblack">Book now</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="content_slider">
              <div className="owl-container">
                <div className="owl event_slider">
                  <div className="item">
                    <div className="item_bx">
                      <Image
                        src="/img/event/Square-PMC.jpg"
                        width={540}
                        height={540}
                        className="res_img"
                        alt="Birthday celebration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
