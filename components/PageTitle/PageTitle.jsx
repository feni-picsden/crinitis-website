import Link from "next/link";
import Image from "next/image";

export default function PageTitle(props) {
  return (
    <>
      <div
        className="hero_banner half_banner"
        style={{
          backgroundImage:
            "url(/img/banners/inner-banners/" + props.bannerImg + ")",
        }}
      >
        <div className="banner_content half_banner"></div>
      </div>

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
              <Link legacyBehavior href={`/${props.slug}`}>
                <a dangerouslySetInnerHTML={{ __html: props.title }}>
                </a>
              </Link>
            </li>

            {props.subTitle != undefined && (
              <li dangerouslySetInnerHTML={{ __html: props.subTitle }}>
              </li>
            )}
          </ul>

          <div className="coach">
            <Link legacyBehavior href={props.btnUrl}>
              <a className="blockbtn bgred">{props.btntext}</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
