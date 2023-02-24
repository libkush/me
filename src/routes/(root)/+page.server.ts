import { error } from '@sveltejs/kit';
import type * as Kit from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
  const posts = await fetch('/api/getPosts').then((res) => res.json());

  if (posts) {
    return { posts: posts };
  }

  throw error(404, 'Not found');
}) satisfies Kit.ServerLoad<{}>;
