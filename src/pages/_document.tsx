/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"crossorigin"}
          />
          <link
            href={
              "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
            }
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEtW0PTowEOEdwSD-FwodQ0Ig_l_-Jt4c&libraries=places"></script>
        </body>
      </Html>
    );
  }
}
