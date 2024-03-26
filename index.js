/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        type: 'input',
        name: 'url',
        message: 'Please enter a URL to generate a QR code:'
    }
])
    .then((answers) => {
        generateQRCode(answers.url);
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.error('Error rendering the prompt:', error);
        } else {
            console.error('An error occurred while processing input:', error);
        }
    });

function generateQRCode(url) {
    const qrCode = qr.image(url, { type: 'png' });
    const output = fs.createWriteStream('QRCode.png');
    qrCode.pipe(output);

    saveInputToFile(url);
}

function saveInputToFile(url) {
    fs.writeFile('URL.txt', url, err => {
        if (err) {
            console.error('Error saving the URL to a file:', err);
            return;
        }
        console.log('User input saved to userInput.txt and QR Code generated as QRCode.png');
    });
}
