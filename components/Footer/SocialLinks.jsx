import Link from "next/link";

export default function SocialLinks() {
  return (
    <>
      <div id="socialIcons" className="social-icons">
        <ul className="ft_menu list-inline space-x-3">
          <li>
            <Link legacyBehavior href="https://facebook.com/crinitis">
              <a name="facebook" target="_blank">
                <img src="/img/social/fb-white.png" alt="facebook"></img>
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="https://instagram.com/crinitis">
              <a name="instagram" target="_blank">
                <img src="/img/social/ig-white.png" alt="instagram"></img>
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="https://twitter.com/crinitis">
              <a name="twitter" target="_blank">
                <img src="/img/social/tw-white.png" alt="twitte"></img>
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="https://www.youtube.com/user/crinitisristorante">
              <a name="yputube" target="_blank">
                <img src="/img/social/yt-white.png" alt="youtube"></img>
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="https://www.tiktok.com/@crinitisrestaurants">
              <a name="tiktok" target="_blank">
                <img src="/img/social/tt-white.png" alt="tiktok"></img>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
