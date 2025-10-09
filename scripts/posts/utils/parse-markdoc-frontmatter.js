import { load } from 'js-yaml';

export const parseMarkdocFrontmatter = (ast) => {
  return ast.attributes.frontmatter ? load(ast.attributes.frontmatter) : {};
};
