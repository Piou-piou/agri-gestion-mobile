<template>
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
              </ul>
            </div>
          </div>
          <footer>
            <button class="ribs-button">Sortir les vaches</button>
          </footer>
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
    data() {
      return {
        cowsInParcel: null
      }
    },
    mixins: [Utils],
    created() {
      this.testAndUpdateToken();
      //this.testUpdateAppVersion();

      if (process.client) {
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
