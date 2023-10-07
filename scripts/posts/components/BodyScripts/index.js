const html = String.raw;

export const BodyScripts = () => {
  return html`<script>
    const darkmodeButtonElement = document.querySelector('.ph.darkmode-button');
    const htmlElement = document.querySelector('html');

    if (darkmodeButtonElement) {
      darkmodeButtonElement.addEventListener('click', () => {
        if (htmlElement.classList.contains('theme--light')) {
          htmlElement.classList.remove('theme--light');
          localStorage.setItem('prefers-color-scheme', 'dark');
        } else {
          htmlElement.classList.add('theme--light');
          localStorage.setItem('prefers-color-scheme', 'light');
        }
      });
    }

    const yearsAgoElements = document.querySelectorAll('.ph.years-ago');

    if(yearsAgoElements && yearsAgoElements.length !== 0){
      yearsAgoElements.forEach(element => {
        const year = element.getAttribute('data-year');

        if(year){
          element.textContent = ${'`'}${'$'}{year}, ${'$'}{new Date().getFullYear() - year} years ago${'`'};
        }
      })
    }

    // const preElements = document.querySelectorAll('pre');

    // if(preElements && preElements.length !== 0){
    //   preElements.forEach(element => {
    //     const attrs = Array.from(element.attributes).reduce((attrs,attribute) => {attrs[attribute.name] = attribute.value; return attrs;},{})
    //     const { language } = attrs;

    //     if(!language || language === '' || language === 'shell-session'){
    //       return;
    //     }

    //     const toolsElement = document.createElement('span');
    //     toolsElement.classList.add('ph');
    //     toolsElement.classList.add('tools');

    //     const languageElement = document.createElement('span');
    //     languageElement.textContent = language;
    //     languageElement.classList.add('ph');
    //     languageElement.classList.add('language');
    //     toolsElement.appendChild(languageElement);

    //     const buttonElement = document.createElement('button');
    //     buttonElement.textContent = 'copy';
    //     buttonElement.classList.add('ph');
    //     buttonElement.classList.add('copy');
    //     toolsElement.appendChild(buttonElement);

    //     buttonElement.addEventListener('click', e => {
    //       const preElement = e.target.closest('pre');

    //       if(preElement){
    //         navigator.clipboard.writeText(preElement.textContent);
    //       }
    //     })

    //     element.appendChild(toolsElement);

    //   })
    // }
  </script>`;
};
