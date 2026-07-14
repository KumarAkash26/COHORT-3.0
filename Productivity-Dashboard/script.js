const clkTime = document.querySelector(".clk-time");
const clkDate = document.querySelector(".clk-date");

const WeatBox = document.querySelector("#weather");

const cdTodo = document.querySelector(".cd-todo");
const todoBox = document.querySelector(".todo-box");
const adbtn = document.querySelector(".adbtn");
const tasklist = document.querySelector(".task-list");

const cls = document.querySelector("#tocls");

const dailyplan = document.querySelector(".daily-plan");
const daicls = document.querySelector("#daicls");
const planinp = document.querySelectorAll(".plan input");
const cdPlan = document.querySelector(".cd-Plan");

const motivcls = document.querySelector("#motivcls")
const cdquote = document.querySelector(".cd-quote");
const motiv = document.querySelector(".motiv");

const qtt = document.querySelector("#qt-t");
const qta = document.querySelector("#qt-a")

const cdpomo = document.querySelector(".cd-pomo");
const timercls = document.querySelector("#timercls");
const ttime = document.querySelector(".ttime");
const sttimer = document.querySelector("#st-timer");
const soTimer = document.querySelector("#so-Timer");
const reTimer = document.querySelector("#reTimer");
const timer = document.querySelector(".timer");

const cdweat = document.querySelector(".cd-weat");
const weath = document.querySelector(".weath");
const weatcls = document.querySelector("#weatcls");
const weatherIcon = document.querySelector("#weatherIcon");
const weatherTemp = document.querySelector("#weatherTemp");
const weathCity = document.querySelector("#weathCity");
const weathDes = document.querySelector("#weathdes");
const weatHdy = document.querySelector("#weatHdy");
const weatWid = document.querySelector("#weatWid");

const goalSec = document.querySelector(".goalsec");
const goalCard = document.querySelector(".cd-goal");
const goalCls = document.querySelector("#goalClose");
const goalInp = document.querySelector("#goalInput");
const goalAdBtn = document.querySelector("#goalAddBtn");
const goalLst = document.querySelector(".goallst");

const dynImage = document.querySelector("#dynImage");

const togBtn = document.querySelector("#togbtn");
const body = document.querySelector("body");
const togIcon = document.querySelector("#togbtn i");

const API_KEY = "abda6ce5c3f678e9d788d1c854b329d2";
const city = "Dhanbad";
const quote = "dailyQuote";
const dateSave = "dailyQuoteDate";

let goals = [];

const goalSave = "dailyGoals";
const goalDate = "dailyGoalsDate";

const maxtask = 9;

let tsec = 30 * 60;
let timmer = null;

const todoSave = "todoTasks";
let todoTasks = JSON.parse(localStorage.getItem(todoSave)) || [];

const sPlan = "dailyPlans";


const updateTime = () => {
    const time = new Date();

    let hours = time.getHours();
    let minu = time.getMinutes();
    let sec = time.getSeconds();

    console.log(hours);

    hours = hours < 10 ? "0" + hours : hours;
    minu = minu < 10 ? "0" + minu : minu;
    sec = sec < 10 ? "0" + sec : sec;

    clkTime.innerHTML = `${hours}:${minu}<span class="clk-sec">:${sec}</span>`;

    const dateOpt = {
        weekday: "short",
        month: "short",
        day: "numeric"
    };

    clkDate.textContent = time.toLocaleDateString("en-US", dateOpt);


}

async function UpdateWeather(){
    try{
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const res = await fetch(link);
        const data = await res.json();

        console.log(data);

        const temp = Math.round(data.main.temp);
        const cityName = data.name;
        const weatMain = data.weather[0].main;

        WeatBox.innerHTML = `<i             class="ri-sun-cloudy-line"></i>
        <span>${temp}°C · ${cityName}</span>`;
    }
    catch (error)
    {
        console.log("Weather error:", error);
    }
}

