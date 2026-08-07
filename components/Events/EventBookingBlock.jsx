import Link from "next/link";
import Image from "next/image";

export default function EventBooking(props) {
  const { location } = props;

  if (Object.keys(location).length <= 0) {
    return false;
  }

  return (
    <div className="col-lg-4 col-md-6">
      <div className="venue_bx grid_bx trans">
        <div className="venue_img">
          <Image
            src={location.acf.image}
            className="img-fluid trans object-cover"
            width={348}
            height={348}
            alt={location.name}
          />
        </div>

        <div className=" grid_cat">
          <h2 className="mbtm0 text-center">
            <span className="title patr fsize24">{location.post_title}</span>
          </h2>

          <ul className="list-inline text-center mt-4">
            <li>
              <Link legacyBehavior href={location.acf.map_address}>
                <a className="blockbtn bgblack" target="_blank">
                  {props.Butoon1text}
                </a>
              </Link>
            </li>

            <li>
              <Link legacyBehavior href={location.acf.dashify_event_url}>
                <a className="blockbtn bgblack" target="_blank">
                  {props.Butoon2text}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
