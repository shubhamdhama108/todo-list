let tasks =[];
const tasksList=document.getElementById('list');
const addTaskInput=document.getElementById('add');
const tasksCounter=document.getElementById('tasks-counter');

console.log('working');

function addTaskToDom(task){
    const li =document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done?'checked':''} class="custom-checkbox">
    <label for="${task.id}">${task.text }</label>
    <img src="bin.png" class="delete" data-id="${task.id}" />
    
    `;

    //<i class="delete" data-id="${task.id}"></i>
    tasksList.append(li);
}

function renderList(){
    tasksList.innerHTML='';

    for(let i =0; i< tasks.length;i++){
        addTaskToDom(tasks[i]);
    }

    tasksCounter.innerHTML=tasks.length;
}

function toggleTask(taskId){
    const task = tasks.filter(function(task){ //this will return an array
        return task.id === taskId
    });

    if(task.length>0){
        const currentTask = task[0];

        currentTask.done= !currentTask.done;
        renderList();
        showNotification('task successfully toggled');
        return;
    }

    showNotification('could not toggle');
}

function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    })
    tasks = newTasks;
    renderList();
    // showNotification('task deleted successfully');
}

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        // showNotification('task added successfully');
        return;
    }
    showNotification('task cannot be added');
}

function showNotification(text){
    alert(text);
}

function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('text cannot be empty');
            return;
        }

        const task={
            text,
            id:Date.now().toString(),
            done:false
        }

        e.target.value='';
        addTask(task);
    }
}

function handleClickListener(e){
    const target =e.target;
    console.log(target);

    if(target.className=='delete'){
        const taskId= target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className=='custom-checkbox'){
        const taskId= target.id;
        toggleTask(taskId);
        return;
    }

}

function initializeApp(){
    addTaskInput.addEventListener('keyup',handleInputKeypress);
    document.addEventListener('click',handleClickListener); 
}

initializeApp();