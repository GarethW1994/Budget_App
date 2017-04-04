//DOM elements
var tabItemOne = document.getElementById('info');
var saveBTN = document.getElementById('saveBTN');
var userName = document.getElementById('userName');
var userSurname = document.getElementById('userSurname');
var userEmail = document.getElementById('userEmail');
var userSalary = document.getElementById('userSalary');
var userExpense = document.getElementById('userExpense');
var errorDisplay = document.querySelector('.errorDisplay');
var avatar = document.querySelector('.avatar');
var userNotifications = document.querySelector('.notifications');
var paragraphText = document.getElementById('notifyText');
var menu = document.querySelector('.menu');
var sideBar = document.querySelector('.cards');

//create handlebars template
var source = document.getElementById('information').innerHTML;
var template = Handlebars.compile(source);
var displayInfo = document.querySelector('.userInfo');


//user information
var user = [
    {
        name: "",
        surname: "",
        email: "",
        salary: 0
    }
];

//months arr
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const d = new Date();
var year = d.getFullYear();


//onload
window.onload = function () {
    tabItemOne.classList.add('selected');
    sideBar.classList.add('active');
    showCategories();

    if (localStorage.counter === undefined) {
        monthText.innerHTML = months[0] + " " + year;
    } else {

        monthText.innerHTML = months[localStorage.counter] + " " + year;
        
            }

    if (localStorage.userInfo === undefined) {
        errorDisplay.classList.add('addUser');
        validateInput();
    } else {

        var userDetails = JSON.parse(localStorage.userInfo);

        displayInfo.innerHTML = template(userDetails[0]);

        avatar.classList.add('animateIn');
        loadInfo();

        paragraph.innerHTML = 'Welcome Back ' + userName.value; 
        categoryPopUpNotifcation();

        
        if (localStorage.categories === undefined) {
            noCategoryFound();
       localStorage.setItem('counter', 0);
        } else {
            addCategory();
            calcExpenses();
        }

    }
            
}

//set user info to the object
function setUserInfo() {
    var name = userName.value;
    var surname = userSurname.value;
    var email = userEmail.value;
    var salary = userSalary.value;

    if (name.length < 3 || surname.length < 3 || email.length < 6) {
        //error
        notificationPopUp();

        //add class to show notification
        notifications.classList.add('showNotify');
        //set the text of the paragraph to display the error message
        paragraphText.innerHTML = 'Email must contain at least 5 characters. Name and Surname must contain at least 3 characters.';

        //return false to the call back result
        return false;

    } else {
        if (isNaN(name) == true && isNaN(surname) == true && isNaN(email) == true) {
            if (email.includes('@') && email.includes('.')) {
                if (isNaN(salary) == false) {
                    if (salary < 1000) {
                        notificationPopUp();

                        paragraphText.innerHTML = 'salary must be at least R1000';

                        return false;
                    } else {
                        user[0].name = name;
                        user[0].surname = surname;
                        user[0].email = email;
                        user[0].salary = salary;
                        return true;
                    }
                } else {
                    notificationPopUp();

                    paragraphText.innerHTML = 'Salary must be a number!';

                    return false;
                }

            } else {
                notificationPopUp();
                paragraphText.innerHTML = 'Not a valid email address!';
                return false;
            }
        } else {
            //error
            notificationPopUp();
            paragraphText.innerHTML = 'Name, Surname or Email cannot be numbers!';
            return false;
        }

    }

}

function notificationPopUp() {
    userNotifications.classList.add('showNotify');
    setInterval(function () {
        removeNotification();
    }, 10500)
}

function removeNotification() {
    userNotifications.classList.remove('showNotify');
}


saveBTN.addEventListener('click', function () {
    var result = setUserInfo();


    if (result == true) {
        localStorage.setItem('userInfo', JSON.stringify(user));
        notificationPopUp();
        userNotifications.style.backgroundColor = "green";
        paragraphText.innerHTML = 'Information Saved Successfully! :)';
    }
});

