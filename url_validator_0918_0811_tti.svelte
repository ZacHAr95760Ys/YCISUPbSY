// 代码生成时间: 2025-09-18 08:11:30
  import { onMount, writable } from 'svelte/store';
  import { Browser } from '$app/environment';

  // Validation status
  const validURL = writable(false);

  // URL input
  const urlInput = writable('');

  // Validate URL function
  function validateURL(input) {
    try {
      // Create a new URL instance to check validity
      new URL(input);
      validURL.set(true);
    } catch (error) {
      // If the input is not a valid URL, set validURL to false
      validURL.set(false);
    }
  }

  // On component mount, validate the initial URL input
  onMount(() => {
    validateURL(urlInput.subscribe());
  });

  // Handle URL input change
  function handleURLChange(event) {
    urlInput.set(event.target.value);
    validateURL(event.target.value);
  }
</script>

<!-- URL input component -->
<input type="text" placeholder="Enter URL" value={urlInput} on:input={handleURLChange} />

<!-- Display validation status -->
<div>
  {#if $validURL}
    <p>Valid URL</p>
  {:else}
    <p>Invalid URL</p>
  {/if}
</div>
