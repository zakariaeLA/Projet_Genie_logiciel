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
        description: '14 Mars | 15h30 - Conférence sur l’innovation entrepreneuriale.',
        date: '2024-12-01',
        imageurl: 'Histo5.jpeg'
    },
    {
        id: 2,
        titre: 'Sample Item 2',
        description: '18 Février | 21h00 - أمسية قرآنية لاختتام فعاليات المهرجان القرآني في نسخته الحادية عشرة ',
        date: '2024-12-02',
        imageurl: 'Histoé.jpeg'
    },
    {
        id: 3,
        titre: 'Sample Item 3',
        description: '12 Février | 19h00 - Soirée musicale pour une bonne cause.',
        date: '2024-12-03',
        imageurl: 'Sport3.jpeg'
    },
    {
        id: 4,
        titre: 'Sample Item 4',
        description: '27-28 Janvier | Toute la journée - Caravane socio-médicale.',
        date: '2024-12-04',
        imageurl: 'ben1.jpeg'
    },
    {
        id: 5,
        titre: 'Sample Item 5',
        description: '07 Février | 10h00 - Rencontre avec le Ministre de l’Industrie',
        date: '2024-12-05',
        imageurl: 'forum1.jpeg'
    },
    {
        id: 6,
        titre: 'Sample Item 6',
        description: '05 Avril | 10h00 - La 7ᵉ édition du Moroccan Robotics Challenge vous attend. Soyez prêt à innover!',
        date: '2024-12-06',
        imageurl: 'make1.jpeg'
    }
];
const evenmentParticipes =
    [
        {
            id: 7,
            titre: 'Sample Item 7',
            description: '25 Février | 16h00 - Découvrez notre nouveau film « The Legend of Mines Leaders 09 », une expérience cinématographique unique à ne pas manquer!',
            date: '2024-12-07',
            imageurl: 'mead1.jpeg'
        },

        {
            id: 8,
            titre: 'Sample Item 9',
            description: '18 Février | 21h00 - Compétition de DJs',
            date: '2024-12-09',
            imageurl: 'Sport2.jpeg'
        },
        {
            id: 9,
            titre: 'Sample Item 10',
            description: '10 Mai | 20h00 - Pour la 4ᵉ édition de Cosmelody, découvrez des conférences fascinantes sur l’astronomie et les sciences.',
            date: '2024-12-10',
            imageurl: 'astro1.jpeg'
        },
        {
            id: 10,
            titre: 'Sample Item 11',
            description: '15 Juin | 11h00 - L’IA et les énergies renouvelables : un mariage parfait pour un avenir durable.',
            date: '2024-12-11',
            imageurl: 'energ1.jpeg'
        },
        {
            id: 11,
            titre: 'Sample Item 12',
            description: '27 Décembre | 18h00 - Soirée cinéma : Spirited Away.',
            date: '2024-12-12',
            imageurl: 'histo1.jpeg'
        },

        {
            id: 12,
            titre: 'Sample Item 14',
            description: '18 Mars | 09h00 - Participez à une aventure captivante de laser tag et relevez le défi avec votre équipe!',
            date: '2024-12-14',
            imageurl: 'sport1.jpeg'
        }];


app.use(cors()); // This allows all origins by default

// Serve static files (images) from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
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


// Route to get the list of objects
app.get('/api/evenmentAVenir', (req, res) => {
    res.json(evenmentAVenir);
});

app.get('/api/evenmentParticipes/lister', (req, res) => {
    res.json(evenmentParticipes);
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
