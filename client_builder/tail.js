import fs from 'fs';
import path from 'path';

// Get the command line arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.error('Usage: node add-stylesheet-link.mjs <html-file-path> <stylesheet-path>');
    process.exit(1);
}

const [htmlFilePath, stylesheetPath] = args;

// Validate the HTML file path
if (!fs.existsSync(htmlFilePath)) {
    console.error(`Error: The HTML file at "${htmlFilePath}" does not exist.`);
    process.exit(1);
}

// Read the HTML file content
const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

// Create the <link> tag
const linkTag = `<link rel="stylesheet" href="${stylesheetPath}">`;

// Check if the link tag already exists
if (htmlContent.includes(linkTag)) {
    console.log('The stylesheet link tag is already present in the HTML file.');
} else {
    // Find the position to insert the <link> tag
    const headCloseTagIndex = htmlContent.indexOf('</head>');

    if (headCloseTagIndex !== -1) {
        // Insert the <link> tag before the closing </head> tag
        const updatedHtmlContent = `${htmlContent.slice(0, headCloseTagIndex)}\n    ${linkTag}\n${htmlContent.slice(headCloseTagIndex)}`;

        // Write the updated HTML content back to the file
        fs.writeFileSync(htmlFilePath, updatedHtmlContent, 'utf-8');
        console.log(`Successfully added the stylesheet link tag to "${htmlFilePath}".`);
    } else {
        console.error('Error: The HTML file does not contain a closing </head> tag.');
    }
}
