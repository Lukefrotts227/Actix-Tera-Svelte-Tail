const fs = require('fs');
const path = require('path');

function addLinkTagToHead(directory, linkTag) {
    console.log(`Searching in directory: ${directory}`); // Debugging line

    // Recursively search through the directory
    fs.readdir(directory, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directory}: ${err}`);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(directory, file.name);

            if (file.isDirectory()) {
                // If the file is a directory, recurse into it
                console.log(`Entering directory: ${fullPath}`); // Debugging line
                addLinkTagToHead(fullPath, linkTag);
            } else if (file.isFile() && file.name.toLowerCase() === 'index.html') {
                console.log(`Found index.html: ${fullPath}`); // Debugging line

                // If the file is index.html, add the link tag to the head
                fs.readFile(fullPath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file ${fullPath}: ${err}`);
                        return;
                    }

                    // Double-check that the file starts with <!DOCTYPE html> or <html> to confirm it's an HTML file
                    if (data.trim().toLowerCase().startsWith('<!doctype html') || data.trim().toLowerCase().startsWith('<html')) {
                        // Find the <head> tag and insert the link tag after it
                        const headIndex = data.toLowerCase().indexOf('<head>');
                        if (headIndex !== -1) {
                            const updatedContent = data.slice(0, headIndex + 6) + '\n' + linkTag + '\n' + data.slice(headIndex + 6);
                            fs.writeFile(fullPath, updatedContent, 'utf8', (err) => {
                                if (err) {
                                    console.error(`Error writing file ${fullPath}: ${err}`);
                                } else {
                                    console.log(`Added link tag to: ${fullPath}`);
                                }
                            });
                        } else {
                            console.warn(`No <head> tag found in: ${fullPath}`);
                        }
                    } else {
                        console.warn(`File does not appear to be a valid HTML file: ${fullPath}`);
                    }
                });
            }
        });
    });
}

// Specify the directory and the link tag you want to add
const directory = path.join(__dirname, '/static'); // Replace with your directory path
const linkTag = '<link rel="stylesheet" href="/static/css/tailwind.css">'; // Replace with your link tag

// Run the function
addLinkTagToHead(directory, linkTag);
