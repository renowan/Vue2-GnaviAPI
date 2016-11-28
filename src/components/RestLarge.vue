<template>
<div class="page-heading">
  <div class="media clearfix">
      <div class="media-left pr20">

        <div class="media-img-container" v-bind:style="{backgroundImage:shopImage}"></div>

      </div>
      <div class="media-body va-m">
        <h2 class="media-heading">{{rest.name}}<small> - {{rest.category}}</small></h2>
        <p class="lead">{{prTxt}}</p>

        <table class="spec">
          <tbody>
            <tr>
              <td class="tr-info">住所</td>
              <td>{{rest.address}}</td>
            </tr>
            <tr>
              <td class="tr-info">営業時間</td>
              <td v-html="ellipsis(rest.opentime, 100)"></td>
            </tr>
            <tr>
              <td class="tr-info">平均予算</td>
              <td>通常: 6,000円</td>
            </tr>
          </tbody>
        </table>

        <div class="">
          <router-link type="button" class="btn btn-default btn-primary" style="width: 120px;" :to="{name:'detail', params:{id:rest.id}}">詳細へ</router-link>
          <BtnBookMark v-on:bookmark="bookMark" :id="rest.id" :idArr="idArr"></BtnBookMark>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import BtnBookMark from 'components/BtnBookMark'
export default {
  name: 'RestLarge',
  props: ['rest', 'idArr'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    BtnBookMark
  },
  computed: {
    shopImage: function () {
      const shop_image1 = this.rest.image_url.shop_image1
      let imagePath = shop_image1 === ''
        ? 'http://r.gnst.jp/search/img/noimg.png'
        : shop_image1
      imagePath = `url(${imagePath})`
      return imagePath
    },
    prTxt: function () {
      const pr_long = this.rest.pr.pr_long
      const pr_short = this.rest.pr.pr_short
      const _pr_long = typeof pr_long === 'string' ? pr_long : ''
      const _pr_short = typeof pr_short === 'string' ? pr_short : ''

      let txt = `${_pr_short}${_pr_long}`
      txt = txt.replace(/<BR>/g, '')

      if (txt.length > 120) {
        txt = txt.slice(0, 120) + ' ...'
      }
      return txt
    }
  },
  created () {
  },
  methods: {
    ellipsis: function (txt, long) {
      if (txt.length > long) {
        return txt.slice(0, long) + ' ...'
      }
      return txt
    },
    bookMark: function () {
      this.$emit('bookmark', this.rest.id)
    }
  }
}
</script>

<style scoped>
h2{
  font-size: 22px;
}
.lead{
  font-size: 12px;
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
  margin: 10px 0 20px;
  line-height: 1.6;
  font-weight: 500;
}
.spec td{
  vertical-align: top;
}
.spec .tr-info{
  width: 70px;
  font-weight: bold;
}
</style>
