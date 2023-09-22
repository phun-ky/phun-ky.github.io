const createHierarchy = (flatHeadings) => {
  const hierarchy = [];
  const levelStack = [];

  flatHeadings.forEach((heading) => {
    const currentLevel = heading.level - 1;

    if (!levelStack[currentLevel]) {
      levelStack[currentLevel] = hierarchy;
    }

    levelStack[currentLevel].push({ ...heading, children: [] });
    levelStack[currentLevel + 1] =
      levelStack[currentLevel][levelStack[currentLevel].length - 1].children;
  });

  return hierarchy;
};

export const collectHeadings = (node, headings = []) => {
  if (node && node.name) {
    // Match all h1, h2, h3… tags

    const matches = node.name.match(/h(\d)/);

    if (matches) {
      const level = Number(matches[1]);

      if (level <= 4) {
        const { children: nodeContent } = node;

        if (
          nodeContent &&
          nodeContent[0] &&
          typeof nodeContent[0] === 'string'
        ) {
          const title = nodeContent[0];

          headings.push({
            ...node.attributes,
            title,
            level,
          });
        }
      }
    }

    if (node.children) {
      for (const child of Array.from(node.children)) {
        collectHeadings(child, headings);
      }
    }
  }

  return createHierarchy(headings);
};
