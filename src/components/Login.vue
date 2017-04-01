<template>

  <div id="login">
    <button @click="login()" v-show="!authenticated">Login</button>
    <button @click="logout()" v-show="authenticated">Logout</button>  
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
  name: 'login',
  data () {
    return {
      authenticated: false,
      secretThing: '',
      lock: new Auth0Lock('zHwziMmqMH29YPOiy41i3jjZDKY3lAM7', 'davidhn.auth0.com', options)
    }
  },
  mounted() {
    this.authenticated = checkAuth();
    
    this.lock.on('authenticated', (authResult) => {
      console.log('authenticated');
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          console.log('error = ' + error);
          return;
        }
        // Set the token and user profile in local storage
        localStorage.setItem('profile', JSON.stringify(profile));
        this.authenticated = true;
      });
    });

    this.lock.on('authorization_error', (error) => {
      // handle error when authorizaton fails
    });
  },
  methods: {
    login() {
      this.lock.show();
      
    },
    logout() {
      // To log out, we just need to remove the token and profile
      // from local storage
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      this.authenticated = false;
    },
  }

}

</script>