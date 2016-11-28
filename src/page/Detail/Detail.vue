<template>
  <div class="container">
    <!-- fetch中 -->
    <div v-if="detailIsLoading">
      <h2>検索結果</h2>
      <Loading></Loading>
    </div>
    <!-- fetch終わり -->
    <div v-else>
      <div class="row mt20">
        <div class="col-xs-12">
          <h2>検索結果</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button type="button" class="btn btn-default btn-sm" @click="goBack">
            <i class="fa fa-angle-double-left"></i> 戻る
          </button>
          <button type="button" v-bind:class="bookMarkClass" v-on:click="bookMark">
            <i class="fa fa-star"></i> ブックマーク
          </button>
          <a v-bind:href="detailResult.url" target="_blank" class="btn btn-info btn-sm">
            <i class="fa fa-info"></i> ぐるなび店舗詳細
          </a>
        </div>
      </div>
      <div class="row mt20">

        <div class="col-xs-12">

          <div class="media clearfix">
            <div class="media-left pr30">
              <h2 class="media-heading">{{detailResult.name}}
                <small> - {{detailResult.category}}</small>
              </h2>
              <p class="lead" v-html="detailResult.pr.pr_long"></p>
              <p class="lead" v-html="detailResult.pr.pr_short"></p>

            </div>
            <div class="media-body va-t">
              <div class="media-img-container" v-bind:style="{backgroundImage:shopImage}"></div>
            </div>

            <hr>

            <table class="spec">
              <tbody>
                <tr>
                  <td class="tr-info">住所</td>
                  <td v-html="detailResult.address"></td>
                </tr>
                <tr>
                  <td class="tr-info">営業時間</td>
                  <td v-html="detailResult.opentime"></td>
                </tr>
                <tr>
                  <td class="tr-info">平均予算</td>
                  <td>{{detailResult.budget}}</td>
                </tr>
                <tr>
                  <td class="tr-info">クレジットカード</td>
                  <td>{{detailResult.credit_card}}</td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from 'components/Loading'
import restObjFormater from '../../common/utils/restObjFormater'

export default {
  name: 'Detail',
  data () {
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters([
      'detailIsLoading',
      'detailResult',
      'searchResult',
      'bookMarkResult',
      'idArr'
    ]),
    loaclDetailResult: function () {
      return {id: 999}
    },
    shopImage: function () {
      const shop_image1 = this.detailResult.image_url.shop_image1
      let imagePath = shop_image1 === ''
        ? 'http://r.gnst.jp/search/img/noimg.png'
        : shop_image1
      imagePath = `url(${imagePath})`
      return imagePath
    },
    bookMarkClass: function () {
      const myId = this.detailResult.id
      let className = 'btn btn-default btn-sm'
      this.idArr.forEach((elm) => {
        if (elm === myId) {
          className = 'btn btn-warning btn-sm'
        }
      })
      return className
    }
  },
  created () {
    window.scrollTo(0, 0)
    const id = this.$route.params.id
    const searchResult = this.searchResult
    const bookMarkResult = this.bookMarkResult
    let isFinded = false
    if (searchResult) {
      console.log('detailResult を検索')
      searchResult.forEach((elm) => {
        if (elm.id === id) {
          console.log('searchResultで見つけた')
          this.$store.dispatch('updateDetail', elm)
          isFinded = true
          return
        }
      })
    }
    if (!isFinded && bookMarkResult) {
      console.log('bookMarkResult を検索')
      bookMarkResult.forEach((elm) => {
        if (elm.id === id) {
          console.log('bookMarkResultで見つけた')
          this.$store.dispatch('updateDetail', elm)
          isFinded = true
          return
        }
      })
    }
    if (!isFinded) {
      console.log('データキャッシュがないのでfetch')
      this.$store.dispatch('loadDetail', id)
    }
  },
  methods: {
    bookMark: function () {
      this.$store.dispatch('bookMark', this.detailResult.id)
    },
    goBack: function () {
      window.history.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.no-date{
  text-align: center;
  margin-top: 140px;
  font-size: 30px;
  font-weight: lighter;
  color: #b7b7b7;
}
.rest-image{
  /*width: 100%;*/
  max-width: 240px;
}
.lead{
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 0;
}
.media-img-container{
  width: 165px;
  height: 165px;
  background-color: #ccc;
  background-repeat: no-repeat;
  background-position: center;
}
.spec{
  width: 100%;
  margin: 10px 0 0;
  line-height: 1.7;
  font-weight: 500;
}
.spec td{
  vertical-align: top;
}
.spec .tr-info{
  width: 130px;
  font-weight: bold;
}
</style>
