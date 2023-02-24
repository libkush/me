import type * as Kit from '@sveltejs/kit';

type PageData = {
  next: App.BlogPost;
  previous: App.BlogPost;
  slug: string;
  title: string;
  preview: {
    html: string;
    text: string;
  };
  date: string;
  isIndex: boolean;
  published: boolean;
  tags: string[];
}[];
