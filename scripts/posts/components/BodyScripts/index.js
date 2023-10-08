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

    const copyCodeButtonElements = document.querySelectorAll('.ph.code-toolbar .ph.copy');

    if(copyCodeButtonElements && copyCodeButtonElements.length !== 0){
      copyCodeButtonElements.forEach(buttonElement => {
        buttonElement.addEventListener('click', e => {
          const toolbarElement = e.target.closest('.ph.code-toolbar');

          if(toolbarElement){
            const preElement = toolbarElement.querySelector('pre');
            if(preElement){
              navigator.clipboard.writeText(preElement.textContent);
            }
          }

        })

      })
    }

    //     element.appendChild(toolsElement);

    //   })
    // }
  </script>`;
};
