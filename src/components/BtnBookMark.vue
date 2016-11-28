<template>
  <button type="button" v-bind:class="className" v-on:click="bookMark"><i class="fa fa-star"></i></button>
</template>

<script>
export default {
  name: 'BtnBookMark',
  props: ['id', 'idArr'],
  computed: {
    className: function () {
      const myId = this.id
      let className = 'btn btn-default btn-book-mark'
      this.idArr.forEach((elm) => {
        if (elm === myId) {
          className = 'btn btn-warning btn-book-mark'
        }
      })
      return className
    }
  },
  methods: {
    bookMark: function () {
      this.$emit('bookmark', this.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-book-mark{
  width: 50px;
}
.btn-book-mark .fa{
  font-size: 18px;
}
</style>
