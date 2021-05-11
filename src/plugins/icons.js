import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faEnvelope, faLock)
Vue.component('fa-icon', FontAwesomeIcon)
