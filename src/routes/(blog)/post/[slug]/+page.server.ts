import { getAllPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const { slug } = params;
  const posts = await getAllPosts();
  const post = posts.find((post) => slug === post.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  return {
    post
  };
}) satisfies PageServerLoad;
