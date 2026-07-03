const adBtn = document.querySelector("#adbtn");
const FormBox = document.querySelector(".form-box");

const closeBtn = document.querySelector("#closebtn");
const body = document.querySelector("body");

const Form = document.querySelector("form");
const transactionType = document.querySelector("#transactionType");
const Description = document.querySelector("#Description");
const Amount = document.querySelector("#Amount");
const dateDta = document.querySelector("#Dte");
const Category = document.querySelector("#Category");

const transactionDiv = document.querySelector("#transactionTableBody");
const emptyState = document.querySelector("#emptyState"); 

const balance = document.querySelector("#balance");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const transactionCount = document.querySelector("#transactionCount");

const chartCanvas = document.querySelector("#cashFlowChart")

const deleteAll = document.querySelector("#deleteAll");
const fltAll = document.querySelector("#fltAll");
const fltIncome = document.querySelector("#fltIncome");
const fltExpense = document.querySelector("#fltExpense");
const resetFlt = document.querySelector("#resetFlt");

const fltbtns = document.querySelectorAll(".filter-btn");

const togBtn = document.querySelector(".togbtn");
const icon = document.querySelector("#lighticon");

const currency = document.querySelector("#currency");

const sigbtn = document.querySelector("#sign-btn")
const prosting = document.querySelector(".prosting");
const proClosebtn = document.querySelector("#proClosebtn");

const usrNme = document.querySelector("#usrNme");
const sProfle = document.querySelector("#sProfle");
const soutProfle = document.querySelector("#s-outProfle");

const transactionsArr = [];

let cashFlowChart;
let currFltr = null;
let doSign = false;


let ui = () => {

    transactionDiv.innerHTML = "";

    const fltTran = transactionsArr.filter((elem) => {
        if (currFltr === null) {
            return true;
        }else{
            return elem.type === currFltr;
        }
    });

    fltTran.forEach((elem) => {
        transactionDiv.innerHTML += `
        <tr>
            <td class="date-col">${elem.date}</td>
            <td>${elem.description}</td>
            <td><span class="cat-pill">${elem.category}</span></td>
            <td class="amount ${elem.type}">${elem.type === 'income' ? '+' : '−'}${currfatt(elem.amount)}</td>
            <td><button onClick="deleteTransaction(${elem.id})" class="delete-btn"><i class="ri-delete-bin-line"></i></button></td>
        </tr>
        `;
    });
        
    if (transactionsArr.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    updateSummary();
    renChart();

}

adBtn.addEventListener("click", () => {

    if(doSign === false){
        alert("Sign in toh karna padega n bhai.., kardo plz")
        return;
    }
    FormBox.style.display = "flex";
    body.style.overflow = "hidden";
    
    
});

closeBtn.addEventListener("click", () => {
    FormBox.style.display = "none";
    body.style.overflow = "auto";
});

Form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    let type = transactionType.value;
    let description = Description.value;
    let amount = Amount.value;
    let date = dateDta.value;
    let category = Category.value;
    /* console.log(type, description, amount, date, category); */

    if (
        type === "" || 
        description.trim() === "" || 
        amount.trim() === "" || 
        date === "" || 
        category === "") {
            alert("mere bhai, sab bhar de, kuch chhoda mat");
            return;
    }

    let obj = {
        id: Date.now(),
        type,
        description,
        amount: Number(amount),
        date,
        category,
        currency: "INR",
    };

    transactionsArr.push(obj);

    ui();
    FormBox.style.display = "none";
    body.style.overflow = "auto";
    console.log(transactionsArr);

    Form.reset();

});


const deleteTransaction = (id) => {
    const index = transactionsArr.findIndex((elem) => elem.id === id);
    if (index !== -1) {
        transactionsArr.splice(index, 1);
    }
    ui();
};

