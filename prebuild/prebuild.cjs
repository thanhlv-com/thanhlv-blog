const fs = require('fs');

const fileAPath = './prebuild/VPNavBarTitle.vue';
const fileBPath = './node_modules/@vue/theme/src/vitepress/components/VPNavBarTitle.vue';

// Read the content of file A
fs.readFile(fileAPath, 'utf-8', (err, data) => {
  if (err) {
    console.error(`Error reading file A: ${err}`);
    return;
  }

  // Write the content of file A to file B, overwriting its content
  fs.writeFile(fileBPath, data, 'utf-8', (writeErr) => {
    if (writeErr) {
      console.error(`Error writing to file B: ${writeErr}`);
    } else {
      console.log(`Content from file A successfully overwritten to file B.`);
    }
  });
});
