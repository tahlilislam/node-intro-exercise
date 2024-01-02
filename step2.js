const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(`ERROR READING ${path}: ${err}`);
      process.kill(1);
    }
    console.log("DATA:", data);
  });
}

async function webCat(url) {
    try {
        const res = await axios.get(url)
        console.log(res.data);
    }
    catch(err) {
        console.error(`Error fetching ${url}: ${err}`)
    }
}
// Extract path from the 3rd command line argument and then calling the cat function
let path = process.argv[2];
if (path && path.startsWith('http')) {
  webCat(path);
} else if (path) {
    cat(path);
} 
else {
  console.error(
    "Please provide file path or URL as command line argument."
  );
}
