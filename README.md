Administración del sector de reparaciones en una planta de fabricación de celulares

Introducción

En una planta donde se fabrican teléfonos celulares la materia prima viene dada por los componentes que conforman un teléfono celular: placa principal, pantalla, cámaras, antenas, parlantes, micrófonos, etc. 
Durante el proceso de fabricación se ensamblan los componentes de forma tal de obtener el producto final -un celular- y se verifica el correcto funcionamiento de cada una de las funciones del teléfono. Cuando alguno de los testeos de estas funciones falla, la unidad se repara cambiandole la pieza defectuosa. Sin embargo, hay dos partes que se intentan reparar debido a que son las más importantes en cuanto a su valor -en conjunto representan el 80% del valor total-: la placa principal y la pantalla. Es por esto que cuando se detecta una falla en alguno de estos componentes, se envia al sector de reparaciones.
Dado su alto valor, se requiere tener un seguimiento preciso de los stocks de cada placa y pantalla, ya sea que estén en abastecimiento (previo a producción), en línea de producción, en reparación o como producto terminado.
Los sistemas de stocks como SAP u ORACLE son capaces de brindar las cantidades existentes de cada parte de cada modelo en distintos almacenes lógicos. Sin embargo, no tienen la capacidad de determinar el tiempo que una determinada placa o pantalla permanece en un cierto almacen lógico. Por ejemplo, supongamos que tengo 10 placas del modelo 'X' en el almacen de reparaciones y en el día de hoy ingresan 5 placas y se reparan 5 placas de ese mismo modelo. El stock final seguirá siendo 10, pero no podré saber si son las mismas 10 placas que estaban inicialmente. Asimismo,  tampoco podría saber saber que problemas tenían y que solución se les dió a las 5 placas reparadas.
En el sector de reparaciones existe un flujo importante de ingreso y egreso de materiales constante. Con lo cual, para generar los reportes diarios de stock y realizar los ajustes que fueran necesarios en el sistema, los administradores cuentan  físicamente cáda placa y pantalla por modelo. 
Teniendo en cuenta que cada placa viene identificada por un número único e irrepetible -que se llama IMEI-  y, de la misma manera, cada pantalla tiene un número de serie único, se pensó en una aplicación que pueda identificar las placas y  pantallas individualmente, realizar un seguimiento personalizado y llevar un control on-line del stock. Sería como llevar una "historia clínica" de cada material que ingresa al sector de reparaciones.

Principio de funcionamiento

Usuarios
El programa cuenta con dos tipos de usuario: administrativo y operador.
El administrativo tendrá permiso para realizar las operaciónes de ingreso de placas y pantallas, realizar los egresos correspondientes y revisar los reportes.
El usuario 'operador' solo podrá ver los reportes
Para comenzar, se reqiuere elegir un usuario. El mismo quedará guardado en la sesión y la información de los permisos del usuario seleccionado se mostrará en la barra de navegación.

Ingreso de placas e Ingreso de pantallas
El módulo de ingreso está separado en 'placas' y 'pantallas', pero el funcionamiento es el mismo. Se requiere ingresar todos los datos solicitados para que se guarde la información en un nuevo objeto.
No se permitirá ingresar una placa o pantalla que ya exista en el stock. Es decir, el programa rechazará el intento de ingresar una placa o pantalla que haya sido ingresada y no se le haya dado el egreso correspondiente. En caso de que una placa/pantalla haya ingresado, se haya reparado y registrado el egreso, la misma sí puede volver a ingresar y generará un nuevo objeto. 

Egreso de placas/pantallas
"Dado que los componentes tienen una identificación única e irrepetible, el módulo es el mismo tanto para placas como para pantallas. Se deberá ingresar el número de IMEI para placas o el número de serie para Pantallas y se deberá indicar en que condiciones egresa del sector:
OK: el componente se reparó correctamente
SCP: el componente no puede ser reparado y es declarado scrap (material no conforme generado en el proceso productivo)
RMA: el componente no puede ser reparado y se genera el reclamo correspondiente al proveedor (material no conforme proveniente del proveedor)
Ambos campos deberan estar completos para que se impute el egreso correspondiente. Dicha información será agregada al objeto correspondiente. Por otro lado, además, el programa verificará que el componente a egresar se encuentre disponible (sin egreso) dentro del stock. Caso contrario emitirá un alerta para avisar que dicho componente no se encuentra en stock. "

Reportes
En esta sección se mostrará el stock actual existente en el sector de reparaciones de cada modelo de placas y pantallas. Solo tendrá en cuenta los elementos que hayan sido ingresados y aun no tengan el egreso correspondiente. A medida que se da ingreso de nuevos materiales o egreso de los existentes, el stock ira variando. Esta información es la que se deberá utilizar para cargar en los sistemas SAP u ORACLE que utilice la planta. Asi mismo, evitará tener que hacer el contéo físico de los materiales dentro del sector. Y por último, tendrá la opción de buscar la información de cualquier placa o pantalla para conocer toda su 'historia clínica'.
Para el proyecto presentado, se trabaja con un archivo .json simulando la conexión con la base de datos, que traerá la información de placas y pantallas ya procesadas (mostrado por consola al iniciar el proyecto). Esto permitirá comenzar con un stock inicial distinto de cero. Notar que la cantidad de placas y pantallas que trae el archivo .json inicial es de 29. Sin embargo, algunas de ellas ya tienen el egreso realizado, con lo cual, la suma total de cada componente que se muestra en el reporte de stcoks es menor que 29.
