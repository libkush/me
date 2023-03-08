<script lang="ts">
  import { discordID, email, firstName, githubUsername } from '$lib/info';
  import { GitHubIcon, MailIcon, ChatLinesIcon, DiscordIcon } from '@indaco/svelte-iconoir';
</script>

<div class="flex flex-row gap-6 m-8">
  <ChatLinesIcon class="social" />
  <a href="https://github.com/{githubUsername}" aria-label="Open {firstName}'s Github Profile">
    <GitHubIcon class="social" />
  </a>
  <a href="https://discordapp.com/users/{discordID}" aria-label="Open {firstName}'s Discord">
    <DiscordIcon class="social" />
  </a>
  <a href="mailto:{email}" aria-label="Send an E-mail to {firstName}">
    <MailIcon class="social" />
  </a>
</div>

<style>
</style>
