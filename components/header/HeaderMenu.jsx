import Link from "next/link";
import { useRouter } from "next/router";
import SocialLinks from "/components/Footer/SocialLinks";

export default function HeaderMenu() {
  const router = useRouter();

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

              <li>
                <Link legacyBehavior href="/events">
                  <a
                    className={
                      router.pathname == "/events"
                        ? "menu__item active"
                        : "menu__item"
                    }
                  >
                    <span className="menu__item-name">Events</span>
                  </a>
                </Link>
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
                    <span className="text">PICK UP</span>
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
