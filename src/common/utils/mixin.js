var myMixin = {
  created: function () {
    // console.log('created by mixins...', this.r)
  },
  methods: {
    hello: function () {
      return 'heelloo from mixin'
    },
    getTxt: function (target, long) {
      let txt = typeof target === 'string' ? target : ''
      if (long) txt = txt.slice(0, long) + ' ...'
      return txt
    }
  }
}

export default myMixin
