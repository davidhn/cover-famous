<template>
<div>

  <div class="field-group">
    <md-layout md-gutter='24'>
      <md-layout md-column-xsmall="33">
        <md-input-container>
          <label for="movie">Cover Type</label>
          <md-select name="cover-type" id="cover-type">
            <md-option value="fight_club">Pop</md-option>
            <md-option value="fight_club">Acoustic</md-option>
            <md-option value="pulp_fiction">Hip-Hop</md-option>
            <md-option value="godfather_ii">Rock</md-option>
            <md-option value="godfather_iii">Violin</md-option>
            <md-option value="godfellas">Beatbox</md-option>
            <md-option value="godfather">Soul</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
      <md-layout md-column-xsmall="33">
        <md-input-container>
          <label for="country">Sort By</label>
          <md-select name="sort-by" id="sort-by" >
            <md-option value="united_states">Cover Famous Likes</md-option>
            <md-option value="australia">Cover Artist Name</md-option>
            <md-option value="brazil">YouTube Views</md-option>
            <md-option value="japan">YouTube Likes</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
  </div>
  

</div>
</template>

<script>

export default {
  name: 'discover',
  data () {
    return {
      msg: 'Discover new cover songs and artists.',
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
