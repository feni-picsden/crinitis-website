import Link from "next/link";
import Image from "next/image";

export default function PageTitle(props) {
  const {
    bannerImg = "",
    mobileImg = "",
    title = "",
    btntext = "",
    btnUrl = "",
  } = props;

  return (
    <>
      {mobileImg == "" ? (
        <div
          className="hero_banner half_banner"
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <div className="banner_content half_banner"></div>
        </div>
      ) : (
        <>
          <div
            className="hero_banner half_banner hidden lg:block"
            style={{ backgroundImage: `url(${bannerImg})` }}
          >
            <div className="banner_content half_banner"></div>
          </div>
          <div
            className="hero_banner half_banner  block lg:hidden"
            style={{ backgroundImage: `url(${mobileImg})` }}
          >
            <div className="banner_content half_banner"></div>
          </div>
        </>
      )}

      <div id="breadcrumbs">
        <div className="bread_crumb">
          <ul className="list-unstyled flex items-center">
            <li>
              <Link legacyBehavior href="/">
                <a>
                  <Image
                    src="/img/icon/bread-crumb-home.svg"
                    width={20}
                    height={19}
                    alt="Home"
                  />
                </a>
              </Link>
            </li>

            <li>
              <>
                {props.slug != undefined ? (
                  <Link legacyBehavior href={`/${props.slug}`}>
                    <a>{props.title}</a>
                  </Link>
                ) : (
                  <Link legacyBehavior href={`/${props.title.toLowerCase()}`}>
                    <a>{props.title}</a>
                  </Link>
                )}
              </>
            </li>

            {props.subTitle != undefined && <li>{props.subTitle}</li>}
          </ul>

          <div className="coach">
            <Link legacyBehavior href={btnUrl}>
              <a className="blockbtn bgred">{btntext}</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
