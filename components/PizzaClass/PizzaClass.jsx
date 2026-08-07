import Image from "next/image";

export default function PizzaClass(props) {
  return (
    <section className="pizz-class wt_list_detail pad">
      <div className="container">
        <div className="row detail_content ">
          <div className="col-md-8">
            <h2 className="patr title  mbtm0 ">{props.page.acf.big_title}</h2>
            <p className="sub_tit space10">{props.page.acf.sub_title}</p>

            <div
              className="space30" style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: props.page.content }}
            ></div>
          </div>

          <div className="col-md-4">
            <div className="wt_bx grid_bx trans">
              <div className="wt_img">
                <Image
                  src="/img/kids_pizza_class_thumb.jpg"
                  className="img-fluid trans"
                  width={348}
                  height={348}
                  // fill
                  alt="Kids Pizza Classes"
                />
              </div>
            </div>

            <div className="wt_bx grid_bx trans">
              <div className="wt_img">
                <Image
                  src="/img/team_pizza_class_thumb_1.jpg"
                  className="img-fluid trans"
                  width={348}
                  height={348}
                  // fill
                  alt="Corporate Pizza Classes"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
