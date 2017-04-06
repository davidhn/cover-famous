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
    :md-open-from="voteModal.modalSource" 
    :md-close-to="voteModal.modalSource">
  
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

  <md-snackbar md-position="bottom center" ref="snackbar" md-duration="4000">
    <span>Thank you! Conor Maynard is one vote closer to being Cover Famous!</span>
  </md-snackbar>

</div>
</template>

<script>

import AlmostFamous from './Almost_Famous.vue'
import Comments from './Comments.vue'
import TopCovers from './Top_Covers.vue'

export default {
  name: 'home',
  data () {
    return {
      songName: 'Starboy',
      songArtist: 'The Weeknd',
      video: '//www.youtube.com/embed/Q8TXgCzxEnw?rel=0',
      albumCover: '../assets/weeknd_album_cover2.jpg',
      voteModal: {
        modalSource: '',
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
    }
  },
  components: {
    'top-covers-content': TopCovers,
    'almost-famous-tab-content': AlmostFamous,
    'comments-tab-content': Comments,
  },
  methods: {
    openDialog(modalSource) {
      console.log('it hit event on parent');
      console.log(modalSource);
      this.voteModal.modalSource = modalSource; 
      this.$nextTick(function () {
        this.$refs['voteModal'].open();
      })
    },
    closeDialog(ref) {
      console.log(ref);
      this.$refs['voteModal'].close();
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



</style>
