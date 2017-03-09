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

      <div class='card' v-for="cover in topCovers">
        <div class='card_rank'>{{ cover.rank }}</div>
        <div class='card_img' 
             :style="{ 'background-image' : 'url(' + cover.image + ')' }"></div>
        <div class='card-info'>
          <div class='card-artist'>{{ cover.name }}</div>
          <div class='card-yt-views'><md-icon class='card-view-icon'>visibility</md-icon> {{ cover.viewsYT }}</div>
        </div>
        <div class='card-votes'>
          <md-icon>thumb_up</md-icon>
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
      songName: 'Ordinary Life',
      songArtist: 'The Weeknd',
      video: '//www.youtube.com/embed/Q8TXgCzxEnw?rel=0',
      albumCover: '../assets/weeknd_album_cover.jpg',
      topCovers: topCovers,
    }
  }
}

let topCovers = [
  {
    rank: 1,
    name: 'Conor Maynard',
    viewsYT: '2.5m',
    image: 'https://media.ents24network.com/image/000/131/298/4033cdf48b64df1b503070fa2d80a94198c65cf7.jpg'
  },
  {
    rank: 2,
    name: 'William Singe',
    viewsYT: '2.2m',
    image: 'http://marriedwiki.com/uploads/bio/william-singe.jpg'
  },
  {
    rank: 3,
    name: 'Boyce Avenue',
    viewsYT: '805k',
    image: 'https://www.cardiffstudents.com/asset/Event/7552/VoiceAvenue-7.jpg'
  },
  {
    rank: 4,
    name: 'Alex Aiono',
    viewsYT: '402k',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/d5/08/5c/d5085c3f4a0337bd31d71393c8d1d0f9.jpg'
  },
  {
    rank: 5,
    name: 'Kurt Hugo Schneider',
    viewsYT: '200k',
    image: 'http://www.kurthugoschneider.com/wp-content/uploads/2013/07/kurthugoschneider-1.jpg'
  },
  {
    rank: 6,
    name: 'Conor Maynard',
    viewsYT: '2.5m',
    image: 'https://media.ents24network.com/image/000/131/298/4033cdf48b64df1b503070fa2d80a94198c65cf7.jpg'
  },
  {
    rank: 7,
    name: 'William Singe',
    viewsYT: '2.2m',
    image: 'http://marriedwiki.com/uploads/bio/william-singe.jpg'
  },
  {
    rank: 8,
    name: 'Boyce Avenue',
    viewsYT: '805k',
    image: 'https://www.cardiffstudents.com/asset/Event/7552/VoiceAvenue-7.jpg'
  },
  {
    rank: 9,
    name: 'Alex Aiono',
    viewsYT: '402k',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/d5/08/5c/d5085c3f4a0337bd31d71393c8d1d0f9.jpg'
  },
  {
    rank: 10,
    name: 'Kurt Hugo Schneider',
    viewsYT: '200k',
    image: 'http://www.kurthugoschneider.com/wp-content/uploads/2013/07/kurthugoschneider-1.jpg'
  },
];

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
  flex: 0 0 40px;
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
  padding: 4px 8px 6px 8px;
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
  flex: 0 0 55px;
  margin-top: 15px;
}


</style>
