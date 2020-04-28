<template>
    <main class="ribs-container-fluid">
        <div class="row">
            <div class="cxs-12">
                <div class="block">
                    <form action="" class="ribs-form content">
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Nombre de vaches</label>
                                <input type="number" pattern="[0-9]*" name="cows_number" class="form-control" v-model="cowsNumber">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Parcelle</label>
                                <select v-model="parcel" class="form-control">
                                    <option v-for="parcel in parcels" :key="parcel.id" v-bind:value="parcel.id">{{parcel.name}}
                                        <span v-if="parcel.formattedLastDateWithCows">(pas vch. dep. : {{parcel.formattedLastDateWithCows}})</span>
                                        <span v-else-if="parcel.cowsNumber">(parc. act.)</span>
                                        <span v-else>(jamais eu vch.)</span>
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Type de vaches</label>
                                <select v-model="type" class="form-control">
                                    <option v-for="(type, index) in types" :key="type" v-bind:value="index">{{type}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Date d'entrée dans la parcelle</label>
                                <datetime v-model="startDate" format="dd/MM/yyyy" input-class="form-control" class="theme-blue" :phrases="{ok: 'Valider', cancel: 'Annuler'}"></datetime>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Date de sortie dans la parcelle</label>
                                <datetime v-model="endDate" input-class="form-control" class="theme-blue" :phrases="{ok: 'Valider', cancel: 'Annuler'}"></datetime>
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
        cowsNumber: null,
        startDate: null,
        endDate: null,
      }
    },
    methods: {
      /**
       * @returns {Q.Promise<unknown>|boolean}
       */
      submit() {
        let error = false;
        if (!this.cowsNumber) {
          this.getFlash().append('Vous devez spécifiez un date de début', 'error');
          error = true;
        }
        if (!this.startDate) {
          this.getFlash().append('Vous devez spécifiez le nombre de vaches', 'error');
          error = true;
        }
        if (!this.parcel) {
          this.getFlash().append('Vous devez spécifiez une parcelle', 'error');
          error = true;
        }
        if (!this.type) {
          this.getFlash().append('Vous devez spécifiez un type de vaches', 'error');
          error = true;
        }

        if (error) {
          return false;
        }

        return this.getApi().post('cows/add', {
          infos: this.getJwtValues({
            'cows_number': this.cowsNumber,
            'start_date': this.startDate,
            'end_date': this.endDate,
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
        this.startDate = now.toISOString();

        this.getApi().post('parcels/list', {
          infos: this.getJwtValues(),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          this.parcels = data.parcels;
        });

        this.getApi().post('cows/list-types', {
          infos: this.getJwtValues(),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          this.types = data.types;
          this.type = 'MILKING';
        });
      }
    }
  }
</script>
