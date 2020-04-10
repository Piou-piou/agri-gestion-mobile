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
    }
  }
</script>
