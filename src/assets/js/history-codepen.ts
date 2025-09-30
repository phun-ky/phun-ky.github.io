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
          id: 'f7375d82-0f2b-45e2-b315-6f0b800830ef',
          imgURL:
            'https://assets.codepen.io/124568/image-20161102-27228-vph505.avif',
          year: '1969',
          description:
            'ARPANET goes live, the precursor to the modern internet.',
        },
        {
          id: '6daababe-5f9c-4da8-baa5-4cf683123aef',
          imgURL:
            'https://assets.codepen.io/124568/Screen_Shot_2020-09-19_at_8.51.34_AM_big.png',
          year: '1983',
          description:
            'TCP/IP becomes the standard protocol, enabling a truly connected internet.',
        },
        {
          id: '25c45159-ac39-4e18-aef5-a27722ca993e',
          imgURL: '',
          year: '1983',
          description: 'I was born!',
        },
        {
          id: 'f93b78ae-6efb-4bd9-b73b-eed5198800e1',
          imgURL: 'https://assets.codepen.io/124568/Larry_Wall_YAPC_2007.jpeg',
          year: '1987',
          description:
            'Larry Wall created Perl, originally as a text-processing language.',
        },
        {
          id: 'bad67959-e924-43b8-ba34-d2e49fb61d44',
          imgURL: 'https://assets.codepen.io/124568/installchannel.gif',
          year: '1988',
          description: 'IRC was invented by Jarkko Oikarinen.',
        },
        {
          id: '5adb2e5c-8e5e-4f87-8cc1-4e07b99f8466',
          imgURL: 'https://assets.codepen.io/124568/Tim%20Berners%20Lee.JPG',
          year: '1989',
          description:
            'Tim Berners-Lee proposes the World Wide Web (WWW) at CERN.',
        },
        {
          id: '5e36bce4-f33c-5f21-89e1-11b663dd89a3',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_d6nsmn2v4z78ub1ie8np.webp',
          year: '1989',
          description: `**James Gosling** created Oak for Sun Microsystems, later named Java.`,
        },
        {
          id: 'cc825fe7-eb19-4dcb-aae1-0ff7c0e7ac5a',
          imgURL: 'https://assets.codepen.io/124568/article_nexus_1.jpg',
          year: '1990',
          description:
            'Tim Berners-Lee creates the first web browser (WorldWideWeb) and the first website.',
        },
        {
          id: 'd6b0fc5d-bacb-424c-a797-59bf60fa926d',
          imgURL:
            'https://assets.codepen.io/124568/Les_Horribles_Cernettes_in_1992.jpg',
          year: '1992',
          description:
            'The first image is uploaded to the web (a parody band photo of CERN staff).',
        },
        {
          id: 'b797b6a4-aaa4-4182-9a0a-472bda566c05',
          imgURL: 'https://assets.codepen.io/124568/mos-10.webp',
          year: '1993',
          description:
            'Mosaic browser launches, bringing images inline with text - a huge leap in UX.',
        },
        {
          id: '06af9768-2961-4ea3-9e82-0c31005d7409',
          imgURL: 'https://assets.codepen.io/124568/fig161.gif',
          year: '1993',
          description:
            'CGI was introduced. It was the very first way to make dynamic websites.',
        },
        {
          id: '8ed0d4d6-30ae-483f-bfa5-37e9e7719d8f',
          imgURL:
            'https://assets.codepen.io/124568/netscape-navigator-1-0-08.png',
          year: '1994',
          description:
            'Netscape Navigator dominates; Yahoo! and Amazon launch.',
        },
        {
          id: '92772190-3ced-4de8-9201-c3a0e803f8af',
          imgURL:
            'https://assets.codepen.io/124568/Sting_-_Ten_Summoner-s_Tales.png',
          year: '1994',
          description: `First
                **online credit card transaction** and
                first album sold online via encrypted card: Sting's
                _Ten Summoner's Tales_.`,
        },
        {
          id: '74d65555-f4c9-4bd2-b51a-fab08dc97fdb',
          imgURL: 'https://assets.codepen.io/124568/pizzanet.webp',
          year: '1994',
          description: 'Pizza Hut introduced the first online pizza ordering.',
        },
        {
          id: '37153078-a8ea-4826-95f9-0a3b292fb2ec',
          imgURL: 'https://assets.codepen.io/124568/Brendan_Eich_2015.jpg',
          year: '1995',
          description: `**JavaScript** is created by Brendan Eich in 10 days; Netscape 2 ships with it. Originally Mocha → LiveScript → JavaScript.

Coincidentally, Java was called Oak until 1995.`,
        },
        {
          id: '59185a35-9434-4029-9555-5e9780e4e3a6',
          imgURL: 'https://assets.codepen.io/124568/erotica-on-line-1996.png',
          year: 'mid 90s',
          description:
            'The adult industry widely adopts online credit card payments, helping normalize e-commerce.',
        },
        {
          id: 'afa26c04-563a-4ce8-80fe-3c9edf99355b',
          imgURL: 'https://assets.codepen.io/124568/Codigo_php.jpeg',
          year: '1995',
          description: `Rasmus Lerdorf created "Personal Home Page Tools," later renamed PHP: Hypertext Preprocessor.`,
        },
        {
          id: 'cd425103-589e-58ce-8002-e074f526c50a',
          imgURL: 'https://assets.codepen.io/124568/internet_explorer_1.0.png',
          year: '1995',
          description: `The 1.0 version of **Internet Explorer** is released.`,
        },
        {
          id: '4ccb7451-f228-46e5-9bda-0f128ba8a97e',
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
          id: 'd978a8da-e380-4e15-960d-4c6f08e48c06',
          imgURL:
            'https://assets.codepen.io/124568/55d4a47d7fa44c4043000011.format-webp.width-1440_ae6zzeKgJiUIVqme.webp',
          year: '1994',
          description: `GeoCities launches, letting anyone host personal webpages in themed "neighbourhoods."`,
        },
        {
          id: '634554e7-32ee-45a2-ae57-0974ff4b7ca8',
          imgURL: 'https://assets.codepen.io/124568/Tripod_Homepage.png',
          year: '1995',
          description:
            'Tripod starts as a student community and grows into a homepage builder.',
        },
        {
          id: '70541179-b523-4e2d-83ba-f6dab6382a55',
          imgURL: 'https://assets.codepen.io/124568/cmk7ze4haz861.webp',
          year: '1996',
          description:
            'Angelfire offers free homepage hosting, later acquired by Lycos.',
        },
        {
          id: '31e74bc0-6bd8-47be-81c7-dd8f4555001d',
          imgURL:
            'https://assets.codepen.io/124568/Screenshot%20from%202025-08-25%2012-02-12.png',
          year: '1996',
          description:
            'Xoom provides free unlimited hosting with banner ads, pioneering ad-supported hosting.',
        },
        {
          id: '238591b6-98e4-41ee-960c-6d50c1c17d56',
          imgURL:
            'https://assets.codepen.io/124568/Screenshot%20from%202025-08-25%2012-08-55.png',
          year: '1997',
          description: `FortuneCity emerges with a virtual "city" theme for personal sites.`,
        },
        {
          id: '19077f74-4c28-439f-8fa5-40cefca47e47',
          imgURL: 'https://assets.codepen.io/124568/aol03.webp',
          year: 'Late 1990s',
          description:
            '**MSN HomePages** and **AOL Hometown** bring homepage creation to mainstream internet users.',
        },
        {
          id: '20f27c88-0fd9-429d-8ab7-bbaaa1574533',
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
          id: '1d411d52-fe87-4d3b-910b-0de019429660',
          imgURL: 'https://assets.codepen.io/124568/drupal-25202-0_0.jpg',
          year: '2000s',
          description: 'Open-source CMS rise: Drupal, Joomla, Magento.',
        },
        {
          id: '9efcc6cc-d5a6-43ed-86d9-94d016273871',
          imgURL:
            'https://assets.codepen.io/124568/shopify-in-2006-1024x438.png',
          year: '2006',
          description:
            'Shopify launches, democratizing online stores for small businesses.',
        },
        {
          id: '129a3d02-5eb8-413b-90ce-317bea7ff53d',
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
          id: '6d19f584-67ad-4cfb-aad1-0f250d03002a',
          imgURL: 'https://assets.codepen.io/124568/MultiTorg_Opera.png',
          year: '1995',
          description:
            'Opera browser launches in Norway; known for speed and innovation (tabbed browsing, pop-up blocking, mouse gestures, integrated search).',
        },
        {
          id: '7f80642f-2d5f-46e0-8079-14af034e3836',
          imgURL: 'https://assets.codepen.io/124568/950636c-W3C.jpg',
          year: '1996',
          description:
            'CSS is introduced by Håkon Wium Lie, separating content from presentation.',
        },
        {
          id: '18a2fbd2-3c30-4a90-aae8-cbeecaba8807',
          imgURL:
            'https://assets.codepen.io/124568/browser-war-2011-firefox-chrome-internet-explorer.webp',
          year: '1995-1999',
          description:
            'Browser wars between Netscape and Internet Explorer; IE wins dominance by bundling with Windows.',
        },
        {
          id: 'd234a259-5d4e-4896-9f81-9f4c2952fe3c',
          imgURL: 'https://assets.codepen.io/124568/full.jpg',
          year: '1997',
          description: 'HTML 4.0 standardizes markup.',
        },
        {
          id: '95814913-6aab-4d76-991d-c736657062fd',
          imgURL:
            'https://assets.codepen.io/124568/b7c75268-3612-4f1a-90e9-dda1c248c2ca-large16x9_HardForceblog1008.jpg',
          year: '1997',
          description:
            'First online crowdfunding - Marillion, to finance a tour.',
        },
        {
          id: 'cb229bfb-3f42-4a89-b4f4-750407efc0df',
          imgURL: 'https://assets.codepen.io/124568/Bowie_Hours.jpeg',
          year: '1999',
          description:
            'First major artist to release an album digitally - David Bowie.',
        },
        {
          id: 'd5a19c4c-3c98-403e-95da-ef84ba474de6',
          imgURL:
            'https://assets.codepen.io/124568/macromedia-flash-2-0-01.png',
          year: '1999',
          description:
            'Flash gains traction for animations, video, and interactivity.',
        },
        {
          id: '96eaed86-4ccd-42e1-b299-4b9bda302ae0',
          imgURL: 'https://assets.codepen.io/124568/Napster-1024x576.jpg',
          year: '1999',
          description: 'Napster popularizes peer-to-peer music sharing.',
        },
        {
          id: '18cc65d9-86a0-443e-a3a2-1ab1b84df28f',
          imgURL: 'https://assets.codepen.io/124568/JSP-Architecture.webp',
          year: '1999',
          description: 'Sun Microsystems launched JSP.',
        },
        {
          id: '01798c61-df5f-410f-9e7d-d46fafdc7411',
          imgURL:
            'https://assets.codepen.io/124568/635901fc4314c68586e2d056_lamp-stack-software-development.jpg',
          year: 'late 90s',
          description: 'LAMP Stack rises in popularity.',
        },
        {
          id: 'fc0cfb5b-a8fd-40ae-afbe-7b8b54055ec2',
          imgURL:
            'https://assets.codepen.io/124568/ChatGPT%20Image%2025.%20aug.%202025%2C%2019_09_30.png',
          year: 'late 90s',
          description:
            'Adult sites were early adopters of embedded video players (RealPlayer, WMP, QuickTime, later Flash).',
        },
        {
          id: 'cce2f5c4-1491-4aed-b8e4-eca5180010ae',
          imgURL: 'https://assets.codepen.io/124568/2002_phoenix.png',
          year: '2002',
          description:
            'Phoenix browser (later Firefox) is released, focusing on speed, standards, and extensions.',
        },
        {
          id: '31a669b4-1dcc-4d37-8a92-15d3d24d13a9',
          imgURL: 'https://assets.codepen.io/124568/Safari-1-on-Panther.jpg',
          year: '2003',
          description:
            'Apple Safari is introduced as default for macOS, replacing Internet Explorer for Mac.',
        },
        {
          id: '096353b9-5991-495c-912c-281fca8a601b',
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
          id: '1a7bb7ef-6ed9-4f07-8c19-95c4e272075e',
          imgURL:
            'https://assets.codepen.io/124568/1_ddFsRMtjEdXQKFWPjdb9-w.webp',
          year: '2006',
          description:
            'GSAP (GreenSock) becomes a pro-grade JS animation toolkit.',
        },
        {
          id: '0dd0cd39-6b38-4133-af71-0935f9532930',
          imgURL:
            'https://assets.codepen.io/124568/1_adcnxab1qc_5kf8juxdeya.png',
          year: '2010',
          description: 'Three.js brings developer-friendly 3D on top of WebGL.',
        },
        {
          id: '430c5b8c-8544-471c-8b35-505aad327133',
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
          id: 'd4256404-f047-4d05-b313-9bd4b6632995',
          imgURL: 'https://assets.codepen.io/124568/origin.jpg',
          year: 'Pre-Web roots',
          description:
            'Text-based BBS (Bulletin Board Systems) popular in the 1980s and early 1990s via dial-up.',
        },
        {
          id: '0ebda521-0566-4860-be81-d02d30e92cc9',
          imgURL: 'https://assets.codepen.io/124568/unnamed.gif',
          year: '1994+',
          description:
            'As the web grew, forums moved online with WWWBoard and early CGI-driven scripts.',
        },
        {
          id: '2af54123-7a08-431b-a5e0-0095fafb5745',
          imgURL:
            'https://assets.codepen.io/124568/edu_phpbb_overview_reply_posted.webp',
          year: 'Late 1990s',
          description:
            'UBB.classic, vBulletin, phpBB (2000), and SMF (2003) standardize features like threads, avatars, moderation, themes.',
        },
        {
          id: '15ff3c20-a84b-4269-a133-b760f801e933',
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
          id: '1f2df03e-74ea-47a7-a5ca-f52c2791646e',
          imgURL: 'https://assets.codepen.io/124568/archie-search.jpeg',
          year: '1990',
          description:
            'Archie becomes the first search engine, indexing FTP sites.',
        },
        {
          id: 'ba57592f-b487-409e-b0e8-45b77daf6466',
          imgURL: 'https://assets.codepen.io/124568/aliweb-1995.png',
          year: '1993-1994',
          description:
            'Early web search tools: ALIWEB, WebCrawler, Lycos, Infoseek, Excite.',
        },
        {
          id: '02c5a8bc-9722-4797-a8ef-09b8005f29b3',
          imgURL: 'https://assets.codepen.io/124568/yahoo-1995.0.webp',
          year: '1994',
          description: 'Yahoo! Directory launches, initially human-curated.',
        },
        {
          id: '4062962f-1dd9-44ce-9bae-da70a698141b',
          imgURL:
            'https://assets.codepen.io/124568/ask-jeeves-question-search.webp',
          year: '1996',
          description: 'Ask Jeeves introduces natural language queries.',
        },
        {
          id: '29ef917b-9e81-43ba-a44e-f4d85e2547fb',
          imgURL:
            'https://assets.codepen.io/124568/473076890_1310684716937682_3008112235248314087_n.jpg',
          year: '1997',
          description:
            'AltaVista and HotBot push full-text search; niche engines like Astalavista.box.sk index cracks/warez.',
        },
        {
          id: '2f35eb78-6d5b-4657-a54b-86e41496b7f9',
          imgURL: 'https://assets.codepen.io/124568/google-1998.png',
          year: '1998',
          description:
            'Google launches with PageRank, revolutionizing relevance.',
        },
        {
          id: '932b76a6-9d8d-4575-9354-c61157f75f8a',
          imgURL:
            'https://assets.codepen.io/124568/evolution-of-seo-2000-2005.png',
          year: '2000s',
          description:
            'SEO emerges: tweaking HTML, metadata, content structure for rankings.',
        },
        {
          id: 'b8a28ca6-6603-5b81-92ee-863df64301c6',
          imgURL:
            'https://assets.codepen.io/124568/google-ads-2001-different-colours-480x417.webp',
          year: '2000',
          description:
            '**Google AdWords** launches, introducing keyword-based advertising',
        },
        {
          id: '96f06b96-27ea-4b7c-b130-321281ca182e',
          imgURL:
            'https://assets.codepen.io/124568/Visible%20keyword%20stuffing%20example.webp',
          year: '2000s',
          description:
            'Black-hat practices like keyword stuffing and link farms rise (later penalized).',
        },
        {
          id: 'ed5f429e-c0ce-55c5-aae2-94205d2cd200',
          imgURL: 'https://assets.codepen.io/124568/0_jnk0_FJWQf_7Z4j4.webp',
          year: '2000s',
          description:
            'Monetization drives frontend changes: **popup wars**, intrusive banners, auto-playing media, and SEO spam (content farms).',
        },
        {
          id: '61174fc6-0b8a-553c-b6cf-4c4d9bdb40c6',
          imgURL: 'https://assets.codepen.io/124568/google-2003-06.png',
          year: '2003',
          description:
            '**Google AdSense** follows, letting site owners embed contextual ads, monetizing content at scale.',
        },
        {
          id: '616c4225-19e9-46a6-b355-aec13857d545',
          imgURL: 'https://assets.codepen.io/124568/Bing-001.avif',
          year: '2009',
          description: 'Bing launches, giving Microsoft a foothold in search.',
        },
        {
          id: '2856713a-b7c1-4012-a7d8-56b338287017',
          imgURL:
            'https://assets.codepen.io/124568/core-web-vitals-are-part-of-the-google-ranking-factors.webp',
          year: '2010s',
          description:
            'Mobile-first indexing, Schema.org, and Core Web Vitals elevate performance/accessibility.',
        },
        {
          id: 'ec857e48-0e63-5511-97fa-7fffdd963cd2',
          imgURL:
            'https://assets.codepen.io/124568/67215ad5ddfdc0094989b9cf_666c62bde1b1f213f0124f97_modal_cookie_banner_example.png',
          year: '2010s',
          description:
            'The ad ecosystem pushes responsive design (adaptive ad units) and regulations like **GDPR/CCPA** introduce cookie consent banners.  ',
        },
        {
          id: '69b3cd58-ddab-4aee-a456-e9d4be425b9d',
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
          id: '6068e161-5244-5ee7-8c6a-d43a88a462fc',
          imgURL: 'https://assets.codepen.io/124568/8011774.png',
          year: '1994',
          description: `**Cookies** are introduced by Netscape, enabling session state, shopping carts, and later ad tracking.  `,
        },
        {
          id: '11579417-724b-5a80-8e1d-5564882e5bf0',
          imgURL:
            'https://assets.codepen.io/124568/targeted-ads-ideas-inline03.webp',
          year: '2000s',
          description: `Third-party cookies fuel the rise of targeted ads, analytics, and retargeting, shaping how frontends load external scripts.  `,
        },
        {
          id: 'abe5fd1d-d61c-586c-8a84-763e816f0949',
          imgURL:
            'https://assets.codepen.io/124568/privacy-policy-dnt-do-not-track-update.jpg',
          year: '2009',
          description: `**Do Not Track (DNT)** is proposed as a browser feature, though adoption is limited.  `,
        },
        {
          id: '447bdd74-2566-5133-882b-35886fa915c9',
          imgURL: 'https://assets.codepen.io/124568/image-641-1.png',
          year: '2010s',
          description: `Growing privacy concerns lead to stricter regulations and browser features:
- **GDPR (2018)** in the EU requires explicit user consent for data collection.
- **CCPA (2020)** brings similar rules to California.
- **Safari's Intelligent Tracking Prevention (2017)** and **Firefox Enhanced Tracking Protection (2019)** block third-party cookies by default.`,
        },
        {
          id: 'cd6b0ffa-83f2-5f04-b808-3a5e131d0bb8',
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
          id: '0678fe17-b6fc-42b8-949f-d59b17696990',
          imgURL:
            'https://assets.codepen.io/124568/ChatGPT%20Image%2026.%20aug.%202025%2C%2009_29_03.png',
          year: '2000s',
          description:
            'Adult industry helped popularize Flash video (FLV); early Adaptive Streaming and DRM experimentation.',
        },
        {
          id: 'e82f3fa0-bbcb-4706-9193-e4b1d08808bd',
          imgURL:
            'https://assets.codepen.io/124568/How-to-Download-a-File-Using-the-Gnutella-Network.jpg',
          year: '2000-2001',
          description: 'P2P platforms arise: Gnutella, Kazaa, BitTorrent.',
        },
        {
          id: '2bc4f72a-f840-4b26-aba5-e9189dddc7eb',
          imgURL: 'https://assets.codepen.io/124568/IE-6.0.png',
          year: '2001',
          description:
            'Internet Explorer 6 launches, notorious for lack of standards support.',
        },
        {
          id: 'afcdd73d-36ff-433d-904b-194b9f6615e2',
          imgURL: 'https://assets.codepen.io/124568/a3190458732_16.jpg',
          year: '2001',
          description: `Gatas Parlaments releases the first free online release in Norway or in general: "Holdning over underholdning".`,
        },
        {
          id: 'efdddb32-fa9f-4162-a12a-ccd077307948',
          imgURL: 'https://assets.codepen.io/124568/03e4wjne18se1.png',
          year: '2004',
          description: 'Gmail shows power of AJAX for dynamic apps.',
        },
        {
          id: '07cefb9a-bfe4-439c-8b73-4421c36be862',
          imgURL:
            'https://assets.codepen.io/124568/scriptaculos_service_provider_india.jpg',
          year: '2006-2008',
          description:
            'Early JS libraries/frameworks emerge: Prototype.js, script.aculo.us, jQuery (2006), Blueprint CSS.',
        },
        {
          id: '52ac4e0d-d115-4732-a5bc-70404311055b',
          imgURL: 'https://assets.codepen.io/124568/youtube-2005.png',
          year: '2005',
          description: 'YouTube launches, bringing video mainstream.',
        },
        {
          id: '8b0cc980-49e3-4b02-a678-475e6496f00f',
          imgURL: 'https://assets.codepen.io/124568/131060.jpeg',
          year: '2007',
          description:
            "Landed my first full-time developer job as Technical Developer at Norway's largest digital media house.",
        },
        {
          id: 'ed0307f1-28ef-4c38-b543-85835a0c23d2',
          imgURL: 'https://assets.codepen.io/124568/google-chrome-2008.png',
          year: '2008',
          description:
            'Google Chrome launches with the fast V8 JavaScript engine.',
        },
        {
          id: 'ac635093-9846-41f7-9fbf-f695f334c1a7',
          imgURL: 'https://assets.codepen.io/124568/marillion1985.webp',
          year: '2008',
          description:
            'Marillion, first band in the world to legally release their album on peer-to-peer (P2P) networks.',
        },
        {
          id: '55deb54c-59b7-4428-9613-6715aa5247ff',
          imgURL: 'https://assets.codepen.io/124568/web-workers.jpg',
          year: '2009',
          description: 'Web Workers introduced for background threads.',
        },
        {
          id: 'c44f170e-e337-4efe-97cb-2a3e9a2a7934',
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
          id: '886394c3-c15b-4dcf-80b4-9caea39b676b',
          imgURL: 'https://assets.codepen.io/124568/sta-je-silverlight.jpg',
          year: '2007',
          description:
            'Silverlight (Microsoft) and Adobe Flex attempt rich, enterprise web apps beyond Flash.',
        },
        {
          id: 'cd621e44-f1b6-4c25-8412-54edaf985728',
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
          id: '26ffb3a7-4007-41ee-b180-c99adfcd0325',
          imgURL: 'https://assets.codepen.io/124568/Web_2.0_Map.svg.png',
          year: '1999-2004',
          description: `"Web 2.0" describes the shift to interactive, user-driven platforms (AJAX, UGC, blogs, wikis, tagging/sharing).`,
        },
        {
          id: 'b11ec2ef-6417-4bf3-8fb8-e3e3e422a5c7',
          imgURL:
            'https://assets.codepen.io/124568/blogginghistoryblogger1999-2.png',
          year: '1999',
          description: 'Blogger launches; LiveJournal gains traction.',
        },
        {
          id: '9f12657d-0ddf-4116-b346-6a358bc65987',
          imgURL: 'https://assets.codepen.io/124568/wordpress-2003.png',
          year: '2003',
          description:
            'WordPress is released, becoming the most popular open-source blogging/CMS platform.',
        },
        {
          id: 'ea2abb58-e491-4fc1-9951-5ab6dbc4a543',
          imgURL: 'https://assets.codepen.io/124568/2010-01-08__tech05.avif',
          year: '2004+',
          description:
            'Flickr, Facebook, YouTube, Wikipedia, and Gmail become Web 2.0 archetypes.',
        },
        {
          id: '7eade616-9b4b-4069-b0a9-f8388f497adc',
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
          id: '429a8b56-87f2-45dd-bd61-f18d290bff38',
          imgURL:
            'https://assets.codepen.io/124568/230718105811-steve-jobs-iphone-2007.jpg',
          year: '2007',
          description:
            'Apple releases the iPhone with a full browser (Safari) and multitouch.',
        },
        {
          id: '508f83e4-1545-4861-96d8-deb34738d0f4',
          imgURL:
            'https://assets.codepen.io/124568/Screen-Shot-2018-21-9-at-14-50-53.jpeg',
          year: '2008',
          description: 'Google Android launches, accelerating adoption.',
        },
        {
          id: '86883310-de14-441f-a30b-3657b7054832',
          imgURL: 'https://assets.codepen.io/124568/hero.png',
          year: '2007-2009',
          description:
            'Mobile browsers rapidly evolve with modern rendering and full CSS/JS support.',
        },
        {
          id: 'b60f67f5-19a0-492c-9e1d-69ae7f765ac0',
          imgURL: 'https://assets.codepen.io/124568/screenshot_3-4.webp',
          year: '2008',
          description:
            'App Store and Google Play shift expectations to app-like experiences.',
        },
        {
          id: 'c80cb58d-4e69-455b-9eba-e09ecac3edff',
          imgURL: 'https://assets.codepen.io/124568/f3zAwfHwJHfTPD8GWxbWTe.jpg',
          year: '2010',
          description: 'Ethan Marcotte coins Responsive Web Design (RWD).',
        },
        {
          id: 'ca4f0dc9-89b0-4a8c-a39d-9a067d738d59',
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
          id: 'd7938212-754b-4ffc-bae9-3b0bb691bd70',
          imgURL:
            'https://assets.codepen.io/124568/mobile-internet-before-smartphones.png',
          year: '2005',
          description:
            'Opera Mini brings compressed web browsing to feature phones.',
        },
        {
          id: 'c10da341-e3b3-4d08-99ed-5b83b9b77066',
          imgURL:
            'https://assets.codepen.io/124568/230718105811-steve-jobs-iphone-2007.jpg',
          year: '2007',
          description:
            'iPhone redefines mobile web with a full browser and multitouch UX.',
        },
        {
          id: 'b708dd1b-e41e-466f-acec-ea84401657df',
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
          id: '4b82cfc4-497e-4b20-a3a8-d54976fe9374',
          imgURL: 'https://assets.codepen.io/124568/8-2.webp',
          year: '2010',
          description: 'AngularJS popularizes declarative, data-driven UIs.',
        },
        {
          id: 'd981fe3b-6632-4a3b-9d63-8ee0dfd08c8d',
          imgURL: 'https://assets.codepen.io/124568/Group-2-6.jpg',
          year: '2010',
          description: 'Backbone.js introduces MVC patterns in the browser.',
        },
        {
          id: 'kojs-2010-7c2c-4b71-9a1a-5b1b4d4b9c01',
          imgURL: 'https://assets.codepen.io/124568/index.png',
          year: '2010',
          description:
            'Knockout.js introduces MVVM-style two-way data binding and observables in the browser, influencing later framework ergonomics.',
        },
        {
          id: '7daabf91-79f7-46f6-b930-fd23c39d2065',
          imgURL:
            'https://assets.codepen.io/124568/web-design-services-page-1024x663.png',
          year: '2011',
          description:
            'Bootstrap brings responsive design with ready-made CSS components.',
        },
        {
          id: 'f47142f6-c171-4165-8e72-417e8d9805ec',
          imgURL:
            'https://assets.codepen.io/124568/Chat_GPT_Image_Apr_8_2025_03_28_09_PM_min_a50f18164c_1.png',
          year: '2011',
          description:
            'WebRTC standardizes real-time audio, video, and data channels.',
        },
        {
          id: '75414bce-a74d-4b1f-9fbd-000ecfd534d6',
          imgURL: 'https://assets.codepen.io/124568/demo.gif',
          year: '2011',
          description:
            'WebGL enables hardware-accelerated 2D/3D graphics without plugins.',
        },
        {
          id: 'fa19720a-ca5c-543a-909f-e209e3d321cd',
          imgURL:
            'https://assets.codepen.io/124568/visual-webcomponents.Bb3mLcAr_1cCvCu.jpg',
          year: '2011',
          description:
            'Web Components offer a framework-agnostic component model, underpinning many design systems and cross-framework integrations.',
        },
        {
          id: 'f950c7f0-955d-4445-924e-c7109ebf3f16',
          imgURL:
            'https://assets.codepen.io/124568/1625489461-3a9b7f23e483fe9f.png',
          year: '2012',
          description:
            'Started at Bekk Consulting as Senior Interface Programmer Consultant.',
        },
        {
          id: '7dd89b00-bd08-4176-9694-6b402461a6be',
          imgURL:
            'https://assets.codepen.io/124568/E8hbTWC6sl7zEtSlnxa01Z57HAjeRLwH2Vilg5xnEks.webp',
          year: '2013',
          description:
            'React introduces component-based UI with a virtual DOM.',
        },
        {
          id: '626d1291-fb08-4d7b-849b-290eb943f93c',
          imgURL:
            'https://assets.codepen.io/124568/how-pwas-work-riseuplabs.webp',
          year: '2014',
          description:
            'Service Workers enable offline caching, background sync, push (PWA foundations).',
        },
        {
          id: '73a4eb5b-d467-4e88-b40d-aef97c589f9c',
          imgURL:
            'https://assets.codepen.io/124568/5001.TypeScript_In_Eclipse.png',
          year: '2014',
          description:
            'TypeScript grows as a typed superset enabling safer large-scale apps.',
        },
        {
          id: '7766386b-1540-4552-9bc6-29a858169d3c',
          imgURL: 'https://assets.codepen.io/124568/svelte-1024x576.webp',
          year: '2014-2016',
          description: 'Vue.js and Svelte appear as lighter alternatives.',
        },
        {
          id: '24974627-4bbd-4435-b749-54dcc77d40c6',
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
          id: '59da9e01-844f-4752-bf64-90e4f6ba7dd1',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_i_672dxlgdw3hco9uzoo1l.webp',
          year: '2010-2012',
          description:
            'Grunt popularizes JavaScript task automation (minify, concat, watch).',
        },
        {
          id: 'b01056b4-a9d6-4315-8d10-bd2b43164e02',
          imgURL: 'https://assets.codepen.io/124568/1588441991947.png',
          year: '2013',
          description:
            'Gulp introduces a faster, streaming-based build pipeline.',
        },
        {
          id: '23afb27b-5f23-49eb-aa76-0598e822bec8',
          imgURL: 'https://assets.codepen.io/124568/bower-logo.png',
          year: '2013',
          description:
            'Bower becomes the first mainstream frontend package manager (pre-npm dominance).',
        },
        {
          id: 'f21d7010-875e-46fd-a5ea-553a7a5b191e',
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
          id: 'b182367f-6380-4767-b666-74cacc2637f6',
          imgURL: 'https://assets.codepen.io/124568/ide-platformio-emacs.png',
          year: '1990s',
          description:
            'Plain text editors like Notepad, vi, Emacs, BBEdit used for early coding.',
        },
        {
          id: 'cc0a9716-ba8c-42f1-9716-89e5ef5f7baa',
          imgURL:
            'https://assets.codepen.io/124568/macromedia-dreamweaver-1-2-01.png',
          year: '1997',
          description:
            'WYSIWYG tools like Microsoft FrontPage and Macromedia Dreamweaver enabled drag-and-drop site creation.',
        },
        {
          id: '3aca68d2-3b14-4bf7-b1a4-4d8725f2b0d9',
          imgURL: 'https://assets.codepen.io/124568/sublime_text_4.png',
          year: '2000s',
          description:
            'TextMate and Sublime Text gain popularity for speed and plugins.',
        },
        {
          id: '6ad47a91-e94b-4a64-aefe-9981be1ea0b8',
          imgURL: 'Firebug',
          year: '2006',
          description:
            'Firebug launches, introducing live DOM/CSS/JS debugging in the browser.',
        },
        {
          id: '0ae96dce-0f46-443d-8e1e-7402f56cc5b6',
          imgURL: 'https://assets.codepen.io/124568/zVyna.png',
          year: '2010',
          description:
            'Chrome DevTools becomes a game-changer with profiling, network inspection, responsive testing.',
        },
        {
          id: 'be91a1b4-2efd-48a5-810d-83855aea65b3',
          imgURL: 'https://assets.codepen.io/124568/jsfiiddle-5.png',
          year: '2010',
          description:
            'JSFiddle launches as an online playground for HTML/CSS/JS.',
        },
        {
          id: '7ec36ff3-147f-49a4-8995-c5c46f440609',
          imgURL:
            'https://assets.codepen.io/124568/webide-Screen-Shot-2011-09-27-at-22.09.02-.png',
          year: '2011',
          description:
            'WebStorm offers a professional IDE experience tailored to JavaScript/frontend.',
        },
        {
          id: '07ef0855-c0f4-42ad-af1c-9348a790fe5c',
          imgURL: 'https://assets.codepen.io/124568/codepen-2012.png',
          year: '2012',
          description:
            'CodePen adds a social layer for sharing and exploring UI concepts.',
        },
        {
          id: '905f26df-6373-45b2-903c-da628272f368',
          imgURL: 'https://assets.codepen.io/124568/BhZafL0CAAAJ1Hr.jpg',
          year: '2014',
          description: `Atom (GitHub) markets itself as a "hackable" editor; influences modern extensibility.`,
        },
        {
          id: '9517a633-905b-4461-9c96-449f34ce4292',
          imgURL: 'https://assets.codepen.io/124568/visual_studio_code_2.webp',
          year: '2015',
          description:
            'VS Code releases; becomes the most widely used editor for frontend devs.',
        },

        {
          id: 'cb8be27e-c230-4f5b-801a-c1169a1bc707',
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
          id: '4fdadf51-3893-5d67-bae5-10f0324a3586',
          imgURL: 'https://assets.codepen.io/124568/sccs.fig714.epsi.gif',
          year: '1972',
          description:
            'Source Code Control System (SCCS). Closed source, free with UNIX',
        },
        {
          id: '2ddb349f-8094-5b4f-9104-aafe8f9ed703',
          imgURL: 'https://assets.codepen.io/124568/rcsbrowser.png',
          year: '1982',
          description: 'Revision Control System (RCS), open source.',
        },
        {
          id: '8aca456c-0552-45f2-8c23-42b0f2ab2af0',
          imgURL: 'https://assets.codepen.io/124568/Single%20Developer.GIF',
          year: '1986',
          description:
            'CVS emerges as an early widely adopted version control system.',
        },
        {
          id: 'cd4232db-ff35-483d-997f-eca5072b8cab',
          imgURL: 'https://assets.codepen.io/124568/SVNClientBig.png',
          year: '2000',
          description: 'Subversion (SVN) released as a replacement for CVS.',
        },
        {
          id: '8ba2dc49-465a-45a7-81b3-8cb679b40c53',
          imgURL: 'https://assets.codepen.io/124568/1719764642190.jpeg',
          year: '2005',
          description:
            'Git created by Linus Torvalds, introducing distributed version control.',
        },
        {
          id: 'eee41eff-5f89-437c-9c05-09be8e4e68d1',
          imgURL: 'https://assets.codepen.io/124568/multi-line-commit.png',
          year: '2005',
          description:
            'Mercurial (Hg) released as a simpler alternative, used by Mozilla/Python before migrations to Git.',
        },
        {
          id: 'd8ea3042-d6b6-41f5-8c79-76243b7aafe4',
          imgURL: 'https://assets.codepen.io/124568/github-2012.jpg',
          year: '2008',
          description:
            'GitHub launches with social features (PRs, issues, stars).',
        },
        {
          id: 'e32a332e-39cb-4880-984a-e74fccc89528',
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
          id: '20215f05-5fda-4c29-9722-89737d8554c3',
          imgURL: 'https://assets.codepen.io/124568/qu001.png',
          year: '2000s',
          description:
            'QUnit (jQuery team) introduces unit testing for browser JS.',
        },
        {
          id: '39994481-0c8f-4697-a793-ee15a7cc1dce',
          imgURL: 'https://assets.codepen.io/124568/jasmine.json_.webp',
          year: '2010s',
          description: 'Jasmine and Mocha popularize BDD/TDD patterns.',
        },
        {
          id: '6655e850-385e-47df-9834-a46192b651a5',
          imgURL: 'https://assets.codepen.io/124568/jest-watch-mode.png',
          year: '2014',
          description:
            'Jest becomes the de-facto test runner for React and beyond.',
        },
        {
          id: '3d65d3a0-a49e-4776-98ca-e7d6099a1157',
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
          id: '819f7b20-1df8-45c7-a240-d861e3806666',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_qakqanq79z8exo4pu63y.webp',
          year: '1999',
          description: 'ECMAScript 3 formalizes core JavaScript features.',
        },
        {
          id: 'f35c5bb5-4c09-4281-960f-db905e78b49b',
          imgURL:
            'https://assets.codepen.io/124568/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_qakqanq79z8exo4pu63y.webp',
          year: '2009',
          description: 'ES5 adds JSON, strict mode, getters/setters.',
        },
        {
          id: '71fa7332-f348-4e3b-813a-c30aa70bbe6f',
          imgURL:
            'https://assets.codepen.io/124568/681da37499d136038dba27d1_image_20%286%29.png',
          year: '2015',
          description:
            'ES6 (ES2015) introduces classes, modules, arrow functions, promises, let/const.',
        },
        {
          id: '6f2ad235-e285-435e-880b-2cb49df69a55',
          imgURL: 'https://assets.codepen.io/124568/proposal-async-await.png',
          year: '2015+',
          description:
            'Annual updates add async/await, import/export, optional chaining, Intl, etc.',
        },
        {
          id: 'ddf7e0bf-c6f4-405c-abba-91a03e3c8a74',
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
          id: '7a93eef1-463c-47e9-9451-0ccf2b34cdda',
          imgURL: 'https://assets.codepen.io/124568/table-1.webp',
          year: '1990s',
          description:
            'Table-based layouts and spacer GIFs used before CSS matured.',
        },
        {
          id: 'd67ecdce-57e4-4510-be69-38dba27e4dbb',
          imgURL:
            'https://assets.codepen.io/124568/creative-css3-tutorials.jpg',
          year: '2007',
          description:
            'CSS3 adds animations, rounded corners, gradients, shadows.',
        },
        {
          id: 'dc0b1e8a-5e69-4d2a-98d4-b11c8bb03bf8',
          imgURL: 'https://assets.codepen.io/124568/f3zAwfHwJHfTPD8GWxbWTe.jpg',
          year: '2010',
          description: 'Responsive Web Design (RWD) coined by Ethan Marcotte.',
        },
        {
          id: '2426232f-9a48-4e8a-ab0e-49dbd528e94e',
          imgURL: 'https://assets.codepen.io/124568/metro7.jpg',
          year: '2011-2013',
          description:
            'Flat design (Metro, iOS7) shifts aesthetics toward minimalism and clarity.',
        },
        {
          id: 'c7c21109-cd0a-420e-b9ce-efb91ae404cd',
          imgURL:
            'https://assets.codepen.io/124568/libraries-material-design-ui-and-prototype.png',
          year: '2014-2016',
          description:
            'Design Systems emerge: Material, Lightning, Carbon with reusable tokens and components.',
        },
        {
          id: '8c4f8a00-c59e-4eb6-926f-0cbdcfea9688',
          imgURL: 'https://assets.codepen.io/124568/Sketch-Pages-1.jpeg',
          year: '2017+',
          description:
            'Sketch, Figma, Adobe XD integrate design and development workflows.',
        },
      ],
    },
    {
      title: 'DevOps & Scaling Frontends',
      description:
        'DevOps, CI/CD, cloud, and bundlers brought operational discipline and performance focus,\nblurring lines between frontend and backend while enabling globally distributed architectures.',
      timeline: [
        {
          id: 'b7d350c7-88ff-495e-b5f8-a1b9a53eb369',
          imgURL: 'https://assets.codepen.io/124568/7602.1513404277.png',
          year: '2010s',
          description:
            'Rise of DevOps and CI/CD (Jenkins, Travis CI, GitHub Actions).',
        },
        {
          id: '1b5f580e-38a3-4c4e-87cc-0bdce8c19a1b',
          imgURL:
            'https://assets.codepen.io/124568/copy-of-copy-of-blog-covers-2021-11-11t105359.633.avif',
          year: '2014+',
          description:
            'Cloud platforms and Netlify/Vercel simplify frontend deployment.',
        },
        {
          id: '302a81c3-3e4d-4854-9ed9-cdc4b116203a',
          imgURL:
            'https://assets.codepen.io/124568/1_5PpB0JEPdB30wER8_XWuIQ.jpg',
          year: '2015+',
          description: 'Bundlers/compilers: Webpack, Babel, Parcel, Rollup.',
        },
        {
          id: '88e50708-00c6-48c5-98e8-89eacceca4dd',
          imgURL: 'https://assets.codepen.io/124568/wasm-universal-binary.png',
          year: '2017',
          description:
            'WebAssembly (Wasm) released for near-native performance in the browser.',
        },
        {
          id: '802aab37-9816-4a1f-840a-d660605c4888',
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
          id: 'e47c4e56-63b4-4c6b-8a8a-e403ac1d49ab',
          imgURL: '',
          year: '1998',
          description:
            'Section 508 amended, requiring accessibility for U.S. federal agencies.',
        },
        {
          id: 'da0c5a75-4aad-4a09-b9b5-22ee85b5c965',
          imgURL: '',
          year: '1999',
          description:
            'WCAG 1.0 published as the first international web accessibility standard.',
        },
        {
          id: '6997ed83-fc42-40c9-93a5-490132d58378',
          imgURL: '',
          year: '2008',
          description:
            'WAI-ARIA specs begin, improving accessibility semantics.',
        },
        {
          id: 'fc8ac85a-91e3-4e03-bd5b-82f0f5da3b63',
          imgURL: '',
          year: '2010s',
          description:
            'Accessibility becomes core in frameworks/design systems with ARIA and contrast tooling.',
        },
        {
          id: '9881fb46-52c8-4f80-9164-5805c2b79ea0',
          imgURL: '',
          year: '2007-2010s',
          description:
            'YSlow and PageSpeed Insights introduce performance best practices.',
        },
        {
          id: '9915afbb-465d-48a2-993b-aff7ba0c175d',
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
          id: 'b56a3d1b-0df1-4e68-bde6-48ec70df4a20',
          imgURL: '',
          year: '2000s',
          description: 'REST APIs replace SOAP/XML-heavy approaches.',
        },
        {
          id: '2e5909d3-c749-453d-92ce-b3dce7ed39ad',
          imgURL: '',
          year: '2010s',
          description: 'JSON becomes the lightweight data format of choice.',
        },
        {
          id: 'c3e79699-f4ac-4319-a7e9-803071c056ac',
          imgURL: '',
          year: '2015',
          description: 'GraphQL released, offering flexible queries.',
        },
        {
          id: '7375f918-20fe-4ff4-8d4b-bb3274053fd2',
          imgURL: '',
          year: '2020s',
          description:
            'Frontends consume microservices and edge APIs for real-time, global apps.',
        },
      ],
    },
    {
      title: 'Realtime Frontend (2000s-Today)',
      description:
        'Realtime APIs shifted frontends from request/response to live, stateful experiences across chat, collaboration, trading, and multiplayer.',
      timeline: [
        {
          id: '063d17fb-0492-4d9b-ae24-c95b928fabb8',
          imgURL: '',
          year: '2011',
          description:
            'WebSockets standardize persistent, bidirectional communication.',
        },
        {
          id: 'f43b3d1e-3186-4d06-aee2-82f33f847247',
          imgURL: '',
          year: '2011',
          description:
            'WebRTC enables real-time audio, video, and P2P data channels.',
        },
        {
          id: '485cb14b-827b-46c2-9b7f-0149e62dbd0a',
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
          id: '23984138-91ad-491d-8638-9747f3c9b80a',
          imgURL: '',
          year: '2011',
          description:
            'PhoneGap / Apache Cordova enable web apps inside native wrappers on iOS/Android.',
        },
        {
          id: 'c18941db-1819-41c2-ad85-15b3a463287a',
          imgURL: '',
          year: '2013',
          description:
            'Electron allows packaging web apps as cross-platform desktop applications.',
        },
        {
          id: '6f522487-4d42-4752-a211-9c937e3b95c0',
          imgURL: '',
          year: '2015',
          description:
            "React Native brings React's component model to mobile with native APIs.",
        },
        {
          id: '8c3f7aea-3345-4144-9d3a-30705c8472de',
          imgURL: '',
          year: '2016-2019',
          description:
            'Progressive Web Apps (PWAs) emerge with installability and offline support.',
        },
        {
          id: '4b7d8b49-0e45-4a1c-839b-9e353a4998f5',
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
          id: '368bbf85-4eec-4f27-a9bc-6b2aebe3ad65',
          imgURL: '',
          year: '1990s',
          description: `"Webmasters" and "web designers" handled content, HTML, and servers all at once.`,
        },
        {
          id: 'cedda2be-b348-4b53-8910-d366cf381dec',
          imgURL: '',
          year: '2000s',
          description: `"Frontend developer" emerges as a distinct role as JS/CSS grow in complexity.`,
        },
        {
          id: '7226b882-d077-455a-9185-b66781b724cb',
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
          id: 'ee7a8abf-ed44-4652-a954-7c87e63d6fc3',
          imgURL: '',
          year: '2015+',
          description:
            'Richer native Web APIs (Fetch, Streams, Intl, Web Crypto, Temporal) reduce third-party dependencies.',
        },
        {
          id: '6303741e-6fee-478e-9592-6cf6b0c9b0ef',
          imgURL: '',
          year: 'Today',
          description:
            'React dominates but Vue, Angular, Svelte, and SolidJS are vibrant.',
        },
        {
          id: 'a4560255-c8a5-4985-b848-0030a9d91d19',
          imgURL: '',
          year: 'Today',
          description: 'TypeScript adoption explodes; industry standard.',
        },
        {
          id: '9055d175-973d-44dc-9725-4f4df89488aa',
          imgURL: '',
          year: 'Today',
          description:
            'Elm remains a niche but influential typed functional language for frontends.',
        },
        {
          id: '9d02aa11-9247-41c6-be86-56115b820a7b',
          imgURL: '',
          year: 'Today',
          description:
            'CSS-in-JS, Tailwind, and utility-first approaches reshape styling.',
        },
        {
          id: 'b18f675c-b53d-4107-86ca-246d149b498e',
          imgURL: '',
          year: 'Today',
          description:
            'WebAssembly opens the browser to non-JS languages (Rust, Go, C++).',
        },
        {
          id: 'e99a335c-3d31-451c-8a88-a752320ea869',
          imgURL: '',
          year: 'Today',
          description:
            'AI-powered coding assistants (Copilot, ChatGPT) change how frontends are built.',
        },
        {
          id: 'a59a0400-8090-40e5-9e89-668ec69bef0d',
          imgURL: '',
          year: 'Today',
          description:
            'Frontend tied to DevOps, cloud, micro frontends, and design systems.',
        },
        {
          id: '17416cc9-ff88-52b5-ac86-cf5a6c5b8093',
          imgURL: '',
          year: 'Today',
          description: `**Privacy & Consent** - Cookie banners, consent management, and privacy-first design become unavoidable parts of frontend UX. Developers must balance
  compliance (GDPR, CCPA) with usability, while avoiding **dark patterns** increasingly scrutinized by regulators.`,
        },
        {
          id: '8492341d-0394-5871-a9f3-6fdffad861b7',
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

  chapters.forEach((chapter) => {
    const { title, description, timeline } = chapter;

    const chapterContainerElement = document.createElement('div');
    const chapterTitleElement = document.createElement('h2');
    chapterTitleElement.classList.add('ph');

    chapterContainerElement.classList.add('ph', 'container');

    chapterTitleElement.append(title);

    chapterContainerElement.append(chapterTitleElement);

    if (description && description.length) {
      const descriptionElement = document.createElement('p');
      descriptionElement.classList.add('ph');
      descriptionElement.innerHTML = markdownToHtml(description);
      chapterContainerElement.append(descriptionElement);
    }
    const timeLineListElement = document.createElement('ol');
    timeLineListElement.classList.add('ph', 'timeline');
    timeLineListElement.setAttribute('id', kebabCase(title));
    timeLineListElement.setAttribute('role', 'region');
    timeLineListElement.setAttribute('aria-roledescription', 'carousel');
    timeLineListElement.setAttribute('aria-label', title);

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
      listItemElement.setAttribute('role', 'group');
      listItemElement.setAttribute('aria-roledescription', 'slide');
      listItemElement.setAttribute(
        'aria-labelledby',
        `title-${id} description-${id}`
      );
      listItemElement.setAttribute('aria-setsize', `${timeline.length}`);
      listItemElement.setAttribute('aria-posinset', `${itemIndex}`);
      listItemElement.setAttribute('tabindex', '0');
      listItemElement.setAttribute('id', id);

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

    const timelineContainerElement = document.createElement('div');
    timelineContainerElement.classList.add('ph', 'container');
    timelineContainerElement.style.setProperty('max-width', '90vw');

    const screenReaderStatusElement = document.createElement('div');
    screenReaderStatusElement.classList.add('ph', 'sr-only');
    screenReaderStatusElement.setAttribute(
      'id',
      `timeline-${kebabCase(title)}`
    );
    screenReaderStatusElement.setAttribute('aria-live', 'polite');
    timelineContainerElement.append(screenReaderStatusElement);
    timelineContainerElement.append(timeLineListElement);

    historyElement.append(chapterContainerElement);
    historyElement.append(timelineContainerElement);
  });
};

createHistory(TIMELINE);
