# ZitroTechnicalTest

## Escenas
### Splash Screen:
Para la "Splash Screen" he creado 3 scripts, LoadingBarPresenter y LoadingBarVisual que implementa la interfaz ILoadingBar.
Mi idea inicial era utilizar algún plugin de inyección de dependencias para todo el proyecto, pero al no encontrar ningún estandard decidí simplemente pasar las referencias por editor.
- LoadingBarPresenter: contiene la logica de la carga simulada y llama al Visual para que este haga el update en pantalla. Una vez acabada la carga el presenter accede a una instancia del SceneManager para cargar la escena deseada.
- LoadingBarVisual: Actualiza el valor del ProgressBar con la información recibida.
- SceneManager: He creado este componente para que actue de singleton en todas las escenas y centralice las llamadas de cambio de escenas. 
- ProjectManager: Este prefab contiene el SceneManager, también podría contener un AudioManager para centralizar las llamdas de Audio, otros sistemas que tengan que inyectarse en cada escena o información relevante para todo el flujo del programa.

### Main Menu:
La API facilitada (http://worldtimeapi.org/api/timezone/Europe/Madrid) no parece funcionar, así que hice una llamada a otra API y muestro el contenido que se recibe por la consola.
Para simular el reloj, creo un Date especifico, que es lo que hubiese leido de la API, y simulo el transcurso del tiempo en update, para no hacer llamadas constantemente a la API.
Opcionalmente se podría verificar que la hora sea correcta cada X minutos o cada hora volviendo a hacer la llamada a la API.

Para la lógica de esta escena he creado:
- ClockPresenter: Hace una llamada a WebRequestHandler.sendWebRequest() con la URL que quiere acceder y simula el transcurso del tiempo localmente, en base a la hora recibida
- ClockVisual: Actualiza el texto en pantalla con la información recibida
- WebRequestHandler: Recibe un string con la URL a acceder, crea un XMLHttpRequest Get para recibir la información de dicha API, muestra los resultados en pantalla y devuelve un string con la información recibida.

### Quiz:
Para el juego de Quiz he creado los siguientes scripts:
- Quiz: Entidad que contiene la pregunta, un array con las respuestas y un integro con el indice del array que contiene la respuesta correcta. He preferido usar un integro en vez de un string con la respuesta correcta para facilitar cambios o futuras traducciones.
- QuizPresenter: Crea un listado con 10 preguntas, idealmente lo recibiría de algún otro sistema como un QuizFactory o leyendo el Json. Randomiza el orden de las respuestas que recibe y se las presenta al visual. También escucha los eventos del visual para proceder con el flujo de la aplicación.
- QuizVisual: Recibe la información que ha de presentar en pantalla y emite eventos con las respuestas del usuario.

### Slot:
La funcionalidad de esta escena se divide en:
- RandomGenerator: Genera valores aleatorios según las necesidades de la slot.
- SlotMachinePresenter: Orquestra toda la escena. Llama a RandomGenerator para tener los valores aleatorios deseados, se los presenta a ReelVisual para inicializar el reel de simbolos aleatorios y se encarga de empezar y parar el giro de los rodillos. Llama a PrizeChecker para verificar si hay algún premio y si lo hay,    lo muestra en pantalla con SlotMachineVisual.
- PrizeChecker: Verifica si hay alguna combinación ganadora según las necesidades de la slot.
- SlotMachineVisual: Muestra en pantalla feedback visual genérico de la slot, como si has ganado o no. También podría encargarse de mostrar diferentes tipos de VFX.
- ReelVisual: Recibe información del presenter sobre cuando empezar a girar, cuando parar de girar y en que combinación ganadora ha de parar. Se encarga de girar los rodillos y asignar los simbolos correctos a cada uno de sus SlotItem.
- SlotItem: Representa cada simbolo de la slot, guarda el sprite y lo asigna.

## Mejoras:
- Integrar un sistema de Audio centralizado para las diferentes escenas.
- Crear las interfaces que implementarian los diferents scripts y hacer las dependencias entre ellos más abstractas (he visto que hay una librería de JS llamada dijon que podría ayudar con esto, pero no la he implementado)
- Implementar VFX, pulir las animaciones y el feedback visual.

## Conclusiones:
Debido a mi trabajo y que estamos en la recta final de un proyecto con mi empresa para un cliente, he tenido menos tiempo del que me hubiese gustado esta semana. Aún así ha sido muy entretenido aprender Cocos Creator, que tiene muchas similitudes con Unity y typecript, aunque me ha costado más adaptarme a este último ya que mi experiencia con Javascript era casi nula.

Siento que para hacer tareas de lo mas normales y cotidianas en Unity aquí tardaba dos o tres veces más. No me conocía la sintaxis correcta, los métodos ni los componentes. He decidido simplificar mi trabajo para al menos tener las 3 primeras escenas funcionales y testeadas.
También comentar que al cambiar scripts de carpetas, el proyecto se corrompió. Todos los scripts que estaban como componentes en la escena pasaron a estar missing, no podia añadirlos como componentes y tuve que eliminar las carpetas de temp/, local/ y library/ para solventarlo.
Aún así a lo largo de esta semana he aprendido muchísimo y seguiré aprendiendo sobre el motor Cocos y sobre typescript.
