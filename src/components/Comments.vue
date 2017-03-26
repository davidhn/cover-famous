<template>
  
  <div id='comments-container'></div>
  
</template>

<script>
export default {
  name: 'comments',
  data () {
    return {
      msg: 'Comment on the cover song here',
    }
  },
  mounted() {
    $('#comments-container').comments({
      profilePictureURL: 'https://i.ytimg.com/vi/opKg3fyqWt4/hqdefault.jpg',
      forceResponsive: true,
      getComments: function(success, error) {
        var commentsArray = [{
          id: 1,
          created: '2015-10-01',
          content: 'Lorem ipsum dolort sit amet',
          fullname: 'Simon Powell',
          upvote_count: 2,
          user_has_upvoted: false
        }];
        success(commentsArray);
      }
    });
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
