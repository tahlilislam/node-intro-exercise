const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`ERROR READING ${path}: ${err}`);
      process.kill(1);
    }
    console.log("DATA:", data);
  });
}

// Extract path from command line arguments and then calling the cat function
const filePath = process.argv[2];
if (filePath) {
  cat(filePath);
} else {
  console.error(
    "Please provide file path as command line argument to run the cat function."
  );
}
