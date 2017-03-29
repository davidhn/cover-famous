<template>
<div>

  <div class='card' v-for="(cover, index) in topCovers" v-on:click='playSong(cover.youtube_video_id, $event)'>
    <div class='card_rank'>{{ index + 1 }}</div>
    <div class='card_img' 
            :style="{ 'background-image' : 'url(' + cover.profile_photo + ')' }"></div>
    <div class='card-info'>
        <div class='card-artist'>{{ cover.name }}</div>
        <div class='card-yt-views'><md-icon class='card-view-icon'>visibility</md-icon> {{ cover.view_count_display }}</div>
    </div>
    <div class='card-votes' v-on:click='upVote($event)'>
      <md-button class="md-icon-button" >
        <md-icon>thumb_up</md-icon>
      </md-button>
      <div class='voteCount'>{{ voteCount }}</div>  
    </div>
  </div>

</div>
</template>


<script>

import axios from 'axios';

export default {
  name: 'top_covers',
  data() {
    return {
      topCovers: [],
      voteCount: 888
    }
  },
  created() {
    axios.get('http://localhost:3000/cover_songs')
      .then(response => {
        let coverSongs = response.data.coverSongsList;
        let sortedList = coverSongs.sort( (a,b) => {
          return b.view_count - a.view_count
        })
        this.topCovers = sortedList.splice(0,10);
      })
  },
  methods: {
    playSong: (songId, event) => {
      let vidUrl = 'https://www.youtube.com/embed/' + songId;
      let vidContainer = document.getElementById('video-container');
      vidContainer.innerHTML = 
        '<iframe style="width:40vw;height: 100px" src="'+vidUrl+'" allowfullscreen></iframe>';
    },
    upVote: (event) => {
      alert('This is a click event on the vote icon');
    }
  },
}

</script>


<style scoped>

.card {
  flex: 1;
  display: flex;
  height: 75px;
  background: white;
  margin-bottom: 8px;
}

.card_rank {
  flex: 0 0 50px;
  font-size: 24px;
  padding-top: 26px;
}

.card_img {
  flex: 1;
  max-width:75px;
  height: 75px;
  background-size: cover;
}

.card-info {
  text-align: left;
  padding: 8px 0px 6px 12px;
  flex: 1;
}

.card-artist {
  font-size: 1.2em
}

.card-yt-views {
  font-size: .8em
}

.card-view-icon {
  font-size:14px;
  width: 14px;
  min-width: 14px;
  margin-top: -3px;
}

.card-votes {
  flex: 0 0 50px;
  margin-top: 6px;
  padding-right: 8px;
}



</style>