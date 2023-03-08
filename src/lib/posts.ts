import { browser } from '$app/environment';
import { format } from 'date-fns';
import { parse } from 'node-html-parser';

if (browser) {
  throw new Error(`posts can only be imported server-side`);
}

export async function getPosts(
  page: number,
  all: boolean,
  before: string,
  after: string,
  during: string,
  tags: string[]
): Promise<App.BlogPostWithNextAndPrevious[]> {
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
      date: post.metadata.date
        ? format(addTimezoneOffset(new Date(post.metadata.date)), 'yyyy-MM-dd')
        : undefined,
      metaDate: post.metadata.date,
      preview: {
        html: preview?.toString(),
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

  const publishedPosts = posts.filter((post) => post.published);
  if (before !== '') {
    return paginate(
      publishedPosts.filter((post) => new Date(post.date).getTime() < new Date(before).getTime()),
      page
    );
  }

  if (all) {
    return publishedPosts;
  }

  if (after !== '') {
    return paginate(
      publishedPosts.filter((post) => new Date(post.date).getTime() > new Date(after).getTime()),
      page
    );
  }

  if (during !== '') {
    return paginate(
      publishedPosts.filter(
        (post) =>
          post.metaDate === during ||
          (new Date(post.date).getTime() >= new Date(during).getTime() &&
            new Date(post.date).getTime() <= new Date(during).getTime() + 1000 * 60 * 60 * 24)
      ),
      page
    );
  }

  if (tags && tags.length > 0) {
    return paginate(
      publishedPosts.filter((post) => post.tags?.some((tag) => tags.includes(tag))),
      page
    );
  }

  return paginate(publishedPosts, page);
}

function addTimezoneOffset(date: Date) {
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(new Date(date).getTime() + offsetInMilliseconds);
}

function paginate(posts: App.BlogPostWithNextAndPrevious[], page: number) {
  return posts.slice((page - 1) * 10, page * 10 - 1);
}
