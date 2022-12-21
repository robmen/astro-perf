import type { CollectionEntry } from "astro:content";

const extractSlugPartsFromPath = /(\d\d\d\d)[ -/\\](\d\d?)[ -/\\](\d\d?)[ -/\\](.+?)(.md|.mdx)/;
// const extractDateAndTitleFromId = /(\d\d\d\d)[ -/\\](\d\d?)[ -/\\](\d\d?)[ -/\\](.+)/;

export function postSlugFromPath(path: string) {
    const slugParts = path.match(extractSlugPartsFromPath);
    return slugParts ? `${slugParts[1]}/${slugParts[2]}/${slugParts[3]}/${slugParts[4]}`.replace(' ', '-').toLowerCase() : path;
}

export function postTitle(post: CollectionEntry<'blog'>) {
  if (post.data.title) return post.data.title;

  const matches = post.id.match(extractSlugPartsFromPath);
  if (!matches) throw 'failed to parse post slug ' + post.slug;

  return matches[4];
}
