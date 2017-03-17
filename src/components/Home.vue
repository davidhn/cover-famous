<template>
<div> 

  <div id='video-container'>
    <iframe style="width:40vw;height: 100px" src="https://www.youtube.com/embed/WHRusqtzDQQ" allowfullscreen></iframe>
  </div>

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
      
      <div class='card' v-for="cover in topCovers" v-on:click='playSong(cover.youtube_video_id)'>
        <div class='card_rank'>{{ cover.rank }}</div>
        <div class='card_img' 
                :style="{ 'background-image' : 'url(' + cover.profile_photo + ')' }"></div>
        <div class='card-info'>
            <div class='card-artist'>{{ cover.name }}</div>
            <div class='card-yt-views'><md-icon class='card-view-icon'>visibility</md-icon> {{ cover.view_count_display }}</div>
        </div>
        <div class='card-votes'>
            <md-button class="md-icon-button">
            <md-icon>thumb_up</md-icon>
            </md-button>
            <div>293</div>  
        </div>
      </div>

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
      songName: 'Starboy',
      songArtist: 'The Weeknd',
      video: '//www.youtube.com/embed/Q8TXgCzxEnw?rel=0',
      albumCover: '../assets/weeknd_album_cover.jpg',
      topCovers: [],
    }
  },
  created() {
    this.$http.get('http://localhost:3000/cover_songs')
      .then(response => {
        let coverSongs = response.body.coverSongsList;
        let sortedList = coverSongs.sort( (a,b) => {
          return b.view_count - a.view_count
        })
        this.topCovers = sortedList;
      })
  },
  methods: {
    playSong: (songId) => {
      console.log(songId);
      let vidUrl = 'https://www.youtube.com/embed/' + songId;
      console.log(vidUrl)
      let vidContainer = document.getElementById('video-container');
      vidContainer.innerHTML = 
        '<iframe style="width:40vw;height: 100px" src="'+vidUrl+'" allowfullscreen></iframe>';
      

    }
  }
}


</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

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
  left: 18px;
  color: white;
  text-align: left;
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

.card {
  flex: 1;
  display: flex;
  height: 75px;
  background: white;
  margin-top: 8px;
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

#video-container {
  position: fixed;
  bottom: 8px;
  right: 8px;
  z-index: 9999;
}


</style>