cdTodo.addEventListener("click", () => {
    todoBox.style.display = "flex";
});

const svTodoTsks = () => {
    localStorage.setItem(todoSave, JSON.stringify(todoTasks));
};

const sTodoTsks = () => {
    tasklist.innerHTML = "";

    todoTasks.forEach((task, index) => {
        const taskdiv = document.createElement("div");
        taskdiv.classList.add("task");

        taskdiv.innerHTML = `
            <input 
                type="text" class="taskin" placeholder="Write your task here..." value="${task.text}"data-index="${index}">
                <button class="compbtn" data-index="${index}">Complete</button>
        `;

        tasklist.appendChild(taskdiv);
    });
};

adbtn.addEventListener("click", () => {
    if (todoTasks.length >= maxtask) {
        alert("You can add only 10 tasks in the list");
        return;
    }

    const obj = {
        text: ""
    };

    todoTasks.push(obj);

    svTodoTsks();
    sTodoTsks();

    const allInps = document.querySelectorAll(".taskin");
    allInps[allInps.length - 1].focus();
})

tasklist.addEventListener("input", (event) => {
    if (event.target.classList.contains("taskin")) {
        const index = event.target.dataset.index;

        todoTasks[index].text = event.target.value;
            
        svTodoTsks();
    }
});

tasklist.addEventListener("click", (event) => {
    if (event.target.classList.contains("compbtn")) {
        const index = event.target.dataset.index;
        const input = tasklist.querySelector(`.taskin[data-index="${index}"]`);

        if (input.value.trim() === "") {
            input.focus();
            return;
        }

        todoTasks.splice(index, 1);

        svTodoTsks();
        sTodoTsks();
    }
});


cls.addEventListener("click", () => {
    todoBox.style.display = "none";
});

cdPlan.addEventListener("click", () => {
    dailyplan.style.display = "flex"
})

daicls.addEventListener("click", () => {
    dailyplan.style.display = "none"
})

cdquote.addEventListener("click", () => {
    motiv.style.display = "flex";
});

motivcls.addEventListener("click", () => {
    motiv.style.display = "none";
})

const gettoDate = () => {
    const preday = new Date();

    const year = preday.getFullYear();
    const month = preday.getMonth() + 1;
    const date = preday.getDate(); 
    
    console.log(date)
    return `${year}-${month}-${date}`;
} 

async function dailyQuotes() {  
    const toDate = gettoDate();

    const sData = localStorage.getItem(dateSave);
    const sQuote = localStorage.getItem(quote);

    if(sData === toDate && sQuote){
        const quoteDta = JSON.parse(sQuote);

        qtt.textContent = `"${quoteDta.quote}"`;
        qta.textContent = `— ${quoteDta.author}`;

        return

    };

    try {
        qtt.textContent = "Loading quote.....";
        qta.textContent = "";

        const res = await fetch("https://dummyjson.com/quotes/random")
        const data = await res.json();

        qtt.textContent = `"${data.quote}"`;
        qta.textContent = `${data.author}`;

        const obj = {
            quote: data.quote,
            author: data.author
            
        };
        console.log(obj);
        
        localStorage.setItem(quote, JSON.stringify(obj));
        localStorage.setItem(dateSave, toDate);
    }
    catch(error){
        console.log("Error Quote:", error);
    }
    
}

cdpomo.addEventListener("click", () => {
    timer.style.display = "flex";
});

timercls.addEventListener("click", () => {
    timer.style.display = "none";
});

const showT = () => {
    let min = Math.floor(tsec/60);
    let sec = tsec%60;

    if (min < 10) {
        min = "0" + min;
    }
    else{
        min = min;
    }

    sec = sec < 10 ? "0" + sec : sec;

    ttime.textContent = `${min}:${sec}`;
}