const updateSummary = () => {
    let incomeValue = 0;
    let expenseValue = 0;

    transactionsArr.forEach((elem) => {
        if (elem.type === "income") {
            incomeValue += Number(elem.amount);
        } else if (elem.type === "expense") {
            expenseValue += Number(elem.amount);
        }
});

    const balanceValue = incomeValue - expenseValue;

    balance.textContent = currfatt(balanceValue);
    income.textContent = currfatt(incomeValue);
    expense.textContent = currfatt(expenseValue);
    transactionCount.textContent = transactionsArr.length;

};


const renChart = () => {
    const labels = transactionsArr.map((elem) => elem.date);
    const data = transactionsArr.map((elem) => {
        
        if(elem.type === "income"){
            return Number(elem.amount);
        }else{
            return -Number(elem.amount);
        }

        
    });
    /* console.log(data); */

    const bgColor = transactionsArr.map((elem) => {
        if(elem.type === "income"){
            return "#059669";
        } else {
            return "#DC2626";
        }
    });

    if (cashFlowChart) {
        cashFlowChart.destroy();
    };

    cashFlowChart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Cash Flow',
                data,   
                backgroundColor: bgColor,
            }]
        }
    });

};

deleteAll.addEventListener("click", () => {
    if(!transactionsArr.length) {
        return;
    }

    if(confirm("sb delete ho jayega bhai, kardu?"))
    transactionsArr.length = 0;

    ui();
});

fltAll.addEventListener("click", () => {
    currFltr = null;
    atbtn(fltAll);
    ui();
});

fltIncome.addEventListener("click", () => {
    currFltr = "income";
    atbtn(fltIncome);
    ui();
});

fltExpense.addEventListener("click", () => {
    currFltr = "expense";
    atbtn(fltExpense);
    ui();
});

resetFlt.addEventListener("click", () => {
    currFltr = null;
    atbtn(fltAll);
    ui();
});

const atbtn = (a) => {
    fltbtns.forEach((e) => {
        e.classList.remove("active");
    });
    a.classList.add("active");
}

togBtn.addEventListener("click", () => {
    if(body.dataset.theme === "light"){
        body.setAttribute("data-theme", "dark");
         
        icon.classList.remove("ri-moon-line");
        icon.classList.add("ri-sun-line");

        

    }else{
        body.setAttribute("data-theme", "light");

        icon.classList.remove("ri-sun-line");
        icon.classList.add("ri-moon-line");
    }
});

const rates = {
    "INR": 1,
    "USD": 0.012,
    "EUR": 0.011,
    "GBP": 0.0097,
    "JPY": 1.64,
}

const currSym = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥"
}

const currfatt = (amount) => {
    const setcurr = currency.value;

    console.log(setcurr)
    const cngAmount = amount * rates[setcurr];

    return `${currSym[setcurr]}${cngAmount.toFixed(2)}`;
}

currency.addEventListener("change", () => {
    ui();
})

sigbtn.addEventListener("click", () => {
    
    prosting.style.display = "flex";
    body.style.overflow = "hidden";


})

proClosebtn.addEventListener("click", () =>{
    prosting.style.display = "none";
    body.style.overflow = "auto";
})

sProfle.addEventListener("click", () => {
    if(usrNme.value.trim() === ""){
        alert("Naam bhar do n.. plz");
        return;
    }

    doSign = true;
    /* sigbtn.textContent = usrNme.value.trim(); */
    btnpro();
    
    prosting.style.display = "none";
    body.style.overflow = "auto";

    ui();

})

const btnpro = () =>{
    if(doSign){
        sigbtn.textContent = usrNme.value.trim();
        sProfle.textContent = "Update Profile";

        soutProfle.style.display = "block";
    }
    else{
        sigbtn.textContent = "SIGN IN";
        sProfle.textContent = "Save Profile";

        soutProfle.style.display = "none";
    }
}

soutProfle.addEventListener("click", () => {
    doSign = false;
    usrNme.value = "";
    
    btnpro();
    
    prosting.style.display = "none";
    body.style.overflow = "auto";

    ui();
})

/* currfatt(); */

ui();