const html = String.raw;

export const Header = () => {
  return html`<header class="ph header">
    <a class="ph home" href="/">home</a>
    <a class="ph projects-home" href="/projects">projects</a>
    <a class="ph speaker-home" href="/speaker">speaker</a>
    <div class="ph header-menu">
      <a
        class="ph"
        href="https://www.paypal.me/phunky/20"
        rel="noopener noreferrer"
        target="_blank"
        >buy me a coffee?</a
      >
      <a
        class="ph"
        href="https://github.com/sponsors/phun-ky"
        rel="noopener noreferrer"
        target="_blank"
        >sponsor me!</a
      >
      <button class="ph darkmode-button">
        <svg
          xmlns="https://www.w3.org/2000/svg"
          aria-label="Sun Icon"
          fill="currentColor"
          stroke="none"
          class="ph hide-dark"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg
          xmlns="https://www.w3.org/2000/svg"
          aria-label="Moon Icon"
          fill="currentColor"
          stroke="none"
          class="ph hide-light"
          viewBox="0 0 20 20"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          ></path>
        </svg>
      </button>
    </div>
  </header>`;
};
