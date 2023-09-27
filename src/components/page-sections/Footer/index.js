const html = String.raw;

export const Footer = () => {
  return html`<footer class="ph">
    <div class="ph container">
      <p class="ph">
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          <img
            alt="Creative Commons Licence"
            style="border-width: 0"
            width="88"
            height="31"
            src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
          />
        </a>
        <br />This work by
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="http://phun-ky.net"
          property="cc:attributionName"
          rel="cc:attributionURL"
        >
          Alexander Vassbotn Røyne-Helgesen</a
        >
        is licensed under a
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          rel="license"
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
        >
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International License </a
        >.
      </p>
      <div class="ph sustainable-verification">
        <div id="wcb" class="ph carbonbadge">
          <div class="ph" id="wcb_p">
            <span class="ph" id="wcb_g"
              >0.00g of CO<sub class="ph">2</sub>/view</span
            ><a
              class="ph"
              id="wcb_a"
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.websitecarbon.com/website/phun-ky-net/"
              >Website Carbon</a
            >
          </div>
          <span class="ph" id="wcb_2"
            >&nbsp;Cleaner than 100% of pages tested</span
          >
        </div>
        <a
          class="ph"
          href="https://www.thegreenwebfoundation.org/green-web-check/?url=https%3A%2F%2Fphun-ky.net%2F"
          ><img
            src="https://api.thegreenwebfoundation.org/greencheckimage/phun-ky.net"
            height="64"
            width="142"
            alt="This website is hosted Green - checked by thegreenwebfoundation.org"
        /></a>
      </div>
    </div>
  </footer>`;
};
