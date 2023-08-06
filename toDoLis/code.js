//#region variables
//let variable
let boxGeneral = document.getElementById("box-general"),
adminCheckbox = document.getElementById("check-box"),
adminList = document.getElementById("list-box"),
adminTime = document.getElementById("time-box"),
showErrors = document.getElementById("error"), addButtonsRemoveTasks = document.getElementById("remove");

//const
const addButton = document.querySelector(".addButton"),
addEventFocusBoxGeneral = document.querySelector(".box-general"), 
schedule = document.getElementById("schedule"),dailyTasks = document.getElementById("dailyTasks");

//let array
let storageDailyTasks = [],storageSchedule = [],number = 0;

//let objects
let canEnter = {
    itsString : false,
    valueFull : false,
    timeNoRepeat : false,
    notCharacterMax : false,
};

//#endregion



//#region agregar eventos
window.addEventListener("load",async ()=>{
    await axios({
        method :'get',
        url:"http://localhost:3000/api/obtener",
        responseType: 'json'
    }).then(response=> { 
        data = response.data;
        for(let i = 0; i<data.length;i++){
            tasksInOrden(data,i);
            addDataForDB(data[i].id,data,i);
            addEventToButtonRemove();
            number = 1;
        }
    })
});



addButton.addEventListener("click", ()=>{
    //detectar digitos en un texto
    const regex = /\d+/g;

    let text = dailyTasks.value;
    numbers = text.match(regex);

//#region verificar la entrada de la tarea
    if(dailyTasks.value.indexOf(numbers) === -1){ 
        canEnter.itsString = true;
    }
    else{
        showErrors.innerHTML = "Solamente ingresa letras";
        canEnter.itsString = false;
    }

    if(!schedule.value == "" && !dailyTasks.value == ""){ 
        canEnter.valueFull = true;
    }else{
        showErrors.innerHTML = "Ingresa toda la informacion necesaria";
        canEnter.valueFull = false;
    }

    if(storageSchedule.indexOf(schedule.value)){ 
        canEnter.timeNoRepeat = true;
    }else{
        canEnter.timeNoRepeat = false;
        showErrors.innerHTML = "Ya hay una tarea con ese horario";
    }
            
    if(dailyTasks.value.length <= 19){ 
        canEnter.notCharacterMax = true;
    }else{
        canEnter.notCharacterMax = false;
        showErrors.innerHTML = "excede los caracteres maximos";
    }
//#endregion

//verificar si todos son true para poder ingresar la tarea
    if(canEnter.itsString === true && canEnter.valueFull === true && canEnter.timeNoRepeat === true && canEnter.notCharacterMax === true){
    //enviamos los datos necesarios al servidor         
    toDoRequests();
    //borramos los valores tomados de los input               
    ereaserInputs();
    //aumentamos la variable number
    number ++;
    // agremaos la funcion para el boton remove       
    addEventToButtonRemove();
    }
});
//#endregion

//#region funciones
function clicksControl(IDButton){
    let numberOfTaskRemove = IDButton[IDButton.length-1];
    
    let checkboxNumber = document.getElementById(`checkbox${numberOfTaskRemove}`);
    let checkTaskNumber = document.getElementById(`tarea${numberOfTaskRemove}`);
    let checkScheduleNumber = document.getElementById(`horario${numberOfTaskRemove}`);
    let getRemoveButton = document.getElementById(`removeButton${numberOfTaskRemove}`);
    let removeP1 = document.getElementById(`p${numberOfTaskRemove}.1`);
    let removeP2 = document.getElementById(`p${numberOfTaskRemove}.2`);


    adminCheckbox.removeChild(checkboxNumber);
    adminList.removeChild(checkTaskNumber);
    adminTime.removeChild(checkScheduleNumber);
    addButtonsRemoveTasks.removeChild(getRemoveButton);
    removeP1.remove();
    removeP2.remove();

    storageDailyTasks.splice(numberOfTaskRemove,1);
    storageSchedule.splice(numberOfTaskRemove,1);

    addEventToButtonRemove();

};

