import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "/components/header/HeaderMenu";
import Head from "next/head";
import { useRouter } from "next/router";
import config from "../../helpers/config";

export default function Header() {
  const router = useRouter();
  const [sticky, setSticky] = useState(false);
  const [mobMenu, setmobMenu] = useState(false);

  const addStickyClass = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 300) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", addStickyClass);
  }

  const ToggleMenu = () => {
    mobMenu ? setmobMenu(false) : setmobMenu(true);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '757701646058549');
      fbq('track', 'PageView');`,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=757701646058549&ev=PageView&noscript=1" />`,
          }}
        />

        <script
          type="text/javascript"
          async
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-PZX9VK2');`,
          }}
        />

        {/* <script
          type="text/javascript"
          async
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${config.gtmId}');`,
          }}
        /> */}
      </Head>
      {/* ponytail: nav-center is home-only; all styling lives in css, no JSX split */}
      <header
        className={`${sticky ? "sticky " : ""}${
          router.pathname === "/" ? "nav-center" : ""
        }`}
      >
        <div className="top_bar" data-spy="affix" data-offset-top="120">
          <div className="bar_bx grid grid-cols-2 xl:flex justify-between items-center">
            <div className="left-header">
              <div className="logo">
                <Link legacyBehavior href="/">
                  <a>
                    <div className="main-logo">
                      <span
                        style={{
                          boxSizing: "border-box",
                          display: "inline-block",
                          overflow: "hidden",
                          width: "initial",
                          height: "initial",
                          background: "none",
                          opacity: 1,
                          border: 0,
                          margin: 0,
                          padding: 0,
                          position: "relative",
                          maxWidth: "100%",
                        }}
                      >
                        <span
                          style={{
                            boxSizing: "border-box",
                            display: "block",
                            width: "initial",
                            height: "initial",
                            background: "none",
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                            maxWidth: "100%",
                          }}
                        >
                          <Image
                            src="/img/logos/crinitis-logo-white-name.png"
                            className="bc-home"
                            width={220}
                            height={43}
                            alt="Crinitis logo"
                          />
                        </span>
                      </span>
                    </div>

                    <div className="sticky-logo">
                      <Image
                        src="/img/logos/crinitis-logo-horizantal.png"
                        className="bc-home"
                        width={150}
                        height={16}
                        alt="Crinitis logo"
                      />
                    </div>
                  </a>
                </Link>
              </div>

              <button
                className={mobMenu ? "menu-button1 open" : "menu-button1"}
                onClick={ToggleMenu}
                id="nav-icon2"
              >
                <span></span>
                <span></span>
                <span></span>
                <span className="op-0"></span>
                <span></span>
                <span></span>
              </button>
            </div>

            <div className="mobile-logo text-right xl:left-auto">
              <Link legacyBehavior href="/">
                <a>
                  <div>
                    <Image
                      src="/img/logos/crinitis-logo-horizantal.png"
                      className="bc-home"
                      width={120}
                      height={16}
                      alt="Crinitis logo"
                    />
                  </div>
                </a>
              </Link>
            </div>

            <div className="right-header hide-mb">
              <div className="flex justify-end items-center">
                <div className="desk-menu">
                  <HeaderMenu />
                </div>

                <div className="quick_menu text-right  xl:block">
                  <ul className="list-inline mbtm0">
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
              </div>
            </div>

          </div>
        </div>

        <div className={mobMenu ? "mobile-menu show-menu" : "mobile-menu"}>
          <HeaderMenu />
        </div>
      </header>
    </>
  );
}
