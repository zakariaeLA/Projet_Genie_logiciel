const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app"); // Assurez-vous que app.js exporte votre application Express

// Connexion à MongoDB dans beforeAll
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://ayakandoussi:sesame@parascolaire.bzzso.mongodb.net/GestionPara?retryWrites=true&w=majority&appName=parascolaire",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Connecté à MongoDB pour le test.");
});

afterAll(async () => {
  // Fermer la connexion à MongoDB après les tests
  await mongoose.connection.close();
  console.log("Connexion MongoDB fermée.");
});

describe('POST /connexion', () => {
  it('devrait retourner un token si les informations de connexion sont correctes', async () => {
    const response = await request(app)
      .post('/api/connexion')
      .send({
        email: 'aya.bouc@enim.ac.ma',
        motDePasse: 'aya'
      });

    expect(response.status).toBe(200); // Vérifiez que la réponse a un statut 200
    expect(response.body.token).toBeDefined(); // Vérifiez que le token est retourné
    console.log('Token:', response.body.token);
  });

  it('devrait retourner une erreur si les informations de connexion sont incorrectes', async () => {
    const response = await request(app)
      .post('/api/connexion')
      .send({
        email: 'incorrect.email@domain.com',
        motDePasse: 'wrongPassword'
      });

    expect(response.status).toBe(404); // Vérifiez le statut d'erreur approprié
    expect(response.body.message).toBe('Email ou mot de passe incorrect.'); // Vérifiez le message d'erreur
  });
});
