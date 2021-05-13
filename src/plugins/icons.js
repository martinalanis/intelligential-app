import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faEnvelope,
  faLock,
  faColumns,
  faSignOutAlt,
  faPlus,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faEnvelope,
  faLock,
  faColumns,
  faSignOutAlt,
  faPlus,
  faTimes
)
Vue.component('fa-icon', FontAwesomeIcon)
