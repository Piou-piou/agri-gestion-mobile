<template>
    <main class="ribs-container-fluid">
        <div class="row">
            <div class="cxs-12">
                <div class="block">
                    <form action="" class="ribs-form content">
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Nombre de bottes</label>
                                <input type="number" pattern="[0-9]*" name="haystack_number" class="form-control" v-model="haystackNumber">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Parcelle</label>
                                <select v-model="parcel" class="form-control">
                                    <option v-for="parcel in parcels" :key="parcel.id" v-bind:value="parcel.id">{{parcel.name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Type de fauche</label>
                                <select v-model="type" class="form-control">
                                    <option v-for="(type, index) in types" :key="type" v-bind:value="index">{{type}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="cxs-12">
                                <button type="submit" class="ribs-button" v-on:click.stop.prevent="submit">Valider</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
  import Utils from '~/mixins/Utils';

  export default {
    components: {
    },
    mixins: [Utils],
    data() {
      return {
        parcel: null,
        parcels: null,
        types: null,
        type: null,
        haystackNumber: null,
      }
    },
    methods: {
      /**
       * @returns {Q.Promise<unknown>|boolean}
       */
      submit() {
        let error = false;
        if (!this.haystackNumber) {
          this.getFlash().append('Vous devez spécifiez le nombre de bottes', 'error');
          error = true;
        }
        if (!this.parcel) {
          this.getFlash().append('Vous devez spécifiez une parcelle', 'error');
          error = true;
        }
        if (!this.type) {
          this.getFlash().append('Vous devez spécifiez un type de botte', 'error');
          error = true;
        }

        if (error) {
          return false;
        }

        return this.getApi().post('haystacks/add', {
          infos: this.getJwtValues({
            'haystack_number': this.haystackNumber,
            'parcel_id': this.parcel,
            'type': this.type
          }),
          token: this.getToken()
        })
        .then((data) => {
          if (data.success === true) {
            this.setToken(data.token);
            this.getFlash().append(data.success_message, 'success');
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
      }
    },
    created() {
      this.testAndUpdateToken();

      if (process.client) {
        const now = new Date();

        this.getApi().post('parcels/list', {
          infos: this.getJwtValues({type: 'HAY'}),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          this.parcels = data.parcels;
        });

        this.getApi().post('haystacks/list-types', {
          infos: this.getJwtValues(),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          this.types = data.types;
          this.type = 'HAY';
        });
      }
    }
  }
</script>
