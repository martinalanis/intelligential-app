export default {
  form: {
    sections: [
      {
        sectionId: 1,
        sectionName: 'Información del representante legal',
        fields: [
          {
            fieldId: 1,
            type: 'string',
            key: 'name',
            label: 'Nombre'
          },
          {
            fieldId: 2,
            type: 'string',
            key: 'last_name',
            label: 'Primer apellido'
          }
        ],
        subgroups: [
          {
            subgroupId: 1,
            name: 'Dirección',
            description: 'Agrega la dirección de tu casa',
            fields: [
              {
                fieldId: 1,
                type: 'string',
                key: 'street',
                label: 'Calle'
              },
              {
                fieldId: 2,
                type: 'string',
                key: 'interior_number',
                label: 'No interior'
              },
              {
                fieldId: 3,
                type: 'string',
                key: 'exterior_number',
                label: 'No exterior'
              },
              {
                fieldId: 4,
                type: 'dropdown',
                catalog: 'states',
                key: 'state_address',
                label: 'Estado'
              }
            ]
          }
        ]
      },
      {
        sectionId: 2,
        sectionName: 'Documentos',
        fields: [
          {
            fieldId: 1,
            type: 'file',
            key: 'indentification_oficial',
            label: 'Identificación oficial'
          },
          {
            fieldId: 2,
            type: 'file',
            key: 'comprobante_domicilio',
            label: 'Comprobante de domicilio'
          }
        ]
      },
      {
        sectionId: 3,
        sectionName: 'Información financiera',
        fields: [
          {
            fieldId: 1,
            type: 'file',
            key: 'statement',
            label: 'Estado de cuenta'
          },
          {
            fieldId: 2,
            type: 'amount',
            key: 'amounts',
            label: 'Ingresos anuales'
          }
        ]
      }
    ]
  }
}