function loadInfo() {
    if (localStorage.userInfo !== undefined) {
        var userData = JSON.parse(localStorage.userInfo);
        userName.value = userData[0].name;
        userSurname.value = userData[0].surname;
        userEmail.value = userData[0].email;
        userSalary.value = userData[0].salary;
        
           
        return true;
    } else {
        return false;
    }
}

menu.addEventListener('click', function () {
    if (sideBar.classList.contains('active') == true) {
        sideBar.classList.remove('active');
    } else {
        sideBar.classList.add('active');
    }
});

/////////////////styling///////////////////////
var tabItemTwo = document.getElementById('settings');
var infoCard = document.querySelector('.info');
var settingsCard = document.querySelector('.settings');

tabItemOne.addEventListener('click', function () {
    var result = loadInfo();

    if (result === true) {
        var userDetails = JSON.parse(localStorage.userInfo);
        avatar.classList.add('animateIn');
        displayInfo.innerHTML = template(userDetails[0]);
        errorDisplay.classList.remove('addUser');
        notifications.classList.remove('categoryActiveNotify');
        loadInfo();
    } else {
        errorDisplay.classList.add('addUser');
    }

    if (localStorage.categories == undefined) {
        noCategoryFound();
    }

    tabItemOne.classList.add('selected');
    tabItemTwo.classList.remove('selected');
    settingsCard.classList.add('switchOut');
    settingsCard.classList.remove('switchIn')

    infoCard.classList.remove('switchOut');
    infoCard.classList.add('switchIn');


});

tabItemTwo.addEventListener('click', function () {

    avatar.classList.remove('animateIn');
    errorDisplay.classList.remove('addUser');

    tabItemOne.classList.remove('selected');
    tabItemTwo.classList.add('selected');

    infoCard.classList.add('switchOut');
    infoCard.classList.remove('switchIn');

    settingsCard.classList.remove('switchOut');
    settingsCard.classList.add('switchIn');

});


/////////////////////ADD CATEGORY///////////////////////////
///GET DOM ELEMENTS
var expenseName = document.getElementById('expenseName');
var expenseValue = document.getElementById('expenseAmount');
var addCategoryBTN = document.getElementById('addExpense');
var notifications = document.querySelector('.categoryNotifications');
var paragraph = document.getElementById('paragraphCategory');
var selectedMonth = document.getElementById('monthSelect');

//OBJECT to store expense data
var expenseData = {
    January: {
        categoryName: [],
        categoryAmount: []
    },
    February: {
        categoryName: [],
        categoryAmount: []
    },
    March: {
        categoryName: [],
        categoryAmount: []
    },
    April: {
        categoryName: [],
        categoryAmount: []
    },
    May: {
        categoryName: [],
        categoryAmount: []
    },
    June: {
        categoryName: [],
        categoryAmount: []
    },
    July: {
        categoryName: [],
        categoryAmount: []
    },
    August: {
        categoryName: [],
        categoryAmount: []
    },
    September: {
        categoryName: [],
        categoryAmount: []
    },
    October: {
        categoryName: [],
        categoryAmount: []
    },
    November: {
        categoryName: [],
        categoryAmount: []
    },
    December: {
        categoryName: [],
        categoryAmount: []
    },
};


function validateInput() {
    var category = expenseName.value;
    var amount = expenseValue.value;

    if (localStorage.userInfo === undefined) {
        paragraph.innerHTML = "No User Information Found. Go To The Settings Tab";
        showPopUpNotification();


        return false;
    } else {
        if (category.length < 3 || amount.length < 3) {
            paragraph.innerHTML = 'category name or amount is too short! Must be more than 2 characters or numbers';
            categoryPopUpNotifcation();
            return false;
        } else {
            if (isNaN(category) == true) {
                if (isNaN(amount) == false) {
                    if (selectedMonth.value == "Select Month") {
                        paragraph.innerHTML = 'Please Select A Month';
                        categoryPopUpNotifcation();
                        return false;
                    } else {

                        if (localStorage.categories == undefined) {
                            initialPush();
                            return true;
                        } else {
                            updatingData();
                            return 'added successfully';
                        }
                    }
                } else {
                    paragraph.innerHTML = 'Expense Amount must contain numbers not characters!';
                    categoryPopUpNotifcation();
                    return false;
                }
            } else {
                paragraph.innerHTML = 'category must contain characters (a-z), not numbers!';
                categoryPopUpNotifcation();
                return false;
            }
        }
    }
}

