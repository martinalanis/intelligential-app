const DB_NOT_FOUND = 'Base de datos de usuarios no encontrada'

const userFindByCredentials = ({ email, password }) => {
  const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
  const user = DB.users.filter(el => el.email === email && el.password === password)[0]
  return user
    ? {
      user: DOUser(user),
      sessionToken: `${user.id}-${user.role}-${Date.now().toString()}`
    }
    : false
}

const userFindOrFail = (id) => {
  const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
  const user = DB.users.filter(el => el.id === id)[0]
  return user ? DOUser(user) : false
}

/**
 * return formated user info
 * prevent returning inecessary data
 * must be implemented in backend (implemented here for example purpose)
 */
const DOUser = (user) => {
  return {
    id: user.id,
    name: user?.name,
    email: user?.email,
    role: user.role
  }
}

export default {
  login: async (form) => {
    return new Promise((resolve, reject) => {
      const { users } = JSON.parse(localStorage.getItem('intelligentialDB')) || ''
      if (users) {
        setTimeout(() => {
          const user = userFindByCredentials(form)
          if (user) {
            resolve(user)
          }
          reject(new Error('Credenciales incorrectas'))
        }, 500)
      } else {
        reject(new Error(DB_NOT_FOUND))
      }
    })
  },
  getUser: async (id) => {
    return new Promise((resolve, reject) => {
      const { users } = JSON.parse(localStorage.getItem('intelligentialDB')) || ''
      if (users) {
        setTimeout(() => {
          const user = userFindOrFail(id)
          if (user) {
            resolve(user)
          }
          reject(new Error('Credenciales incorrectas'))
        }, 500)
      } else {
        reject(new Error(DB_NOT_FOUND))
      }
    })
  },
  all: async () => {
    return new Promise((resolve, reject) => {
      const { users } = JSON.parse(localStorage.getItem('intelligentialDB')) || ''
      if (users) {
        setTimeout(() => {
          resolve(users)
        }, 500)
      } else {
        reject(new Error(DB_NOT_FOUND))
      }
    })
  },
  getForm: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(require('@/forms/user.js').default)
      }, 500)
    })
  },
  save: async (form) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
        if (DB?.users) {
          form.id = parseInt(DB.users[DB.users.length - 1].id) + 1
          form.status = 1
          DB.users.push(form)
        } else {
          DB.users = form
        }
        localStorage.setItem(
          'intelligentialDB',
          JSON.stringify(DB)
        )
        resolve(true)
      }, 500)
    })
  },
  changeStatus: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
        if (DB?.users) {
          DB.users = DB.users.map(user => {
            if (parseInt(user.id) === id) {
              user.status = !user.status
            }
            return user
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
  },
  remove: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
        if (DB?.users) {
          DB.users = DB.users.filter(user => parseInt(user.id) !== id)
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
