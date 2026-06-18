const taskbtn = document.querySelector("#btn");
const formDiv = document.querySelector("#taskForm");

const taskslist = document.querySelector(".taskslist");

const form = document.querySelector("form");
const taskPriority = document.querySelector("#taskPriority");

const taskArea = document.querySelector(".empty");
const listcom = document.querySelector("#list-com");
const listpen = document.querySelector("#list-pen");

const statPending = document.querySelector("#statPending");
const statDone = document.querySelector("#statDone");
const statTotal = document.querySelector("#statTotal");


const capture = document.querySelector(".capture");
const bubble = document.querySelector(".bubble");
const flowBDCP = document.querySelector(".flowBDCP");
const flowBDBP = document.querySelector(".flowBDBP");


const taskArr = [];

let updateIndex = null;

let ui = () => {
    taskslist.innerHTML = "";
    taskArr.forEach((elem, index) => {
        taskslist.innerHTML += `<div class="taskbox">
            <div class="cat-line"></div>
            <div class="task">
                <div class="check"></div>
                <div>
                    <p>${elem.task}</p>
                    <p>${elem.category}</p>
                </div>
                
            </div>

            <div class="task-right">
                <div onclick="updateTask(${elem.id})" class="task-edit">
                <p>Update</p>
            </div>
            <div onclick="deleteTask(${index})" class="task-delete">
                <i class="ri-delete-bin-line"></i>
            </div>
            </div>
            
        </div>`
    })
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let task = event.target[0].value;
    let category = taskPriority.value;

    if (category === "Category") {
        alert("Please select a category");
        return;
    }
    if (task.trim() === ""){
        alert("plz fill task..")
        return;
    }

    let obj = {
        id: Date.now(),
        task,
        category,
        completed: false,
    };

    if(updateIndex !== null){
        taskArr[updateIndex] = obj;
        updateIndex = null;
    }else{
        taskArr.push(obj);
    }

    
    taskArea.style.display = "none";
    listpen.style.display = "flex";
    
    ui();
    updateStats();

    console.log(taskArr);

    form.reset();
})


const updateTask = (id) => {
    let tasks = taskArr.find((elem) => elem.id === id);
    updateIndex = taskArr.findIndex((elem) => elem.id === id) 

    form[0].value = tasks.task;
    taskPriority.value = tasks.taskPriority;

    
};

const deleteTask = (index) => {
    taskArr.splice(index, 1);
    ui();
    updateStats();
    
};

const updateStats = () => {
    const total = taskArr.length;

    const completed = taskArr.filter(task => task.completed).length;

    const pending = total - completed;

    statPending.textContent = pending;
    statDone.textContent = completed;
    statTotal.textContent = total;

    if (total === 0) {
        taskArea.style.display = "block";
        listpen.style.display = "none";
        listcom.style.display = "none";
    } else {
        taskArea.style.display = "none";
    }
     
    if (pending > 0) {
        listpen.style.display = "flex";
    } else {
        listpen.style.display = "none";
    }

    if (completed > 0) {
        listcom.style.display = "flex";
    } else {
        listcom.style.display = "none";
    }
};

taskslist.addEventListener("click", (e) => {
    const checkBtn = e.target.closest(".check");

    if (!checkBtn) return;

    checkBtn.style.background = "#c6eecc";
    checkBtn.innerHTML = '<i class="ri-check-line"></i>';
});

capture.addEventListener("click", () => {
    flowBDBP.style.display = "none";
    flowBDCP.style.display = "flex";
})

bubble.addEventListener("click", () => {
    flowBDCP.style.display = "none";
    flowBDBP.style.display = "flex";
})


