let channels = [];

let favorites =
JSON.parse(
    localStorage.getItem("favorites")
) || [];

const container =
document.getElementById("channels");

let player;

// Load Channels
async function loadChannels() {

    const response =
    await fetch("https://rsinternet.com.bd/channels.php");

    channels =
    await response.json();

    renderChannels(channels);

    renderFavorites();

    if (channels.length > 0) {

        playChannel(channels[0].url);

        document.getElementById(
            "currentChannel"
        ).innerText =
        channels[0].name;
    }
}

// Render Channels
function renderChannels(list) {

    container.innerHTML = "";

    list.forEach(channel => {

        const card =
        document.createElement("div");

        card.className =
        "channel-card";

        card.innerHTML = `

            <button class="favorite-btn">
                ❤️
            </button>

            <img src="${channel.logo}" alt="${channel.name}">

            <div class="channel-name">
                ${channel.name}
            </div>

        `;

        const favBtn =
        card.querySelector(".favorite-btn");

        favBtn.onclick = (e) => {

            e.stopPropagation();

            toggleFavorite(channel);

        };

        card.onclick = () => {

            playChannel(channel.url);

            document.getElementById(
                "currentChannel"
            ).innerText =
            channel.name;
        };

        container.appendChild(card);
    });
}

// Toggle Favorite
function toggleFavorite(channel) {

    const exists =
    favorites.find(
        ch => ch.name === channel.name
    );

    if (exists) {

        favorites =
        favorites.filter(
            ch => ch.name !== channel.name
        );

    } else {

        favorites.push(channel);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    renderFavorites();
}

// Render Favorites
function renderFavorites() {

    const favContainer =
    document.getElementById("favorites");

    favContainer.innerHTML = "";

    favorites.forEach(channel => {

        const card =
        document.createElement("div");

        card.className =
        "channel-card";

        card.innerHTML = `

            <img src="${channel.logo}" alt="${channel.name}">

            <div class="channel-name">
                ${channel.name}
            </div>

        `;

        card.onclick = () => {

            playChannel(channel.url);

            document.getElementById(
                "currentChannel"
            ).innerText =
            channel.name;
        };

        favContainer.appendChild(card);
    });
}

let hls;

function playChannel(url){

    const video =
    document.getElementById("video");

    if(hls){
        hls.destroy();
    }

    if(Hls.isSupported()){

        hls = new Hls({
            enableWorker: true
        });

        hls.loadSource(url);

        hls.attachMedia(video);

        hls.on(
            Hls.Events.MANIFEST_PARSED,
            function(){

                video.play()
                .catch(()=>{});

            }
        );

    }else if(
        video.canPlayType(
            "application/vnd.apple.mpegurl"
        )
    ){

        video.src = url;

        video.play()
        .catch(()=>{});

    }
}

// Search
document
.getElementById("search")
.addEventListener("keyup", e => {

    const text =
    e.target.value.toLowerCase();

    const filtered =
    channels.filter(channel =>

        channel.name
        .toLowerCase()
        .includes(text)

    );

    renderChannels(filtered);
});

// Category Filter
function filterCategory(category) {

    if (category === "All") {

        renderChannels(channels);

        return;
    }

    const filtered =
    channels.filter(

        channel =>
        channel.category === category

    );

    renderChannels(filtered);
}

// Start App
loadChannels();




const popup =
document.getElementById("livePopup");

const liveUsers =
document.getElementById("liveUsers");

const totalViews =
document.getElementById("totalViews");

function showLivePopup(){

    liveUsers.innerText =
    Math.floor(Math.random()*300)+50;

    totalViews.innerText =
    Math.floor(Math.random()*50000)+10000;

    popup.style.display = "block";

    setTimeout(()=>{

        popup.style.display = "none";

    },5000);

}

setInterval(()=>{

    showLivePopup();

},30000);


//Fifa Coundown
const fifaDate =
new Date("June 11, 2026 00:00:00").getTime();

setInterval(() => {

const now =
new Date().getTime();

const distance =
fifaDate - now;

const days =
Math.floor(
distance / (1000 * 60 * 60 * 24)
);

const hours =
Math.floor(
(distance %
(1000 * 60 * 60 * 24))
/
(1000 * 60 * 60)
);

const minutes =
Math.floor(
(distance %
(1000 * 60 * 60))
/
(1000 * 60)
);

const seconds =
Math.floor(
(distance %
(1000 * 60))
/
1000
);

document.getElementById("days").innerText =
days;

document.getElementById("hours").innerText =
hours;

document.getElementById("minutes").innerText =
minutes;

document.getElementById("seconds").innerText =
seconds;

},1000);

function closeBanner(){
    document.getElementById("fifaBanner").style.display="none";
}

