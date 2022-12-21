# Astro Performance Testing with Large File Counts

The purpose of this repo is to evaluate Astro's build performance to build a simple 4,000 document web site.

## Docusaurus failing

We currently use Docusaurus 2.0 to create the [WiX Toolset](https://wixtoolset.org/) web site.
The functionality provided by Docusaurus is perfect for the website. Unfortunately, Docusaurus
cannot scale to the full needs of the [WiX Toolset documentation](https://wixtoolset.org/docs/intro/).

In the end, it is expected the WiX Toolset will have upwards of 4,000 documentation pages. The current site has 2,000 files
and Docusaurus will peak at 4GB of memory usage during the build. Docusaurus will successfully complete on GitHub CI. However,
if an additional 500-600 documenation files are added, the build starts to fail with memory issues.

These [memory issues are known to Docusaurus](https://github.com/facebook/docusaurus/issues/4765) and are deep-seated.

## Investigating Astro

Thus begins an investigation into alternative technologies. [Astro](https://astro.build/) is a popular new platform that
boasts it can [scale to 10,000+ pages](https://astro.build/blog/experimental-static-build/) with its latest build optimizations.
To test Astro's claims, a "blog-like" website was created with 4,000 very minimal content documents (not more than two sentences per Markdown document).
Three different approaches were taken to evaluate Astro's performance:

1. The `pages` folder builds the content by placing the content files directly in Astro's '`pages` folder with `layout` frontmatter to render each Markdown document.
   An index of 10 documents is placed in the hompage. This example is not the desired solution since it does not allow for the content files "slug" to be calculated from the filename.
2. The `pages-import` folder builds the content by placing the content files in a `posts` folder and uses `getStaticPaths` to render the content files at the correct location.
   An index of 10 documents is placed in the homepage. This example supports the requirements of calculating the "slug" from the filename but Astro v1.7.0 provides a newer (nicer) mechanism "Content Collections".
3. The `collections` folder builds the content using Astro v1.7.0's new "Content Collections" feature in experimentation. This feature looks good and would be the preferred solution.

Note: The ~4,000 content files are not checked into this repo. To generate them, run the `_genblog.cmd` batch file found in each example folder.

## Astro Build Results

The following is a quick capture of each options build time and rough max memory usage.

```
"pages" folder:
[build] 3962 page(s) built in 54.44s
Time:    56.8479887
Max Mem: 1.4GB

"pages-import" folder:
[build] 3962 page(s) built in 78.42s
Time:    1:20.9595487
Max Mem: 1.4GB

"collections" folder:
[build] 3962 page(s) built in 154.67s
Time:    2:37.2502723
Max Mem: 2GB
```

As expected the "pages" option was fastest. Interesting, "pages" and "pages-import" maxxed out at the same memory limit
which would suggest the `Astro.glob` results are cached in memory once. This is concerning when the complexity of the documents
increases as none of our Markdown pages are two sentences like in this repo.

Unfortunately, the new "collections" option used the most memory *and* took the longest to run.


# Last Test: 10,000 Page using Content Collections

Note: attempting to build the "collections" folder with 10,000 content files fails after 25 minutes with the following error:

```
"collections" folder:
▶ src/pages/index.astro
 error   EMFILE: too many open files, open 'X:\src\astro-perf\collections\dist\chunks\2002-6-8-Test-Entry-2002x6x8.5d6ec375.mjs'
Error: EMFILE: too many open files, open 'X:\src\astro-perf\collections\dist\chunks\2002-6-8-Test-Entry-2002x6x8.5d6ec375.mjs'

Time:    25:00.1174507
Max Mem: 4GB
```

It is our hope that the tests in this repo can help optimize the "Content Collections" feature so Astro can meet it's 10,000+ page goal.
