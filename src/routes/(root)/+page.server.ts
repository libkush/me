import { getPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type * as Kit from '@sveltejs/kit';

export const load = (async ({}) => {
  const posts = await getPosts();

  if (posts.length) {
    return { posts };
  }

  throw error(404, 'Not found');
}) satisfies Kit.ServerLoad<{}>;
