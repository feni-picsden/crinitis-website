import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import { AiOutlinePicture } from "react-icons/ai";
import { isOpeningSoon } from "/helpers/locations";

export default function LocationBox(props) {
  const { location, changeLocation } = props;

  if (Object.keys(location).length <= 0) {
    return false;
  }

  return (
    <div className="col-lg-4 col-md-6">
      <Link href={`/locations/${location.post_name}`} legacyBehavior>
        <a>
          <div className="venue_bx grid_bx trans">
            <div className="venue_img overflow-hidden">
              <Image
                src={location.acf.image}
                className="img-fluid trans"
                width={348}
                height={348}
                style={{ height: "348px" }}
                alt={location.name}
              />
            </div>

            <div
              className={
                props.source == 3 ? "grid_cat" : "venue_detail grid_cat"
              }
            >
              <h2 className={props.source == 3 ? "mbtm0 text-center" : "mbtm0"}>
                <span className="title patr fsize24">
                  {location.post_title}
                </span>
              </h2>
              {props.source == 3 ? (
                ""
              ) : (
                <>
                  <p className="location_address mbtm0">
                    {location.acf.full_address}
                  </p>
                  <OpeningHours location={location} />
                </>
              )}
              <ul className="list-inline text-center space15">
                {props?.Butoon1text ? (
                  <>
                    <li>
                      <Link legacyBehavior href={`${location.acf.map_address}`}>
                        <a className="blockbtn bgblack" target="_blank">
                          {props.Butoon1text}
                        </a>
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}

                {location.acf.dashify_event_url !== null &&
                  location.acf.dashify_event_url !== "" && (
                    <li>
                      <button
                        type="button"
                        className="blockbtn bgblack"
                        onClick={(e) =>
                          changeLocation(e, location.acf.dashify_event_url)
                        }
                      >
                        {props.Butoon2text}
                      </button>
                    </li>
                  )}

                {/* Clearing order_now_url in WordPress hides this button for that location.
                    A <button> not an <a>, because the whole card is already wrapped in a link. */}
                {location.acf.order_now_url &&
                  (isOpeningSoon(location.acf.order_now_url) ? (
                    <li>
                      <button
                        type="button"
                        className="blockbtn bgblack is-soon"
                        aria-disabled="true"
                        /* not `disabled`: the browser would skip the button and
                           let the click hit the card link behind it */
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        Opening Soon
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button
                        type="button"
                        className="blockbtn bgblack"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(
                            location.acf.order_now_url,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      >
                        {props.orderNowText || "Order Now"}
                      </button>
                    </li>
                  ))}
              </ul>
              <div
                style={{
                  position: "absolute",
                  top: "-56px",
                  right: "0px",
                  backgroundColor: "#000",
                  width: "50px",
                  height: "50px",
                }}
              >
                <Link href={location.acf.gallery_url} legacyBehavior>
                  <AiOutlinePicture
                    className="react-icons"
                    style={{
                      height: "50px",
                      width: "50px",
                      padding: "10px",
                      color: "#fff",
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}

const OpeningHours = ({ location }) => {
  let hours = JSON.parse(location.acf.opening_hours);

  if (!hours) {
    return "";
  }

  return (
    <div className="open_hour">
      <div className="mbtm0 flex hr_badge">
        <Image
          src="/img/icon/hour.png"
          className="img-fluid trans"
          width={20}
          height={20}
          alt="Clock  Icon"
        />

        <span className="text-black">Opening Hours</span>

        <div className="hour_bx trans">
          <ul className="list-unstyled">
            <li>
              <h2 className="text-xl patr text-black">OPENING HOURS</h2>
              <OpeningHour hours={hours} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const OpeningHour = ({ hours }) => {
  if (!hours) {
    return "";
  }
  return hours.map((item, key) => {
    return (
      <p key={key}>
        <span>{item.label}</span>
        <span>{item.value}</span>
      </p>
    );
  });
};
