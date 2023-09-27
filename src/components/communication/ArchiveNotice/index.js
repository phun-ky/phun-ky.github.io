const html = String.raw;

export const ArchiveNotice = (category) => {
  if (category !== 'Archive') return '';

  return html`<section class="ph section">
    <div class="ph container">
      <div class="ph message warning">
        <span class="ph title"
          ><svg
            class="ph icon warning"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
            ></path></svg
          >Note</span
        >
        <p class="ph description">
          Please note that this is an archived post, so links, code and the
          communicated message might be outdated. YMMV
        </p>
      </div>
    </div>
  </section>`;
};
