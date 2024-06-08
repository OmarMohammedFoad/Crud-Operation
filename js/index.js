
let firstName = document.getElementById('first');
let lastName = document.getElementById('last');
let email = document.getElementById('email');
let age = document.querySelector('#age')
let mytable = document.getElementById("mytable");
let avatar = document.getElementById("avatar");
let loading = document.getElementById("loading");
let search = document.querySelector('#search');
let error_text = document.querySelector('#error-text');
let error_text2 = document.querySelector('#error-text2');
var localProduct = "product";
let usersArr = [];
if (localStorage.getItem(localProduct)) {
    usersArr = JSON.parse(localStorage.getItem(localProduct))
    displayComponent(usersArr);
}






function addProfile() {

    if(regularExpressionForAnyElement(firstName,firstName.value,"text") && regularExpressionForAnyElement(lastName,lastName.value,"text") && regularExpressionForAnyElement(email,email.value,"email") && regularExpressionForAnyElement(age,age.value,"age") ){
    var users = {
        first: firstName.value,
        last: lastName.value,
        email: email.value,
        age:age.value,
        avatar: avatar.files[0]?.name
    }
    console.log(users);
    usersArr.push(users);
    displayComponent(usersArr);
    addToLocalStorage()
    deleteData();
    }

    // loading.innerHTML = `<div class="alert alert-success" role="alert">`;

}


function addToLocalStorage() {
    localStorage.setItem(localProduct, JSON.stringify(usersArr));

}


function deleteData(editIndex) {
        firstName.value = editIndex ? usersArr[editIndex].first : "",
        lastName.value = editIndex ? usersArr[editIndex].lastName : "",
        email.value = editIndex ? usersArr[editIndex].email : "",
        age.value = editIndex?  usersArr[editIndex].age : ""
}


function displayComponent(arr) {
    mytable.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {

        mytable.innerHTML += ` <tr>
        <th scope="row">${i}</th>
        <td><img src="../imgs/${arr[i].avatar}" alt="avatar" class="img-thumbnail"></td>
        <td>${arr[i].first}</td>
        <td>${arr[i].last}</td>
        <td>${arr[i].age}</td>
        <td>${arr[i].email}</td>
        <td>
          <button type="button" onclick="editOneComponent(${i})"  class="btn btn-outline-primary">Edit <i class="fas fa-trash-alt"></i> </button>
          <button type="button" onclick="deleteOneComponent(${i})" class="btn btn-outline-danger">Delete</button>
        </td>
      </tr>`
    }



}


function deleteOneComponent(ind) {
    usersArr.splice(ind, 1);
    displayComponent(usersArr);
    addToLocalStorage()
}

function editOneComponent(ind) {
    console.log(usersArr[ind], "from edit");
    firstName.value = usersArr[ind].first;
    lastName.value = usersArr[ind].last;
    email.value = usersArr[ind].email;
    age.value = usersArr[ind].age;
    usersArr.splice(ind, 1);
    console.log(usersArr);
    displayComponent(usersArr)
}



search.addEventListener("keyup", (e) => {
    let seachedKeyWord = e.target.value;

    let matchedArray = usersArr.filter((user) => user.first.toLowerCase().includes(seachedKeyWord.toLowerCase()));


    displayComponent(matchedArray)
});




// function highlightSearchText(text,charNum=1){

// }
firstName.addEventListener("keyup", (e) => {
    e.preventDefault();

    regularExpressionForText(e.target.value);

});


lastName.addEventListener("keyup", (e) => {
    e.preventDefault();

    regularExpressionForText(e.target.value);
})

email.addEventListener("keyup", (e) => {
    e.preventDefault();

    regularExpressionForEmail(e.target.value);
});

age.addEventListener("keyup", (e) => {
    e.preventDefault();
console.log(e.target.value);
    regularExpressionForAge(e.target.value);
})

function regularExpressionForAnyElement(ele,text,regType   ) {
    let regex = AllRegular(regType);
    if (regex.test(text)) {
     
        if (ele.classList.contains("is-invalid")) {
            ele.classList.replace("is-invalid", "is-valid");
        } else {
            ele.classList.add("is-valid");
        }
        ele.nextElementSibling.classList.replace('d-block', 'd-none');
    } else {

        if (ele.classList.contains("is-valid")) {
            ele.classList.replace("is-valid", "is-invalid")
        } else {
            ele.classList.add("is-invalid")
        }
        ele.nextElementSibling.classList.replace('d-none', 'd-block');
    }
    console.log(regex.test(text));
    return regex.test(text);
}

function regularExpressionForEmail(emailValue) {
    regularExpressionForAnyElement(email,emailValue ,"email");
}

function regularExpressionForText(text) {
    regularExpressionForAnyElement(firstName,text ,"text");

}

function regularExpressionForText(text) {
    regularExpressionForAnyElement(lastName,text ,"text");

}

function regularExpressionForAge(ageValue) {
    regularExpressionForAnyElement(age,ageValue ,"age");

}

function regularExpressionForPhone(phone) {
    let regex = /^[0-9]{11}$/;
    return regex.test(phone);
}

function AllRegular(regType){
    let regexText = /^[a-zA-Z]{3,}$/;
    let regexEmail = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{3,}.[a-zA-Z]{2,3}$/;
    let regex = /^[0-9]{2}$/;

    switch (regType) {
        case "text":
            return regexText;
        case "email":
            return regexEmail;
        case "age":
            return regex;
        case "phone":
            return regex;
        default:
            break;
    }


}

