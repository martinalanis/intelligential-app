export default {
  form: {
    sections: [
      {
        sectionId: 1,
        sectionName: 'Datos generales',
        fields: [
          {
            fieldId: 1,
            type: 'string',
            key: 'name',
            label: 'Nombre',
            required: true
          },
          {
            fieldId: 2,
            type: 'email',
            key: 'email',
            label: 'Email',
            required: true
          },
          {
            fieldId: 3,
            type: 'password',
            key: 'password',
            label: 'Password',
            required: true
          }
          // {
          //   fieldId: 4,
          //   type: 'dropdown',
          //   key: 'role',
          //   label: 'Rol',
          //   required: true,
          //   options: [
          //     {
          //       fieldId: 1,
          //       value: 'administrador',
          //       label: 'Administrador'
          //     },
          //     {
          //       fieldId: 1,
          //       value: 'cliente',
          //       label: 'Cliente'
          //     }
          //   ]
          // }
        ]
      }
    ]
  }
}
