
import Link from 'next/link';

export default function HomeLocationSlider(props) {
  const { location } = props;

  return (
    <>
      <div className='productslider-item item'>
        <div className="item_bx">
          <img src={location.acf.image}
            className="bject-cover"
            alt="Home" />

          <div className="mask">
            <div className="inner_mask">
              <div className="a_middle">
                <div className="location-name">
                  {location.post_title}
                </div>

                <Link legacyBehavior href={`/locations/${location.post_name}`}>
                  <a className="blockbtn bgblack">
                    BOOK NOW
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="op_bar">
            <div className="venue_bar flex">
              <Link legacyBehavior href='/'>
                <a>
                  <h2 className="mbtm0 ">
                    <span className="patr title fsize24">
                      {location.post_title}
                    </span>
                  </h2>
                </a>
              </Link>

              <ul className="list-inline mbtm0">
                <li>
                  <Link legacyBehavior href={`/locations/${location.post_name}`}>
                    <a className="blockbtn bgblack">
                      BOOK NOW
                    </a>
                  </Link>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
