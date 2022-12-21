const extractDateAndFilename = /(\d\d\d\d)[ -/\\](\d\d?)[ -/\\](\d\d?)[ -/\\](.+?)(.md|.mdx)/;

export function fileFrontmatterRemarkPlugin() {
  return function (tree, file) {
    const matches = file.history[0].match(extractDateAndFilename);
    if (matches) {
      file.data.astro.frontmatter.publishedDate = `${matches[1]}/${matches[2]}/${matches[3]}`;
      file.data.astro.frontmatter.title = matches[4];
    }
  }
}
