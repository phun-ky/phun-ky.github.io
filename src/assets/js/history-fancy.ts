import { marked } from 'https://esm.sh/marked';
const KEBAB_REGEX = /([a-z0-9])([A-Z])/g;

const markdownToHtml = (md: string): string => {
  return marked.parse(md); // returns HTML
};

const kebabCase = (str: string): string => {
  return str
    .replace(KEBAB_REGEX, '$1-$2') // insert hyphen between lowercase and uppercase
    .replace(/[_\s]+/g, '-') // replace underscores and spaces with hyphens
    .replace(/([A-Z]+)/g, (match) => match.toLowerCase()) // lowercase all uppercase sequences
    .replace(/-+/g, '-') // collapse multiple hyphens
    .replace(/^-|-$/g, '') // remove leading/trailing hyphens
    .toLowerCase(); // ensure fully lowercase
};

type TimelineItemType = {
  id: string; //guid
  imgURL?: string; //URI to image
  year: string; //fixed year: 1990, interval: 1990-2000 or 90s, or 80s-90s, or mid 90s
  description: string; // could be one or more paragraphs, and could be subtitles
};
type TimelineItemsType = TimelineItemType[];
interface TimelineChapterInterface {
  title: string; // Chapter title
  description: string; // could be one or more paragraphs, and could be subtitles
  timeline: TimelineItemsType;
}
interface TimelineInterface {
  title: string;
  description?: string;
  chapters: TimelineChapterInterface[];
}

