<template>
    <div id="login">
        <div  v-bind:class="{active: loading}">
            <div  class="loading">
                Chargement...
            </div>
        </div>

        <div v-bind:class="{active: !loading}" id="login-form">
            <form action="">
                <h1>Agri Gestion</h1>
                <h2>Connexion</h2>

                <div class="block">
                    <label>Pseudo</label>
                    <input type="text" name="pseudo" v-model="pseudo">
                </div>
                <div class="block">
                    <label>Mot de passe</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <button type="submit" v-on:click.stop.prevent="submit">Connexion</button>
            </form>
        </div>
    </div>
</template>

<script>
  import Utils from '~/mixins/Utils';

  export default {
    mixins: [Utils],
    data() {
      return {
        pseudo: null,
        password: null,
        loading: true,
      }
    },
    methods: {
      /**
       * method to submit login form
       * @returns {Q.Promise<unknown>}
       */
      submit() {
        return this.getApi().post('users/authenticate', {
          'username': this.pseudo,
          'password': this.password
        })
        .then((data) => {
          if (data.success === true) {
            this.setToken(data.token);

            this.$router.push('/');
            return;
          } else {
            this.getFlash().append(data.error_message, 'error');
            return;
          }
        })
        .catch(() => {
          this.getFlash().append('Une erreur est survenue. Merci de réessayer dans un instant', 'error');
          return;
        });
      },
    },
    mounted() {
      const testToken = this.testAndUpdateToken('login');
      if (!testToken) {
        this.loading = false;
      }
    },
    created() {
      this.testUpdateAppVersion();
    }
  }
</script>
