import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/posts';
import { json } from '@sveltejs/kit';

export const GET = (async ({ url }) => {
  const page = url.searchParams.get('page') || '1';
  const posts = await getPosts(parseInt(page));
  return json({ posts: posts });
}) satisfies PageServerLoad;
