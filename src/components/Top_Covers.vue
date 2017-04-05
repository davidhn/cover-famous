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
        <div class='card-yt-views'><md-icon class='card-view-icon'>visibility</md-icon> {{ cover.view_count_display }}</div>
    </div>
    <!--<div class='card-votes' v-on:click='upVote(cover.cover_song_id, cover.song_id, $event)'>-->
    <div class='card-votes' v-on:click="openDialog('dialog1')" id='custom'>
      <md-button class="md-icon-button">
        <md-icon>thumb_up</md-icon>
      </md-button>
      <div class='voteCount'>{{ cover.vote_count }}</div>  
    </div>
  </div>

  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
    
    <md-dialog-content>
      <div>
        <md-avatar>
          <img src="../assets/weeknd_album_cover2.jpg" alt="Cover Artist Name">
        </md-avatar>
        <div class="dialog-artist-container">
          <div class='dialog-coverartist'>Conor Maynard</div>
          <div class='dialog-song'>Starboy - Weeknd</div>
        </div>
      </div>
      <h5>This cover is...</h5>
      <md-chip v-for='tag in songTags' @click.native='selectTag($event)'>{{ tag }}</md-chip>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button 
        class="md-warn md-raised" 
        @click.native="closeDialog('dialog1')">
        ...and that is why it's awesome
      </md-button>
    </md-dialog-actions>
  </md-dialog>

  <md-snackbar md-position="bottom center" ref="snackbar" md-duration="4000">
    <span>Thank you! Conor Maynard is one vote closer to being Cover Famous!</span>
  </md-snackbar>

</div>
</template>


<script>

import axios from 'axios';

export default {
  name: 'top_covers',
  data() {
    return {
      topCovers: [],
      songTags: [
        'Better Than The Original', 
        'So Creative', 
        'Song Is LIT', 
        'Baby-Making Music', 
        'Amazing Voice', 
        'Sick Beat', 
        'They Are So Hot',
        'That Music Video'
      ]
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
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      console.log(ref);
      this.$refs[ref].close();
      this.$refs.snackbar.open();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    },
    selectTag: (event) => {
      console.log(event.target);
      let tag = $(event.target);
      if (tag.hasClass('selected-tag')) { tag.removeClass('selected-tag') } 
      else { tag.addClass('selected-tag') }
    },
    upVote: (cover_song_id, song_id, event) => {
      console.log(localStorage.profile.user_id);
      console.log(cover_song_id);
      axios.post('http://localhost:3000/cover_song_vote', {
        cover_artist_song_id: cover_song_id,
        user_id: JSON.parse(localStorage.profile).user_id,
        song_id: song_id
      })
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
  flex: 0 0 50px;
  margin-top: 6px;
  padding-right: 8px;
}

.card-votes i {
  color: grey
}

.md-chip {
  margin-right: 4px;
  margin-bottom: 4px;
}

.dialog-artist-container {
  display: inline-block;
  vertical-align: middle;
  padding-left: 12px;
}

.dialog-coverartist {
  font-size: 1.2em
}

.dialog-song {
  font-size: .9em;
  color: grey
}

.selected-tag {
  background-color: #FF7043 !important;
  color: white;
}

.md-dialog-actions {
  justify-content: flex-start;
  margin-bottom: 12px;
}


</style>