<script lang="ts">
  import { discordID, email, githubUsername } from '$lib/info';
  import { GitHubIcon, MailIcon, ChatLinesIcon, DiscordIcon } from '@indaco/svelte-iconoir';
</script>

<div class="flex flex-row gap-6 m-8">
  <ChatLinesIcon class="social" />
  <a href="https://github.com/{githubUsername}">
    <GitHubIcon class="social" />
  </a>
  <a href="https://discordapp.com/users/{discordID}">
    <DiscordIcon class="social" />
  </a>
  <a href="mailto:{email}">
    <MailIcon class="social" />
  </a>
</div>

<style>
</style>
