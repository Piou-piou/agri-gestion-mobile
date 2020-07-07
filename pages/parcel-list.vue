<template>
    <main class="ribs-container-fluid">
        <nuxt-link to="/add-parcel">
            <div class="ribs-button float-button"><i class="fas fa-plus fa-2x"></i></div>
        </nuxt-link>

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
                                <li>Type : {{parcel.formatted_type}}</li>

                                <li v-if="parcel.type == 'COWS' || parcel.type == 'BOTH'">
                                    <span v-if="parcel.formattedLastDateWithCows">Pas eu de vache depuis le : {{parcel.formattedLastDateWithCows}}</span>
                                    <span v-else-if="parcel.cowsNumber">Vaches dans la parcelle : {{parcel.cowsNumber}}</span>
                                    <span v-else>Jamais eu de vache dans la parcelle</span>
                                </li>

                                <li v-if="parcel.hay_trackings && parcel.type == 'HAY' || parcel.type == 'BOTH'">
                                    <div v-for="hay_tracking in parcel.hay_trackings">{{ hay_tracking }}</div>
                                </li>
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
