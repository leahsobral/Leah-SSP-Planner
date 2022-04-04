//JavaScript allows webpages to be interactive
let counter = 0
//This counter will eventually continuously change, but the starting value for the variable will be 0
let container = document.getElementById("container")
//the container variable is retrieving the substance from 'container', a lot of it is from css
let list = {}
//this is an empty list, using curly brackets. Later items will be appended to the list.
function boxMaker(){ 
  //function boxMaker is a function, which holds code that can be rerun various times. This function creates each of the boxes, and once the function is run, it creates another.
  let outerBox = document.createElement("div") //this variable, using let so outerBox is the variable, and then in the HTML document it creates an element that falls under a div, which is like a separater.
  outerBox.className = "wrapper";
  //This corresponds the variable outerBox with the class name 'wrapper'. 
  let box = document.createElement("div");
  outerBox.id = counter
  //On line 1 I have the counter, so this just connects the outerBox to 
  counter += 1 //adds one to the counter every time the function boxMaker is run.
  box.className = "titleObject";
  let title = document.createElement("input");
  title.type = "text"; //This changes the title type to associate with the substance type it is holding. 
  title.placeholder = "What is this list for? (click here to edit)"; //Before the text is written this will signify what is the purpose of the bar.
  box.appendChild (title);

  let field = document.createElement("div");
  field.className = "inputField";
  
  let hold = document.createElement("input");
  hold.type = "text";
  hold.placeholder = "What do you have to do?";
  let button1 = document.createElement("button")
  let fasfa = document.createElement("i");
  fasfa.className = "fas fa-plus";
  button1.appendChild (fasfa);
  field.appendChild (hold);
  field.appendChild (button1);
  attach(field, button1, hold)
  
  let list = document.createElement("ul");
  list.className = "todoList";

  let pendingTasksNumber = document.createElement("span");
  pendingTasksNumber.className = "pendingTasks";
  pendingTasksNumber.textContent = 0; 

  let foot = document.createElement("div");
  let container = document.createElement("div");
  container.className = "ptContainer";
  let task = document.createElement("span");
  task.innerHTML = "you have";
  task.className = "pendingTasks";
  task.innerHTML = "pending tasks"; //LATER
  let button2 = document.createElement("button")
  button2.innerHTML = "Clear All";
  button2.classList.add ("active")
  container.appendChild (task);
  container.appendChild (button2);
  foot.appendChild (container);
  outerBox.appendChild (box);
  outerBox.appendChild (field);
  outerBox.appendChild (list);
  outerBox.appendChild (foot);
  button2.onclick = function(){
  localStorage.removeItem(counter)
  //I redid this whole section in javascript while it was originally in html because now that it is a function, I can easily rerun it as mant times as I would like.
  }

  makeMas(hold, button1, pendingTasksNumber, hold, button2, list, outerBox) //runs the function with many attributes.
  
  showTasks(pendingTasksNumber, hold, button2, list, outerBox)
  return outerBox;
}

container.appendChild (boxMaker())

let makeMore = document.createElement ("div");
makeMore.className = "addMoreBoxes"
let button3 = document.createElement ("button");
let it = document.createElement("i")
it.className = "fas fa-plus";
makeMore.appendChild (button3);
button3.appendChild (it);
container.appendChild (makeMore);
button3.onclick = addToDo
//This assigns the big plus button to make another box

function addToDo(){
  container.appendChild (boxMaker());
} 
//This adds the box to another list so it saves the box data into the boxMaker

function attach(field, addBtn, inputBox){
  field.onkeyup = ()=>{
    let userEnteredValue = inputBox.value; 
    if(userEnteredValue.trim() != 0){ 
      addBtn.classList.add("active"); 
    }else{
      addBtn.classList.remove("active");
    }
  }
  //This makes every item added to the to do list using the small plus button, which transitions to the list below. 
}

function makeMas(inputBox, addBtn, pendingTasksNumber, hold, button2, list, outerBox){
  showTasks(pendingTasksNumber, hold, button2, list, outerBox); 
  addBtn.onclick = ()=>{
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem(outerBox.id); 
    if(getLocalStorageData == null){ 
    listArray = []; 
    }else{
    listArray = JSON.parse(getLocalStorageData);
    }
  listArray.push(userEnteredValue);
  localStorage.setItem(outerBox.id, JSON.stringify(listArray)); 
  showTasks(pendingTasksNumber, hold, button2, list, outerBox);
  addBtn.classList.remove("active");
  }
//This whole section is associated with the make more button which is the large button that makes other to do boxes.
}

function showTasks(pendingTasks, inputBox, deleteAllBtn, todoList, outerbox){
  let getLocalStorageData = localStorage.getItem(outerbox.id);
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  if(listArray.length >= 1){
    deleteAllBtn.classList.add("active"); 
    deleteAllBtn.onclick = ()=>{
      listArray = [];
      todoList.innerHTML = "";
      localStorage.setItem(outerbox.id,            JSON.stringify([])); }
  }
  else if(listArray.length <=0){
    deleteAllBtn.classList.remove("active");
  }
  console.log (outerbox.id)
  let newLiTag = "";
  listArray.forEach((element, index) => {
    id=outerbox.id.toString()+index.toString()
    let newLiTag = document.createElement("li")
    newLiTag.id = id
    newLiTag.innerHTML = element
    let span = document.createElement("span")
    span.className = "icon"
    span.onclick = ()=> {
      todoList.removeChild(newLiTag)
    let newList= localStorage.getItem(`list${outerbox.id}`);
    newList = JSON.parse(newList)
    
    newList = newList.filter((word)=>{
     return word!==element})
    localStorage.setItem(`list${outerbox.id}`, JSON.stringify(newList));
    }
    let icon = document.createElement ("i")
    icon.className = "fas fa-check"
    span.appendChild (icon)
    newLiTag.appendChild (span)
    todoList.appendChild (newLiTag)
  });
//This continues to show all of the boxes and additionally supports their functions
}
