<template>
  <div>
    <main class="ribs-container-fluid">
      <div class="row" v-for="cowInParcel in cowsInParcel" :key="cowInParcel.id">
        <div class="cxs-12">
          <div class="block">
            <header>
              <h5>Parcelle {{cowInParcel.parcel.name}}</h5>
            </header>
            <div class="content">
              <div class="row">
                <ul class="cxs-12">
                  <li>Nombre de vaches : {{cowInParcel.cow_number}}</li>
                  <li>Entrées dans la parcelle le : {{cowInParcel.formattedStartDate}}</li>
                  <li>Type de vache : {{cowInParcel.formattedType}}</li>
                </ul>
              </div>
            </div>
            <footer>
              <button class="ribs-button" @click="exitCowsOfParcel(cowInParcel.id)">Sortir les vaches</button>
            </footer>
          </div>
        </div>
      </div>
    </main>
    <div id="app-version">V {{ actualVersion }}</div>
  </div>
</template>

<script>
  import Utils from '~/mixins/Utils';

  export default {
    components: {
    },
    data() {
      return {
        actualVersion: null,
        cowsInParcel: null
      }
    },
    mixins: [Utils],
    methods: {
      /**
       * @param id
       */
      exitCowsOfParcel(id) {
        this.getApi().post('cows/exit', {
          infos: this.getJwtValues({id: id}),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          if (data.success) {
            this.getFlash().append(data.success_message, 'success');
            this.cowsInParcel = data.cows_in_parcel;
          } else {
            this.getFlash().append(data.error_message, 'error');
          }
        });
      }
    },
    created() {
      this.testAndUpdateToken();
      this.testUpdateAppVersion();

      if (process.client) {
        this.actualVersion = this.getActualVersion();

        this.getApi().post('cows/list', {
          infos: this.getJwtValues(),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          this.cowsInParcel = data.cows_in_parcel;
        });
      }
    }
  }
</script>
