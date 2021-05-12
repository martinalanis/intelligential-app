const userFindOrFail = ({ email, password }) => {
  const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
  return DB.administradores.filter(el => el.email === email && el.password === password)[0]
}

export default {
  login: async (form) => {
    return new Promise((resolve, reject) => {
      const DB = JSON.parse(localStorage.getItem('intelligentialDB'))
      setTimeout(() => {
        const user = userFindOrFail(form)
        if (DB.administradores && user) {
          resolve(user)
        }
        reject(new Error('Credenciales incorrectas'))
      }, 500)
    })
  }
}
