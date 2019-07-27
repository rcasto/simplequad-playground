const context: Worker = self as any;

// Post data to parent thread
context.postMessage('yo');

// Respond to message from parent thread
context.addEventListener('message', (event) => console.log(event.data));