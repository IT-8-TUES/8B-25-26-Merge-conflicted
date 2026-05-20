const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Translates incoming frontend text data back into a proper JavaScript object
app.use(express.json());

// 2. Serves all your HTML, CSS, and images automatically from the main folder
app.use(express.static(__dirname));

// 3. The exact mailbox route that catches your teacher's form submissions
app.post('/save-grades', (req, res) => {
    const newGrade = req.body; // Opens the data package from the browser
    const filePath = path.join(__dirname, 'grades.json');
    
    let gradesArray = [];

    // Check if the file already exists right now
    if (fs.existsSync(filePath)) {
        try {
            // Read it instantly without background delay or race conditions
            const fileData = fs.readFileSync(filePath, 'utf8');
            if (fileData.trim()) {
                gradesArray = JSON.parse(fileData);
                if (!Array.isArray(gradesArray)) {
                    gradesArray = []; // Reset if it's somehow corrupted format-wise
                }
            }
        } catch (e) {
            console.error("Error reading/parsing JSON:", e);
            gradesArray = []; // Safe fallback
        }
    }

    // Add the freshly submitted teacher grade to our running list
    gradesArray.push(newGrade);

    // Write it back to the disk safely, preserving previous array items
    try {
        fs.writeFileSync(filePath, JSON.stringify(gradesArray, null, 2), 'utf8'); // null, 2 go pravqt po podredeno
        // Success! Send this message back to the browser
        res.json({ message: 'Успешно запазено в JSON!' });
    } catch (err) {
        console.error("Error writing JSON:", err);
        return res.status(500).json({ message: 'Error saving file to disk' });
    }
});

// 3.5. MAILBOX FOR RELOADS: This route safely hands over the accumulated list to the browser
app.get('/get-grades', (req, res) => {
    const filePath = path.join(__dirname, 'grades.json');

    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        if (!fileData.trim()) {
            return res.json([]);
        }
        const gradesArray = JSON.parse(fileData);
        res.json(gradesArray);
    } catch (e) {
        console.error("Error loading JSON on reload:", e);
        res.json([]); // Fallback if the file gets corrupted
    }
});

// 4. Starts the server and listens for actions on port 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3000`);
});