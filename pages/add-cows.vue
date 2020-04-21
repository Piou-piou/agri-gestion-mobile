<template>
    <main class="ribs-container-fluid">
        <div class="row">
            <div class="cxs-12">
                <div class="block">
                    <form action="" class="ribs-form content">
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Nombre de vaches</label>
                                <input type="number" name="cows_number" class="form-control" v-model="cows_number">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Date d'entrée dans la parcelle</label>
                                <datetime v-model="start_date" input-class="form-control"></datetime>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group cxs-12">
                                <label>Date de sortie dans la parcelle</label>
                                <datetime v-model="end_date" input-class="form-control"></datetime>
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
    created() {
      this.testAndUpdateToken();
      //this.testUpdateAppVersion();

      if (process.client) {
      }
    }
  }
</script>
