<template>
  <iframe v-bind:src="this.src" id='show' width='100%' height="850px" frameborder=0 name='showHere' ></iframe>
</template>
<script>
  export default {
    created() {
      this.experimentsId = this.$route.params.experimentsId
      this.runId = this.$route.params.runId
      if (this.runId === undefined) {
        this.src = 'http://192.168.3.188:5000/#/experiments/' + this.experimentsId
      } else {
        this.src = 'http://192.168.3.188:5000/#/experiments/' + this.experimentsId + '/runs/' + this.runId
      }
    },
    data() {
      return {
        src: '',
        experimentsId: '',
        runId: ''
      }
    }
  }

</script>
