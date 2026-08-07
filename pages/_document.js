import { Html, Head, Main, NextScript } from 'next/document'
import config from '../helpers/config';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
      <noscript>
          <iframe
            title="Google Tag Manager"
            src={`https://www.googletagmanager.com/ns.html?id=GTM-PZX9VK2`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        {/* <noscript>
          <iframe
            title="Google Tag Manager"
            src={`https://www.googletagmanager.com/ns.html?id=${config.gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
