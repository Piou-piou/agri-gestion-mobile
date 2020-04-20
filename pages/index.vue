<template>
  <div class="container">
    log success
  </div>
</template>

<script>
  import Utils from '~/mixins/Utils';

  export default {
    components: {
    },
    mixins: [Utils],
    created() {
      this.testAndUpdateToken();
      //this.testUpdateAppVersion();

      if (process.client) {
        this.getApi().post('parcels/list').then(data => {
          console.log(data);
        })
      }
    }
  }
</script>
