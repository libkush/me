import type * as Kit from '@sveltejs/kit';

export type Data = {
  post: App.BlogPostWithNextAndPrevious;
};

export type PageLoad = Kit.Load<{ post: App.BlogPostWithNextAndPrevious }>;

export type PageServerLoad = Kit.ServerLoad<{
  slug: string;
}>;
