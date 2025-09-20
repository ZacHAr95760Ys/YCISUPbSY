// 代码生成时间: 2025-09-20 16:05:47
  import { onMount, writable } from 'svelte/store';
  import { error } from '@picocss/pico';

  // Store to hold the input text
  const inputText = writable('');

  // Store to hold the output text
  const outputText = writable('');

  // Store to hold any errors encountered
  const errorMessage = writable(null);

  // Function to perform the document conversion
  const convertDocument = async (input) => {
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const result = await response.json();
      outputText.set(result.convertedText);
    } catch (error) {
      errorMessage.set(error.message);
    }
  };

  onMount(() => {
    // Initialization logic, if necessary
  });
< /script >

<!-- UI part of the component -->
< div class = 'container' >
  < textarea bind:value = '${inputText}' placeholder = 'Enter your text here...' > < /textarea >
  < button on:click = '{() => convertDocument(inputText)}' > Convert < /button >

  < p >
    {#if $errorMessage}
      < code class = 'error-message' > {$errorMessage} < /code >
    {#else if $outputText}
      < code > {$outputText} < /code >
    {/if}
  < /p >
< /div >