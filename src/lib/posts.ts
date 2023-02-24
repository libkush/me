import { browser } from '$app/environment';
import { format } from 'date-fns';
import { parse } from 'node-html-parser';

if (browser) {
  throw new Error(`posts can only be imported server-side`);
}

export async function getPosts(page: number) {
  const modules = import.meta.glob('/posts/**/*.{md,svx,svelte.md}');
  const entries = Object.entries(modules) as [string, () => Promise<App.MdsvexFile>][];
  const awaitingPosts = entries.map(async ([path, resolver]) => {
    const post = await resolver();
    const html = parse((post as any).default.render().html);
    const preview = post.metadata.preview ? parse(post.metadata.preview) : html.querySelector('p');
    return {
      slug: path
        .replace(/(\/index)?\.md/, '')
        .split('/')
        .pop(),
      isIndex: path.endsWith('/index.md'),
      // format date as yyyy-MM-dd
      date: post.metadata.date
        ? format(
            // offset by timezone so that the date is correct
            addTimezoneOffset(new Date(post.metadata.date)),
            'yyyy-MM-dd'
          )
        : undefined,
      preview: {
        html: preview?.toString(),
        // text-only preview (i.e no html elements), used for SEO
        text: preview?.structuredText ?? preview?.toString()
      },
      ...(post as App.MdsvexFile).metadata
    } as App.BlogPost;
  });
  const posts = (await Promise.all(awaitingPosts))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post, index, allPosts) => ({
      ...post,
      next: allPosts[index - 1],
      previous: allPosts[index + 1]
    }));
  const publishedPosts = posts
    .filter((post) => post.published)
    .slice((page - 1) * 10, page * 10 - 1);
  return publishedPosts;
}

function addTimezoneOffset(date: Date) {
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(new Date(date).getTime() + offsetInMilliseconds);
}
