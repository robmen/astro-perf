import { defineCollection, z } from 'astro:content';
// import { postSlugFromPath } from 'src/postApi';

const extractSlugPartsFromPath = /(\d\d\d\d)[ -/\\](\d\d?)[ -/\\](\d\d?)[ -/\\](.+?)(.md|.mdx)/;

const blog = defineCollection({
  slug({ id, data }) {
    if (data.slug) return data.slug;

    const slugParts = id.match(extractSlugPartsFromPath);
    return slugParts ? `${slugParts[1]}/${slugParts[2]}/${slugParts[3]}/${slugParts[4]}`.replace(' ', '-').toLowerCase() : id;
    // return postSlugFromPath(id);
  },
  schema: {
    title: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(),
    publishedDate: z.date().optional(),
  }
});

export const collections = { blog };
