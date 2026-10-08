// Get HTML elements
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const totalAmount = document.getElementById("totalAmount");

const foodTotal = document.getElementById("foodTotal");
const travelTotal = document.getElementById("travelTotal");
const shoppingTotal = document.getElementById("shoppingTotal");
const entertainmentTotal =
    document.getElementById("entertainmentTotal");




// Load saved expenses
const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];


// Display expenses
function displayExpenses() {

    expenseList.innerHTML = "";
    
    const maxAmount = expenses.reduce(function(max, expense) {
    return Math.max(max, Number(expense.amount));
}, 0);

    expenses.forEach(function(expense, index) {
        
          const height =
        (Number(expense.amount) / maxAmount) * 100;

    const chartBar =
        document.querySelectorAll(".chart-bar")[index];

    chartBar.style.height = `${height}%`;

        const expenseItem = document.createElement("div");

        expenseItem.classList.add("expense-item");

        expenseItem.innerHTML = `

            <div class="expense-info">
                <h3>${expense.name}</h3>
                <p>${expense.category}</p>
            </div>

            <span class="expense-amount">
                ₹${expense.amount}
            </span>

            <button class="delete-btn" data-index="${index}">
        Delete
            </button>
        `;

        const deleteButton =
    expenseItem.querySelector(".delete-btn"); //querySelector() finds the first element matching that CSS selector.

    deleteButton.addEventListener("click", function() {

    const index = Number(deleteButton.dataset.index);

    expenses.splice(index, 1);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();
    calculateTotal();
    calculateCategoryTotals();
});


        expenseList.appendChild(expenseItem);
    });
}


// Calculate total
function calculateTotal() {

    const total = expenses.reduce(function(sum, expense) {

        return sum + Number(expense.amount);

    }, 0);

    totalAmount.textContent = `₹${total}`;
}

function calculateCategoryTotals() {

    const categoryTotals = {
        Food: 0,
        Travel: 0,
        Shopping: 0,
        Entertainment: 0
    };

     expenses.forEach(function(expense) {

        categoryTotals[expense.category] += Number(expense.amount);

    });
    console.log(categoryTotals);

    foodTotal.textContent = `₹${categoryTotals.Food}`;
    travelTotal.textContent = `₹${categoryTotals.Travel}`;
    shoppingTotal.textContent = `₹${categoryTotals.Shopping}`;
    entertainmentTotal.textContent =
    `₹${categoryTotals.Entertainment}`;
}

// Add expense
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value;
    const amount = expenseAmount.value;
    const category = expenseCategory.value;
    
    if (amount <= 0) {
    alert("Please enter a valid amount.");
    return;
}

    if (name.trim() === "") {
    alert("Please enter an expense name.");
    return;
}

    const expense = {
        name: name,
        amount: amount,
        category: category
    };

    // Add to array
    expenses.push(expense);

    // Save to localStorage
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    // Update UI
    displayExpenses();
    calculateTotal();
    calculateCategoryTotals();

    // Clear form
    expenseForm.reset();
});


// Show saved data on page load
displayExpenses();
calculateTotal();
calculateCategoryTotals();