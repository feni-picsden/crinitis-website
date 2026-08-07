import Link from "next/link";
import Image from "next/image";

export default function OrderOnlineBlock(props) {
  const { location } = props;

  if (Object.keys(location).length <= 0) {
    return false;
  }

  return (
    <div className="col-lg-4 col-md-6">
      <div className="venue_bx grid_bx trans">
        <div className="venue_img overflow-hidden">
          <Image
            src={location.acf.image}
            className="img-fluid trans" 
            width={348}
            height={348}
            style={{ height: '348px' }} 
            alt={location.name}
          />
        </div>

        <div className=" grid_cat">
          <h2 className="mbtm0 text-center">
            <span className="title patr fsize24">{location.post_title}</span>
          </h2>

          <ul className="list-inline text-center mt-4">
            <li>
              <Link legacyBehavior href={location.acf.order_now_url}>
                <a className="blockbtn bgblack" target="_blank">
                  {props.Butoon1text}
                </a>
              </Link>
            </li>

            <li>
              <Link legacyBehavior href={location.acf.uber_eats_url}>
                <a className="blockbtn bgblack">{props.Butoon2text}</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
