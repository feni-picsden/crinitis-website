import Link from 'next/link'
import Image from 'next/image'
import moment from "moment/moment";

export default function WhatsOnBlock(props) {
  const { whatsOn = {} } = props;

  const isDisplay = (whatsOn) => {
    if (!whatsOn.acf.prompt_text) {
      if (typeof whatsOn.acf.start_date !== 'undefined' && typeof whatsOn.acf.end_date !== 'undefined') {
        let currentDate = new Date();
        let startDate = new Date(moment(whatsOn.acf.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(1);
        let endDate = new Date(moment(whatsOn.acf.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        if (!((startDate.getTime() <= currentDate.getTime()) && (currentDate.getTime() <= endDate.getTime()))) {
          return false;
        }
      }
    }

    return true;
  }

  if (!whatsOn || !isDisplay(whatsOn)) {
    return false;
  }

  let detailUrl = `/whats-on/${whatsOn.post_name}`;

  return (
    <div className="col-md-4">
      <div className="wt_bx grid_bx trans">
        <div className="wt_img overflow-hidden">
          <Link legacyBehavior href={detailUrl}>
            <a>
              <Image
                src={whatsOn.acf.thumb_img}
                className="img-fluid trans"
                width={348}
                height={348}
                style={{ height: '348px' }} 
                alt={whatsOn.post_title}
              />
            </a>
          </Link>
        </div>

        <div className="wt_detail grid_cat">
          <Link legacyBehavior href={detailUrl}>
            <a>
              <h2 className="mbtm0 ">
                <span className="patr title fsize24" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: whatsOn.post_title }} />
              </h2>
              {whatsOn.acf.sub_title != '' &&
                <p className="wt_address">{whatsOn.acf.sub_title}</p>
              }
            </a>
          </Link>

          <WhatsOnButtons whatsOn={whatsOn} />

          <div className="wt_date">
            <h5>{whatsOn.acf.prompt_text}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}


const WhatsOnButtons = ({ whatsOn }) => {
  let wbtn = whatsOn.acf.buttons;

  if (!wbtn.display_buttons) {
    return '';
  }

  return (
    <ul className="list-inline text-center mbtm0">
      {(wbtn.display_buttons.includes('Button1') && wbtn.button1_text && wbtn.button1_text != '') &&
        <li>
          <Link legacyBehavior href={wbtn.button1_url}>
            <a className="blockbtn bgblack">
              {wbtn.button1_text}
            </a>
          </Link>
        </li>
      }
      {(wbtn.display_buttons.includes('Button2') && wbtn.button2_text && wbtn.button2_text != '') &&
        <li>
          <Link legacyBehavior href={wbtn.button2_url}>
            <a className="blockbtn bgblack">
              {wbtn.button2_text}
            </a>
          </Link>
        </li>
      }
      {(wbtn.display_buttons.includes('Button3') && wbtn.button3_text && wbtn.button3_text != '') &&
        <li>
          <Link legacyBehavior href={wbtn.button3_url}>
            <a className="blockbtn bgblack">
              {wbtn.button3_text}
            </a>
          </Link>
        </li>
      }
    </ul>
  )
}