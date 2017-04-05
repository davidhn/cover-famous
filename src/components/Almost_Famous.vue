<template>
<div>

  <div class="field-group">
    <md-layout md-gutter='24'>
      <md-layout>
        <md-input-container>
          <label for="movie">Filter By</label>
          <md-select name="cover-type" id="filter-by" v-model="filterBy" @change='filterCovers($event)'>
            <md-option value="All">All</md-option>
            <md-option value="Collab">Collab</md-option>
            <md-option value="Mashup">Mashup</md-option>
            <md-option value="Pop">Pop</md-option>
            <md-option value="Acoustic">Acoustic</md-option>
            <md-option value="Rnb">RnB</md-option>
            <md-option value="Violin">Violin</md-option>
            <md-option value="Piano">Piano</md-option>
            <md-option value="Beatbox">Beatbox</md-option>
            <md-option value="Rock">Rock</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label for="country">Sort By</label>
          <md-select name="sort-by" id="sort-by" v-model='sortBy' @change='sortCovers($event)'>
            <md-option value="trending">Trending</md-option>
            <md-option value="upvotes">Upvotes</md-option>
            <md-option value="name">Name</md-option>
            <md-option value="youtube_views">YouTube Views</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
  </div>

  <div class='card' v-for="(cover, index) in coverSongs" v-on:click='playSong(cover.youtube_video_id, $event)'>
    <div class='card_img' 
            :style="{ 'background-image' : 'url(' + cover.profile_photo + ')' }"></div>
    <div class='card-info'>
        <div class='card-artist'>
          {{ cover.name }}
        </div>
        <div class='card-song-tags'> {{ cover.tags }}</div>
        <div class='card-yt-views'><md-icon class='card-view-icon'>visibility</md-icon> {{ cover.view_count_display }}</div>
    </div>
    <div class='card-votes' v-on:click="openDialog('dialog1')" id='custom'>
      <md-button class="md-icon-button">
        <md-icon>thumb_up</md-icon>
      </md-button>
      <div class='voteCount'>{{ cover.vote_count }}</div>  
    </div>
  </div>
  

</div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'almost_famous',
  data () {
    return {
      filterBy: 'All',
      sortBy: 'trending',
      unmutatedCoverSongs: [],
      coverSongs: [],
      voteCount: 999,
    }
  },
  created() {
    axios.get('http://localhost:3000/cover_songs')
      .then(response => {
        this.coverSongs = response.data.coverSongsList
          .sort(function() { return 0.5 - Math.random() })
        this.unmutatedCoverSongs = response.data.coverSongsList;
      })
  },
  methods: {
    filterCovers: function(filter) {
      this.coverSongs = this.unmutatedCoverSongs;
      if (filter !== 'All') {
        this.coverSongs = this.coverSongs.filter(function(cover) {
          return cover.tags_array.indexOf(filter) !== -1
        })
      } 
      this.$nextTick(function () {
        // something can happen once the dom updates
      })
    },
    sortCovers: function(sortCriteria) {
      console.log(this.coverSongs);
      if (sortCriteria === 'upvotes') {
        this.coverSongs.sort(function(a, b) {
          if(a.vote_count > b.vote_count) return -1;
          if(a.vote_count < b.vote_count) return 1;
          return 0;
        })
      } else if (sortCriteria === 'name') {
        this.coverSongs.sort(function(a, b) {
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        })
      } else if (sortCriteria === 'youtube_views') {
        console.log(sortCriteria)
        this.coverSongs.sort(function(a,b) {
          if(a.view_count > b.view_count) return -1;
          if(a.view_count < b.view_count) return 1;
          return 0;
        })
      }
      // this.$nextTick(function() {})
    },
  }
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
  font-size: 1.1em
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

#almost-famous {
  padding: 0;
}


</style>
