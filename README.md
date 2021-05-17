# Intelligential App

Prueba dividia en 3 secciones

## Ejercicio 1
Dado un arreglo bidimensional de N x M, desarrollar una función que genere un
arreglo unidimensional de 1 x NM en el cual los elementos correspondan a los
elementos del arreglo original obtenidos siguiendo una trayectoria de caracol en el
sentido de las manecillas del reloj.

Para ver la solucion situarce en la raiz del proyecto mediante la linea comando y ejecutar
```
npm run exercise1
```

## Ejercicio 2
Se requiere realizar el sistema de tienda en línea para una empresa de venta de
artesanías. La solución debe considerar las siguientes funcionalidades:
+ Creación de nuevos pedidos
+ Perfil de cliente e historial de compras
+ Manejo de inventario
+ Gestión de envíos a domicilio

Diseñar uno o más diagramas para modelar la arquitectura del nuevo sistema, mostrando los componentes seleccionados y su interacción entre los mismos a partir de los siguientes elementos:
+ Sitios web o aplicaciones
+ Servicios internos o de terceros
+ Bases de datos
+ Redes y servidores (on premise o cloud)

> PDF con la solucion adjunta en la raiz del proyecto (intelligential_exercise-2.pdf)

## Ejercicio 3
Diseñar y maquetar un sistema web que permita a un usuario capturar la información para una solicitud de crédito.

### MODULOS DE SISTEMA
+ ### **PORTAL DE ADMINISTRADOR**
  - Login (administrador)
  - Dashboard de estadísticas (usuarios y solicitudes)
  - Administración de usuarios (creación, modificación, desactivación/activación)
  - Administración de solicitudes (detalle, aprobación, rechazo)

+ ### **PORTAL DE USUARIO**
  - Registro
  - Login (usuario)
  - Solicitud de crédito (requiere una sesión activa)
  - La solicitud se realizará a partir de un formulario generado dinámicamente.
  - Pantalla de envío de solicitud exitosa.
  - Detalle de solicitud con datos ingresados.

Para ver la solucion situarce en la raiz del proyecto mediante la linea comando y ejecutar
```
npm run serve
```
>**IMPORTANTE**:
>
> La primera vez que se genera el proyecto se debe inicializar la base de datos medianet la opcion que aparece en la parte inferior de la pantalla de login.
>
> Las credenciales iniciales de administrador son:
>
> email: admin@example.com
>
> password: 123456
