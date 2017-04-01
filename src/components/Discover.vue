<template>
<div>

  <div class="field-group">
    <md-layout md-gutter='24'>
      <md-layout>
        <md-input-container>
          <label for="movie">Cover Type</label>
          <md-select name="cover-type" id="cover-type" v-model="coverType">
            <md-option value="all">All</md-option>
            <md-option value="collab">Collab</md-option>
            <md-option value="mashup">Mashup</md-option>
            <md-option value="pop">Pop</md-option>
            <md-option value="acoustic">Acoustic</md-option>
            <md-option value="rnb_soul">R&B / Soul</md-option>
            <md-option value="violin">Violin</md-option>
            <md-option value="piano">Piano</md-option>
            <md-option value="beatbox">Beatbox</md-option>
            <md-option value="rock">Rock</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label for="country">Sort By</label>
          <md-select name="sort-by" id="sort-by" v-model='sortBy'>
            <md-option value="random">Random</md-option>
            <md-option value="cover_famous_likes">Cover Famous Likes</md-option>
            <md-option value="cover_artist_name">Cover Artist Name</md-option>
            <md-option value="youtube_views">YouTube Views</md-option>
            <md-option value="youtube_likes">YouTube Likes</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
  </div>

  <div class='card' v-for="(cover, index) in coverSongs" v-on:click='playSong(cover.youtube_video_id, $event)'>
    <div class='card_rank'></div>
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
  name: 'discover',
  data () {
    return {
      sortBy: 'random',
      coverType: 'all',
      coverSongs: [],
      voteCount: 999,
    }
  },
  created() {
    axios.get('http://localhost:3000/cover_songs')
      .then(response => {
        this.coverSongs = response.data.coverSongsList
          .sort(function() { return 0.5 - Math.random() });
      })
  },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

.field-group {
  padding: 0 16px;
}

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
