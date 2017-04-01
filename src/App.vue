<template>
<div id='app'>

  <!-- TOP TOOLBAR AND MENU -->
  <md-toolbar class="md-accent md-dense">

    <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title" style="flex: 1">
      Cover Famous
    </h2>
    
    <md-button @click.native="login()" v-show="!authenticated">Login</md-button>
    <md-menu 
        v-show="authenticated" 
        md-direction="bottom left" 
        md-offset-y="6" 
        md-align-trigger 
        class='user-menu md-icon-button'>
      <md-button md-menu-trigger>
        <md-avatar>
          <img :src="profile.picture">
        </md-avatar>
      </md-button>
      <md-menu-content>
        <md-menu-item disabled>Hi {{ profile.given_name }}!</md-menu-item>
        <md-menu-item @selected="logout($event)">Logout</md-menu-item>
      </md-menu-content>
    </md-menu>

  </md-toolbar>

  <!-- SIDENAV -->
  <md-sidenav class="md-left" ref="leftSidenav" :md-swipeable='true'>
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <h3 class="md-title">Cover Famous</h3>
      </div>
    </md-toolbar>
    <div class="phone-viewport">
      <md-list>
        <md-list-item>
          <md-icon>home</md-icon> 
          <span>
            <router-link class="nav-item is-brand" to="/">
              Home
            </router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>music_video</md-icon> 
          <span>
            <router-link class="nav-item is-tab" to="/song">
              Song
            </router-link>
          </span>
        </md-list-item>

        <md-list-item>
          <md-icon>record_voice_over</md-icon> 
          <span>
            <router-link class="nav-item is-tab" to="/discover">
              Cover Artists
            </router-link>
          </span>

        </md-list-item>

      </md-list>
    </div>

    
    
    
  </md-sidenav>

  <router-view></router-view>

</div>
</template>

<script>

function checkAuth() {
  return !!localStorage.getItem('id_token');
}

let options = {
  allowedConnections: ['facebook', 'google-oauth2'],
  theme: {
    logo: 'http://www.almostfamousburgers.com/images/logos/AlmostFamousLogo.png',
  }
}

export default {
  name: 'app',
  data () {
    return {
      authenticated: false,
      secretThing: '',
      lock: new Auth0Lock('zHwziMmqMH29YPOiy41i3jjZDKY3lAM7', 'davidhn.auth0.com', options),
      profile: {}
    }
  },
  mounted() {
    this.authenticated = checkAuth();
    this.profile = localStorage.profile ? JSON.parse(localStorage.profile) : {};
    console.log(this.profile);
    this.lock.on('authenticated', (authResult) => {
      console.log('authenticated');
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('accessToken', authResult.accessToken);
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          console.log('Error Getting Profile = ' + error);
          return;
        }
        // Set the token and user profile in local storage
        localStorage.setItem('profile', JSON.stringify(profile));
        this.profile = profile;
        this.authenticated = true;
        console.log(profile);
      });
    });

    this.lock.on('authorization_error', (error) => {
      // handle error when authorizaton fails
    });
  },
  methods: {
    login() {
      console.log('logged in');
      this.lock.show();
    },
    logout() {
      console.log('logged out');
      // To log out, we just need to remove the token and profile
      // from local storage
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      localStorage.removeItem('accessToken');
      this.authenticated = false;
    },
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    open(ref) {
      console.log('Opened: ' + ref);
    },
    close(ref) {
      console.log('Closed: ' + ref);
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.user-menu button {
  min-width: auto;
  padding: 0;
}

.user-menu .md-ink-ripple {
  border-radius: 50px;
}

.md-snackbar-container {
  background-color: #8BC34A
}

</style>
