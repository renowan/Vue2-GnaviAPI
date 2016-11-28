<template>
    <nav class="navbar bg-light docs-navbar">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <span class="sr-only">Vue.jsでぐるなびAPI</span>
              <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/"><b>Vue2 + Gnavi API</b></router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse">

          <!-- navbar right -->
          <div class="navbar-right">
            <ul class="nav navbar-nav">
              <li v-bind:class="pageName('home')">
                <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
              </li>
              <!-- <li v-bind:class="pageName('search')">
                <router-link to="/search" class="ph25"><i class="fa fa-list-alt"></i> 検索結果</router-link>
              </li> -->
              <li v-bind:class="pageName('bookmark')">
                <router-link to="/bookmark">
                  <i class="fa fa-star"></i> お気に入り
                  <span v-bind:class="badgeColor">{{idArr.length}}</span>
                </router-link>
              </li>
              <li class="hidden"><a href="views/templates.html">Templates</a>
              </li>
              <li class="mtn">

              </li>
            </ul>
            <a href="http://www.gnavi.co.jp/" target="_blank" class="btn navbar-btn">
              <img src="http://apicache.gnavi.co.jp/image/rest/b/api_265_65.gif" width="137" alt="">
            </a>
            <!-- <a type="button" target="_blank" href="http://support.admindesigns.com" class="btn btn-info dark btn-gradient navbar-btn btn-sm br2">Support</a> -->
          </div>

        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Gnavbar',
  computed: {
    ...mapGetters({
      idArr: 'idArr'
    }),
    badgeColor: function () {
      const color = this.idArr.length > 0 ? 'danger' : 'default'
      return `badge badge-hero badge-${color}`
    }
  },
  methods: {
    pageName: function (page) {
      return this.$route.name === page ? 'active' : ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* docs-navbar */
.navbar {
  position: fixed;
}
.navbar-brand{
  display: none;
}
.docs-navbar {
  width: 100%;
  border-bottom: 1px solid #DDD !important;
}
.docs-navbar .navbar-brand {
  color: #666 !important;
  font-size: 12px;
  height: 60px;
  line-height: 57px;
  padding: 0 35px 0 25px;
}
.docs-navbar .navbar-brand b {
  font-size: 18px;
  letter-spacing: 1px;
}
.docs-navbar .nav > li > a {
  color: #AAA !important;
  position: relative;
}
.docs-navbar .nav > li:first-child > a {
  border-left: 1px solid #EEE;
}
.docs-navbar .nav > li > a {
  border-right: 1px solid #EEE;
}
.docs-navbar .nav > li.open > a,
.docs-navbar .nav > li.active > a,
.docs-navbar .nav > li:hover > a,
.docs-navbar .nav > li:focus > a,
.docs-navbar .nav > li > a:hover,
.docs-navbar .nav > li > a:focus {
  background: #FFF !important;
  color: #444 !important;
}

.docs-navbar .nav > li.open > a,
.docs-navbar .nav > li.active > a {
  font-weight: 600;
}
.docs-navbar .nav > li.active > a:before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #3bafda;
}
.docs-navbar .navbar-btn {
  margin-left: 20px;
  margin-top: 12px;
  margin-bottom: 15px;
}
.badge.badge-hero{
  top: -2px;
  margin-left: 0;
}

/*navbar-brand*/
@media only screen and (min-width: 768px){
  .navbar-brand{
    display: block;
  }

}
</style>
