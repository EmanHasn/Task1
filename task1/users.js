//set variables
const addUser = document.querySelector("#addUser");
let userWrap = document.querySelector("#userWrap");

// read from localStorage
const readFromStorage = (key="users") => JSON.parse(localStorage.getItem(key)) || [];

// write to localStorage
const writeFromStorage = (users , key)=> localStorage.setItem(users , JSON.stringify(key));

const userHeads = ["Title" , "Content" , "Comment"]
//add Form

//draw
if(addUser){
    addUser.addEventListener('submit', function(e){
        e.preventDefault();
        const user = {id:Date.now()}
        userHeads.forEach(head=> user[head] = this.elements[head].value)
        console.log(user)
        const users = readFromStorage();
        users.push(user)
       writeFromStorage("users", users);
       addUser.reset();
       window.location.href = "index.html"
    })
}
drawAll = (allUsers) =>{
    userWrap.innerHTML = "";
    console.log(allUsers);
    allUsers.forEach((user , index)=>{
       const tr = createMyOwnEle("tr" , userWrap);
       let td = createMyOwnEle("td" , tr , user.id);
        td = createMyOwnEle("td" , tr )
        let booklink = createMyOwnEle("a" , td , user.Title , "btn outline-none text-primary")
        td = createMyOwnEle("td" , tr )
       const delBtn = createMyOwnEle("button" , td ,   "delete" , "btn btn-danger")
      
       delBtn.addEventListener("click" , function(){
           console.log("delete btn" , user.id , index)
           allUsers.splice(index , 1);
           writeFromStorage(allUsers);
           drawAll(allUsers)
       })
       booklink.addEventListener("click" , showUsers)
    })
}

const showUsers = ()=>{
    readFromStorage("single");
    window.location.href = "single.html"; 
}

// create myelements
const createMyOwnEle = (createdElement, parent, txt = null , classes = null) => {
    const creatEle = document.createElement(createdElement);
    parent.appendChild(creatEle);
    creatEle.textContent = txt
    creatEle.classList = classes;
    return creatEle;
}
//delete
if (userWrap){
    const allUsers = readFromStorage();
    drawAll(allUsers)
  
}

//showUsers
let singleUserWrap = document.querySelector("#singleUserWrap");
    if(singleUserWrap){
        const userData =  readFromStorage("users");
        singleUserWrap.innerHTML =
        `<div class="row">
        <p class="col-12">Title: ${userData.Title}</p>
        <p class="col-12">Content: ${userData.Content}</p>
        <p class="col-12">Comment: ${userData.Comment}</p>
        </div>
        `
    }