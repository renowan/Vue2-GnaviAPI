<template>
  <div class="panel user-group-widget">
      <div class="panel-heading">
          <span class="panel-title"> ジャンル</span>
      </div>
      <div class="panel-menu">
          <div class="input-group ">
          <span class="input-group-addon">
          <i class="fa fa-search"></i>
          </span>
          <input type="text" class="form-control" placeholder="焼肉・ラーメン" v-model="searchWord">
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
                  <tr v-for="item in myList">
                    <td class="pl15"><a href="javascript:void(0)"　v-on:click="select(item)">{{item.category_s_name}}</a></td>
                  </tr>
                </tbody>
              </table>
          </div>

      </div>

  </div>

</template>

<script>
export default {
  name: 'CategoryPanel',
  props: ['category_s'],
  computed: {
    myList () {
      const searchWord = this.searchWord
      const origin = this.category_s
      if (searchWord === '') {
        return origin
      } else {
        let _list = []
        origin.forEach((elm, index) => {
          if (elm.category_s_name.indexOf(searchWord) > -1) {
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
      let category_s_name = e.category_s_name
      let category_s_code = e.category_s_code
      this.$emit('selected', 'category', {category_s_code, category_s_name})
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
