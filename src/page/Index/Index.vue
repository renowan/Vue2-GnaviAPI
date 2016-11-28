<template>
  <div class="container">
    <div class="row mt20">
      <div class="col-xs-12">
        <h1>検索条件</h1>
      </div>
      <div class="col-xs-12 col-md-6">
        <AreaPanel :garea_small="garea_small" v-on:selected="selected"></AreaPanel>
        <div v-bind:class="areaAlertClass"><strong>選択：{{display_areaname_s}}</strong></div>
      </div>
      <div class="col-xs-12 col-md-6">
        <CategoryPanel :category_s="category_s" v-on:selected="selected"></CategoryPanel>
        <div v-bind:class="categoryAlertClass"><strong>選択：{{display_category_s_name}}</strong></div>
      </div>
    </div>
    <div class="row mt30 mb40">
      <div class="col-xs-offset-3 col-xs-6">
        <button
                type="button"
                class="btn btn-default btn-primary btn-lg col-xs-12"
                v-bind:disabled="canSearch"
                v-on:click="goSearch"
        >検 索</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AreaPanel from './AreaPanel'
import CategoryPanel from './CategoryPanel'

const activeAlert = 'alert alert-info pastel alert-dismissable'
const negativeAlert = 'alert alert-default alert-dismissable'

export default {
  name: 'Index',
  data () {
    return {
      areacode_s: '',
      selectedArea: {},
      selectedCategory: {}
    }
  },
  computed: {
    ...mapGetters(['garea_small', 'category_s']),
    display_areaname_s: function () {
      // return this.areaname_s === '' ? '未選択' : this.areaname_s
      return this.selectedArea.areaname_s || '未選択'
    },
    display_category_s_name: function () {
      return this.selectedCategory.category_s_name || '未選択'
    },
    // 必要の検索条件を全部入れたか
    canSearch: function () {
      return !(this.selectedArea.areaname_s && this.selectedCategory.category_s_name)
    },
    areaAlertClass: function () {
      return this.selectedArea.areaname_s ? activeAlert : negativeAlert
    },
    categoryAlertClass: function () {
      return this.selectedCategory.category_s_name ? activeAlert : negativeAlert
    }
  },
  components: {
    AreaPanel,
    CategoryPanel
  },
  methods: {
    selected: function (type, e) {
      if (type === 'area') {
        this.selectedArea = e
      } else {
        this.selectedCategory = e
      }
    },
    goSearch: function () {
      this.$store.dispatch('setSearchParam', {
        area: this.selectedArea,
        category: this.selectedCategory
      })
      this.$store.dispatch('searchRequest')
      this.$router.replace('/search')
    }
  }
}
</script>
<!-- <router-link
        type="button"
        class="btn btn-default btn-primary btn-lg col-xs-12"
        v-bind:disabled="canSearch"
        to="/search"
>検 索</router-link> -->