function showPopUpNotification() {
    notifications.classList.add('categoryActiveNotify');
}

function categoryPopUpNotifcation() {
    notifications.classList.add('categoryActiveNotify');
    setInterval(function () {
        notifications.classList.remove('categoryActiveNotify');
    }, 10500)
}

function noCategoryFound() {
    showPopUpNotification();
    paragraph.innerHTML = "Add Your First Category";
}

function initialPush() {
    var category = expenseName.value;
    var amount = parseFloat(expenseValue.value);

    if (selectedMonth.value === months[0]) {
        expenseData.January.categoryName.push(category);
        expenseData.January.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[1]) {
        expenseData.February.categoryName.push(category);
        expenseData.February.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[2]) {
        expenseData.March.categoryName.push(category);
        expenseData.March.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[3]) {
        expenseData.April.categoryName.push(category);
        expenseData.April.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[4]) {
        expenseData.May.categoryName.push(category);
        expenseData.May.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[5]) {
        expenseData.June.categoryName.push(category);
        expenseData.June.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[6]) {
        expenseData.July.categoryName.push(category);
        expenseData.July.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[7]) {
        expenseData.August.categoryName.push(category);
        expenseData.August.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[8]) {
        expenseData.September.categoryName.push(category);
        expenseData.September.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[9]) {
        expenseData.October.categoryName.push(category);
        expenseData.October.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[10]) {
        expenseData.November.categoryName.push(category);
        expenseData.November.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[11]) {
        expenseData.December.categoryName.push(category);
        expenseData.December.categoryAmount.push(amount);
    }
}

function updatingData() {
    var category = expenseName.value;
    var amount = parseFloat(expenseValue.value);
    var newCategories = JSON.parse(localStorage.categories);

    if (selectedMonth.value === months[0]) {
        newCategories.January.categoryName.push(category);
        newCategories.January.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[1]) {
        newCategories.February.categoryName.push(category);
        newCategories.February.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[2]) {
        newCategories.March.categoryName.push(category);
        newCategories.March.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[3]) {
        newCategories.April.categoryName.push(category);
        newCategories.April.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[4]) {
        newCategories.May.categoryName.push(category);
        newCategories.May.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[5]) {
        newCategories.June.categoryName.push(category);
        newCategories.June.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[6]) {
        newCategories.July.categoryName.push(category);
        newCategories.July.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[7]) {
        newCategories.August.categoryName.push(category);
        newCategories.August.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[8]) {
        newCategories.September.categoryName.push(category);
        newCategories.September.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[9]) {
        newCategories.October.categoryName.push(category);
        newCategories.October.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[10]) {
        newCategories.November.categoryName.push(category);
        newCategories.November.categoryAmount.push(amount);
    }

    if (selectedMonth.value === months[11]) {
        newCategories.December.categoryName.push(category);
        newCategories.December.categoryAmount.push(amount);
    }

    localStorage.setItem('categories', JSON.stringify(newCategories));
}

///add category Button
addCategoryBTN.addEventListener('click', function () {
    var result = validateInput();

    if (result == true) {
        localStorage.setItem('categories', JSON.stringify(expenseData));
        localStorage.setItem('counter', 0);
    } else if (result === 'added successfully') {
        paragraph.innerHTML = 'Category Added Successfully!';
        notifications.classList.add('categoryActiveNotify');
    }
        expenseName.value = "";
        expenseValue.value = "";
        addCategory();
        showCategories();
        calcExpenses();
});

