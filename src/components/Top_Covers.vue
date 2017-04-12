<template>
<div id='top_covers'>

  <div class='card' v-for="(cover, index) in topCovers" v-on:click='playSong(cover.youtube_video_id, $event)'>
    <div class='card_rank'>{{ index + 1 }}</div>
    <div class='card_img' 
            :style="{ 'background-image' : 'url(' + cover.profile_photo + ')' }"></div>
    <div class='card-info'>
        <div class='card-artist'>
          <!--<md-icon>volume_up</md-icon> -->
          {{ cover.name }}
        </div>
        <div class='card-song-tags'> {{ cover.tags }}</div>
        <!--<div style='display: inline-block; font-size: .9em'>
          <md-icon style='font-size: 14px; min-width: 14px; min-height: 20px; width: 14px; height: 20px; color: gold; vertical-align:bottom'>star</md-icon>
          <div style='display: inline-block'>{{ cover.vote_count }}</div>
        </div>-->
      <div class='card-yt-views'>{{ cover.view_count_display }} views </div>
    </div>
    <div class='card-votes' 
      v-on:click="triggerVoteModal(index)" 
      :id='"t10-" + cover.youtube_channel_id'>
      <md-button>
        <span class='card-vote-count'>{{ cover.vote_count }}</span> <md-icon class='card-vote-icon'>star_border</md-icon> 
      </md-button>
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
    }
  },
  created() {
    axios.get('http://localhost:3000/cover_songs')
      .then(response => {
        let coverSongs = response.data.coverSongsList;
        let sortedList = coverSongs.sort( (a,b) => {
          return b.vote_count - a.vote_count
        })
        this.topCovers = sortedList.splice(0,10);
      })
  },
  methods: {
    playSong: (songId, event) => {
      let vidUrl = 'https://www.youtube.com/embed/' + songId + '?autoplay=1';
      let vidContainer = document.getElementById('video-container');
      vidContainer.innerHTML = 
        `<iframe  
          src='${vidUrl}'
          frameborder='0'
          allowfullscreen
          style="width:100vw;height: 30vh">
        </iframe>`;
    },
    triggerVoteModal(coverSongIndex) {
      let selectedCoverSong = this.topCovers[coverSongIndex];
      let coverSongId = selectedCoverSong.youtube_channel_id;
      console.log(selectedCoverSong);
      let coverId = `#t10-${coverSongId}`;
      this.$emit('emitVoteModal', coverId, selectedCoverSong);
    },
    // upVote: (cover_song_id, song_id, event) => {
    upVote: function() {
      // console.log(localStorage.profile.user_id);
      // console.log(cover_song_id);
      axios.post('http://localhost:3000/cover_song_vote', {
        cover_artist_song_id: 9,
        user_id: 99,
        song_id: 999
      })
      // axios.post('http://localhost:3000/cover_song_vote', {
      //   cover_artist_song_id: cover_song_id,
      //   user_id: JSON.parse(localStorage.profile).user_id,
      //   song_id: song_id
      // })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
  background: #3F51B5;
  color: white;
}

.card_img {
  flex: 1;
  max-width: 60px;
  height: 60px;
  background-size: cover;
  border-radius: 50px;
  margin-top: 7px;
  margin-left: 12px;
}

.card-info {
  text-align: left;
  padding: 8px 0px 6px 12px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
}

.card-artist {
  font-size: 1.1em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-song-tags {
  font-size: .8em;
}

.card-yt-views {
  font-size: .8em;
  color: grey;
}

.card-view-icon {
  font-size:14px;
  width: 14px;
  min-width: 14px;
  margin-top: -3px;
}

.card-votes {
  flex: 0 0 0;
}

.card-votes button {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 70px
}

.card-vote-count {
  font-size: 24px;
}

.card-vote-icon {
  font-size: 24px;
  vertical-align: text-bottom;
  color: #9E9E9E
}

.md-card-actions button {
  display: block;
  color: grey
}


</style>