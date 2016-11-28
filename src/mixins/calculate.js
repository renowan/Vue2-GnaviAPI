var calculateMixin = {
  say: function () {
    console.log('say hello.')
  },
  methods: {
    subtract: function () {
      this.count --
    },
    multiply: function () {
      this.count = this.count * 2
    }
  }
}

export default calculateMixin
