<script lang="ts">
  import Card from './Card.svelte';
  import ArrowRightIcon from './ArrowRightIcon.svelte';

  export let post: App.BlogPost;
</script>

<Card href={`/post/${post.slug}`}>
  <slot slot="eyebrow" name="eyebrow" />
  <slot slot="title">
    <h3 class="text-rosePine-iris">
      {post.title}
    </h3>
  </slot>
  <div slot="description" class="prose">
    {@html post.preview.html}
  </div>
  <div slot="actions">
    <div class="flex items-center">
      <h3 class="text-rosePine-foam">Read</h3>
      <ArrowRightIcon class="w-4 h-4 ml-1" />
    </div>
  </div>
</Card>

<style>
  .prose > :global(p) {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
