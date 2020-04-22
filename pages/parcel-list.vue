<template>
    <main class="ribs-container-fluid">
        <div class="row" v-for="parcel in parcels" :key="parcel.id">
            <div class="cxs-12">
                <div class="block">
                    <header>
                        <h5>Parcelle {{parcel.name}}</h5>
                    </header>
                    <div class="content">
                        <div class="row">
                            <ul class="cxs-12">
                                <li>Surface : {{parcel.surface}} hectares</li>
                                <li v-if="parcel.formattedLastDateWithCows">Pas eu de vache depuis le : {{parcel.formattedLastDateWithCows}}</li>
                                <li v-else>Vaches dans la parcelle : {{parcel.cowsNumber}}</li>
                            </ul>
                        </div>
                    </div>
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
        parcels: null
      }
    },
    mixins: [Utils],
    methods: {
    },
    created() {
      this.testAndUpdateToken();
      this.testUpdateAppVersion();

      if (process.client) {
        this.getApi().post('parcels/list', {
          infos: this.getJwtValues(),
          token: this.getToken()
        }).then(data => {
          this.updateTokenIfExist(data.token);
          this.parcels = data.parcels;
        });
      }
    }
  }
</script>