const TIMELINE = {
  title: 'History of Frontend',
  chapters: [
    {
      title: 'The Early Internet (1960s-1990s)',
      description:
        'The Early Internet set the foundation for everything that followed. What began\nas academic and government experiments with networking quickly turned into a\nglobal communication system. Standards like TCP/IP and HTML created the\nconditions for the web to flourish, while the invention of browsers and\nscripting languages gave ordinary people a way to interact with information\ndigitally.\n\nThis period also saw the first commercial transactions, proving that the web\ncould be more than just an academic or military tool. Online shopping, payments,\nand even digital media sales hinted at the massive economic shift that would\nfollow.\n\nTogether, these innovations established the internet not only as a new medium of\ncommunication, but as a platform for commerce, entertainment, and community\nbuilding - foundations that still underpin frontend development today.',
      timeline: [
        {
          id: '9ef66cc5-e738-571d-96d9-4f4b2586aa8d',
          imgURL:
            'https://assets.codepen.io/124568/image-20161102-27228-vph505.avif',
          year: '1969',
          description:
            'ARPANET goes live, the precursor to the modern internet.',
        },
        {
          id: 'b10674bd-7fe7-566c-aa3d-dfbfeac7f899',
          imgURL:
            'https://assets.codepen.io/124568/Screen_Shot_2020-09-19_at_8.51.34_AM_big.png',
          year: '1983',
          description:
            'TCP/IP becomes the standard protocol, enabling a truly connected internet.',
        },
        {
          id: 'b614f291-52a8-597f-9d84-879f35e92ca2',
          imgURL: '',
          year: '1983',
          description: 'I was born!',
        },
        {
          id: 'dd3c63de-4a91-5c8e-8e4d-0002842a87e8',
          imgURL: 'https://assets.codepen.io/124568/Larry_Wall_YAPC_2007.jpeg',
          year: '1987',
          description:
            'Larry Wall created Perl, originally as a text-processing language.',
        },
        {
          id: '25865898-1700-5b94-bda2-9d226a2f039d',
          imgURL: 'https://assets.codepen.io/124568/installchannel.gif',
          year: '1988',
          description: 'IRC was invented by Jarkko Oikarinen.',
        },
        {
          id: 'b558de6b-6b3a-5267-9fdb-ae50c12624c6',
          imgURL: 'https://assets.codepen.io/124568/Tim%20Berners%20Lee.JPG',
          year: '1989',
          description:
            'Tim Berners-Lee proposes the World Wide Web (WWW) at CERN.',
        },
        {
          id: '6d682195-3386-5405-a415-564c3562b0ae',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_d6nsmn2v4z78ub1ie8np.webp',
          year: '1989',
          description: `**James Gosling** created Oak for Sun Microsystems, later named Java.`,
        },
        {
          id: 'f4113a37-2297-51f9-8edc-f917f5eefb51',
          imgURL: 'https://assets.codepen.io/124568/article_nexus_1.jpg',
          year: '1990',
          description:
            'Tim Berners-Lee creates the first web browser (WorldWideWeb) and the first website.',
        },
        {
          id: 'fe29bfd1-d0ed-5351-a394-a8952aa9d9a7',
          imgURL:
            'https://assets.codepen.io/124568/Les_Horribles_Cernettes_in_1992.jpg',
          year: '1992',
          description:
            'The first image is uploaded to the web (a parody band photo of CERN staff).',
        },
        {
          id: '757054f3-cdc5-5e0b-af5e-5922332d8ed2',
          imgURL: 'https://assets.codepen.io/124568/mos-10.webp',
          year: '1993',
          description:
            'Mosaic browser launches, bringing images inline with text - a huge leap in UX.',
        },
        {
          id: '411b2c31-de41-5d27-8872-2598d8e2f5bf',
          imgURL: 'https://assets.codepen.io/124568/fig161.gif',
          year: '1993',
          description:
            'CGI was introduced. It was the very first way to make dynamic websites.',
        },
        {
          id: '8e4de89e-3b99-58e0-8f89-efa6163bb3d1',
          imgURL:
            'https://assets.codepen.io/124568/netscape-navigator-1-0-08.png',
          year: '1994',
          description:
            'Netscape Navigator dominates; Yahoo! and Amazon launch.',
        },
        {
          id: '4418fc30-dd3a-596b-822d-dbfefced4995',
          imgURL:
            'https://assets.codepen.io/124568/Sting_-_Ten_Summoner-s_Tales.png',
          year: '1994',
          description: `First
                **online credit card transaction** and
                first album sold online via encrypted card: Sting's
                _Ten Summoner's Tales_.`,
        },
        {
          id: '72b0d3fd-9815-5180-aa45-c6e7b646206c',
          imgURL: 'https://assets.codepen.io/124568/pizzanet.webp',
          year: '1994',
          description: 'Pizza Hut introduced the first online pizza ordering.',
        },
        {
          id: 'cc72b82b-a926-52af-9800-47849365c5a8',
          imgURL: 'https://assets.codepen.io/124568/Brendan_Eich_2015.jpg',
          year: '1995',
          description: `**JavaScript** is created by Brendan Eich in 10 days; Netscape 2 ships with it. Originally Mocha → LiveScript → JavaScript.

Coincidentally, Java was called Oak until 1995.`,
        },
        {
          id: 'af6fb5b9-cddb-5acd-80af-90e8a4c9fb00',
          imgURL: 'https://assets.codepen.io/124568/erotica-on-line-1996.png',
          year: 'mid 90s',
          description:
            'The adult industry widely adopts online credit card payments, helping normalize e-commerce.',
        },
        {
          id: '46063e00-ae7b-5548-b69b-bb768711c27d',
          imgURL: 'https://assets.codepen.io/124568/Codigo_php.jpeg',
          year: '1995',
          description: `Rasmus Lerdorf created "Personal Home Page Tools," later renamed PHP: Hypertext Preprocessor.`,
        },
        {
          id: '0cce1cea-3e55-5b5b-8119-41e4b51be90a',
          imgURL: 'https://assets.codepen.io/124568/internet_explorer_1.0.png',
          year: '1995',
          description: `The 1.0 version of **Internet Explorer** is released.`,
        },
        {
          id: 'b050470c-3974-5a9a-8eac-2176448659d7',
          imgURL: 'https://assets.codepen.io/124568/image5.jpg',
          year: '1996',
          description: 'ASP/IIS introduced.',
        },
      ],
    },
    {
      title: 'Frontend for the Masses (1995-2000)',
      description: `This democratized web publishing. Millions of users experimented with HTML, CSS,\nand JavaScript - popularizing animated GIFs, guestbooks, counters, and "under\nconstruction" banners - while blogging platforms made the social web possible.`,
      timeline: [
        {
          id: '23561901-ca9f-5e35-baca-ea58118602fa',
          imgURL:
            'https://assets.codepen.io/124568/55d4a47d7fa44c4043000011.format-webp.width-1440_ae6zzeKgJiUIVqme.webp',
          year: '1994',
          description: `GeoCities launches, letting anyone host personal webpages in themed "neighbourhoods."`,
        },
        {
          id: '2f50876f-2bd4-5c56-a4f8-45790ecbf37a',
          imgURL: 'https://assets.codepen.io/124568/Tripod_Homepage.png',
          year: '1995',
          description:
            'Tripod starts as a student community and grows into a homepage builder.',
        },
        {
          id: '0d0b5365-1e56-5a46-97e8-e0d460f4dbd5',
          imgURL: 'https://assets.codepen.io/124568/cmk7ze4haz861.webp',
          year: '1996',
          description:
            'Angelfire offers free homepage hosting, later acquired by Lycos.',
        },
        {
          id: '0b4004be-0072-55e5-b472-b69b3d6f86e0',
          imgURL:
            'https://assets.codepen.io/124568/Screenshot%20from%202025-08-25%2012-02-12.png',
          year: '1996',
          description:
            'Xoom provides free unlimited hosting with banner ads, pioneering ad-supported hosting.',
        },
        {
          id: 'e7690c40-60b7-53c8-abb3-d7a7eeaf3d29',
          imgURL:
            'https://assets.codepen.io/124568/Screenshot%20from%202025-08-25%2012-08-55.png',
          year: '1997',
          description: `FortuneCity emerges with a virtual "city" theme for personal sites.`,
        },
        {
          id: '744261a4-b0a7-5975-9543-b44caaacce4d',
          imgURL: 'https://assets.codepen.io/124568/aol03.webp',
          year: 'Late 1990s',
          description:
            '**MSN HomePages** and **AOL Hometown** bring homepage creation to mainstream internet users.',
        },
        {
          id: '14538a4a-0bde-5998-8309-b91cf8739a28',
          imgURL:
            'https://assets.codepen.io/124568/Frontpage03-screenshot.webp',
          year: '1990s',
          description:
            'WYSIWYG tools like **Microsoft FrontPage** and **Macromedia Dreamweaver** let non-coders build websites with drag-and-drop editors.',
        },
      ],
    },
    {
      title: 'CMS & eCommerce Platforms',
      description:
        'These platforms mainstreamed professional web presence without custom coding,\nshaping user expectations for customizable, performant, and mobile-friendly\nfrontends.',
      timeline: [
        {
          id: '3d911435-d775-584f-b3d3-dfcacaa92b90',
          imgURL: 'https://assets.codepen.io/124568/drupal-25202-0_0.jpg',
          year: '2000s',
          description: 'Open-source CMS rise: Drupal, Joomla, Magento.',
        },
        {
          id: 'ba7dfea4-cb09-5a36-88de-ee3d1d1a336e',
          imgURL:
            'https://assets.codepen.io/124568/shopify-in-2006-1024x438.png',
          year: '2006',
          description:
            'Shopify launches, democratizing online stores for small businesses.',
        },
        {
          id: '5540e479-af26-52e5-ba45-f907e5fad645',
          imgURL:
            'https://assets.codepen.io/124568/Screenshot%20from%202025-08-25%2012-29-14.png',
          year: '2000s-2010s',
          description:
            'Squarespace and Wix popularize drag-and-drop site builders for non-developers.',
        },
      ],
    },
    {
      title: 'Styling & Interactivity Era (mid-1990s-2000s)',
      description:
        "The Styling & Interactivity era transformed the web from static pages into\nsomething richer and more engaging... (see original for full nuance). CSS enabled\ndesign as its own discipline; browser wars spurred innovation and fragmentation;\nalternative browsers pushed standards and usability; media and culture\nexperimented heavily online, foreshadowing today's streaming-driven web.",
      timeline: [
        {
          id: '3808bf14-34ee-526e-b798-c43d8d3d9886',
          imgURL: 'https://assets.codepen.io/124568/MultiTorg_Opera.png',
          year: '1995',
          description:
            'Opera browser launches in Norway; known for speed and innovation (tabbed browsing, pop-up blocking, mouse gestures, integrated search).',
        },
        {
          id: '1a2467e4-7afb-57bb-bf6e-a821cebc141b',
          imgURL: 'https://assets.codepen.io/124568/950636c-W3C.jpg',
          year: '1996',
          description:
            'CSS is introduced by Håkon Wium Lie, separating content from presentation.',
        },
        {
          id: '37a55e04-0b7a-5954-a235-dd3d966caaa0',
          imgURL:
            'https://assets.codepen.io/124568/browser-war-2011-firefox-chrome-internet-explorer.webp',
          year: '1995-1999',
          description:
            'Browser wars between Netscape and Internet Explorer; IE wins dominance by bundling with Windows.',
        },
        {
          id: '4d07dc6b-db98-5d8f-a087-d926a2208930',
          imgURL: 'https://assets.codepen.io/124568/full.jpg',
          year: '1997',
          description: 'HTML 4.0 standardizes markup.',
        },
        {
          id: '3ae93779-5ddd-507b-b0e8-7454f5c37e5a',
          imgURL:
            'https://assets.codepen.io/124568/b7c75268-3612-4f1a-90e9-dda1c248c2ca-large16x9_HardForceblog1008.jpg',
          year: '1997',
          description:
            'First online crowdfunding - Marillion, to finance a tour.',
        },
        {
          id: 'c465c58e-8efa-501d-8a7c-a218801eef69',
          imgURL: 'https://assets.codepen.io/124568/Bowie_Hours.jpeg',
          year: '1999',
          description:
            'First major artist to release an album digitally - David Bowie.',
        },
        {
          id: '1015fa0b-c520-5b2d-89c5-1c67dc219bbc',
          imgURL:
            'https://assets.codepen.io/124568/macromedia-flash-2-0-01.png',
          year: '1999',
          description:
            'Flash gains traction for animations, video, and interactivity.',
        },
        {
          id: '0a7b6e5e-8a65-5844-9215-3ebdcd4edeca',
          imgURL: 'https://assets.codepen.io/124568/Napster-1024x576.jpg',
          year: '1999',
          description: 'Napster popularizes peer-to-peer music sharing.',
        },
        {
          id: 'db437bfd-b709-5be3-9841-1c315fee1f24',
          imgURL: 'https://assets.codepen.io/124568/JSP-Architecture.webp',
          year: '1999',
          description: 'Sun Microsystems launched JSP.',
        },
        {
          id: '7e102c81-fdf5-58b4-9119-577e625d0c69',
          imgURL:
            'https://assets.codepen.io/124568/635901fc4314c68586e2d056_lamp-stack-software-development.jpg',
          year: 'late 90s',
          description: 'LAMP Stack rises in popularity.',
        },
        {
          id: '618741ea-fe29-562c-adce-d39df1f4a155',
          imgURL:
            'https://assets.codepen.io/124568/ChatGPT%20Image%2025.%20aug.%202025%2C%2019_09_30.png',
          year: 'late 90s',
          description:
            'Adult sites were early adopters of embedded video players (RealPlayer, WMP, QuickTime, later Flash).',
        },
        {
          id: '9293b91c-6f2d-5195-99c4-4b62694b64bf',
          imgURL: 'https://assets.codepen.io/124568/2002_phoenix.png',
          year: '2002',
          description:
            'Phoenix browser (later Firefox) is released, focusing on speed, standards, and extensions.',
        },
        {
          id: '182c8730-5cb6-5958-a74f-1e2826c82980',
          imgURL: 'https://assets.codepen.io/124568/Safari-1-on-Panther.jpg',
          year: '2003',
          description:
            'Apple Safari is introduced as default for macOS, replacing Internet Explorer for Mac.',
        },
        {
          id: '982f3593-a15a-5f82-8145-a6be1e12afc9',
          imgURL: 'https://assets.codepen.io/124568/mozilla-firefox-1-0.png',
          year: '2004',
          description:
            'Firefox 1.0 launches, gaining market share as an open, standards-compliant IE alternative.',
        },
      ],
    },
    {
      title: 'Animation & Graphics Beyond Flash',
      description:
        'Motion became a core part of UX. With JS + CSS animation and WebGL abstractions,\nthe web evolved from static documents to expressive, immersive interfaces without plugins.',
      timeline: [
        {
          id: 'aedd546b-4dd0-5f21-b2ef-1089e2945af7',
          imgURL:
            'https://assets.codepen.io/124568/1_ddFsRMtjEdXQKFWPjdb9-w.webp',
          year: '2006',
          description:
            'GSAP (GreenSock) becomes a pro-grade JS animation toolkit.',
        },
        {
          id: '5730407d-8ea4-57fb-8d9f-42bab9deb073',
          imgURL:
            'https://assets.codepen.io/124568/1_adcnxab1qc_5kf8juxdeya.png',
          year: '2010',
          description: 'Three.js brings developer-friendly 3D on top of WebGL.',
        },
        {
          id: '0d17d8f3-d9a5-5cb7-9e47-7afedbdceef8',
          imgURL: 'https://assets.codepen.io/124568/img_6377b1e01f882.png',
          year: '2010s',
          description:
            'CSS3 animations/transforms replace many Flash-era effects natively.',
        },
      ],
    },
    {
      title: 'Bulletin Boards & Online Forums (mid-1990s-2000s)',
      description:
        'Forums shaped the culture of the interactive web long before Facebook or Twitter.\nThey normalized persistent identity, threaded discussions, reputation systems,\nand community moderation - conventions that live on in Reddit, Stack Overflow, and Discourse.',
      timeline: [
        {
          id: '07726601-a5fa-5ade-a4f0-facb35037f72',
          imgURL: 'https://assets.codepen.io/124568/origin.jpg',
          year: 'Pre-Web roots',
          description:
            'Text-based BBS (Bulletin Board Systems) popular in the 1980s and early 1990s via dial-up.',
        },
        {
          id: '12baa1cd-69c5-5ddd-a4e9-e40c182829ba',
          imgURL: 'https://assets.codepen.io/124568/unnamed.gif',
          year: '1994+',
          description:
            'As the web grew, forums moved online with WWWBoard and early CGI-driven scripts.',
        },
        {
          id: '96bf5bff-fdf4-57ec-a7e8-453a184eb183',
          imgURL:
            'https://assets.codepen.io/124568/edu_phpbb_overview_reply_posted.webp',
          year: 'Late 1990s',
          description:
            'UBB.classic, vBulletin, phpBB (2000), and SMF (2003) standardize features like threads, avatars, moderation, themes.',
        },
        {
          id: '2a975553-fd6c-506d-b6df-84899da0a28d',
          imgURL:
            'https://assets.codepen.io/124568/Screenshot%20from%202025-08-26%2008-46-56.png',
          year: '2000s',
          description:
            'Forums become central hubs (gaming, coding, fandoms) with signatures, PMs, polls, stickies, skins - proto-social networks.',
        },
      ],
    },
    {
      title: 'Search Engines & SEO (1990s-Today)',
      description: `Search engines became the primary gateway to the web, shaping how frontends are built and discovered... Google's dominance pushed standards, semantics, speed, and mobile-first design. AI-driven search continues to influence content structure and delivery.

Advertising changed frontend priorities. Pop-ups and banners degraded UX but fuelled massive growth in the web economy. SEO spam and ad-driven content farms distorted search until algorithm updates (e.g., Google Panda, 2011) forced better practices.

On the positive side, monetization funded free content and tools, but also required frontend developers to balance **performance, design, privacy, and revenue**. Today, responsive ad units, privacy banners, and consent flows are unavoidable parts of frontend design. `,
      timeline: [
        {
          id: '98e2c04b-00ea-5f12-b0f4-c6a3756d1710',
          imgURL: 'https://assets.codepen.io/124568/archie-search.jpeg',
          year: '1990',
          description:
            'Archie becomes the first search engine, indexing FTP sites.',
        },
        {
          id: '6f19dade-011b-5cfa-bb62-e0d7d2319ed7',
          imgURL: 'https://assets.codepen.io/124568/aliweb-1995.png',
          year: '1993-1994',
          description:
            'Early web search tools: ALIWEB, WebCrawler, Lycos, Infoseek, Excite.',
        },
        {
          id: 'cc98a23f-1fab-5a94-8f0a-e620c947329d',
          imgURL: 'https://assets.codepen.io/124568/yahoo-1995.0.webp',
          year: '1994',
          description: 'Yahoo! Directory launches, initially human-curated.',
        },
        {
          id: 'a6aeca60-22a6-5d95-b0c1-ec1594a4d2e6',
          imgURL:
            'https://assets.codepen.io/124568/ask-jeeves-question-search.webp',
          year: '1996',
          description: 'Ask Jeeves introduces natural language queries.',
        },
        {
          id: '995ccc5d-3a3c-528c-bcac-8f710aae57a6',
          imgURL:
            'https://assets.codepen.io/124568/473076890_1310684716937682_3008112235248314087_n.jpg',
          year: '1997',
          description:
            'AltaVista and HotBot push full-text search; niche engines like Astalavista.box.sk index cracks/warez.',
        },
        {
          id: '239248f2-668d-5c9c-9663-0ee6195fbe91',
          imgURL: 'https://assets.codepen.io/124568/google-1998.png',
          year: '1998',
          description:
            'Google launches with PageRank, revolutionizing relevance.',
        },
        {
          id: 'eee85ff2-5f7c-52ab-b016-5835ceef6e2f',
          imgURL:
            'https://assets.codepen.io/124568/evolution-of-seo-2000-2005.png',
          year: '2000s',
          description:
            'SEO emerges: tweaking HTML, metadata, content structure for rankings.',
        },
        {
          id: 'c46e28c6-5661-5986-bc33-eb1c1924baf8',
          imgURL:
            'https://assets.codepen.io/124568/google-ads-2001-different-colours-480x417.webp',
          year: '2000',
          description:
            '**Google AdWords** launches, introducing keyword-based advertising',
        },
        {
          id: '4638e75f-092b-581f-b1e8-a70da1b9025b',
          imgURL:
            'https://assets.codepen.io/124568/Visible%20keyword%20stuffing%20example.webp',
          year: '2000s',
          description:
            'Black-hat practices like keyword stuffing and link farms rise (later penalized).',
        },
        {
          id: '341188b1-51f3-5442-8774-e888244c6e6a',
          imgURL: 'https://assets.codepen.io/124568/0_jnk0_FJWQf_7Z4j4.webp',
          year: '2000s',
          description:
            'Monetization drives frontend changes: **popup wars**, intrusive banners, auto-playing media, and SEO spam (content farms).',
        },
        {
          id: 'ab54032c-70bd-5606-b47c-0171dcb8a55d',
          imgURL: 'https://assets.codepen.io/124568/google-2003-06.png',
          year: '2003',
          description:
            '**Google AdSense** follows, letting site owners embed contextual ads, monetizing content at scale.',
        },
        {
          id: '4cc940ed-3afe-5c9a-8fb3-19b900737475',
          imgURL: 'https://assets.codepen.io/124568/Bing-001.avif',
          year: '2009',
          description: 'Bing launches, giving Microsoft a foothold in search.',
        },
        {
          id: 'bf24a385-72d3-5ad0-a525-192c1fab7fd6',
          imgURL:
            'https://assets.codepen.io/124568/core-web-vitals-are-part-of-the-google-ranking-factors.webp',
          year: '2010s',
          description:
            'Mobile-first indexing, Schema.org, and Core Web Vitals elevate performance/accessibility.',
        },
        {
          id: 'efddea6d-549a-564f-8f45-63b5dfc0ff07',
          imgURL:
            'https://assets.codepen.io/124568/67215ad5ddfdc0094989b9cf_666c62bde1b1f213f0124f97_modal_cookie_banner_example.png',
          year: '2010s',
          description:
            'The ad ecosystem pushes responsive design (adaptive ad units) and regulations like **GDPR/CCPA** introduce cookie consent banners.  ',
        },
        {
          id: '5ab59bae-db4a-50ea-8e9b-98d67ec97181',
          imgURL:
            'https://assets.codepen.io/124568/1_FTLigPUssoVw2tnQj6-Kaw.jpg',
          year: 'Today',
          description:
            'AI-powered search and voice assistants shift from links to direct answers.',
        },
      ],
    },
    {
      title: 'Privacy, Tracking & Regulation (1990s-Today)',
      description: `Privacy reshaped the frontend in visible ways. Developers had to implement **cookie banners, consent flows, and tracking opt-outs**, making privacy UX a standard part of web design.

It also forced technical changes: fewer third-party scripts, stricter data handling, and performance trade-offs. Regulations like GDPR turned privacy from a backend legal issue into a **core frontend concern**, directly affecting layout, design, and interactivity.

Today, frontend development must balance personalization, analytics, and advertising with **compliance, trust, and user control**.`,
      timeline: [
        {
          id: '6498d3a1-853e-5849-b59f-1d9f477717a3',
          imgURL: 'https://assets.codepen.io/124568/8011774.png',
          year: '1994',
          description: `**Cookies** are introduced by Netscape, enabling session state, shopping carts, and later ad tracking.  `,
        },
        {
          id: '861122df-eaa1-5ad9-9785-2891f98bd59a',
          imgURL:
            'https://assets.codepen.io/124568/targeted-ads-ideas-inline03.webp',
          year: '2000s',
          description: `Third-party cookies fuel the rise of targeted ads, analytics, and retargeting, shaping how frontends load external scripts.  `,
        },
        {
          id: '93ccf763-653b-5942-86c0-a8bf7245dcfb',
          imgURL:
            'https://assets.codepen.io/124568/privacy-policy-dnt-do-not-track-update.jpg',
          year: '2009',
          description: `**Do Not Track (DNT)** is proposed as a browser feature, though adoption is limited.  `,
        },
        {
          id: 'fa1daf2e-0e8a-552c-8a33-3f8ccf2818d9',
          imgURL: 'https://assets.codepen.io/124568/image-641-1.png',
          year: '2010s',
          description: `Growing privacy concerns lead to stricter regulations and browser features:
- **GDPR (2018)** in the EU requires explicit user consent for data collection.
- **CCPA (2020)** brings similar rules to California.
- **Safari's Intelligent Tracking Prevention (2017)** and **Firefox Enhanced Tracking Protection (2019)** block third-party cookies by default.`,
        },
        {
          id: '61097fdc-53a7-56bf-88b7-140b37748d02',
          imgURL: 'https://assets.codepen.io/124568/psb-metadata-image.webp',
          year: '2020s',
          description: `Chrome announces the **phase-out of third-party cookies** (ongoing), pushing new standards like **Privacy Sandbox**.  `,
        },
      ],
    },
    {
      title: 'Rise of Dynamic Frontends (2000s)',
      description:
        "A decisive shift from documents to applications. AJAX set expectations for instant interactivity;\nlibraries like jQuery smoothed browser differences; platforms like Gmail and YouTube proved the web's app potential;\nChrome's V8 raised performance bars and enabled modern frameworks.",
      timeline: [
        {
          id: '320e00d2-c157-5352-845e-881f31a23c3f',
          imgURL:
            'https://assets.codepen.io/124568/ChatGPT%20Image%2026.%20aug.%202025%2C%2009_29_03.png',
          year: '2000s',
          description:
            'Adult industry helped popularize Flash video (FLV); early Adaptive Streaming and DRM experimentation.',
        },
        {
          id: '79164f50-f6eb-5935-b4ff-4b4bf7db0d45',
          imgURL:
            'https://assets.codepen.io/124568/How-to-Download-a-File-Using-the-Gnutella-Network.jpg',
          year: '2000-2001',
          description: 'P2P platforms arise: Gnutella, Kazaa, BitTorrent.',
        },
        {
          id: '61e68c01-1d1c-53af-acbf-1a1c3369fbdb',
          imgURL: 'https://assets.codepen.io/124568/IE-6.0.png',
          year: '2001',
          description:
            'Internet Explorer 6 launches, notorious for lack of standards support.',
        },
        {
          id: '96c6561f-a969-599b-b298-4a7cd0eb838f',
          imgURL: 'https://assets.codepen.io/124568/a3190458732_16.jpg',
          year: '2001',
          description: `Gatas Parlaments releases the first free online release in Norway or in general: "Holdning over underholdning".`,
        },
        {
          id: '6d09547b-f6be-5965-87c0-e1aace8c6f87',
          imgURL: 'https://assets.codepen.io/124568/03e4wjne18se1.png',
          year: '2004',
          description: 'Gmail shows power of AJAX for dynamic apps.',
        },
        {
          id: 'dd8c51eb-7714-5518-9285-43d388583125',
          imgURL:
            'https://assets.codepen.io/124568/scriptaculos_service_provider_india.jpg',
          year: '2006-2008',
          description:
            'Early JS libraries/frameworks emerge: Prototype.js, script.aculo.us, jQuery (2006), Blueprint CSS.',
        },
        {
          id: 'c1c60f2e-e15f-587a-a2f2-7c3abe1b51aa',
          imgURL: 'https://assets.codepen.io/124568/youtube-2005.png',
          year: '2005',
          description: 'YouTube launches, bringing video mainstream.',
        },
        {
          id: 'c9c9a605-896b-51f8-b3ee-17f56c540fb5',
          imgURL: 'https://assets.codepen.io/124568/131060.jpeg',
          year: '2007',
          description:
            "Landed my first full-time developer job as Technical Developer at Norway's largest digital media house.",
        },
        {
          id: '87c39d69-0ed1-5bc5-97a3-97bbceb0b428',
          imgURL: 'https://assets.codepen.io/124568/google-chrome-2008.png',
          year: '2008',
          description:
            'Google Chrome launches with the fast V8 JavaScript engine.',
        },
        {
          id: 'edf3340e-ce66-582c-ae5f-598d76d491de',
          imgURL: 'https://assets.codepen.io/124568/marillion1985.webp',
          year: '2008',
          description:
            'Marillion, first band in the world to legally release their album on peer-to-peer (P2P) networks.',
        },
        {
          id: '2d0c9df5-cb38-5e8a-9e6a-35b994cdc3d0',
          imgURL: 'https://assets.codepen.io/124568/web-workers.jpg',
          year: '2009',
          description: 'Web Workers introduced for background threads.',
        },
        {
          id: '317d04c6-cf9b-5ccd-9d7a-37e0ada66b0c',
          imgURL:
            'https://assets.codepen.io/124568/1_eld6_TNR8oUOuXCAojj1CQ.png',
          year: '2009',
          description:
            'Node.js created by Ryan Dahl, bringing JavaScript to the server and powering modern tooling.',
        },
      ],
    },
    {
      title: 'Enterprise & Proprietary Tech',
      description:
        'Though many proprietary approaches faded, they pressured the open web to deliver\nrich app capabilities, accelerating standards and the shift to component-based frontends.',
      timeline: [
        {
          id: '490d9ef4-c708-55c0-b11d-f3e1269d3b33',
          imgURL: 'https://assets.codepen.io/124568/sta-je-silverlight.jpg',
          year: '2007',
          description:
            'Silverlight (Microsoft) and Adobe Flex attempt rich, enterprise web apps beyond Flash.',
        },
        {
          id: 'efc52dde-0a1f-5c7a-bcd5-b8dbacdfaca7',
          imgURL:
            'https://assets.codepen.io/124568/do-salesforce-development-using-apex-or-visualforce-also-i-will-create-flows.webp',
          year: '2000s',
          description:
            'Enterprise platforms (e.g., Salesforce Visualforce) push component-driven UI in business apps.',
        },
      ],
    },
    {
      title: 'Web 2.0, 3.0, and the Social Web',
      description: `Web 2.0 emphasized participation, UGC, and interactivity; it birthed "social design."\nLater Web 3.0 discussions focused on semantics and decentralization - still evolving but influential.`,
      timeline: [
        {
          id: '5af9f655-750f-514f-9db8-78b1de39f5a2',
          imgURL: 'https://assets.codepen.io/124568/Web_2.0_Map.svg.png',
          year: '1999-2004',
          description: `"Web 2.0" describes the shift to interactive, user-driven platforms (AJAX, UGC, blogs, wikis, tagging/sharing).`,
        },
        {
          id: 'cd1800f0-7223-5794-9708-64cf2d0b9b76',
          imgURL:
            'https://assets.codepen.io/124568/blogginghistoryblogger1999-2.png',
          year: '1999',
          description: 'Blogger launches; LiveJournal gains traction.',
        },
        {
          id: '0d6d0b57-c04e-549c-ba2b-e72bbafcbd55',
          imgURL: 'https://assets.codepen.io/124568/wordpress-2003.png',
          year: '2003',
          description:
            'WordPress is released, becoming the most popular open-source blogging/CMS platform.',
        },
        {
          id: '6b2e098b-6564-5d33-948f-7fb9c3efe525',
          imgURL: 'https://assets.codepen.io/124568/2010-01-08__tech05.avif',
          year: '2004+',
          description:
            'Flickr, Facebook, YouTube, Wikipedia, and Gmail become Web 2.0 archetypes.',
        },
        {
          id: '4e14027c-4c8a-540c-9b6b-dc197ab45818',
          imgURL: 'https://assets.codepen.io/124568/understanding_web3_2.webp',
          year: '2010s',
          description: `"Web 3.0" discussions: linked data, decentralization, blockchain, P2P.`,
        },
      ],
    },
    {
      title: 'The Mobile Revolution (2007-2010s)',
      description:
        'Smartphones forced a rethink of layout, performance, and input models.\nResponsive design and progressive enhancement became standard; mobile-first shaped frameworks and business strategy.',
      timeline: [
        {
          id: '68fbf6ef-755c-5183-81c7-99e8c961f15f',
          imgURL:
            'https://assets.codepen.io/124568/230718105811-steve-jobs-iphone-2007.jpg',
          year: '2007',
          description:
            'Apple releases the iPhone with a full browser (Safari) and multitouch.',
        },
        {
          id: '22bf9f11-0b1e-5228-9d14-40b1695a2972',
          imgURL:
            'https://assets.codepen.io/124568/Screen-Shot-2018-21-9-at-14-50-53.jpeg',
          year: '2008',
          description: 'Google Android launches, accelerating adoption.',
        },
        {
          id: '9df1e62c-2fa0-5c69-b997-22d31959faa6',
          imgURL: 'https://assets.codepen.io/124568/hero.png',
          year: '2007-2009',
          description:
            'Mobile browsers rapidly evolve with modern rendering and full CSS/JS support.',
        },
        {
          id: '8bfc9e5d-b3e1-504b-b3bc-8413a908cbea',
          imgURL: 'https://assets.codepen.io/124568/screenshot_3-4.webp',
          year: '2008',
          description:
            'App Store and Google Play shift expectations to app-like experiences.',
        },
        {
          id: 'bad4cbd1-d937-5047-955a-81c527161ab2',
          imgURL: 'https://assets.codepen.io/124568/f3zAwfHwJHfTPD8GWxbWTe.jpg',
          year: '2010',
          description: 'Ethan Marcotte coins Responsive Web Design (RWD).',
        },
        {
          id: '160f480c-af6b-5b99-bb13-c45f70d940db',
          imgURL:
            'https://assets.codepen.io/124568/web-design-services-page-1024x663.png',
          year: '2011',
          description:
            'Bootstrap popularizes mobile-first design with ready-made components.',
        },
      ],
    },
    {
      title: 'Mobile Web Beyond iPhone',
      description:
        'Opera Mini extended web reach to feature phones; iPhone and Android reset expectations to touch-first, app-like, and fast.',
      timeline: [
        {
          id: '918754e8-5b73-50b6-875f-8a2ea2bf38cf',
          imgURL:
            'https://assets.codepen.io/124568/mobile-internet-before-smartphones.png',
          year: '2005',
          description:
            'Opera Mini brings compressed web browsing to feature phones.',
        },
        {
          id: '60287e45-8417-58a1-a41f-db8d550d7ff5',
          imgURL:
            'https://assets.codepen.io/124568/230718105811-steve-jobs-iphone-2007.jpg',
          year: '2007',
          description:
            'iPhone redefines mobile web with a full browser and multitouch UX.',
        },
        {
          id: 'ed9284fa-ac6c-5778-bf5c-7d5414a65930',
          imgURL:
            'https://assets.codepen.io/124568/Screen-Shot-2018-21-9-at-14-50-53.jpeg',
          year: '2008',
          description: 'Android accelerates global smartphone adoption.',
        },
      ],
    },
    {
      title: 'Modern Frontend Foundations (2010s)',
      description:
        'Component-based frameworks, TypeScript adoption, and GitHub-fueled open source defined modern frontend engineering.',
      timeline: [
        {
          id: 'de7b435f-4bc1-55a4-b08e-2179293799b6',
          imgURL: 'https://assets.codepen.io/124568/8-2.webp',
          year: '2010',
          description: 'AngularJS popularizes declarative, data-driven UIs.',
        },
        {
          id: 'fe89db6e-a0ba-5527-b874-b73271b8f089',
          imgURL: 'https://assets.codepen.io/124568/Group-2-6.jpg',
          year: '2010',
          description: 'Backbone.js introduces MVC patterns in the browser.',
        },
        {
          id: 'a50571d5-b770-55e4-9316-ed0c1b481e0c',
          imgURL: 'https://assets.codepen.io/124568/index.png',
          year: '2010',
          description:
            'Knockout.js introduces MVVM-style two-way data binding and observables in the browser, influencing later framework ergonomics.',
        },
        {
          id: 'ca7b6c13-5aca-5fd7-8d34-f4b73c230fae',
          imgURL:
            'https://assets.codepen.io/124568/web-design-services-page-1024x663.png',
          year: '2011',
          description:
            'Bootstrap brings responsive design with ready-made CSS components.',
        },
        {
          id: 'bdb9a6de-b5e1-5f1e-9217-83d4fda8d2e2',
          imgURL:
            'https://assets.codepen.io/124568/Chat_GPT_Image_Apr_8_2025_03_28_09_PM_min_a50f18164c_1.png',
          year: '2011',
          description:
            'WebRTC standardizes real-time audio, video, and data channels.',
        },
        {
          id: '61067e58-8e6d-5136-ac98-0f2dd5cd446f',
          imgURL: 'https://assets.codepen.io/124568/demo.gif',
          year: '2011',
          description:
            'WebGL enables hardware-accelerated 2D/3D graphics without plugins.',
        },
        {
          id: 'ece2f462-c4bd-5040-acd6-301b91cd98a9',
          imgURL:
            'https://assets.codepen.io/124568/visual-webcomponents.Bb3mLcAr_1cCvCu.jpg',
          year: '2011',
          description:
            'Web Components offer a framework-agnostic component model, underpinning many design systems and cross-framework integrations.',
        },
        {
          id: 'c31b1dce-9fe0-5743-beae-5854070cdf1d',
          imgURL:
            'https://assets.codepen.io/124568/1625489461-3a9b7f23e483fe9f.png',
          year: '2012',
          description:
            'Started at Bekk Consulting as Senior Interface Programmer Consultant.',
        },
        {
          id: '3302e979-1557-5110-b583-f110d1660019',
          imgURL:
            'https://assets.codepen.io/124568/E8hbTWC6sl7zEtSlnxa01Z57HAjeRLwH2Vilg5xnEks.webp',
          year: '2013',
          description:
            'React introduces component-based UI with a virtual DOM.',
        },
        {
          id: '90ef7ad0-75d8-5f56-a903-cddc81c97e5d',
          imgURL:
            'https://assets.codepen.io/124568/how-pwas-work-riseuplabs.webp',
          year: '2014',
          description:
            'Service Workers enable offline caching, background sync, push (PWA foundations).',
        },
        {
          id: '6ee8012a-7093-5be3-9ef8-485829d1d91b',
          imgURL:
            'https://assets.codepen.io/124568/5001.TypeScript_In_Eclipse.png',
          year: '2014',
          description:
            'TypeScript grows as a typed superset enabling safer large-scale apps.',
        },
        {
          id: '434d314e-ce63-570c-8c89-7f40a33c4f25',
          imgURL: 'https://assets.codepen.io/124568/svelte-1024x576.webp',
          year: '2014-2016',
          description: 'Vue.js and Svelte appear as lighter alternatives.',
        },
        {
          id: 'a06f055e-95d7-58ec-8225-a950aa8531a0',
          imgURL: 'https://assets.codepen.io/124568/github-2012.jpg',
          year: '2012-2016',
          description:
            'GitHub becomes central for collaboration, open source, and developer culture.',
        },
      ],
    },
    {
      title: 'Early Tooling & Build Systems (2010s)',
      description:
        "Task runners and early package managers industrialized frontend workflows, paving\nthe way for bundlers and today's npm-first ecosystem; ESLint set the bar for code quality.",
      timeline: [
        {
          id: '7f802892-98d4-549a-b886-554f07bd6bc3',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_i_672dxlgdw3hco9uzoo1l.webp',
          year: '2010-2012',
          description:
            'Grunt popularizes JavaScript task automation (minify, concat, watch).',
        },
        {
          id: '35d269b9-cfcb-5426-9342-973e83f07ac5',
          imgURL: 'https://assets.codepen.io/124568/1588441991947.png',
          year: '2013',
          description:
            'Gulp introduces a faster, streaming-based build pipeline.',
        },
        {
          id: '60ce1082-92ab-58af-887e-4bcb21f9b66a',
          imgURL: 'https://assets.codepen.io/124568/bower-logo.png',
          year: '2013',
          description:
            'Bower becomes the first mainstream frontend package manager (pre-npm dominance).',
        },
        {
          id: '9b045ed1-9c1c-5a12-b592-8199041d83d3',
          imgURL:
            'https://assets.codepen.io/124568/1_QlHjt8KztbbbjyIfyh2gAQ.jpg',
          year: '2013',
          description:
            'ESLint launches, setting the standard for JavaScript linting and code quality.',
        },
      ],
    },
    {
      title:
        'Tools of the Trade: Editors, IDEs, Playgrounds & DevTools (1990s-Today)',
      description:
        'Editors and DevTools evolved from simple text editors and WYSIWYG tools to powerful, extensible environments (VS Code, Chrome DevTools).\nOnline playgrounds made learning/prototyping social and fast.',
      timeline: [
        {
          id: '2d69187b-7db7-50a3-a815-4471644b3405',
          imgURL: 'https://assets.codepen.io/124568/ide-platformio-emacs.png',
          year: '1990s',
          description:
            'Plain text editors like Notepad, vi, Emacs, BBEdit used for early coding.',
        },
        {
          id: '031b7029-7ee8-5c5c-adcb-70ed2590741d',
          imgURL:
            'https://assets.codepen.io/124568/macromedia-dreamweaver-1-2-01.png',
          year: '1997',
          description:
            'WYSIWYG tools like Microsoft FrontPage and Macromedia Dreamweaver enabled drag-and-drop site creation.',
        },
        {
          id: '392d9639-998b-5792-bf0a-30a3d00dcabb',
          imgURL: 'https://assets.codepen.io/124568/sublime_text_4.png',
          year: '2000s',
          description:
            'TextMate and Sublime Text gain popularity for speed and plugins.',
        },
        {
          id: 'b74f4091-e0d6-58d1-a1c6-57f97cbafaaf',
          imgURL: 'Firebug',
          year: '2006',
          description:
            'Firebug launches, introducing live DOM/CSS/JS debugging in the browser.',
        },
        {
          id: '7821d5ed-b3c1-5477-a405-4fe6ad5976e2',
          imgURL: 'https://assets.codepen.io/124568/zVyna.png',
          year: '2010',
          description:
            'Chrome DevTools becomes a game-changer with profiling, network inspection, responsive testing.',
        },
        {
          id: '5d7be2a0-6af4-52b1-b1e5-666a0d29d79c',
          imgURL: 'https://assets.codepen.io/124568/jsfiiddle-5.png',
          year: '2010',
          description:
            'JSFiddle launches as an online playground for HTML/CSS/JS.',
        },
        {
          id: 'd08f3f82-16f8-596d-80cf-2651e8fe1b6c',
          imgURL:
            'https://assets.codepen.io/124568/webide-Screen-Shot-2011-09-27-at-22.09.02-.png',
          year: '2011',
          description:
            'WebStorm offers a professional IDE experience tailored to JavaScript/frontend.',
        },
        {
          id: '3ea8ab5f-0966-5c11-912b-5a45f17b09f7',
          imgURL: 'https://assets.codepen.io/124568/codepen-2012.png',
          year: '2012',
          description:
            'CodePen adds a social layer for sharing and exploring UI concepts.',
        },
        {
          id: '82801c16-31f7-566b-aced-a91b92ee9269',
          imgURL: 'https://assets.codepen.io/124568/BhZafL0CAAAJ1Hr.jpg',
          year: '2014',
          description: `Atom (GitHub) markets itself as a "hackable" editor; influences modern extensibility.`,
        },
        {
          id: '97f0f1fb-248f-5e37-9cca-1d0841ee426c',
          imgURL: 'https://assets.codepen.io/124568/visual_studio_code_2.webp',
          year: '2015',
          description:
            'VS Code releases; becomes the most widely used editor for frontend devs.',
        },

        {
          id: '39c789c4-624b-541c-9036-a975bd7dd273',
          imgURL:
            'https://assets.codepen.io/124568/repositories-view.DG5SYbPI.png',
          year: '2017',
          description:
            'StackBlitz introduces a full in-browser dev environment powered by WebAssembly.',
        },
      ],
    },
    {
      title: 'Version Control & Package Ecosystems (1980s-Today)',
      description:
        'Version control transformed collaboration; Git + GitHub made open source mainstream,\nand npm (plus Yarn/pnpm) sustains the modern JavaScript ecosystem.',
      timeline: [
        {
          id: '8f4f8976-02e0-5eb4-81aa-f21421f8498a',
          imgURL: 'https://assets.codepen.io/124568/sccs.fig714.epsi.gif',
          year: '1972',
          description:
            'Source Code Control System (SCCS). Closed source, free with UNIX',
        },
        {
          id: '32f54f61-97d9-5d0d-883d-1c39788d651f',
          imgURL: 'https://assets.codepen.io/124568/rcsbrowser.png',
          year: '1982',
          description: 'Revision Control System (RCS), open source.',
        },
        {
          id: 'f681d936-d1df-5434-bc14-72ae433a7ec6',
          imgURL: 'https://assets.codepen.io/124568/Single%20Developer.GIF',
          year: '1986',
          description:
            'CVS emerges as an early widely adopted version control system.',
        },
        {
          id: '9d85ed70-8533-581d-99d9-6323b4ce1978',
          imgURL: 'https://assets.codepen.io/124568/SVNClientBig.png',
          year: '2000',
          description: 'Subversion (SVN) released as a replacement for CVS.',
        },
        {
          id: 'ffecb38b-dc92-5b9e-afac-878ee74c026a',
          imgURL: 'https://assets.codepen.io/124568/1719764642190.jpeg',
          year: '2005',
          description:
            'Git created by Linus Torvalds, introducing distributed version control.',
        },
        {
          id: '4a2e8a36-64e0-51c9-b551-63ccdbf96568',
          imgURL: 'https://assets.codepen.io/124568/multi-line-commit.png',
          year: '2005',
          description:
            'Mercurial (Hg) released as a simpler alternative, used by Mozilla/Python before migrations to Git.',
        },
        {
          id: 'f717c939-7670-5c7e-8743-91764d917306',
          imgURL: 'https://assets.codepen.io/124568/github-2012.jpg',
          year: '2008',
          description:
            'GitHub launches with social features (PRs, issues, stars).',
        },
        {
          id: '45ec0452-3e94-5496-9594-de57e8e51854',
          imgURL: 'https://assets.codepen.io/124568/what-is-npm.png',
          year: '2010',
          description:
            'npm released, creating a central registry for JavaScript packages.',
        },
      ],
    },
    {
      title: 'Testing & QA in the Frontend',
      description:
        'Testing frameworks professionalized frontend development - unit, integration, and E2E testing enabling reliable continuous delivery.',
      timeline: [
        {
          id: '50af6beb-7964-503a-a6ec-053d317131ad',
          imgURL: 'https://assets.codepen.io/124568/qu001.png',
          year: '2000s',
          description:
            'QUnit (jQuery team) introduces unit testing for browser JS.',
        },
        {
          id: '296cac10-d3f7-5ab2-9854-3e70c3d146e6',
          imgURL: 'https://assets.codepen.io/124568/jasmine.json_.webp',
          year: '2010s',
          description: 'Jasmine and Mocha popularize BDD/TDD patterns.',
        },
        {
          id: '01db639d-0208-5308-8b19-934762deb149',
          imgURL: 'https://assets.codepen.io/124568/jest-watch-mode.png',
          year: '2014',
          description:
            'Jest becomes the de-facto test runner for React and beyond.',
        },
        {
          id: 'bc577cf2-579d-5ba9-ac1e-7b6459f72c62',
          imgURL: 'https://assets.codepen.io/124568/real-world-app.png',
          year: '2015',
          description:
            'Cypress streamlines end-to-end testing; Selenium remains a cross-browser staple.',
        },
      ],
    },
    {
      title: 'ECMAScript & Standards (1999-Today)',
      description:
        'ECMAScript standardization evolved JavaScript into a robust general-purpose language;\nHTML as a living standard accelerated delivery of modern web APIs.',
      timeline: [
        {
          id: 'a14e27a7-6114-5658-94cf-8641957d92c4',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_qakqanq79z8exo4pu63y.webp',
          year: '1999',
          description: 'ECMAScript 3 formalizes core JavaScript features.',
        },
        {
          id: '95780e54-2bf3-5471-89fe-30fb8bfe6dd8',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_qakqanq79z8exo4pu63y.webp',
          year: '2009',
          description: 'ES5 adds JSON, strict mode, getters/setters.',
        },
        {
          id: 'e46183ad-0eab-5a1f-9e3c-b8cde69392df',
          imgURL:
            'https://assets.codepen.io/124568/681da37499d136038dba27d1_image_20%286%29.png',
          year: '2015',
          description:
            'ES6 (ES2015) introduces classes, modules, arrow functions, promises, let/const.',
        },
        {
          id: '45d9d347-a174-5d74-b270-ef168c0776b6',
          imgURL: 'https://assets.codepen.io/124568/proposal-async-await.png',
          year: '2015+',
          description:
            'Annual updates add async/await, import/export, optional chaining, Intl, etc.',
        },
        {
          id: 'fee5dd24-00c8-5990-8d7c-62f73ad8b6dc',
          imgURL: 'https://assets.codepen.io/124568/w3c-whatwg-logos.png',
          year: '2004-2012',
          description: 'W3C/WHATWG split leads to HTML5 as a living standard.',
        },
      ],
    },
    {
      title: 'Design Paradigms (1990s-Today)',
      description:
        'Frontend design matured from table layouts to responsive, systematized design with tokens and components;\ntools like Figma bridged design and development.',
      timeline: [
        {
          id: 'c63558f2-dfad-518b-8681-1b34f70ce87f',
          imgURL: 'https://assets.codepen.io/124568/table-1.webp',
          year: '1990s',
          description:
            'Table-based layouts and spacer GIFs used before CSS matured.',
        },
        {
          id: '1d4a2169-7f53-599b-b955-3c57c6a7029e',
          imgURL:
            'https://assets.codepen.io/124568/creative-css3-tutorials.jpg',
          year: '2007',
          description:
            'CSS3 adds animations, rounded corners, gradients, shadows.',
        },
        {
          id: '2646cfa6-63d0-5ddf-8d92-2c79b5a01020',
          imgURL: 'https://assets.codepen.io/124568/f3zAwfHwJHfTPD8GWxbWTe.jpg',
          year: '2010',
          description: 'Responsive Web Design (RWD) coined by Ethan Marcotte.',
        },
        {
          id: 'b0200eb9-7d98-57db-b141-a07ec956b616',
          imgURL: 'https://assets.codepen.io/124568/metro7.jpg',
          year: '2011-2013',
          description:
            'Flat design (Metro, iOS7) shifts aesthetics toward minimalism and clarity.',
        },
        {
          id: '008ef6c9-f4a4-5998-9bef-6c48bb8f569f',
          imgURL:
            'https://assets.codepen.io/124568/libraries-material-design-ui-and-prototype.png',
          year: '2014-2016',
          description:
            'Design Systems emerge: Material, Lightning, Carbon with reusable tokens and components.',
        },
        {
          id: '09eb0502-462a-54cc-9dd0-d2562955729e',
          imgURL: 'https://assets.codepen.io/124568/Sketch-Pages-1.jpeg',
          year: '2017+',
          description:
            'Sketch, Figma, Adobe XD integrate design and development workflows.',
        },
      ],
    },
    {
      title: 'Styling Architectures & CSS-in-JS (2014–Today)',
      description:
        'CSS-in-JS began with dynamic, runtime styling co-located with components, then evolved toward compile-time extraction and SSR/SSG for performance and determinism—echoing server-first eras. Token-driven systems and static extraction (e.g., Panda CSS) bridge DX with predictable CSS output.',
      timeline: [
        {
          id: 'd4f5eb71-f94b-5687-8105-341ef95f8e9c',
          imgURL: '',
          year: '2015',
          description:
            'CSS Modules popularize locally-scoped class names and build-time composition, reducing global CSS collisions.',
        },
        {
          id: 'a6342600-6965-5a04-a740-8a6f67ff127e',
          imgURL: '',
          year: '2016',
          description:
            'styled-components brings CSS-in-JS with tagged template literals and runtime styling co-located with React components.',
        },
        {
          id: '19cad7bc-acf3-5e49-8ec3-e4ce4e63d24a',
          imgURL: '',
          year: '2017',
          description:
            'Emotion offers high-performance CSS-in-JS with strong DX and theming; widely adopted across React apps.',
        },
        {
          id: '19ee2d26-934c-5a70-9b16-c824823c0610',
          imgURL: '',
          year: '2017',
          description:
            'Linaria pioneers **zero-runtime** CSS-in-JS via compile-time extraction, cutting client-side style cost.',
        },
        {
          id: 'fd57549f-9770-54b3-b4f2-e1e0356ff818',
          imgURL: '',
          year: '2017',
          description:
            'Next.js mainstreams SSR/SSG in React, pushing pre-rendered HTML and critical CSS—an echo of server-first "PHP-days".',
        },
        {
          id: 'fbc514c0-b87f-5add-a651-fc366ce15500',
          imgURL: '',
          year: '2020',
          description:
            'Stitches focuses on design tokens, atomic CSS output, and runtime performance with partial static extraction.',
        },
        {
          id: '738c32cb-8cd5-5a6c-ba6e-9aa0306c0077',
          imgURL: '',
          year: '2020',
          description:
            'vanilla-extract delivers type-safe, **compile-time** CSS with CSS Variables; no client runtime.',
        },
        {
          id: 'f81bace9-3852-55c9-a90d-01be8b081fcc',
          imgURL: '',
          year: '2023',
          description:
            'Panda CSS (from the Chakra team) adopts static extraction + design tokens/recipes, marrying utility ergonomics with predictable, tree-shakeable CSS.',
        },
        {
          id: 'd596a0ce-6cbe-5803-887b-fb44d3e2652d',
          imgURL: '',
          year: '2023',
          description:
            'React Server Components (RSC) and modern SSR pipelines reduce client JS and runtime styling costs, accelerating shift to compiled styles.',
        },
      ],
    },
    {
      title: 'DevOps & Scaling Frontends',
      description:
        'DevOps, CI/CD, cloud, and bundlers brought operational discipline and performance focus,\nblurring lines between frontend and backend while enabling globally distributed architectures.',
      timeline: [
        {
          id: '0a20a4ca-c233-508b-b957-e4959079e352',
          imgURL: 'https://assets.codepen.io/124568/7602.1513404277.png',
          year: '2010s',
          description:
            'Rise of DevOps and CI/CD (Jenkins, Travis CI, GitHub Actions).',
        },
        {
          id: '3c6e15cc-1e29-51db-8621-49c9e1b840f6',
          imgURL:
            'https://assets.codepen.io/124568/copy-of-copy-of-blog-covers-2021-11-11t105359.633.avif',
          year: '2014+',
          description:
            'Cloud platforms and Netlify/Vercel simplify frontend deployment.',
        },
        {
          id: 'afcc7ee7-fefd-5435-8f2f-569112976a64',
          imgURL:
            'https://assets.codepen.io/124568/1_5PpB0JEPdB30wER8_XWuIQ.jpg',
          year: '2015+',
          description: 'Bundlers/compilers: Webpack, Babel, Parcel, Rollup.',
        },
        {
          id: 'd2e92332-73c7-5b53-8b02-7998e118eaea',
          imgURL: 'https://assets.codepen.io/124568/wasm-universal-binary.png',
          year: '2017',
          description:
            'WebAssembly (Wasm) released for near-native performance in the browser.',
        },
        {
          id: '8a2cec39-31e2-5a07-bfea-73408b8aae34',
          imgURL:
            'https://assets.codepen.io/124568/1627660095-jamstack-javascript-apis-markup.jpg',
          year: '2017+',
          description: 'Jamstack, SSGs like Gatsby, Next.js, Nuxt.js flourish.',
        },
      ],
    },
    {
      title: 'Accessibility & Performance (1990s-Today)',
      description:
        'Accessibility standards made inclusivity a requirement; performance metrics ensured focus on speed and UX - especially on mobile.',
      timeline: [
        {
          id: 'fc1a40e1-13d4-590a-9429-14d966cf5c72',
          imgURL: '',
          year: '1998',
          description:
            'Section 508 amended, requiring accessibility for U.S. federal agencies.',
        },
        {
          id: 'f6d9c4b0-c3fe-51a2-bb38-e0180a4fe8b0',
          imgURL: '',
          year: '1999',
          description:
            'WCAG 1.0 published as the first international web accessibility standard.',
        },
        {
          id: 'f9edcc35-d891-59e5-9f2f-faa3ce3a5da2',
          imgURL: '',
          year: '2008',
          description:
            'WAI-ARIA specs begin, improving accessibility semantics.',
        },
        {
          id: 'ca225b9c-c368-5c55-8a64-ccdf3564b739',
          imgURL: '',
          year: '2010s',
          description:
            'Accessibility becomes core in frameworks/design systems with ARIA and contrast tooling.',
        },
        {
          id: 'c46f7743-7f14-5708-b80f-02a334cd9bb7',
          imgURL: '',
          year: '2007-2010s',
          description:
            'YSlow and PageSpeed Insights introduce performance best practices.',
        },
        {
          id: 'e3f5d954-fd3c-532b-b699-216659242812',
          imgURL: '',
          year: '2018',
          description:
            'Google Lighthouse and Core Web Vitals provide measurable UX metrics.',
        },
      ],
    },
    {
      title: 'APIs & Data Integration (2000s-Today)',
      description:
        'APIs turned the frontend into a client of complex distributed systems; REST/JSON made integration universal; GraphQL improved precision.',
      timeline: [
        {
          id: '50516d0a-0bc6-500a-b454-9e1ece2a30fa',
          imgURL: '',
          year: '2000s',
          description: 'REST APIs replace SOAP/XML-heavy approaches.',
        },
        {
          id: 'f1e28380-0dd4-5977-9f5d-28f55982a2f3',
          imgURL: '',
          year: '2010s',
          description: 'JSON becomes the lightweight data format of choice.',
        },
        {
          id: 'e21a0f6f-3f66-5667-9520-ef501955b058',
          imgURL: '',
          year: '2015',
          description: 'GraphQL released, offering flexible queries.',
        },
        {
          id: '35ecc540-bfb9-5659-87ef-ee623542c1c7',
          imgURL: '',
          year: '2020s',
          description:
            'Frontends consume microservices and edge APIs for real-time, global apps.',
        },
      ],
    },
    {
      title: 'HTML-over-the-Wire & Hypermedia Revival (2013–Today)',
      description:
        'A counter-trend to SPA-heavy stacks: send HTML fragments from the server and progressively enhance at the edge. This reduces client JS, improves TTI, and revisits hypermedia principles with modern ergonomics.',
      timeline: [
        {
          id: '27a3bf76-d9ea-5426-9ac9-684ba03f19c9',
          imgURL: '',
          year: '2013',
          description:
            'Turbolinks (Rails) speeds navigation by swapping HTML over the wire without full page reloads.',
        },
        {
          id: 'fe70ffec-9b9a-5ba5-b089-ade6e450a83c',
          imgURL: '',
          year: '2018',
          description:
            'Stimulus introduces lightweight controllers for progressive enhancement, complementing server-rendered HTML.',
        },
        {
          id: '553f7538-4976-58e3-bfe5-681e166397b6',
          imgURL: '',
          year: '2019',
          description:
            'Phoenix LiveView streams server-rendered HTML over websockets for interactive apps without heavy client JS.',
        },
        {
          id: 'cceb3082-fd22-52b8-8fad-dd4343f2fd1f',
          imgURL: '',
          year: '2020',
          description:
            'Hotwire (Turbo + Stimulus) formalizes the HTML-over-the-wire approach for Rails and beyond.',
        },
        {
          id: 'd471c19a-7886-5508-8c6f-f3cbcfa97dc6',
          imgURL: '',
          year: '2020',
          description:
            'htmx enables hypermedia-driven UIs with HTML attributes—requesting, swapping, and animating HTML fragments with minimal JS.',
        },
        {
          id: '2d9d3df3-fd2b-5791-af2d-726c19ca1418',
          imgURL: '',
          year: '2020',
          description:
            'Laravel Livewire brings server-driven component interactivity to PHP, echoing classic server-first patterns with modern DX.',
        },
      ],
    },
    {
      title: 'Realtime Frontend (2000s-Today)',
      description:
        'Realtime APIs shifted frontends from request/response to live, stateful experiences across chat, collaboration, trading, and multiplayer.',
      timeline: [
        {
          id: '181f595e-3e41-58db-a506-296c1fc75764',
          imgURL: '',
          year: '2011',
          description:
            'WebSockets standardize persistent, bidirectional communication.',
        },
        {
          id: '58ba66d1-1269-549c-8259-201b2be6cb0c',
          imgURL: '',
          year: '2011',
          description:
            'WebRTC enables real-time audio, video, and P2P data channels.',
        },
        {
          id: '556a0e28-0d82-5d36-8c02-4ff18b243c7b',
          imgURL: '',
          year: '2010s',
          description: 'Realtime experiences go mainstream in web apps.',
        },
      ],
    },
    {
      title: 'Beyond the Browser (2011-Today)',
      description:
        'Web skills now target desktop and mobile via Electron and React Native; PWAs show the web can compete with native app capabilities.',
      timeline: [
        {
          id: '2f106feb-48dc-555c-acb1-933290ca937a',
          imgURL: '',
          year: '2011',
          description:
            'PhoneGap / Apache Cordova enable web apps inside native wrappers on iOS/Android.',
        },
        {
          id: '633b2c4c-7a78-59ce-a1c3-b9581e8b5372',
          imgURL: '',
          year: '2013',
          description:
            'Electron allows packaging web apps as cross-platform desktop applications.',
        },
        {
          id: 'cde039be-5662-5969-a6fe-a416f5eb6745',
          imgURL: '',
          year: '2015',
          description:
            "React Native brings React's component model to mobile with native APIs.",
        },
        {
          id: '6875c8ef-d3d7-5bfa-9634-3ea4e3535f3e',
          imgURL: '',
          year: '2016-2019',
          description:
            'Progressive Web Apps (PWAs) emerge with installability and offline support.',
        },
        {
          id: '5986a981-821d-55c1-b17c-36b3a91592cc',
          imgURL: '',
          year: 'Today',
          description:
            'Capacitor, Expo, and Tauri continue to blur lines between web, mobile, and desktop.',
        },
      ],
    },
    {
      title: 'The Rise of the Frontend Developer (2000s-Today)',
      description:
        'Frontend evolved into a specialized engineering discipline responsible for performance, accessibility, and product quality - far beyond markup and styling.',
      timeline: [
        {
          id: 'ee050012-c4e1-52ba-b8b2-6e7b836ff199',
          imgURL: '',
          year: '1990s',
          description: `"Webmasters", "developers", and "web designers" handled content, HTML, and servers all at once.`,
        },
        {
          id: '5a8c0999-da0f-5c4c-b50f-703f5c485a1a',
          imgURL: '',
          year: '2000s',
          description: `"Frontend developer" emerges as a distinct role as JS/CSS grow in complexity.`,
        },
        {
          id: 'e449d5fd-fee5-598f-806f-4859fd6302fe',
          imgURL: '',
          year: '2010s',
          description:
            'Conferences, meetups, and open source culture formalize frontend as a profession.',
        },
      ],
    },
    {
      title: 'Today (2020s)',
      description:
        'Today, frontend engineering integrates frameworks, TypeScript, utility-first CSS, WebAssembly, AI assistants, DevOps, micro frontends, and design systems - driving UX and business value.',
      timeline: [
        {
          id: '8d3d72f5-699b-5249-a4d8-3fba42fe9d0d',
          imgURL: '',
          year: '2015+',
          description:
            'Richer native Web APIs (Fetch, Streams, Intl, Web Crypto, Temporal) reduce third-party dependencies.',
        },
        {
          id: '8dd9845b-7259-527e-b239-10da136d92c7',
          imgURL: '',
          year: 'Today',
          description:
            'React dominates but Vue, Angular, Svelte, and SolidJS are vibrant.',
        },
        {
          id: '73bee147-b14c-5d95-a91e-ac25bba40822',
          imgURL: '',
          year: 'Today',
          description: 'TypeScript adoption explodes; industry standard.',
        },
        {
          id: '205d3312-48de-5f67-a9dd-66eb09d9db07',
          imgURL: '',
          year: 'Today',
          description:
            'Elm remains a niche but influential typed functional language for frontends.',
        },
        {
          id: '306a9a76-427a-5a9c-99ea-13b824a26af4',
          imgURL: '',
          year: 'Today',
          description:
            'CSS-in-JS, Tailwind, and utility-first approaches reshape styling.',
        },
        {
          id: 'afd836e0-1f7b-59cf-ab40-0f816413cc92',
          imgURL: '',
          year: 'Today',
          description:
            'WebAssembly opens the browser to non-JS languages (Rust, Go, C++).',
        },
        {
          id: 'e6ff3baf-c3a0-5b6d-a576-304c2b337d14',
          imgURL: '',
          year: 'Today',
          description:
            'AI-powered coding assistants (Copilot, ChatGPT) change how frontends are built.',
        },
        {
          id: 'b4cd1239-3957-5ca1-96cb-e675bca8aa0f',
          imgURL: '',
          year: 'Today',
          description:
            'Frontend tied to DevOps, cloud, micro frontends, and design systems.',
        },
        {
          id: '28643526-3f97-5983-ae34-390ba4076479',
          imgURL: '',
          year: 'Today',
          description: `**Privacy & Consent** - Cookie banners, consent management, and privacy-first design become unavoidable parts of frontend UX. Developers must balance
  compliance (GDPR, CCPA) with usability, while avoiding **dark patterns** increasingly scrutinized by regulators.`,
        },
        {
          id: 'eb005a37-a84e-5082-851c-a270c630c90b',
          imgURL: '',
          year: 'Today',
          description: `**Browser Privacy Features** - Safari's **Intelligent Tracking Prevention (ITP)**, Firefox's **Enhanced Tracking Protection (ETP)**, and Chrome's upcoming **Privacy Sandbox** phase-out of third-party cookies reshape how frontends handle analytics, ads, and personalization.`,
        },
      ],
    },
  ],
} as TimelineInterface;

