import Link from 'next/link'

export default function GalleryBlock(props) {

  const { gallery } = props;

  if (Object.keys(gallery).length <= 0) {
    return false;
  }

  return (
    <>
      <div className="col-md-4">
        <div className="venue_bx grid_bx trans">
          <div className="venue_img relative overflow-hidden">
            <Link legacyBehavior href={`/gallery/${gallery.post_name}`}>
              <a>
                <img src={gallery.acf.thumb_image} className="img-fluid trans object-cover h-[350px] w-full" alt={gallery.post_title} />
              </a>
            </Link>
          </div>
          <div className="venue_detail p-4">
            <h2 className="mbtm0 ">
              <span className="title patr fsize24">{gallery.post_title}</span>
            </h2>

            <h5 className="mbtm0 ">
              <br></br>
              <span className="fsize14">{gallery.acf.sub_title}</span>
            </h5>

          </div>
        </div>
      </div>

    </>
  )
}