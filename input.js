function addChannelToWall(channelId) {
    const channelFile = 'channels.json';

    // Fetch existing data from channels.json
    fetch(channelFile)
        .then(response => response.json())
        .then(data => {
            if (!data.includes(channelId)) {
                if (data.length >= 18) {
                    data.shift(); // Retire le plus ancien si plus de 18 chaînes
                }
                data.push(channelId);

                // Mise à jour du fichier channels.json avec la nouvelle chaîne
                fetch(channelFile, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data, null, 2)
                }).then(() => {
                    console.log("Chaîne ajoutée avec succès !");
                });
            } else {
                console.log("Chaîne déjà présente.");
            }
        })
        .catch(error => console.error('Erreur:', error));
}

// Exemple d'utilisation : Ajout d'une chaîne
addChannelToWall('ID_DE_LA_CHAINE');
