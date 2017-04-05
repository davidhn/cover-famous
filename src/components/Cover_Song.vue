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
      <top-covers-content></top-covers-content>
    </md-tab>

    <md-tab id="almost-famous" md-label="almost famous">
      <almost-famous-tab-content></almost-famous-tab-content>
    </md-tab>

    <md-tab id="comments" md-label="comments">
      <comments-tab-content></comments-tab-content>
    </md-tab>

  </md-tabs>


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
    }
  },
  components: {
    'top-covers-content': TopCovers,
    'almost-famous-tab-content': AlmostFamous,
    'comments-tab-content': Comments
  },
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




</style>