var categoryJan = document.querySelector('.categoryJan');
var categoryFeb = document.querySelector('.categoryFeb');
var categoryMar = document.querySelector('.categoryMar');
var categoryApr = document.querySelector('.categoryApr');
var categoryMay = document.querySelector('.categoryMay');
var categoryJun = document.querySelector('.categoryJun');
var categoryJul = document.querySelector('.categoryJul');
var categoryAug = document.querySelector('.categoryAug');
var categorySep = document.querySelector('.categorySep');
var categoryOct = document.querySelector('.categoryOct');
var categoryNov = document.querySelector('.categoryNov');
var categoryDec = document.querySelector('.categoryDec');
var categoryNotFound = document.querySelector('.categoryError');

function removeItemJan(event) {
     var item = event.target.parentNode;
    var parentNode = item.parentNode;
    var categoriesList = JSON.parse(localStorage.categories);


        categoryJan.children[0].addEventListener('click', function() {
        categoriesList.January.categoryAmount.splice(0, 1); 
        categoriesList.January.categoryName.splice(0, 1);
        parentNode.removeChild(item);
        localStorage.setItem('categories', JSON.stringify(categoriesList));
        });
} 

function addCategory() {
    var categories = JSON.parse(localStorage.categories);
    categoryJan.innerHTML = "";
    categoryFeb.innerHTML = "";
    categoryMar.innerHTML = "";
    categoryApr.innerHTML = "";
    categoryMay.innerHTML = "";
    categoryJun.innerHTML = "";
    categoryJul.innerHTML = "";
    categoryAug.innerHTML = "";
    categorySep.innerHTML = "";
    categoryOct.innerHTML = "";
    categoryNov.innerHTML = "";
    categoryDec.innerHTML = "";
    

      for (var i = 0; i < categories.January.categoryName.length; i++) {
            var li = document.createElement('li');
            var removeButton = document.createElement('button');
           removeButton.setAttribute('class', 'trashCan');
           
          li.setAttribute('id', 'category');
          
            li.innerHTML = categories.January.categoryName[i] + " - " + "R" + categories.January.categoryAmount[i];
            
            li.appendChild(removeButton);
            categoryJan.appendChild(li);
          
          removeButton.addEventListener('click', function() { removeItemJan(event);})
      }


        for (var i = 0; i < categories.February.categoryName.length; i++) {
            var li = document.createElement('li');
            var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.February.categoryName[i] + " - " + "R" + 
            categories.February.categoryAmount[i];
            
            li.appendChild(removeButton);
            categoryFeb.appendChild(li);
            
            removeButton.addEventListener('click', function() { removeItem(event);});
        }
    



        for (var i = 0; i < categories.March.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.March.categoryName[i] + " - " + "R" + categories.March.categoryAmount[i];
            li.appendChild(removeButton);
            categoryMar.appendChild(li);
        }
    


        for (var i = 0; i < categories.April.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.April.categoryName[i] + " - " + "R" + categories.April.categoryAmount[i];
           li.appendChild(removeButton);
            categoryApr.appendChild(li);
        }
    


        for (var i = 0; i < categories.May.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.May.categoryName[i] + " - " + "R" + categories.May.categoryAmount[i];
            li.appendChild(removeButton);
            categoryMar.appendChild(li);
        }
    



        for (var i = 0; i < categories.June.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.June.categoryName[i] + " - " + "R" + categories.June.categoryAmount[i];
            li.appendChild(removeButton);
            categoryJun.appendChild(li);
        }
    
  

        for (var i = 0; i < categories.July.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.July.categoryName[i] + " - " + "R" + categories.July.categoryAmount[i];
            li.appendChild(removeButton);
            categoryJul.appendChild(li);
        }
    


        for (var i = 0; i < categories.August.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.August.categoryName[i] + " - " + "R" + categories.August.categoryAmount[i];
            li.appendChild(removeButton);
            categoryAug.appendChild(li);
        }
    


        for (var i = 0; i < categories.September.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.September.categoryName[i] + " - " + "R" + categories.September.categoryAmount[i];
            li.appendChild(removeButton);
            categorySep.appendChild(li);
        }
    

   

        for (var i = 0; i < categories.October.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.October.categoryName[i] + " - " + "R" + categories.October.categoryAmount[i];
            li.appendChild(removeButton);
            categoryOct.appendChild(li);
        }

    


        for (var i = 0; i < categories.November.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttributea('id', 'category');
            li.innerHTML = categories.November.categoryName[i] + " - " + "R" + categories.November.categoryAmount[i];
            li.appendChild(removeButton);
            categoryNov.appendChild(li);
        }

    


        for (var i = 0; i < categories.December.categoryName.length; i++) {
            var li = document.createElement('li');
              var removeButton = document.createElement('button');
            removeButton.setAttribute('class', 'trashCan');
            
            li.setAttribute('id', 'category');
            li.innerHTML = categories.December.categoryName[i] + " - " + "R" + categories.December.categoryAmount[i];
            li.appendChild(removeButton);
            categoryDec.appendChild(li);
        }
    
}


