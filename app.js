const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.ORIGIN_CORS,
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    }))
    .use(express.json());


app.post('/preinscription', async (requete, reponse) => {
    let { nom, prenom, formation, rappel, email, tel, commentaire, jpo } = requete.body;
    jpo = (jpo ? 'oui' : 'non');
    const mail = require('./envoiMail');
    mail.envoiMail(
        "Demande de préinscription de "+nom+" "+prenom+" depuis le site",
        "Prénom : " +prenom 
        +"<br> Nom : "+nom
        +"<br> Formation : "+formation
        +"<br> Rdv : "+rappel
        +"<br> E-mail : "+email
        +"<br> Numéro de téléphone : "+tel
        +"<br> Commentaire : "+commentaire
        +"<br> Journée portes ouvertes : "+jpo
    )
    .then(_ => {
        const message = "La demande de pré-inscription a bien été envoyé."
        return reponse.status(200).json({message})
    })
    .catch (error => {
        const message = "La demande de présincription a échoué, merci de contacter directement l'école : 03 20 49 05 05 .";
        return reponse.status(500).json({message, data : error});
    })
});


app.use((requete, reponse) => {
    const message = 'Impossible de trouver la ressource - Erreur 404'
    return reponse.status(404).json({message})
})


app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port `+ port);
});