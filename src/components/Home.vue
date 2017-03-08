<template>
<div>

  <div class='header-container'>
    <div class='banner-image'>
      <div class='banner-info'>
        <span class="md-title">{{ songName }}</span> <br>
        <span class="md-subheading">{{ songArtist }}</span>
      </div>
    </div>
    <!--<iframe width='854' height='480' :src='video' frameborder='0' allowfullscreen></iframe>-->
  </div>


  <md-tabs md-fixed class='md-transparent'>
    
    <md-tab id="top-covers" md-label="top covers">
      <p>Top Covers</p>
    </md-tab>

    <md-tab id="discover" md-label="discover">
      <p>Discover</p>
    </md-tab>

    <md-tab id="comments" md-label="comments">
      <p>Comments</p>
    </md-tab>

  </md-tabs>


</div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      songName: 'Ordinary Life',
      songArtist: 'The Weeknd',
      video: '//www.youtube.com/embed/Q8TXgCzxEnw?rel=0',
      albumCover: '../assets/weeknd_album_cover.jpg'
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

.vid-container {
  margin-top: 24px;
}

iframe {
  height: 480px !important;
  margin-top: 24px;
}

.header-container {
  position: relative;
}

.banner-image {
  background-image: url(../assets/weeknd_album_cover.jpg);
  height: 200px;
  background-position: left;
  background-size: cover;
  opacity: .75;

}

.banner-info {
  position: absolute;
  bottom: 24px;
  left: 24px;
  color: white;
  text-align: left;
}

</style>