function crossedOut(IDButton){
    let numberOfTaskRemove = IDButton[IDButton.length-1];

    let checkboxNumber = document.getElementById(`checkbox${numberOfTaskRemove}`);
    let checkTaskNumber = document.getElementById(`tarea${numberOfTaskRemove}`);

    if(checkboxNumber.checked){
        checkTaskNumber.style.textDecoration = "line-through";
    }else{
        checkTaskNumber.style.textDecoration = "none";
    }
};

function addEventToButtonRemove(){
    try{
        var removeButton = document.querySelectorAll(".removeButton"), 
        checkBoxCrossedOut = document.querySelectorAll(".crossedOut");

        for(let i = 0; i <= removeButton.length;i++){
            removeButton[i].addEventListener("click",async ()=>{
                await axios ({
                    method : "post",
                    url : `http://localhost:3000/api/actualizar-datos`,
                    data: {
                        id : `${parseInt(removeButton[i].id[removeButton[i].id.length-1])}`
                    }
                }).catch(err => console.log("error al hacer la solicitud: ",err))
                clicksControl(removeButton[i].id)
            });
            checkBoxCrossedOut[i].addEventListener("click",()=>crossedOut(checkBoxCrossedOut[i].id));
        }
    }catch(e){
        console.log("no pasa nada");
    }
};

function ereaserInputs(){
    schedule.value = '';
    dailyTasks.value = '';
    showErrors.innerHTML ='';
};

let sendData = async (id,tarea,horario)=>{
    try {
       let response =  await axios({
        method: 'post',
        url:"http://localhost:3000/api/enviar",
        data :{
            dailyTasks : `${tarea}`,
            schedule : `${horario}`,
            id : `${id}`
        }
    })
        console.log( response);
    } catch (e) {
        console.log(e);
    }
}

function addDataForDB(number,data,i){
        adminCheckbox.innerHTML += `<input type="checkbox" class="crossedOut" id="checkbox${number}"><h3 id="p${number}.1"></h3>`;
        adminList.innerHTML += `<h3 id="tarea${number}">${data[i].tarea}</h3>`;
        adminTime.innerHTML += `<h3 id="horario${number}">${data[i].horario}</h3>`;
        addButtonsRemoveTasks.innerHTML += `<button class="removeButton" id="removeButton${number}"></button><h3 id="p${number}.2"></h3>`;
}

function addDataWhithClick(number,data,i){
    adminCheckbox.innerHTML += `<input type="checkbox" class="crossedOut" id="checkbox${number}"><h3 id="p${number}.1"></h3>`;
    adminList.innerHTML += `<h3 id="tarea${number}">${data[i].tarea}</h3>`;
    adminTime.innerHTML += `<h3 id="horario${number}">${data[i].horario}</h3>`;
    addButtonsRemoveTasks.innerHTML += `<button class="removeButton" id="removeButton${number}"></button><h3 id="p${number}.2"></h3>`;
}

function tasksInOrden(data,x){
    for (let i = 0; i < data.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < data.length; j++) {
          if (data[j].horario < data[minIndex].horario) {
            minIndex = j;
          }
        }
        if (minIndex !== i) {
          // Intercambiar tareas[i] con tareas[minIndex]
          let temp = data[i];
          data[i] = data[minIndex];
          data[minIndex] = temp;
        }
    } 
    storageDailyTasks = [];
    storageSchedule = [];

    storageDailyTasks.push(data[x].tarea);
    storageSchedule.push(data[x].horario);
}

function toDoGet (){
    axios({
        method :'get',
        url:"http://localhost:3000/api/obtener",
        responseType: 'json'
    }).then(response=> { 
        data = response.data;

        adminCheckbox.innerHTML = ``;
        adminList.innerHTML = ``;
        adminTime.innerHTML = ``;
        addButtonsRemoveTasks.innerHTML = ``;

        
        for(let i = 0; i<data.length;i++){
            console.log(data);
            tasksInOrden(data,i);
            addDataWhithClick(data[i].id,data,i);
            location.reload();
            addEventToButtonRemove();
        }
    })
}

async function toDoRequests(){
    await sendData(`${number}`,`${dailyTasks.value}`,`${schedule.value}`);
    toDoGet();
}
//#endregion