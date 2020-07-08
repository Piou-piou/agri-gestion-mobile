<template>
    <main class="ribs-container-fluid">
        <div class="row">
            <div class="cxs-12">
                <div class="block">
                    <form action="" class="ribs-form content">
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Désignation</label>
                                <input type="text" name="name" class="form-control" v-model="name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Surface (en hectares)</label>
                                <input type="number" pattern="[0-9]*" name="surface" class="form-control" v-model="surface">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Type de parcelle</label>
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
        id: null,
        name: null,
        surface: null,
        types: null,
        type: null,
      }
    },
    methods: {
      /**
       * @returns {Q.Promise<unknown>|boolean}
       */
      submit() {
        let error = false;
        if (!this.name) {
          this.getFlash().append('Vous devez spécifiez le nom de la parcelle', 'error');
          error = true;
        }
        if (!this.surface) {
          this.getFlash().append('Vous devez spécifiez la surface de la parcelle', 'error');
          error = true;
        }
        if (!this.type) {
          this.getFlash().append('Vous devez spécifiez un type de parcelle', 'error');
          error = true;
        }

        if (error) {
          return false;
        }

        return this.getApi().post('parcels/edit', {
          infos: this.getJwtValues({
            'id': this.id,
            'name': this.name,
            'surface': this.surface,
            'type': this.type
          }),
          token: this.getToken()
        })
        .then((data) => {
          if (data.success === true) {
            this.setToken(data.token);
            this.getFlash().append(data.success_message, 'success');
            this.$router.push('/parcel-list');
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
        this.getApi().post('parcels/list-types', {
          infos: this.getJwtValues(),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          this.types = data.types;
        });

        if (localStorage.getItem('parcel_id')) {
          this.getApi().post('parcels/show', {
            infos: this.getJwtValues({id: localStorage.getItem('parcel_id')}),
            token: this.getToken()
          }).then(data => {
            this.updateTokenIfExist(data.token);
            if (data.success) {
              this.parcel = data.parcel;
              this.id = this.parcel.id;
              this.name = this.parcel.name;
              this.surface = this.parcel.surface;
              this.type = this.parcel.type;
            }
          });
        }
      }
    }
  }
</script>
