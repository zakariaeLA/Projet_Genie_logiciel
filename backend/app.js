const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 8000;

// Sample data for the list of objects with the provided image names
//Replace this data from mongo db 
const evenmentAVenir = [
    {
        id: 1,
        titre: 'Sample Item 1',
        description: 'Description of item 1',
        date: '2024-12-01',
        imageurl: 'Histo5.jpeg'
    },
    {
        id: 2,
        titre: 'Sample Item 2',
        description: 'Description of item 2',
        date: '2024-12-02',
        imageurl: 'Histoé.jpeg'
    },
    {
        id: 3,
        titre: 'Sample Item 3',
        description: 'Description of item 3',
        date: '2024-12-03',
        imageurl: 'Sport3.jpeg'
    },
    {
        id: 4,
        titre: 'Sample Item 4',
        description: 'Description of item 4',
        date: '2024-12-04',
        imageurl: 'ben1.jpeg'
    },
    {
        id: 5,
        titre: 'Sample Item 5',
        description: 'Description of item 5',
        date: '2024-12-05',
        imageurl: 'forum1.jpeg'
    },
    {
        id: 6,
        titre: 'Sample Item 6',
        description: 'Description of item 6',
        date: '2024-12-06',
        imageurl: 'make1.jpeg'
    }
];
const evenmentParticipes =
    [
        {
            id: 7,
            titre: 'Sample Item 7',
            description: 'Description of item 7',
            date: '2024-12-07',
            imageurl: 'mead1.jpeg'
        },
        {
            id: 8,
            titre: 'Sample Item 8',
            description: 'Description of item 8',
            date: '2024-12-08',
            imageurl: 'Histo§.jpeg'
        },
        {
            id: 9,
            titre: 'Sample Item 9',
            description: 'Description of item 9',
            date: '2024-12-09',
            imageurl: 'Sport2.jpeg'
        },
        {
            id: 10,
            titre: 'Sample Item 10',
            description: 'Description of item 10',
            date: '2024-12-10',
            imageurl: 'astro1.jpeg'
        },
        {
            id: 11,
            titre: 'Sample Item 11',
            description: 'Description of item 11',
            date: '2024-12-11',
            imageurl: 'energ1.jpeg'
        },
        {
            id: 12,
            titre: 'Sample Item 12',
            description: 'Description of item 12',
            date: '2024-12-12',
            imageurl: 'histo1.jpeg'
        },
        {
            id: 13,
            titre: 'Sample Item 13',
            description: 'Description of item 13',
            date: '2024-12-13',
            imageurl: 'masjid1.jpeg'
        },
        {
            id: 14,
            titre: 'Sample Item 14',
            description: 'Description of item 14',
            date: '2024-12-14',
            imageurl: 'sport1.jpeg'
        }];


app.use(cors()); // This allows all origins by default

// Serve static files (images) from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Route to get the list of objects
app.get('/api/evenmentAVenir', (req, res) => {
    res.json(evenmentAVenir);
});

app.get('/api/evenmentParticipes', (req, res) => {
    res.json(evenmentParticipes);
});

// Route to serve an image based on its filename
app.get('/api/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'public', 'images', imageName);
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(404).send('Image not found');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
