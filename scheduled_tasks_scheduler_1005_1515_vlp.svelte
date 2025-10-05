// 代码生成时间: 2025-10-05 15:15:35
import { onMount, onDestroy } from 'svelte';

// Custom error class for task scheduling errors
class TaskSchedulingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaskSchedulingError';
  }
}

// A function to schedule a task using setInterval
function scheduleTask(task, interval) {
  // Validate interval is a positive number
  if (typeof interval !== 'number' || interval <= 0) {
    throw new TaskSchedulingError('Interval must be a positive number');
  }

  // Execute the task immediately, then schedule it to run at specified intervals
  const intervalId = setInterval(task, interval);

  // Return the intervalId for potential removal of the task
  return intervalId;
}

export default function ScheduledTasksScheduler({ tasks }) {
  let intervalIds = [];

  // Mounting a new task scheduler
  onMount(() => {
    tasks.forEach((task) => {
      try {
        // Schedule each task with its interval
        const intervalId = scheduleTask(() => {
          console.log(`Executing task at ${new Date().toISOString()}`);
          task.action();
        }, task.interval * 1000); // Convert seconds to milliseconds

        // Store the interval ID to allow for unmounting
        intervalIds.push(intervalId);
      } catch (error) {
        if (error instanceof TaskSchedulingError) {
          console.error(`Failed to schedule task: ${error.message}`);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    });
  });

  // Cleanup on component destruction
  onDestroy(() => {
    intervalIds.forEach((id) => {
      clearInterval(id);
    });
    intervalIds = [];
  });

  // The Svelte component's markup
  return {
    oncreate: (element) => {
      element.textContent = 'Scheduled Tasks Scheduler is running...';
    },
    ondestroy: () => {
      console.log('Scheduled Tasks Scheduler has been destroyed.');
    }
  };
}

// Usage Example:
// <ScheduledTasksScheduler tasks={[
//   { action: () => console.log('Task 1 executed'), interval: 5 },
//   { action: () => console.log('Task 2 executed'), interval: 10 },
// ]} />