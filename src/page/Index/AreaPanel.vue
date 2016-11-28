<template>
  <div class="panel user-group-widget">
      <div class="panel-heading">
          <span class="panel-title"> エリア</span>
      </div>
      <div class="panel-menu">
          <div class="input-group ">
          <span class="input-group-addon">
          <i class="fa fa-search"></i>
          </span>
          <input type="text" class="form-control" placeholder="駅、エリア・キーワード" v-model="searchWord">
          </div>
      </div>
      <div class="panel-body panel-scroller scroller-sm scroller-pn pn scroller scroller-active">
          <div class="scroller-content-custom">
              <table class="table mbn tc-med-1">
                <thead>
                  <tr class="hidden">
                    <th>#</th>
                    <th>First Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in areaList">
                    <td class="pl15"><a href="javascript:void(0)"　v-on:click="select(item)">{{item.areaname_s}}</a></td>
                  </tr>
                </tbody>
              </table>
          </div>

      </div>

  </div>

</template>

<script>
export default {
  name: 'AreaPanel',
  props: ['garea_small'],
  computed: {
    areaList () {
      const searchWord = this.searchWord
      const gareaSmall = this.garea_small
      if (searchWord === '') {
        return gareaSmall
      } else {
        let _list = []
        gareaSmall.forEach((elm, index) => {
          if (elm.areaname_s.indexOf(searchWord) > -1) {
            _list.push(elm)
          }
        })
        return _list
      }
    }
  },
  data () {
    return {
      searchWord: ''
    }
  },
  methods: {
    select: function (e) {
      let areaname_s = e.areaname_s
      let areacode_s = e.areacode_s
      this.$emit('selected', 'area', {areacode_s, areaname_s})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.scroller-content-custom {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