const createHistory = (timeline: TimelineInterface) => {
  const historyElement = document.getElementById('history');

  if (!historyElement || !timeline) return;

  const { title, description, chapters } = timeline;

  if (!title || !chapters || chapters.length == 0) {
    console.log('Missing history details');
    return;
  }

  const historyContainerElement = document.createElement('div');
  const historyTitleElement = document.createElement('h1');
  historyContainerElement.classList.add('ph', 'container');
  historyTitleElement.classList.add('ph');

  historyTitleElement.append(title);

  historyContainerElement.append(historyTitleElement);

  if (description && description.length) {
    const descriptionElement = document.createElement('p');
    descriptionElement.classList.add('ph', 'lead');
    descriptionElement.innerHTML = markdownToHtml(description);
    historyContainerElement.append(descriptionElement);
  }

  historyElement.append(historyContainerElement);
  const timeLineListElement = document.createElement('ol');
  timeLineListElement.classList.add('ph', 'timeline');

  chapters.forEach((chapter) => {
    const { title, description, timeline } = chapter;

    const listItemElement = document.createElement('li');
    listItemElement.classList.add('ph', 'timeline-item');

    const chapterTitleElement = document.createElement('h2');
    chapterTitleElement.classList.add('ph');

    chapterTitleElement.append(title);

    listItemElement.append(chapterTitleElement);

    if (description && description.length) {
      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('ph');
      descriptionElement.innerHTML = markdownToHtml(description);
      listItemElement.append(descriptionElement);
    }

    timeLineListElement.append(listItemElement);

    let sameYear = '';
    timeline.forEach((item, itemIndex) => {
      const {
        id,
        imgURL = 'https://picsum.photos/1600/900',
        description,
        year,
      } = item;

      const listItemElement = document.createElement('li');
      listItemElement.classList.add('ph', 'timeline-item');

      const containerElement = document.createElement('div');
      containerElement.classList.add('ph', 'timeline-item-content');

      const hasImage = imgURL.length !== 0;

      if (hasImage) {
        const imgElement = document.createElement('img');
        imgElement.classList.add('ph', 'timeline-item-image');
        imgElement.setAttribute('src', imgURL);
        imgElement.setAttribute('loading', 'lazy');
        imgElement.setAttribute('decoding', 'async');
        imgElement.setAttribute('role', 'presentation');
        imgElement.setAttribute('alt', '');
        listItemElement.append(imgElement, containerElement);
      } else {
        listItemElement.append(containerElement);
      }

      const titleElement = document.createElement('span');

      if (sameYear === year) {
        titleElement.classList.add('ph', 'point');
        titleElement.setAttribute('role', 'presentation');
      } else {
        titleElement.classList.add('ph', 'year');
        titleElement.setAttribute('id', `title-${id}`);
        const timeElement = document.createElement('time');
        timeElement.classList.add('ph');
        timeElement.setAttribute('datetime', year);
        timeElement.append(year);
        titleElement.append(timeElement);
      }

      sameYear = year;

      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('ph', 'description');
      descriptionElement.setAttribute('id', `description-${id}`);
      descriptionElement.innerHTML = markdownToHtml(description);

      containerElement.append(titleElement, descriptionElement);

      timeLineListElement.append(listItemElement);
    });

    historyElement.append(timeLineListElement);
  });
};

createHistory(TIMELINE);
