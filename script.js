// import PriorityQueue from "priorityQueue.js";
const form = document.querySelector("#new-task-form");
const taskTitle=document.querySelector("#task_title");
const input = document.querySelector("#new-task-input");
const list_el = document.querySelector("#tasks");
const id = document.querySelector("#new-task-id");
const priority = document.querySelector("#task-priority");
const date = document.querySelector("#due-date");
const dependency = document.querySelector("#dependency-id");
//const vis=[0,0,0,0,0];
const vis = (n, val = 0) => Array(n).fill(val);
vis(10000,0);
const mapInd = new Map();
const mapId_dependency=new Map();
// mapInd = new Map([...mapInd].sort());

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title=taskTitle.value;
  const task = input.value;
  if(!task){
      alert('Please Add the Task!');
      return;
  }
  const taskId = id.value;

  const priorityOfTask = priority.value;

  const dueDate = date.value;

  const dependencyId = dependency.value;

// if(dependencyId === taskId){
//     vis[taskId]=1;
// }
//   var ids = [];
//   ids.push(taskId);
  //console.log(ids);

  mapInd.set(priorityOfTask, taskId);
  let sortedMap = [...mapInd].sort(); //    we sorted the mapIdn and stored in sorted map
  //console.log(sortedMap);

  mapId_dependency.set(taskId,dependencyId);

  // creating the object for string the data in local storage   -------------------------------------------------

  let newObj = {};
  newObj.taskTitle=title;
  newObj.inputData = task;
  newObj.taskIdData = taskId;
  newObj.priorityOfTaskData = priorityOfTask;
  newObj.dueDateData = dueDate;
  newObj.dependencyIdData = dependencyId;
  // console.log(newObj);

  //    storing the data on local storage     -------------------------------------------------
  let myObjKey = newObj.taskIdData;
  let myObj_serialized = JSON.stringify(newObj);
  // console.log(myObj_serialized);

  localStorage.setItem(myObjKey, myObj_serialized);

//   for (let [key, value] of sortedMap) {
//     let myObj_deserialized = JSON.parse(localStorage.getItem(value));
//     // console.log(myObj_deserialized);
//   }

  // let myObj_deserialized=JSON.parse(localStorage.getItem((myObjKey)));

  //console.log(myObj_deserialized);
  //--------------------------------------------------------------------------------------------------
  //         const parent=document.querySelector('#tasks ul');     //my code
  //         const task_ele=document.createElement('li');
  //         task_ele.textContent=newObj.inputData;
  //         parent.appendChild(task_ele);                        // my code

  // let newList1=document.createElement('li');
  // newList1.textContent=task;
  // parent.appendChild(newList1);
  // // newList1.appendChild(task);
  // let newList2=document.createElement('li');
  // newList2.textContent=taskId;
  // parent.appendChild(newList2);
  // let newList3=document.createElement('li');
  // newList3.textContent=priorityOfTask;
  // parent.appendChild(newList3);
  // let newList4=document.createElement('li');
  // //newList4.textContent=`Remaining time: ${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds.`;
  // parent.appendChild(newList4);
  // let newList5=document.createElement('li');
  // newList5.textContent=priorityOfTask;
  // parent.appendChild(newList5);

  // let obj={};
  // obj.inputData=task;
  // obj.taskIdData=taskId;
  // obj.priorityOfTaskData=priorityOfTask;
  // obj.dueDateData=dueDate;
  // obj.dependencyIdData=dependencyId;

  //---------------------------------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------------------------------------------------------
  
  // --------------------------------------------------------------------------------------------------------------------------------
  function showRemainingTime(inputDate) {
    let deadline = new Date(inputDate);
    let now = new Date();

    let timeDifference = deadline - now;

    if (timeDifference <= 0) {
      alert("The deadline has passed.");
      return;
    }

    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    alert(
      `Remaining time: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`
    );
  }

  const parent = document.querySelector("#output-list"); //my code

  document.querySelectorAll(".datas").forEach((el) => el.remove());
  let myObj_deserialized;
  for (let [key, value] of sortedMap) {
    myObj_deserialized = JSON.parse(localStorage.getItem(value));

    const parentDiv = document.createElement("div");
    parentDiv.classList.add("task-info"); // setting task-info as class name in div
    parentDiv.setAttribute("id", myObj_deserialized.taskIdData);
    //console.log(parentDiv);

    const task_ele0 = document.createElement("li");
    task_ele0.classList.add("datas");
    task_ele0.classList.add("collapsible");
    task_ele0.textContent = "Title: "+ myObj_deserialized.taskTitle;
    //parent.appendChild(task_ele1);
    parentDiv.appendChild(task_ele0);
    
    const task_ele1 = document.createElement("li");
    task_ele1.classList.add("datas");
    task_ele1.classList.add("wrapper");
    //task_ele1.classList.add("collapsible");
    task_ele1.textContent = "Your Task: "+myObj_deserialized.inputData;
    //parent.appendChild(task_ele1);
    parentDiv.appendChild(task_ele1);

    const task_ele2 = document.createElement("li");
    task_ele2.classList.add("datas");
    task_ele2.classList.add("wrapper");
    task_ele2.textContent = "Task Id: "+myObj_deserialized.taskIdData;
    //    parent.appendChild(task_ele2);
    parentDiv.appendChild(task_ele2);

    const task_ele3 = document.createElement("li");
    task_ele3.classList.add("datas");
    task_ele3.classList.add("wrapper");
    task_ele3.textContent ="Priority of the task: "+ myObj_deserialized.priorityOfTaskData;
    //parent.appendChild(task_ele3);
    parentDiv.appendChild(task_ele3);

    const task_ele4 = document.createElement("li");
    task_ele4.classList.add("datas");
    task_ele4.classList.add("wrapper");
    task_ele4.classList.add("date-time");
    task_ele4.textContent = "Due Date: "+myObj_deserialized.dueDateData;
    //parent.appendChild(task_ele4);
    parentDiv.appendChild(task_ele4);

    const task_ele5 = document.createElement("li");
    task_ele5.classList.add("datas");
    task_ele5.classList.add("wrapper");
    task_ele5.textContent = "Dependency Task Id: "+ myObj_deserialized.dependencyIdData;
    //parent.appendChild(task_ele5);
    parentDiv.appendChild(task_ele5);

    //    const task_ele6=document.createElement('li');
    //    task_ele6.classList.add('datas');
    //    task_ele6.classList.add('done-task');
    //    task_ele6.textContent='Done';
    //    parent.appendChild(task_ele6);
    const task_delete_el = document.createElement("li");
    task_delete_el.classList.add("done");
    task_delete_el.classList.add("wrapper");
    task_delete_el.classList.add("datas");
    task_delete_el.setAttribute("id", myObj_deserialized.taskIdData);
    //task_delete_el.classList.add(myObj_deserialized.taskIdData);
    task_delete_el.textContent = "Done";
    parentDiv.append(task_delete_el);

    parent.appendChild(parentDiv);

    console.log(parent);
    //console.log(myObj_deserialized.taskIdData);
  }
  
  //   function dateTimer(event) {
  //     showRemainingTime(dateButton.textContent);
  //   }
  //   dateButton.addEventListener("click", dateTimer);