//////////////months/////////////////////////////
var prevBTN = document.querySelector('.left');
var nextBTN = document.querySelector('.right');
var monthText = document.getElementById('monthText');



var counter = 0;


//add event listeners to buttons
nextBTN.addEventListener('click', function () {
    if (localStorage.counter === undefined) {
        counter = 0;
        counter++;
    } else {
        counter = localStorage.counter;

        if (counter < 11) {
            counter++;

        } else {
            counter = 11;
        }
    }
    monthText.innerHTML = months[counter] + " " + year;
    localStorage.setItem('counter', counter);

    showCategories();
    calcExpenses();
});

prevBTN.addEventListener('click', function () {
    if (localStorage.counter === undefined) {
        counter = 11;
        counter--;
    } else {
        counter = localStorage.counter;

        if (counter > 1) {
            counter--;

        } else {
            counter = 0;
        }
    }

    monthText.innerHTML = months[counter] + " " + year;
    localStorage.setItem('counter', counter);
    showCategories();
    calcExpenses();
});

function showCategories() {
    if (localStorage.categories === undefined) {
    categoryNotFound.classList.add('showCategoryError');
    } else {
        
    var counter = localStorage.counter;
    var currentCategory = JSON.parse(localStorage.categories);
    
    categoryJan.classList.remove('showCategory');
    categoryFeb.classList.remove('showCategory');
    categoryApr.classList.remove('showCategory');
    categoryMar.classList.remove('showCategory');
    categoryMay.classList.remove('showCategory');
    categoryJun.classList.remove('showCategory');
    categoryJul.classList.remove('showCategory');
    categoryAug.classList.remove('showCategory');
    categorySep.classList.remove('showCategory');
    categoryOct.classList.remove('showCategory');
    categoryNov.classList.remove('showCategory');
    categoryDec.classList.remove('showCategory');

    if (months[counter] === months[0]) {
        if (currentCategory.January.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError');
        } else {
            categoryNotFound.classList.remove('showCategoryError');
        categoryJan.classList.add('showCategory');
            
        }
    }

    if (months[counter] === months[1]) {
        if (currentCategory.February.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError');
        } else {
         categoryNotFound.classList.remove('showCategoryError');   
        categoryFeb.classList.add('showCategory');
        }
    }
    
    if (months[counter] === months[2]) {
        if (currentCategory.March.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryMar.classList.add('showCategory');
        }
    }
    
    if (months[counter] === months[3]) {
          if (currentCategory.April.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryApr.classList.add('showCategory');
        }
    }
    
    if (months[counter] === months[4]) {
        if (currentCategory.May.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryMay.classList.add('showCategory');
        }
    }
    if (months[counter] === months[5]) {
       if (currentCategory.June.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryJun.classList.add('showCategory');
        }
    }
    if (months[counter] === months[6]) {
     if (currentCategory.July.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryJul.classList.add('showCategory');
        }
    }
    if (months[counter] === months[7]) {
          if (currentCategory.August.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryAug.classList.add('showCategory');
        }
    }
    if (months[counter] === months[8]) {
       if (currentCategory.September.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categorySep.classList.add('showCategory');
        }
    }
    if (months[counter] === months[9]) {
       if (currentCategory.October.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryOct.classList.add('showCategory');
        }
    }
    if (months[counter] === months[10]) {
       if (currentCategory.November.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryNov.classList.add('showCategory');
        }
    }
    if (months[counter] === months[11]) {
       if (currentCategory.December.categoryName.length === 0) {
            categoryNotFound.classList.add('showCategoryError')
        } else {
        categoryNotFound.classList.remove('showCategoryError');
        categoryDec.classList.add('showCategory');
        }
    }
    } 
}


