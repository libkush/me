import { error } from '@sveltejs/kit';
import type * as Kit from '@sveltejs/kit';

export const load = (async ({ params, fetch }) => {
  const data = (await fetch('/api/posts?all=true').then((res) => res.json())) as App.APIResponse;

  if (data.posts) {
    return data;
  }

  throw error(404, 'Not found');
}) satisfies Kit.ServerLoad<{}>;
