import Link from "next/link";
export default function HomeMenu(props) {
  return (
    <>
      <section id="menus" className="pt-24 pb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="content_img text-right">
                <div className="row">
                  <HomeMenuImage home_images={props.home_images} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content_bx">
                <h2 className="title">
                  Menus
                  <span className="sign">Set Menu</span>
                </h2>
                <div className="space40"></div>
                <p className="para">
                  Criniti&apos;s is the premier destination for delicious
                  woodfired pizzas and authentic Italian pasta in Australia.
                  With over 300 menu items, we offer a wide range of dishes to
                  suit every taste and dietary preference. Our main menu
                  features traditional family recipes passed down through
                  generations, including classic Margherita pizzas and unique
                  options like the Fungi e Salsiccia. Our pasta dishes are made
                  with the freshest, highest-quality ingredients, and our
                  desserts are truly indulgent. Whether you&apos;re dining with
                  your family, friends, or co-workers, Criniti&apos;s has
                  something for everyone - including vegan options. Try out our
                  Set Menu as it offers a curated selection of our most popular
                  dishes, and a chance to experience the true spirit of Italian
                  sharing.
                </p>
                <Link legacyBehavior href="/menu">
                  <a className="vw_menu">View the full menu</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const HomeMenuImage = (props) => {
  return (
    <>
      <div className="col-6">
        <div className="menu_img">
          <Link legacyBehavior href="/">
            <a>
              {props.home_images &&
              Array.isArray(props.home_images) &&
              props.home_images.length > 0 ? (
                <img
                  className="img-fluid w-full"
                  src={props.home_images[0].home_mangia_menu_image}
                  alt="Main Menu"
                />
              ) : (
                <img
                  className="img-fluid w-full"
                  src="img/menu/Mangia1.jpeg"
                  alt="Main Menu"
                />
              )}
            </a>
          </Link>
        </div>
      </div>

      <div className="col-6">
        <div className="menu_img">
          <Link legacyBehavior href="/">
            <a>
            {props.home_images &&
              Array.isArray(props.home_images) &&
              props.home_images.length > 0 ? (
                <img
                  className="img-fluid w-full"
                  src={props.home_images[1].home_mangia_menu_image}
                  alt="Main Menu"
                />
              ) : (
                <img
                className="img-fluid w-full"
                src="img/menu/Mangia4.jpeg"
                alt="Main Menu"
              />
              )}
            
            </a>
          </Link>
        </div>
      </div>
      <div className="col-6">
        <div className="menu_img">
          <Link legacyBehavior href="/">
            <a>
            {props.home_images &&
              Array.isArray(props.home_images) &&
              props.home_images.length > 0 ? (
                <img
                  className="img-fluid w-full"
                  src={props.home_images[2].home_mangia_menu_image}
                  alt="Main Menu"
                />
              ) : (
                <img
                className="img-fluid w-full"
                src="img/menu/Mangia3.jpeg"
                alt="Main Menu"
              />
              )}
            
            </a>
          </Link>
        </div>
      </div>

      <div className="col-6">
        <div className="menu_img">
          <Link legacyBehavior href="/">
            <a>
            {props.home_images &&
              Array.isArray(props.home_images) &&
              props.home_images.length > 0 ? (
                <img
                  className="img-fluid w-full"
                  src={props.home_images[3].home_mangia_menu_image}
                  alt="Main Menu"
                />
              ) : (
                <img
                  className="img-fluid w-full"
                  src="img/menu/Mangia2.jpeg"
                  alt="Main Menu"
                />
              )}
              
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
