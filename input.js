const fs = require('fs'); // Importer le module fs pour lire et écrire des fichiers

const noOfChannels = 18; // Nombre maximum de chaînes
const myFile = 'channels.json'; // Nom du fichier JSON

// Fonction pour lire et décoder le contenu JSON
function readChannels() {
    const jsonData = fs.readFileSync(myFile, 'utf8'); // Lire le fichier
    return JSON.parse(jsonData); // Convertir le JSON en tableau
}

// Fonction pour écrire et encoder le contenu JSON
function writeChannels(data) {
    const jsonData = JSON.stringify(data, null, 2); // Encoder le tableau en JSON
    fs.writeFileSync(myFile, jsonData); // Écrire le JSON dans le fichier
}

// Fonction pour rechercher un ID dans le tableau
function searchForId(arrData, id) {
    return arrData.includes(id); // Vérifier si l'ID est présent dans le tableau
}

// Fonction principale
function addChannel(id) {
    try {
        let arrData = readChannels(); // Lire les chaînes depuis le fichier

        // Vérifier si l'ID existe déjà
        if (!searchForId(arrData, id)) {
            // Si le nombre de chaînes dépasse la limite
            if (arrData.length > noOfChannels - 1) {
                arrData.shift(); // Supprimer la première chaîne
            }
            arrData.push(id); // Ajouter le nouvel ID
            writeChannels(arrData); // Écrire les données mises à jour dans le fichier
            console.log("Seu compteur foi adicionado com sucesso à parede"); // Réponse de succès
        } else {
            console.log("Acho que seu medidor já está na parede."); // Réponse en cas de doublon
        }
    } catch (error) {
        console.error('Caught exception:', error.message); // Gérer les exceptions
    }
}

// Exemple d'utilisation
const id = process.argv[2]; // Récupérer l'ID passé en argument
if (id) {
    addChannel(id); // Appeler la fonction pour ajouter le canal
} else {
    console.log('Veuillez fournir un ID.');
}
