<template>
  <div class="container">
    <div v-if="bookIsLoading">
      <h2>お気に入り</h2>
      <Loading></Loading>
    </div>
    <div v-else>
      <div class="row mt20 mb20">
        <div class="col-xs-9">
          <h2>お気に入り <small>10件まで [ TODO: 30件までに ]</small></h2>
        </div>
        <div class="col-xs-3 text-right mt15 mb20">
          <div class="btn-group">
            <button type="button" class="btn btn-info btn-sm disabled">
              <i class="fa fa-th-large"></i>
            </button>
            <button type="button" class="btn btn-info dark btn-sm">
              <i class="fa fa-align-justify"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">

          <div v-if="!hasResult">
            <div class="no-result">
              お気に入りなし
            </div>
          </div>
          <div v-else>
            <div v-for="item in localSearchResult">
              <RestLarge :rest="item" :idArr="idArr" v-on:bookmark="bookMark"></RestLarge>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from 'components/Loading'
import RestLarge from 'components/RestLarge'
export default {
  name: 'BookMark',
  components: {
    Loading,
    RestLarge
  },
  computed: {
    ...mapGetters([
      'bookIsLoading',
      'bookMarkResult',
      'idArr'
    ]),
    localSearchResult: function () {
      if (this.bookMarkResult) {
        return this.bookMarkResult
      } else {
        return []
      }
    },
    hasResult: function () {
      return this.idArr && this.idArr.length > 0
    }
  },
  methods: {
    bookMark: function (id) {
      // お気に入りページで★を押すと、消す処理のみ行う
      this.$store.dispatch('delBookMark', id)
    }
  },
  created () {
    window.scrollTo(0, 0)
    this.$store.dispatch('loadBookMark')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.no-result {
  text-align: center;
  margin-top: 140px;
  font-size: 30px;
  font-weight: lighter;
  color: #b7b7b7;
}
.page-heading {
  margin: 0 0 25px;
}
</style>
