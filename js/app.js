const videoCardContainer = document.querySelector(".video-container");

let api_key = "AIzaSyBpJBHnpt8PJc_8-7EbEhNl292EayL7GVo";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  video_http +
    new URLSearchParams({
      key: api_key,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "us",
    })
)
  .then((res) => res.json())
  .then((data) => {
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channel_http +
      new URLSearchParams({
        key: api_key,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
       <div class="video" onclick ="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img  class="thumbnail" src="${data.snippet.thumbnails.high.url}" alt="user image">
        <div class="content">
            <img  class="channel-icon" src="${data.channelThumbnail}" alt="user image">
            <div class="info">
                <h4 class="title">${data.snippet.title} </h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>     
    `;
};

// search bar for
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});

const btn = document.querySelector(".dark-modeBtn");

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
});
