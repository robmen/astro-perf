import type { MarkdownInstance } from "astro";

const extractSlugPartsFromPath = /(\d\d\d\d)[ -/\\](\d\d?)[ -/\\](\d\d?)[ -/\\](.+?)(.md|.mdx)/;
// const extractDateAndTitleFromId = /(\d\d\d\d)[ -/\\](\d\d?)[ -/\\](\d\d?)[ -/\\](.+)/;

export function postSlugFromPath(path: string) {
    const slugParts = path.match(extractSlugPartsFromPath);
    return slugParts ? `${slugParts[1]}/${slugParts[2]}/${slugParts[3]}/${slugParts[4]}`.replace(' ', '-').toLowerCase() : path;
}

export function postTitle(post: MarkdownInstance<Record<string, any>>) {
  if (post.frontmatter.title) return post.frontmatter.title;

  const matches = post.file.match(extractSlugPartsFromPath);
  if (!matches) throw 'failed to parse post slug ' + post.file;

  return matches[4];
}
