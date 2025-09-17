// 代码生成时间: 2025-09-17 12:10:38
        // Import Svelte and create a store for calculations
        import { onMount, writable } from 'svelte';

        // Create a writable store for the calculation results
        const results = writable([]);


        // Define a Svelte component for the math calculator
        function MathCalculator() {
            // Function to perform addition
            function add(number1, number2) {
                return number1 + number2;
            }

            // Function to perform subtraction
            function subtract(number1, number2) {
                return number1 - number2;
            }

            // Function to perform multiplication
            function multiply(number1, number2) {
                return number1 * number2;
            }

            // Function to perform division
            function divide(number1, number2) {
                if (number2 === 0) {
                    throw new Error('Cannot divide by zero');
                }
                return number1 / number2;
            }

            // Function to handle calculation
            function calculate(operation, number1, number2) {
                let result;
                switch (operation) {
                    case 'add':
                        result = add(number1, number2);
                        break;
                    case 'subtract':
                        result = subtract(number1, number2);
                        break;
                    case 'multiply':
                        result = multiply(number1, number2);
                        break;
                    case 'divide':
                        result = divide(number1, number2);
                        break;
                    default:
                        throw new Error('Invalid operation');
                }
                return result;
            }

            // Function to handle user input and update results
            function handleCalculation(operation, number1, number2) {
                try {
                    const result = calculate(operation, parseFloat(number1), parseFloat(number2));
                    results.set([...results, { operation, result }]); // Add new result to the list
                } catch (error) {
                    console.error(error.message);
                }
            }

            // Initialize the component
            onMount(() => {
                console.log('MathCalculator component initialized');
            });

            return {
                handleCalculation,
                results
            };
        }

        // Register the Svelte component
        svelte.component('math-calculator', MathCalculator);
    </script>

    <!-- Use the Svelte component -->
    <math-calculator>
        <input type="number" bind:value="{number1}" placeholder="Enter first number" />
        <select bind:value="{operation}">
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
        </select>
        <input type="number" bind:value="{number2}" placeholder="Enter second number" />
        <button on:click="{() => handleCalculation(operation, number1, number2)}">Calculate</button>
        <div>
            <h3>Results:</h3>
            <ul>
                {#each results as result}
                    <li>Operation: {result.operation}, Result: {result.result}</li>
                {/each}
            </ul>
        </div>
    </math-calculator>
</body>
</html>