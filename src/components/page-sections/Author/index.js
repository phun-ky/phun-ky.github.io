const html = String.raw;

export const Author = () => {
  return html`<section class="ph section author">
    <div class="ph container">
      <hr class="ph" />
      <h2 class="ph">About the author</h2>

      <p class="ph">
        Hi! My name is Alexander, and I am a creative frontender, specializing
        in UX, accessibility, universal design, frontend-architecture, node and
        design systems. I am passionate with open source projects and love to
        dabble with new emerging technologies related to frontend. With over
        ${new Date().getFullYear() - new Date('1998').getFullYear()} years of
        frontend experience, I have earned the right to be called a veteran. I
        am a lover of life, technologist at heart. If I am not coding, I am
        cooking and I love whisky and cigars. Oh, and coffee, I LOVE coffee!
      </p>
      <p class="ph">
        If you want to know more about me, here is some links you might want to
        check out:
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="https://github.com/phun-ky"
          >GitHub</a
        >,
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="https://www.instagram.com/phun_ky/"
          >Instagram</a
        >,
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="https://twitter.com/phun_ky"
          >Twitter</a
        >,
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="https://www.linkedin.com/in/alexanderroyne"
          >LinkedIn</a
        >,
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="https://codepen.io/phun-ky/"
          >CodePen</a
        >,
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="https://slides.com/phun-ky"
          >Slides.com</a
        >,
        <a
          rel="noopener noreferrer"
          target="_blank"
          class="ph"
          href="https://www.npmjs.com/~phun-ky"
          >npm</a
        >,
      </p>
      <h2 class="ph">Speaker</h2>
      <p class="ph">
        I am also an avid speaker on several topics! Check
        <a href="/speaker/" class="ph">out some of the things I speak about</a>,
        and contact me if you are interested in having me at your next event!
      </p>
    </div>
  </section>`;
};