/////////////////////total expenses///////////////////////////
var ExpenseSource = document.getElementById('expenses').innerHTML;
var ExpenseTemplate = Handlebars.compile(ExpenseSource);
var ExpenseDisplay = document.getElementById('ExpenseDisplay');
var chartDiv = document.getElementById('chartdiv');
var chart;
 var chartData = [
                {
                    "month": "January",
                    "amount": 0,
                    "color": "#FF0F00"
                },
                {
                    "month": "February",
                    "amount": 0,
                    "color": "#B22222"
                },
                {
                    "month": "March",
                    "amount": 0,
                    "color": "#FF9E01"
                },
                {
                    "month": "April",
                    "amount": 0,
                    "color": "#FCD202"
                },
                {
                     "month": "May",
                    "amount": 0,
                    "color": "#F8FF01"
                },
                {
                     "month": "June",
                    "amount": 0,
                    "color": "#B0DE09"
                },
                {
                     "month": "July",
                    "amount": 0,
                    "color": "#04D215"
                },
                {
                    "month": "August",
                    "amount": 0,
                    "color": "#0D8ECF"
                },
                {
                     "month": "September",
                    "amount": 0,
                    "color": "#0D52D1"
                },
                {
                     "month": "October",
                    "amount": 0,
                    "color": "#2A0CD0"
                },
                {
                     "month": "November",
                    "amount": 0,
                    "color": "#8A0CCF"
                },
                {
                    "month": "December",
                    "amount": 0,
                    "color": "#CD0D74"
                }
            ];


function chartGenerate() {
if (localStorage.expense !== undefined) {
    

var expense = JSON.parse(localStorage.expense);
           
    for (var i =0; i < expense.length; i++) {
    chartData[i].amount = expense[i].total_expense;
        
    }

            AmCharts.ready(function () {
                // SERIAL CHART
                chart = new AmCharts.AmSerialChart();
                chart.dataProvider = chartData;
                chart.categoryField = "month";
                // the following two lines makes chart 3D
                chart.depth3D = 40;
                chart.angle = 55;

                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.labelRotation = 0;
                categoryAxis.dashLength = 5;
                categoryAxis.gridPosition = "start";

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.title = "Monthly Expenditure";
                valueAxis.dashLength = 3;
                chart.addValueAxis(valueAxis);

                // GRAPH
                var graph = new AmCharts.AmGraph();
                graph.valueField = "amount";
                graph.colorField = "color";
                graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
                graph.type = "column";
                graph.lineAlpha = 0;
                graph.fillAlphas = 1;
                chart.addGraph(graph);

                // CURSOR
                var chartCursor = new AmCharts.ChartCursor();
                chartCursor.cursorAlpha = 0;
                chartCursor.zoomable = false;
                chartCursor.categoryBalloonEnabled = false;
                chart.addChartCursor(chartCursor);

                chart.creditsPosition = "top-right";


                // WRITE
                chart.write("chartdiv");
            });
    }
}

var totalExpenses = [
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0},
    {total_expense: 0, total_savings: 0}
];

