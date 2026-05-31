let channels = [];

let favorites =
JSON.parse(
localStorage.getItem("favorites")
) || [];

const container = document.getElementById("channels");

async function loadChannels() {

    const response = await fetch("channels.json");

    channels = await response.json();

    renderChannels(channels);

    if(channels.length > 0){
        playChannel(channels[0].url);
    }
}

function renderChannels(list){

    container.innerHTML = "";

    list.forEach(channel => {

        const card = document.createElement("div");

        card.className = "channel-card";

card.innerHTML = `

<button class="favorite-btn">
❤️
</button>

<img src="${channel.logo}">

<div class="channel-name">
${channel.name}
</div>

`;
const favBtn =
card.querySelector(".favorite-btn");

favBtn.onclick = (e)=>{

    e.stopPropagation();

    const exists =
    favorites.find(
        ch => ch.name === channel.name
    );

    if(exists){

        favorites =
        favorites.filter(
            ch => ch.name !== channel.name
        );

    }else{

        favorites.push(channel);

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    renderFavorites();

};

        card.onclick = () => {

    playChannel(channel.url);

    document.getElementById(
        "currentChannel"
    ).innerText = channel.name;

};

        container.appendChild(card);

    });

}

async function playChannel(url){

    const video =
    document.getElementById("video");

    try{

        const player =
        new shaka.Player(video);

        await player.load(url);

        console.log(
            "Shaka Player Loaded"
        );

    }catch(error){

        console.log(
            "Shaka Failed, HLS.js Loading..."
        );

        if(Hls.isSupported()){

            const hls =
            new Hls();

            hls.loadSource(url);

            hls.attachMedia(video);

        }else{

            video.src = url;

        }

    }

}

document
.getElementById("search")
.addEventListener("keyup", e => {

    const text =
    e.target.value.toLowerCase();

    const filtered =
    channels.filter(ch =>
        ch.name.toLowerCase().includes(text)
    );

    renderChannels(filtered);

});

function filterCategory(category){

    if(category === "All"){

        renderChannels(channels);

        return;
    }

    const filtered =
    channels.filter(
        ch => ch.category === category
    );

    renderChannels(filtered);

}

loadChannels();
document.getElementById(
"currentChannel"
).innerText =
channels[0].name;

renderFavorites();


document
.getElementById("search")
.addEventListener("keyup",e=>{

    const text =
    e.target.value.toLowerCase();

    const filtered =
    channels.filter(channel=>

        channel.name
        .toLowerCase()
        .includes(text)

    );

    renderChannels(filtered);

});

function renderFavorites(){

    const favContainer =
    document.getElementById("favorites");

    favContainer.innerHTML="";

    favorites.forEach(channel=>{

        const card =
        document.createElement("div");

        card.className =
        "channel-card";

        card.innerHTML=`

        <img src="${channel.logo}">

        <div class="channel-name">
        ${channel.name}
        </div>

        `;

        favContainer.appendChild(card);

    });

}