import axios from 'axios'
import * as constants from '../../common/utils/constants'
import restObjFormater from '../../common/utils/restObjFormater'

// axiosの設定
const axiosInstance = axios.create({
  timeout: constants.DEFAULT_AJAX_TIMEOUT_MS,
  headers: {'Content-Type': 'application/json;charset=utf-8'}
})

const DOMAIN = constants.DOMAIN
let params = constants.params

// initial state
const state = {

  appIsLoading: true,
  garea_small: undefined,
  category_s: undefined,
  searchIsLoading: false,

  // 検索結果
  searchResult: undefined,

  // 検索条件
  searchParam: {
    area: undefined,
    category: undefined,
    keyword: ''
  },

  // 詳細ページ
  detailIsLoading: false,
  detailResult: undefined
}

// getters
const getters = {
  garea_small: state => state.garea_small,
  category_s: state => state.category_s,
  appIsLoading: state => state.appIsLoading,
  searchIsLoading: state => state.searchIsLoading,
  searchParam: state => state.searchParam,
  searchResult: state => state.searchResult,
  detailIsLoading: state => state.detailIsLoading,
  detailResult: state => state.detailResult
}

// app 基本必要な情報をロード
const APP_LOAD_REQUEST = 'APP_LOAD_REQUEST'
const APP_LOAD_RECEIVE = 'APP_LOAD_RECEIVE'
// const APP_LOAD_ERROR = 'APP_LOAD_ERROR'

const APP_SET_SEARCH_PARAM = 'APP_SET_SEARCH_PARAM'

const APP_SEARCH_REQUEST = 'APP_SEARCH_REQUEST'
const APP_SEARCH_RECEIVE = 'APP_SEARCH_RECEIVE'
// const APP_SEARCH_ERROR = 'APP_SEARCH_ERROR'

const DETAIL_UPDATE = 'DETAIL_UPDATE'
const DETAIL_LOAD_REQUEST = 'DETAIL_LOAD_REQUEST'
const DETAIL_LOAD_RECEIVE = 'DETAIL_LOAD_RECEIVE'
const DETAIL_LOAD_ERROR = 'DETAIL_LOAD_ERROR'

// actions
const actions = {
  // ===================================
  // App 必要の情報をロード
  // ===================================
  appLoad ({commit, state}) {
    // エリアSマスタAPI
    function getGAreaSmallSearchAPI () {
      const apiUrl = `${DOMAIN}/master/GAreaSmallSearchAPI/20150630`
      return axiosInstance.get(apiUrl, {params: params})
    }
    // 小業態マスタ取得API
    function getCategorySmallSearchAPI () {
      const apiUrl = `${DOMAIN}/master/CategorySmallSearchAPI/20150630`
      return axiosInstance.get(apiUrl, {params: params})
    }

    commit(APP_LOAD_REQUEST)

    axios.all([
      getGAreaSmallSearchAPI(),
      getCategorySmallSearchAPI()
    ])
    .then(axios.spread(function (
      GAreaSmallSearchAPI,
      CategorySmallSearchAPI
    ) {
      // ロード完了
      commit(APP_LOAD_RECEIVE, {
        garea_small: GAreaSmallSearchAPI.data.garea_small,
        category_s: CategorySmallSearchAPI.data.category_s
      })
    })).catch((e) => {
      console.log('error', e)
    })
  },

  // ===================================
  // 検索開始
  // ===================================
  searchRequest ({commit, state}) {
    commit(APP_SEARCH_REQUEST)

    let apiUrl = `${DOMAIN}/RestSearchAPI/20150630`
    // apiUrl = '/json/search_result.json'
    // let _params = {}

    // エリアSコード
    const areacode_s = state.searchParam.area.areacode_s
    // 小業態コード
    const category_s_code = state.searchParam.area.category_s_code
    let _params = Object.assign({}, params, {
      hit_per_page: 20,
      areacode_s,
      category_s_code
    })

    let _r
    axiosInstance.get(apiUrl, {params: _params}).then((response) => {
      let rest
      const total_hit_count = response.total_hit_count
      if (total_hit_count === '1') {
        rest = response.rest
        _r = [restObjFormater(response.data.rest)]
      } else if (total_hit_count === '0') {
        _r = []
      } else {
        rest = response.data.rest
        _r = rest.map((elm) => {
          // restデータをフォーマットする、 {} を '' に変換
          return restObjFormater(elm)
        })
      }

      commit(APP_SEARCH_RECEIVE, _r)
    }).catch((err) => {
      console.log(err)
    })
  },

  // ===================================
  // 検索条件をセット
  // ===================================
  setSearchParam ({commit, state}, obj) {
    commit(APP_SET_SEARCH_PARAM, obj)
  },

  // ===================================
  // 店舗詳細を更新
  // ===================================
  updateDetail ({commit, state}, rest) {
    commit(DETAIL_UPDATE, rest)
  },

  loadDetail ({commit, state}, id) {
    commit(DETAIL_LOAD_REQUEST)
    let _params = Object.assign({}, params, {
      id
    })
    let _r = {}
    let apiUrl = `${DOMAIN}/RestSearchAPI/20150630`
    axiosInstance.get(apiUrl, {params: _params}).then((response) => {
      if (response.data.hasOwnProperty('error')) {
        commit(DETAIL_LOAD_ERROR, _r)
      } else {
        commit(DETAIL_LOAD_RECEIVE, response.data.rest)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

}

// mutations
const mutations = {
  // app, search 共通
  [APP_LOAD_REQUEST] (state) {
    state.appIsLoading = true
  },
  [APP_LOAD_RECEIVE] (state, obj) {
    state.appIsLoading = false
    state.category_s = obj.category_s
    state.garea_small = obj.garea_small
  },
  [APP_SET_SEARCH_PARAM] (state, obj) {
    state.searchIsLoading = true
    state.searchParam.area = obj.area
    state.searchParam.category = obj.category
  },
  [APP_SEARCH_REQUEST] (state, obj) {
    state.searchIsLoading = true
  },
  [APP_SEARCH_RECEIVE] (state, rest) {
    state.searchIsLoading = false
    state.searchResult = rest
  },
  // Detail
  [DETAIL_UPDATE] (state, rest) {
    // state.detailIsLoading = false
    state.detailResult = rest
  },
  [DETAIL_LOAD_REQUEST] () {
    state.detailIsLoading = true
  },
  [DETAIL_LOAD_RECEIVE] (state, rest) {
    state.detailIsLoading = false
    state.detailResult = rest
  },
  [DETAIL_LOAD_ERROR] (state, rest) {
    state.detailIsLoading = false
    state.detailResult = rest
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
