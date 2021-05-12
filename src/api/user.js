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
      const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
      if (DB?.users) {
        setTimeout(() => {
          const user = userFindByCredentials(form)
          if (user) {
            resolve(user)
          }
          reject(new Error('Credenciales incorrectas'))
        }, 500)
      } else {
        reject(new Error('Base de datos de usuarios no encontrada'))
      }
    })
  },
  getUser: async (id) => {
    return new Promise((resolve, reject) => {
      const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
      if (DB?.users) {
        setTimeout(() => {
          const user = userFindOrFail(id)
          if (user) {
            resolve(user)
          }
          reject(new Error('Credenciales incorrectas'))
        }, 500)
      } else {
        reject(new Error('Base de datos de usuarios no encontrada'))
      }
    })
  }
}
