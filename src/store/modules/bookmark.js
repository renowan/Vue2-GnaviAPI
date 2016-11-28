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
  // ページのローディング
  bookIsLoading: false,

  // 店詳細
  bookMarkResult: [],

  idArr: [
    // 'c770908', 'g233718'
  ]
}

// getters
const getters = {
  bookIsLoading: state => state.bookIsLoading,
  bookMarkResult: state => state.bookMarkResult,
  idArr: state => state.idArr
}

// const BOOKMARK_ADD_ID = 'BOOKMARK_ADD_ID'
const BOOKMARK_DEL = 'BOOKMARK_DEL'
const BOOKMARK_UPDATE = 'BOOKMARK_UPDATE'

const BOOKMARK_LOAD_REQUEST = 'BOOKMARK_LOAD_REQUEST'
const BOOKMARK_LOAD_RECEIVE = 'BOOKMARK_LOAD_RECEIVE'
const BOOKMARK_LOAD_ERROR = 'BOOKMARK_LOAD_ERROR'

// actions
const actions = {
  bookMark ({commit, state}, id) {
    commit(BOOKMARK_LOAD_REQUEST)

    let idArr = state.idArr
    let isHasBookMark = false
    idArr.forEach((elm) => {
      if (elm === id) {
        isHasBookMark = true
        return
      }
    })

    let newIdArr = []
    if (isHasBookMark) {
      // bookmarkを削除
      idArr.forEach((elm) => {
        if (elm !== id) {
          newIdArr.push(elm)
        }
      })
    } else {
      // bookmarkを追加
      newIdArr = idArr.slice(0)
      newIdArr.push(id)
    }

    commit(BOOKMARK_UPDATE, newIdArr)
  },
  loadBookMark ({commit, state}) {
    if (state.idArr.length > 0) {
      commit(BOOKMARK_LOAD_REQUEST)

      let idList = ''
      var idStr = JSON.stringify(state.idArr)
      idStr = idStr.replace(/\[|]|"/g, '')
      const _params = Object.assign({}, params, {
        id: idStr
      })

      let apiUrl = `${DOMAIN}/RestSearchAPI/20150630`
      let _r = []
      axiosInstance.get(apiUrl, {params: _params}).then((response) => {
        if (response.data.hasOwnProperty('error')) {
          // エラー処理
          commit(BOOKMARK_LOAD_ERROR, _r)
        } else {
          const total_hit_count = response.data.total_hit_count
          const rest = response.data.rest
          if (total_hit_count === '1') {
            _r = [restObjFormater(rest)]
          } else {
            _r = rest.map((elm) => {
              return restObjFormater(elm)
            })
          }
          commit(BOOKMARK_LOAD_RECEIVE, _r)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  delBookMark ({commit, state}, id) {
    let newIdArr = []
    let newBookMarkResult = []
    // bookmarkを削除
    state.idArr.forEach((elm) => {
      if (elm !== id) {
        newIdArr.push(elm)
      }
    })
    state.bookMarkResult.forEach((elm) => {
      if (elm.id !== id) {
        newBookMarkResult.push(elm)
      }
    })
    // console.log(newBookMarkResult)
    commit(BOOKMARK_DEL, {idArr: newIdArr, bookMarkResult: newBookMarkResult})
  }
}

// mutations
const mutations = {
  [BOOKMARK_DEL] (state, obj) {
    console.log(obj)
    state.idArr = obj.idArr
    state.bookMarkResult = obj.bookMarkResult
  },
  [BOOKMARK_UPDATE] (state, idArr) {
    state.idArr = idArr
  },
  [BOOKMARK_LOAD_REQUEST] (state) {
    state.bookIsLoading = true
  },
  [BOOKMARK_LOAD_ERROR] (state) {
    state.bookIsLoading = false
    state.bookMarkResult = []
  },
  [BOOKMARK_LOAD_RECEIVE] (state, rest) {
    state.bookMarkResult = rest
    state.bookIsLoading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
