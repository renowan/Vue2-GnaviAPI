<template>
  <div class="container">

    <div v-if="searchIsLoading">
      <h2>検索結果</h2>
      <Loading></Loading>
    </div>
    <div v-else>
      <div class="row mt20 mb20">
        <div class="col-xs-9">
          <h2>検索結果 <small>上位20件のみ表示 [ TODO: ページネーション ]</small></h2>
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
        <div class="col-xs-2">

          <div class="fc-event fc-event-primary ui-draggable ui-draggable-handle mn mb10" data-event="primary">
            <b>エリア</b> <br>
            {{areaname_s}}
          </div>

          <div class="fc-event fc-event-success ui-draggable ui-draggable-handle mn mb10" data-event="primary">
            <b>ジャンル</b> <br>
            {{category_s_name}}
          </div>

          <div class="fc-event fc-event-system ui-draggable ui-draggable-handle mn mb10" data-event="primary">
            <b>検索キーワード [TODO]</b> <br>
            {{keyword}}
          </div>

        </div>
        <div class="col-xs-10">

          <div v-for="item in localSearchResult">
            <RestLarge :rest="item" :idArr="idArr" v-on:bookmark="bookMark"></RestLarge>
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
  name: 'Search',
  components: {
    Loading,
    RestLarge
  },
  computed: {
    ...mapGetters([
      'searchIsLoading',
      'searchResult',
      'searchParam',
      'idArr'
    ]),
    localSearchResult: function () {
      if (this.searchResult) {
        return this.searchResult.slice(0, 20)
      } else {
        return []
      }
    },
    areaname_s: function () {
      const searchParam = this.searchParam
      if (searchParam.area) {
        return searchParam.area.areaname_s
      } else {
        return '-'
      }
    },
    category_s_name: function () {
      const searchParam = this.searchParam
      if (searchParam.category) {
        return searchParam.category.category_s_name
      } else {
        return '-'
      }
    },
    keyword: function () {
      const searchParam = this.searchParam
      return searchParam.keyword === '' ? '-' : searchParam.keyword
    }
  },
  methods: {
    bookMark: function (id) {
      this.$store.dispatch('bookMark', id)
    }
  },
  created () {
    window.scrollTo(0, 0)
    if (!this.searchResult) {
      this.$store.dispatch('searchRequest')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-heading {
    margin: 0 0 20px 0;
    padding: 20px 20px;
  }
</style>