function calcExpenses() {
    if (localStorage.categories !== undefined) {
    var currentExpenses = JSON.parse(localStorage.categories);

    var counter = parseInt(localStorage.counter);   
    ExpenseDisplay.innerHTML = "";

    for (var x = 0; x < totalExpenses.length; x++) {
        totalExpenses[x].total_expense = 0;
         totalExpenses[x].total_savings = 0;
    }
    
    for (var i =0; i < currentExpenses.January.categoryAmount.length; i++) {
        totalExpenses[0].total_expense += parseFloat(currentExpenses.January.categoryAmount[i]);
        totalExpenses[0].total_savings = parseFloat(userSalary.value) - totalExpenses[0].total_expense;
    }
    
     for (var i =0; i < currentExpenses.February.categoryAmount.length; i++) {
        totalExpenses[1].total_expense += parseFloat(currentExpenses.February.categoryAmount[i]);
    totalExpenses[1].total_savings = parseFloat(userSalary.value) - totalExpenses[1].total_expense;
     }
    
     for (var i =0; i < currentExpenses.March.categoryAmount.length; i++) {
        totalExpenses[2].total_expense += parseFloat(currentExpenses.March.categoryAmount[i]);
    totalExpenses[2].total_savings = parseFloat(userSalary.value) - totalExpenses[2].total_expense;
     }
    
     for (var i =0; i < currentExpenses.April.categoryAmount.length; i++) {
        totalExpenses[3].total_expense += parseFloat(currentExpenses.April.categoryAmount[i]);
    totalExpenses[3].total_savings = parseFloat(userSalary.value) - totalExpenses[3].total_expense;
     }
    
     for (var i =0; i < currentExpenses.May.categoryAmount.length; i++) {
        totalExpenses[4].total_expense += parseFloat(currentExpenses.May.categoryAmount[i]);
    totalExpenses[4].total_savings = parseFloat(userSalary.value) - totalExpenses[4].total_expense;
     }
    
     for (var i =0; i < currentExpenses.June.categoryAmount.length; i++) {
        totalExpenses[5].total_expense += parseFloat(currentExpenses.June.categoryAmount[i]);
    totalExpenses[5].total_savings = parseFloat(userSalary.value) - totalExpenses[5].total_expense;
     }
    
     for (var i =0; i < currentExpenses.July.categoryAmount.length; i++) {
        totalExpenses[6].total_expense += parseFloat(currentExpenses.July.categoryAmount[i]);
    totalExpenses[6].total_savings = parseFloat(userSalary.value) - totalExpenses[6].total_expense;
     }
    
     for (var i =0; i < currentExpenses.August.categoryAmount.length; i++) {
        totalExpenses[7].total_expense += parseFloat(currentExpenses.August.categoryAmount[i]);
    totalExpenses[7].total_savings = parseFloat(userSalary.value) - totalExpenses[7].total_expense;
     }
    
     for (var i =0; i < currentExpenses.September.categoryAmount.length; i++) {
        totalExpenses[8].total_expense += parseFloat(currentExpenses.September.categoryAmount[i]);
         totalExpenses[8].total_savings = parseFloat(userSalary.value) - totalExpenses[8].total_expense;
    }
    
     for (var i =0; i < currentExpenses.October.categoryAmount.length; i++) {
        totalExpenses[9].total_expense += parseFloat(currentExpenses.October.categoryAmount[i]);
    totalExpenses[9].total_savings = parseFloat(userSalary.value) - totalExpenses[9].total_expense;
     }
    
     for (var i =0; i < currentExpenses.November.categoryAmount.length; i++) {
        totalExpenses[10].total_expense += parseFloat(currentExpenses.November.categoryAmount[i]);
         totalExpenses[10].total_savings = parseFloat(userSalary.value) - totalExpenses[10].total_expense;
    }
    
    
     for (var i =0; i < currentExpenses.December.categoryAmount.length; i++) {
        totalExpenses[11].total_expense += parseFloat(currentExpenses.December.categoryAmount[i]);
         totalExpenses[11].total_savings = parseFloat(userSalary.value) - totalExpenses[11].total_expense;
    }
    
    ExpenseDisplay.innerHTML = ExpenseTemplate(totalExpenses[counter]);
    var savingsDisplay = document.getElementById('totalSavingsNum');
        
    var savingsString = totalExpenses[counter].total_savings.toLocaleString();
    
        if (savingsString.includes('-') === true) {
            
            savingsDisplay.style.color = "#B22222";
        }else {
            savingsDisplay.style.color = "#32CD32";
        }
}
    localStorage.setItem('expense', JSON.stringify(totalExpenses));
    
   
chartGenerate();
    
}

chartGenerate();