const stCotDo = () => {
    if (timmer !== null){
        return;
    }

    timmer = setInterval(() => {
        if(tsec > 0){
            tsec--;
            showT();
        }
        else{
            clearInterval(timmer);
            timmer = null;
            alert("Time is Over!");
        }
    },1000);
}
sttimer.addEventListener("click", () => {
    stCotDo();
})

soTimer.addEventListener("click", () => {
    clearInterval(timmer);
    timmer = null;
})

reTimer.addEventListener("click", () => {
    clearInterval(timmer);
    timmer = null;

    tsec = 30 * 60;
    showT();

});



cdweat.addEventListener("click", () => {
    weath.style.display = "flex";
    getCurrentLocationWeather();
})

weatcls.addEventListener("click", () => {
    weath.style.display = "none";
});

const getWeatInfo = (code) => {
    if(code === 0)
    {
        return{
            text: "Clear Sky",
            icon: "ri-sun-line"
        }
    }

    else if(code === 1 || code === 2)
    {
        return{
            text: "Partly Cloudy",
            icon: "ri-sun-cloudy-line"
        }
    }

    else if (code === 3)
    {
        return{
            text:"Cloudy",
            icon: "ri-cloudy-line"
        }
    }
    else if (code === 45 || code === 48)
    {
        return{
            text: "Foggy",
            icon: "ri-mist-line"
        }
    }
     else if (
        code === 51 || code === 53 || code === 55 ||
        code === 61 || code === 63 || code === 65 ||
        code === 80 || code === 81 || code === 82
    ) {
        return {
            text: "Rainy",
            icon: "ri-rainy-line"
        };
    } 
    else if (code === 95 || code === 96 || code === 99) {
        return {
            text: "Thunderstorm",
            icon: "ri-thunderstorms-line"
        };
    } 
    else {
        return {
            text: "Weather Update",
            icon: "ri-cloudy-line"
        };
    }
};

const getCurrentLocationWeather = () => {
    if (!navigator.geolocation) {
        weathDes.textContent = "Location not supported";
        return;
    }

    weathDes.textContent = "Getting location...";

    navigator.geolocation.getCurrentPosition(
        async (posit) => {
            const lat = posit.coords.latitude;
            const lon = posit.coords.longitude;

            updateWeat(lat, lon);
        },

        (error) => {
            console.log("Location Error:", error);

            weatherTemp.textContent = "--°C";
            weathCity.textContent = "Location Denied";
            weathDes.textContent = "Please allow location permission";
            weatHdy.textContent = "--%";
            weatWid.textContent = "-- km/h";
            weatherIcon.className = "ri-error-warning-line";
        }
    );
};

async function updateWeat(lat, lon) {
    try {
        weathDes.textContent = "Loading weather...";

        const apiLik = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
         
        const res = await fetch(apiLik);
        const data = await res.json();

        const current = data.current;

        console.log(data);

        const temp = Math.round(current.temperature_2m);
        const humidity = current.relative_humidity_2m;
        const wind = Math.round(current.wind_speed_10m);
        const weatherCode = current.weather_code;

        const weatherInfo = getWeatInfo(weatherCode);

        weatherTemp.textContent = `${temp}°C`;
        weathCity.textContent = "Current Location";
        weathDes.textContent = weatherInfo.text;
        weatHdy.textContent = `${humidity}%`;
        weatWid.textContent = `${wind} km/h`;

        weatherIcon.className = weatherInfo.icon;
    }
    catch (error) {
        console.log("Weather Error:", error);
        weatherTemp.textContent = "--°C";
        weathCity.textContent = "Current Location";
        weathDes.textContent = "Weather not available";
        weatHdy.textContent = "--%";
        weatWid.textContent = "-- km/h";
        weatherIcon.className = "ri-error-warning-line";

    }
}

goalCard.addEventListener("click", () => {
    goalSec.style.display = "flex";
})

goalCls.addEventListener("click", () => {
    goalSec.style.display = "none";
})

const getTdayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();

    return `${year}-${month}-${date}`;
}

const sGoals = () => {
    localStorage.setItem(goalSave, JSON.stringify(goals));
    localStorage.setItem(goalDate, getTdayDate());
}

const loadGoals = () => {
    const sDate = localStorage.getItem(goalDate);
    const tDate = getTdayDate();

    if (sDate !== tDate) {
        localStorage.removeItem(goalSave);
        localStorage.setItem(goalDate, tDate);
        goals = [];
        return;
    }

    const saveGoals = localStorage.getItem(goalSave);

    if (saveGoals) {
        goals = JSON.parse(saveGoals);
    }
}

const showGoals = () => {
    goalLst.innerHTML = "";

    goals.forEach((goal, index) => {
        const goalDiv = document.createElement("div");
        goalDiv.classList.add("goal-item");

        if (goal.completed) {
            goalDiv.classList.add("completed");
        }

        goalDiv.innerHTML = `
            <h3>${goal.text}</h3>

            <div class="goal-actions">
                <button class="goal-complete" data-index="${index}">
                    ${goal.completed ? "Undo" : "Done"}
                </button>

                <button class="goal-delete" data-index="${index}">
                    Delete
                </button>
            </div>
        `;

        goalLst.appendChild(goalDiv);
    });
}

goalAdBtn.addEventListener("click", () => {
    const goalText = goalInput.value.trim();

    if (goalText === "") {
        goalInput.focus();
        return;
    }

    if (goals.length >= 5) {
        alert("You can add only 5 goals in a day");
        return;
    }

    const goalObj = {
        text: goalText,
        completed: false
    };

    goals.push(goalObj);

    goalInput.value = "";

    sGoals();
    showGoals();
});

goalLst.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("goal-complete")) {
        goals[index].completed = !goals[index].completed;
        sGoals();
        showGoals();
    }

    if (e.target.classList.contains("goal-delete")) {
        goals.splice(index, 1);
        sGoals();
        showGoals();
    }
});

const updynImage = () => {
    const now = new Date();
    const hours = now.getHours();

    if(hours >= 6 && hours < 18){
        dynImage.src = "./assets/sun-png-finally-summer-here-dromahair-arts-recreation-centre-10.png";
        dynImage.style = "rotate: calc(90deg)";
    }
    else{
        dynImage.src = "./assets/bb0ebb57dcb560c6eb0b39b89cdcb450 copy.png";
    }
};


const savethme = localStorage.getItem("theme");

if(savethme) {
    body.setAttribute("data-theme", savethme);

    if(savethme === "dark"){
        togIcon.className = "ri-moon-line";
    }else {
        togIcon.className = "ri-sun-line";
    }
}

togBtn.addEventListener("click", () => {
    const curthme = body.getAttribute("data-theme");

    if(curthme === "dark"){
        body.setAttribute("data-theme", "light");
        togIcon.className = "ri-sun-line";
        localStorage.setItem("theme", "light");
    }
    else{
        body.setAttribute("data-theme", "dark");
        togIcon.className = "ri-moon-line";
        localStorage.setItem("theme", "dark"); 
    }
})

const sDlyPlans = () => {
    const plans = [];

    planinp.forEach((input) => {
        plans.push(input.value);
    });

    localStorage.setItem(sPlan, JSON.stringify(plans));
};

const loDlyPlans = () => {
    const savePlns = JSON.parse(localStorage.getItem(sPlan)) || [];

    planinp.forEach((input, index) => {
        if (savePlns[index] !== undefined) {
            input.value = savePlns[index];
        }
        input.addEventListener("input", sDlyPlans);
    });

}


loDlyPlans();
sTodoTsks();
updynImage();
loadGoals();
showGoals();




updateWeat();

showT();



/* gettoDate(); */

dailyQuotes();
setInterval(dailyQuotes, 60000);

updateTime();
setInterval(updateTime, 1000);


UpdateWeather();