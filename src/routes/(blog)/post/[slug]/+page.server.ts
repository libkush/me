import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  const { slug } = params;
  const data = (await fetch('/api/posts?all=true').then((res) => res.json())) as App.APIResponse;

  const post = data.posts.find((post) => slug === post.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  return {
    post
  };
}) satisfies PageServerLoad;
