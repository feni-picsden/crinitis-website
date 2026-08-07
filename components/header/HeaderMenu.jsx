import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronDown } from "react-icons/fi";
import SocialLinks from "/components/Footer/SocialLinks";

export default function HeaderMenu() {
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState();

  const ToggleSubMenu = () => {
    openDropdown ? setOpenDropdown(false) : setOpenDropdown(true);
  };

  return (
    <>
      <div className="menu-wrap">
        <nav className="menu">
          <div className="icon-list">
            <ul className=" menu--adsila list-unstyled md:pr-3 ">
              <li>
                <Link legacyBehavior href="/la-famiglia">
                  <a
                    className={
                      router.pathname == "/la-famiglia"
                        ? "menu__item active"
                        : "menu__item"
                    }
                  >
                    <span className="menu__item-name">Join La Famiglia</span>
                  </a>
                </Link>
              </li>

              <li>
                <Link legacyBehavior href="/menu">
                  <a
                    className={
                      router.pathname == "/menu"
                        ? "menu__item active"
                        : "menu__item"
                    }
                  >
                    <span className="menu__item-name items-center">Menu</span>
                  </a>
                </Link>
              </li>

              <li>
                <Link legacyBehavior href="/whats-on">
                  <a
                    className={
                      router.pathname == "/whats-on"
                        ? "menu__item active"
                        : "menu__item"
                    }
                  >
                    <span className="menu__item-name items-center">
                      What&#39;s On
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link legacyBehavior href="/locations">
                  <a
                    className={
                      router.pathname == "/locations"
                        ? "menu__item active"
                        : "menu__item"
                    }
                  >
                    <span className="menu__item-name">Locations</span>
                  </a>
                </Link>
              </li>

              <li>
                <Link legacyBehavior href="/gifts">
                  <a
                    className={
                      router.pathname == "/gifts"
                        ? "menu__item active"
                        : "menu__item"
                    }
                  >
                    <span className="menu__item-name">Gift Vouchers</span>
                  </a>
                </Link>
              </li>

              <li className="mega-sub-menu relative xl:static">
                <button
                  onClick={ToggleSubMenu}
                  className="!flex !justify-between w-full items-center space-x-2 menu__item text-white uppercase"
                >
                  <span className="menu__item-name">Events</span>

                  <span
                    className={`${
                      openDropdown ? "!rotate-180" : ""
                    } transition-all duration-300 w-6 h-9 inline-flex items-center justify-center react-icons text-lg  z-10`}
                  >
                    <FiChevronDown />
                  </span>
                </button>

                <div
                  className={`${
                    openDropdown ? "open opacity-100 visible" : "opacity-0"
                  } mega-menu`}
                >
                  <div className="row items-center">
                    <div className="col-md-8">
                      <div className="xl:flex">
                        <div className="menu-card">
                          <Link legacyBehavior href="/whats-on/events">
                            <a>
                              <h2 className="menu-heading">
                                Events & Celebrations
                              </h2>
                              <p className="leading-[20px] mt-2">
                                Join La Famiglia and let us spoil you on your
                                special day - you deserve it!{" "}
                              </p>
                            </a>
                          </Link>
                        </div>

                        <div className="menu-card">
                          <Link legacyBehavior href="/pizza-classes/kids">
                            <a>
                              <h2 className="menu-heading">
                                Kids Pizza Classes
                              </h2>
                              <p className="leading-[20px] mt-2">
                                Join La Famiglia and witness your little ones
                                become certified pizza chefs!
                              </p>
                            </a>
                          </Link>
                        </div>
                      </div>

                      <div className="xl:flex">
                        <div className="menu-card">
                          <Link legacyBehavior href="/pizza-classes/adults">
                            <a>
                              <h2 className="menu-heading">
                                Corporate Pizza Classes
                              </h2>
                              <p className="leading-[20px] mt-2">
                                Looking for a memorable corporate team bonding
                                experience? We&apos;ve got you covered - book
                                your next corporate event!
                              </p>
                            </a>
                          </Link>
                        </div>

                        <div className="menu-card">
                          <Link legacyBehavior href="/events">
                            <a>
                              <h2 className="menu-heading">Private Parties</h2>
                              <p className="leading-[20px] mt-2">
                                Join La Famiglia and let usil you on your
                                special day - you deserve it!
                              </p>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="menu-banner">
                        <Image
                          src="/img/mainimagewhatson.png"
                          className="img-fluid fit-cover"
                          alt="Events banner"
                          width={520}
                          height={310}
                        />

                        <Link legacyBehavior href="/reservation">
                          <a className="blockbtn bg-red"> Book Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link legacyBehavior href="/contact">
                  <a
                    className={
                      router.pathname == "/contact"
                        ? "menu__item active"
                        : "menu__item"
                    }
                  >
                    <span className="menu__item-name">Contact Us</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="quick_menu text-center xl:hidden">
            <ul className="list-inline mt-12 mb-4">
              <li>
                <Link legacyBehavior href="/reservation">
                  <a className="quick_btn">
                    <span className="text">BOOK A TABLE</span>
                  </a>
                </Link>
              </li>

              <li>
                <Link legacyBehavior href="/order-online">
                  <a className="quick_btn">
                    <span className="text">ORDER NOW</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="text-center xl:hidden">
          <SocialLinks />
        </div>
      </div>
    </>
  );
}
