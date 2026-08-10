import Link from "next/link";
import SocialLinks from "/components/Footer/SocialLinks";

import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <footer>
      <div className="container-fluid1">
        <div className="pre_footer">
          <div className="row items-center">
            <div className="col-lg-5">
              <div className="cta_text">
                <h2 className="title patr fsize26">
                  when you&#39;re here, you&#39;re family
                </h2>

                <p className="para ddin">
                  We believe the experience of sharing a meal with family and
                  friends is sacred and should be cherished and remembered long
                  after the last bite has been savored and the last drop has
                  been drunk.
                </p>

                <p className="para ddin">
                  This is why at Criniti&#39;s we say, when you&#39;re here,
                  you&#39;re family...salute!
                </p>
              </div>
            </div>

            <div className="col-lg-3"></div>

            <div className="col-lg-4">
              <div className="subscribe">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      src="/img/la-famiglia-black.svg"
                      className="img-fluid mx-auto"
                      width="120"
                      alt="Criniti&#39;s - La Famiglia Membership"
                    />
                  </a>
                </Link>

                <Link legacyBehavior href="/la-famiglia">
                  <a className="black-link ddin hover:text-black">
                    Join La Famiglia
                  </a>
                </Link>
                <br></br>

                <span className="ddin">exclusive offers & rewards</span>
                <p className="space40 fsize16 ddin text-center">
                  <span>
                    {" "}
                    <span>©</span>
                    {new Date().getFullYear()} CRINITI&#39;S SOUTHERN ITALIAN
                    CUISINE{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="btm_footer ">
          <div className="row">
            <div className="ft_content md:flex w-full  items-center">
              <div className="col-md-8">
                <div className="ft_left">
                  <ul className="ft_menu list-inline text-white">
                    <li>
                      <Link legacyBehavior href="/about">
                        <a
                          className={
                            router.pathname == "/about"
                              ? "text-[#c2a35c]"
                              : "text-white"
                          }
                        >
                          About us
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link legacyBehavior href="/gallery">
                        <a
                          className={
                            router.pathname == "/gallery"
                              ? "text-[#c2a35c]"
                              : "text-white"
                          }
                        >
                          Gallery
                        </a>
                      </Link>
                    </li>

                    {/* <li>
                                        <Link legacyBehavior  href="/careers">
                                            <a className={router.pathname == "/careers" ? "text-[#c2a35c]" : "text-white"}>
                                            Careers
                                            </a>
                                        </Link>
                                        </li> */}

                    <li>
                      <Link legacyBehavior href="/contact">
                        <a
                          className={
                            router.pathname == "/contact"
                              ? "text-[#c2a35c]"
                              : "text-white"
                          }
                        >
                          contact us
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link legacyBehavior href="/blogs">
                        <a
                          className={
                            router.pathname == "/blogs"
                              ? "text-[#c2a35c]"
                              : "text-white"
                          }
                        >
                          Blogs
                        </a>
                      </Link>
                    </li>

                    <li>
                      <Link legacyBehavior href="/privacy">
                        <a
                          className={
                            router.pathname == "/privacy"
                              ? "text-[#c2a35c]"
                              : "text-white"
                          }
                        >
                          privacy
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link legacyBehavior href="/policy">
                        <a
                          className={
                            router.pathname == "/policy"
                              ? "text-[#c2a35c]"
                              : "text-white"
                          }
                        >
                          Booking policy
                        </a>
                      </Link>
                    </li>
                    {/* <li>
                                            <Link legacyBehavior  href="/">
                                                <a>
                                                Social Media
                                                </a>
                                            </Link>
                                        </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <div className="ft_right flex">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chat/enquiry widget hidden — put <LiveChat /> back to restore it */}
    </footer>
  );
}
