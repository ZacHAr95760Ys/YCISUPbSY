// 代码生成时间: 2025-09-20 12:21:18
import { onMount, writable } from 'svelte/store';
import { get, post } from 'svelte-requests';

// Writable stores for API responses and test results
import results from './stores/results.js';
import errors from './stores/errors.js';

// A simple Svelte component for starting and displaying performance test results
export default function PerformanceTest() {
  // Store for test status
  const testStatus = writable('');

  // Mount function to execute on component mount
  onMount(async () => {
    try {
      // Attempt to start the performance test
      const response = await post('/api/start-performance-test');
      if (response.ok) {
        // If the test is started successfully, update the test status
        testStatus.set('Running...');

        // Poll the server for test results at a regular interval
        const pollForResults = setInterval(async () => {
          try {
            const resultsResponse = await get('/api/performance-test-results');
            if (resultsResponse.ok) {
              results.set(resultsResponse.data);
            } else {
              throw new Error('Failed to retrieve test results');
            }
          } catch (error) {
            errors.set(error.message);
            clearInterval(pollForResults);
          }
        }, 1000);

      } else {
        throw new Error('Failed to start performance test');
      }
    } catch (error) {
      errors.set(error.message);
    }
  });

  // Start the performance test
  function startTest() {
    testStatus.set('Starting...');
  }

  return {
    testStatus,
    startTest
  };
}

// Svelte component for displaying the performance test results
function ResultDisplay() {
  const { subscribe } = results;
  const { subscribe: subscribeErrors } = errors;
  const resultsData = subscribe();
  const errorsData = subscribeErrors();

  return (
    <div class="result-display">
      <h2>Performance Test Results</h2>
      {resultsData ? (
        <pre>
          {JSON.stringify(resultsData, null, 2)}
        </pre>
      ) : (
        <p>No results available.</p>
      )}
      {errorsData ? (
        <p class="error">{errorsData}</p>
      ) : null}
    </div>
  );
}

// Svelte component for starting the performance test
function StartTestButton() {
  const { testStatus } = PerformanceTest();
  const { startTest } = PerformanceTest();

  return (
    <button on:click={startTest} disabled={testStatus !== ''}>
      {testStatus !== '' ? testStatus : 'Start Performance Test'}
    </button>
  );
}

// Main component that combines the start button and result display
export default function PerformanceTestApp() {
  return (
    <div class="performance-test-app">
      <StartTestButton />
      <ResultDisplay />
    </div>
  );
}