const formulario = document.querySelector("#form")
const taskInput = document.querySelector("#new-task")
const taskList = document.querySelector("#tasks")

const tasks = [
    { id: 1, text: "Tarea 1", complete: false },
    { id: 2, text: "Tarea 2", complete: true },
    { id: 3, text: "Tarea 3", complete: false }
]
//Genera la lista de tareas
const renderTask = () => {
    let html = ""; // guarda el contenido que recorro en esta variable
    let completedCount = 0; // contador de tareas completadas
    tasks.forEach((task) => { // usando "forEach" se puede agregar un segundo argumento. Este es un método dentro del array.
        if (task.complete) completedCount++;
        html += `
            <tr data-id="${task.id}">
                <td>${String(task.id).slice(-2)}</td>
                <td class="${task.complete ? 'completed' : ''}">${task.text}</td>
                <td><button class="complete">✅</button></td>
                <td><button class="delete">❌</button></td>
            </tr>
        `;
    });
    taskList.innerHTML = html;
    completeTask(); // le da evento al botón completar
    deleteTask(); // le da evento al botón eliminar
    document.querySelector("#total").innerHTML = tasks.length;
    document.querySelector("#done").innerHTML = completedCount;
}


const completeTask = () => {
    const buttons = document.querySelectorAll("#tasks .complete")
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const taskId = btn.closest("tr").dataset.id; // busco la tarea en base al "id"
            const index = tasks.findIndex((element) => element.id == taskId); //busco la tarea en base al "id"
            tasks[index].complete = !tasks[index].complete //funciona como un toggle para cambiar el estado "complete"
            renderTask() //actualizo el html
        })
    })
}
//para borrar una de las tareas
const deleteTask = () => {
    const buttons = document.querySelectorAll("#tasks .delete") //para seleccionar el id de la lista de tareas
    buttons.forEach((btn) => { //recorro el objeto
        btn.addEventListener("click", () => {
            //**Eliminando con splice, es necesario usar const en la variable global */ 
            const index = tasks.findIndex((element)=> element.id == btn.parentNode.id) //para acceder al id necesito acceder al elemento que contiene al "id"
            tasks.splice(index, 1)
            //**Eliminando con filter, es necesario usar let en la variable global */
            // tasks = tasks.filter((element) => element.id != btn.parentNode.id)
            // console.log(tasks)
            // console.log("click", li.id)
            renderTask() //actualizo las tareas incluyendo las eliminadas
        })
    })
}
//Rescato la tarea desde el formulario
formulario.addEventListener("submit", (event) => {
    // console.log(event)
    event.preventDefault() //evito que se actualice la página
    const newTask = { //transforma el valor de taskInput en un objeto y guardo la tarea en un array
        id: Date.now(),
        text: taskInput.value,
        complete: false
    }
    tasks.push(newTask)
    taskInput.value = ""
    renderTask() //muestro la tarea

    // for (let guest of guests) { //usando un ciclo
    //     html += `
    //     <li>${guest}</li>
    //     `
    // }

    // guests.forEach((guest, index)=> { //por ejem: el index
    //     html += `
    //     <li>${index + 1}.- ${guest}</li>
    //     `
    // })
})
renderTask()