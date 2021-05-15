import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faEnvelope,
  faLock,
  faColumns,
  faSignOutAlt,
  faPlus,
  faTimes,
  faCheck,
  faFileAlt,
  faLongArrowAltRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faUser,
  faEnvelope,
  faLock,
  faColumns,
  faSignOutAlt,
  faPlus,
  faTimes,
  faCheck,
  faFileAlt,
  faLongArrowAltRight
)
Vue.component('fa-icon', FontAwesomeIcon)
