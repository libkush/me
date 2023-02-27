import { getPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type * as Kit from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const posts = await getPosts(1);

  if (posts) {
    return { posts: posts };
  }

  throw error(404, 'Not found');
}) satisfies Kit.ServerLoad<{}>;
