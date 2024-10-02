$('body').css("background", bgColor);

var iterationcard = 1;
while (iterationcard <= channelcount) {
    var htmlcard = `
        <div class="channel_${iterationcard} card ${iterationcard === 1 ? 'activee' : ''}">
            <img src="${imgUrl}" class="channelImage">
            <div class="card-content">
                <div class="channelName">${chanName}</div>
                <div class="odometer subscriberCount">0</div>
            </div>
        </div>`;
    $('body').append(htmlcard);
    iterationcard++;
}

// Fonction pour récupérer et mettre à jour les informations des chaînes
function updateChannelInfo() {
    var googleApiCallURL = "";
    var channelList = [];
    var channelName = [];
    var channelImage = [];
    var subscriberCount = [];

    $.getJSON('channels.json', function(channels) {
        channelList = channels.reverse();

        googleApiCallURL = "https://www.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=" + channelList + "&key=" + APIKeys[Math.floor(Math.random() * APIKeys.length)];

        $.getJSON(googleApiCallURL, function(result) {
            console.log(result);
            var iteration = 0;
            while (iteration < result.items.length) {
                var channelNumber = channelList.indexOf(result.items[iteration].id) + 1;
                channelName[iteration] = result.items[iteration].snippet.title;
                subscriberCount[iteration] = result.items[iteration].statistics.subscriberCount;
                channelImage[iteration] = result.items[iteration].snippet.thumbnails.medium.url;

                $(".channel_" + channelNumber + " .channelName").html(channelName[iteration]);
                $('.channel_' + channelNumber + ' .subscriberCount').html(subscriberCount[iteration]);
                $('.channel_' + channelNumber + ' .channelImage').attr('src', channelImage[iteration]);

                iteration++;
            }
        });
    });
}

// Fonction pour écouter les messages du chat YouTube et activer/désactiver le compteur
function listenToChat() {
    const chatContainer = document.querySelector('#chat'); // Remplacez par l'élément réel du chat YouTube
    chatContainer.addEventListener('DOMNodeInserted', function(event) {
        const message = event.target.innerText;

        if (message.startsWith('!compteur')) {
            toggleSubscriberCount();
        }
    });
}

// Fonction pour afficher ou masquer le compteur d'abonnés
function toggleSubscriberCount() {
    const subscriberCounter = document.querySelector('.subscriberCount');

    if (subscriberCounter.style.display === 'none' || !subscriberCounter.style.display) {
        subscriberCounter.style.display = 'block'; // Affiche le compteur
    } else {
        subscriberCounter.style.display = 'none'; // Cache le compteur
    }
}

// Mise à jour des infos toutes les 45 secondes
updateChannelInfo();
setInterval(updateChannelInfo, 45000);

// Démarre l'écoute du chat
listenToChat();
