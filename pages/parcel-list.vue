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
                                <li>Pas eu de vache depuis le : {{parcel.formattedLastDateWithCows}} hectares</li>
                            </ul>
                        </div>
                    </div>
                    <footer>
                        <button class="ribs-button" >Modifier</button>
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