//  const dateButton = document.querySelectorAll(".date-time");


//   done_task.forEach((dateButton) => {
//     dateButton.addEventListener("click", (event) => {
//       console.log(event.target.id);
//       document.getElementById(event.target.id).remove();
//     });
//   });
  //   let delete_button = document.getElementById(myObj_deserialized.taskIdData);

    //   function deleteTheTask(event) {
    //     //console.log(event.target.parentElement.id);
    //     // document.getElementsByClassName(delete_button.className).forEach(el => el.remove());
    //     //document.remove(event.parent);
    //     document.getElementById(event.target.parentElement.id).remove();
    //   }

    //   delete_button.addEventListener("click", deleteTheTask);

//   let delete_button = document.querySelectorAll(".done");
//   console.log(delete_button);

const timeButton =document.querySelectorAll(".date-time");

timeButton.forEach((timeButton) => {
    timeButton.addEventListener("click", (event) => {
      //console.log(event.target.textContent);
      showRemainingTime(event.target.textContent);
      //document.getElementById(event.target.id).remove();
    });
  });

//   const done_task = document.querySelectorAll(".done");

//   done_task.forEach((done_task) => {
//     done_task.addEventListener("click", (event) => {
//       console.log(event.target.id);
      
//       document.getElementById(event.target.id).remove();
//     });
//   });

  const done_task = document.querySelectorAll(".done");

  done_task.forEach((done_task) => {
    done_task.addEventListener("click", (event) => {
      //console.log(event.target.id);
     if(vis[mapId_dependency.get(event.target.id)]===1 || event.target.id=== mapId_dependency.get(event.target.id)){
         vis[event.target.id]=1;
      document.getElementById(event.target.id).remove();
      localStorage.removeItem(event.target.id);
      //console.log(event.target.id);
     }else{
        alert("Please complete the task first with id: " + mapId_dependency.get(event.target.id));
     }
    });
  });

  



  //   function deleteTheTask(event){
  //   //console.log(event.target.parentElement.id);
  //   // document.getElementsByClassName(delete_button.className).forEach(el => el.remove());
  //   //document.remove(event.parent);
  //   document.getElementById(event.target.parentElement.id).remove();

  //   }
  // delete_button.addEventListener('click',deleteTheTask);

  // var coll = document.querySelector(".collapsible");
  // coll.addEventListener('click',showData);

  //   display the data entered-------------------------------------------------

  // const task_el = document.createElement('div');
  // task_el.classList.add('task');

  // const task_content_el = document.createElement('div');
  // task_content_el.classList.add('content');

  // task_el.appendChild(task_content_el);

  // const task_input_el = document.createElement('input');
  // task_input_el.classList.add('text');
  // task_input_el.type = 'text';
  // task_input_el.value = "Task: "+task+" Priority: "+priorityOfTask+" Due Date: " +dueDate+" Task Id: "+taskId+" Dependency: "+dependencyId;
  // // task_input_el.setAttribute('readonly', 'readonly');

  // task_content_el.appendChild(task_input_el);

  // const task_actions_el = document.createElement('div');
  // task_actions_el.classList.add('actions');
  // const task_done_el = document.createElement('button');
  // task_done_el.classList.add('delete');
  // task_done_el.innerText = 'Done';
  // task_actions_el.appendChild(task_done_el);

  // task_el.appendChild(task_actions_el);

  // list_el.appendChild(task_el);
  // task_done_el.addEventListener('click', (e) => {

  // 	list_el.removeChild(task_el);
  // });

  //--------------------------------------------------------------------------------------------------
  // function checkIfDateIsOverdue(inputDate) {
  //     let currentDate = new Date();                            extra
  //     let deadlineDate = new Date(inputDate);

  //     if (currentDate > deadlineDate) {
  //         alert("The task is overdue!");
  //     }
  // }
  // checkIfDateIsOverdue(dueDate);

  //   function to chek if the date is overdue -------------------------------------------------------

  // // shows the remainin time
  // alert(`Remaining time: ${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds.`);

  // ---------------------------------------------------------------------------------------------------------------------------------------------------
});
