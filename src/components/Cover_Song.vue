<template>
<div> 

  <div class='header-container'>
    <div id='video-container'></div>
    <div class='banner-image'>
      <div class='banner-info'>
        <span class="md-title">{{ songName }}</span> <br>
        <span class="md-subheading">{{ songArtist }}</span>
      </div>
    </div>
  </div>

  <md-tabs md-centered md-fixed class='md-transparent'>
    
    <md-tab id="top-covers" md-label="top 10">
      <top-covers-content 
        v-on:emitVoteModal='openDialog'>
      </top-covers-content>
    </md-tab>

    <md-tab id="almost-famous" md-label="almost famous">
      <almost-famous-tab-content 
        v-on:emitVoteModal='openDialog'>
      </almost-famous-tab-content>
    </md-tab>

    <md-tab id="comments" md-label="comments">
      <comments-tab-content></comments-tab-content>
    </md-tab>

  </md-tabs>
  
  <md-dialog ref="voteModal"
    :md-open-from="voteModal.source" 
    :md-close-to="voteModal.source">
  
    <md-dialog-content>
      <div>
        <md-avatar>
          <img :src="voteModal.coverArtistImage" :alt="voteModal.coverArtist">
        </md-avatar>
        <div class="dialog-artist-container">
          <div class='dialog-coverartist'>{{ voteModal.coverArtist }}</div>
          <div class='dialog-song'>{{ songName }} - {{ songArtist }}</div>
        </div>
      </div>
      <h5>I like this cover because...</h5>
      <md-chip 
        v-for='tag in voteModal.songTags' 
        @click.native='selectTag($event)'>
          {{ tag }}
      </md-chip>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button 
        class="md-warn md-raised" 
        @click.native="closeDialog">
        ...and that is why it's awesome
      </md-button>
    </md-dialog-actions>
  </md-dialog>

  <md-snackbar md-position="bottom center" ref="snackbar" md-duration="5000">
    <span>{{ voteModal.coverArtist }} is one vote closer to being Cover Famous!</span>
  </md-snackbar>

</div>
</template>

<script>

import AlmostFamous from './Almost_Famous.vue'
import Comments from './Comments.vue'
import TopCovers from './Top_Covers.vue'
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      songId: 1,
      songName: 'Starboy',
      songArtist: 'The Weeknd',
      video: '//www.youtube.com/embed/Q8TXgCzxEnw?rel=0',
      albumCover: '../assets/weeknd_album_cover2.jpg',
      voteModal: {
        source: '',
        coverArtist: '',
        coverAristImage: '',
        coverSongId: '',
        songTags: [
          'Better Than The Original', 
          'So Creative', 
          'LIT', 
          'Baby-Making Music', 
          'Amazing Voice', 
          'Sick Beat', 
          'They Are So Hot',
          'That Music Video'
        ]
      }
    }
  },
  components: {
    'top-covers-content': TopCovers,
    'almost-famous-tab-content': AlmostFamous,
    'comments-tab-content': Comments,
  },
  methods: {
    openDialog(source, selectedCoverSong) {
      this.voteModal.source = source; 
      this.voteModal.coverArtist = selectedCoverSong.name;
      this.voteModal.coverArtistImage = selectedCoverSong.profile_photo;
      this.voteModal.coverSongId = selectedCoverSong.cover_song_id;
      this.$nextTick(function () {
        this.$refs['voteModal'].open();
      })
    },
    closeDialog() {
      let currentUser = localStorage.getItem('profile');
      let voteModal = this.$refs['voteModal'];
      let confirmationMessage = this.$refs.snackbar;
      let upVoteIcon = $(this.voteModal.source).find('i');
      console.log(upVoteIcon);

      axios.post('http://localhost:3000/cover_song_vote', {
        cover_artist_song_id: this.voteModal.coverSongId,
        user_id: JSON.parse(currentUser).user_id,
        song_id: this.songId
      })
      .then(function (response) {
        console.log(response);
        voteModal.close();
        confirmationMessage.open();
        upVoteIcon.addClass('liked-song')
      })
      .catch(function (error) {
        console.log(error);
      });

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
  }
}


</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>

.header-container {
  position: relative;
}

.banner-image {
  background-image: url(../assets/weeknd_album_cover.jpg);
  height: 30vh;
  background-position: left;
  background-size: cover;
  opacity: .75;
}

.banner-info {
  position: absolute;
  bottom: 24px;
  left: 18px;
  color: white;
  text-align: left;
}

.md-tab-header-container {
  font-size: .8em;
}

.md-tabs-content {
  background: #f7f7f7;
}

.md-tabs-wrapper {
  margin-top: 8px;
}

#top-covers {
  padding:0;
  flex: 1;
  background: #f7f7f7;
}

#almost-famous {
  padding: 0;
}

#video-container {
  position: absolute;
  z-index: 1;
}

/* VOTE MODAL */

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

.liked-song {
  color: #e91e63 !important;
}



</style>
