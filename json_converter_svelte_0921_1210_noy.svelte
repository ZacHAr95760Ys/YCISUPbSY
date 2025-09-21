// 代码生成时间: 2025-09-21 12:10:26
  // State to hold the original JSON data
  let originalJson = '';
  // State to hold the converted JSON data
  let convertedJson = '';
  // State to indicate if the JSON is valid
  let isValidJson = true;

  // Function to parse JSON
  function parseJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      return parsed;
    } catch (error) {
      isValidJson = false;
      throw error;
    }
  }

  // Function to stringify JSON
  function stringifyJson(jsonObject) {
    try {
      return JSON.stringify(jsonObject, null, 2);
    } catch (error) {
      isValidJson = false;
      throw error;
    }
  }

  // Event handler for JSON input change
  function handleJsonInput(event) {
    originalJson = event.target.value;
    isValidJson = true;
    try {
      const parsed = parseJson(originalJson);
      convertedJson = stringifyJson(parsed);
    } catch (error) {
      convertedJson = '';
      isValidJson = false;
    }
  }

  // Event handler for 'Convert' button click
  function handleConvertClick() {
    try {
      const parsed = parseJson(originalJson);
      convertedJson = stringifyJson(parsed);
    } catch (error) {
      convertedJson = '';
      isValidJson = false;
    }
  }
</script>

<!-- UI for JSON Converter -->
<div class="json-converter">
  <h1>JSON Data Format Converter</h1>
  <div class="input-group">
    <label for="original-json">Original JSON:</label>
    <textarea id="original-json" bind:value={originalJson} on:input={handleJsonInput} class="json-input" placeholder="Enter JSON here..."></textarea>
    {#if !isValidJson}
      <p class="error">Invalid JSON format!</p>
    {/if}
  </div>
  <div class="button-group">
    <button on:click={handleConvertClick}>Convert</button>
  </div>
  <div class="output-group">
    <label for="converted-json">Converted JSON:</label>
    <textarea id="converted-json" bind:value={convertedJson} class="json-output" placeholder="Converted JSON will appear here..."></textarea>
  </div>
</div>

<style>
  .json-converter {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .json-input, .json-output {
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
  }
  .error {
    color: red;
  }
  .button-group {
    text-align: center;
    margin: 20px 0;
  }
</style>
