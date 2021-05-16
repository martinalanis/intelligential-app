import Cookies from 'js-cookie'
const DB_NOT_FOUND = 'Base de datos de usuarios no encontrada'

const findCreditsByUser = () => {
  const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
  const cookie = Cookies.get('it_session')
  const id = cookie ? Cookies.get('it_session').split('-')[0] : ''
  return DB.credits.length
    ? DB.credits.filter(el => el.userId === parseInt(id))
    : []
}

export default {
  getForm: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(require('@/forms/credit.js').default)
      }, 500)
    })
  },
  currentUserCredits: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(findCreditsByUser())
      }, 500)
    })
  },
  all: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { credits } = JSON.parse(localStorage.getItem('intelligentialDB')) || ''
        if (credits) {
          resolve(credits)
        } else {
          reject(new Error(DB_NOT_FOUND))
        }
      }, 500)
    })
  },
  saveCredit: async (form) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
        form.createdAt = new Date()
        form.updatedAt = new Date()
        form.status = 'pending'
        if (DB?.credits) {
          form.id = parseInt(DB.credits[DB.credits.length - 1].id) + 1
        } else {
          DB.credits = []
          form.id = 1
        }
        DB.credits.push(form)
        localStorage.setItem(
          'intelligentialDB',
          JSON.stringify(DB)
        )
        resolve(true)
      }, 500)
    })
  },
  changeStatus: async (status, id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
        if (DB?.credits) {
          DB.credits = DB.credits.map(credit => {
            if (parseInt(credit.id) === id) {
              credit.status = status
            }
            return credit
          })
        } else {
          reject(new Error('No se encontraron registros'))
        }
        localStorage.setItem(
          'intelligentialDB',
          JSON.stringify(DB)
        )
        resolve(true)
      }, 500)
    })
  }
}
