import { error } from '@sveltejs/kit';
import type * as Kit from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const load = (async ({}) => {
  const posts = await getPosts();
  if (posts) {
    return { posts };
  }

  throw error(404, 'Not found');
}) satisfies Kit.ServerLoad<{}>;
