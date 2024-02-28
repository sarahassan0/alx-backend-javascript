console.log('Welcome to Holberton School, what is your name?');

const isPipedInput = !process.stdin.isTTY;

process.stdin.on('data', (data) => {
  process.stdout.write(`Your name is: ${data}`);
});

if (isPipedInput) {
  process.stdin.on('end', () => {
    process.stdout.write('This important software is now closing\n');
  });
}
