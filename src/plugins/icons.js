import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEnvelope, faLock, faColumns, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faEnvelope, faLock, faColumns, faSignOutAlt)
Vue.component('fa-icon', FontAwesomeIcon)
