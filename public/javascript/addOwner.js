var owner = document.getElementById("addOwner")

owner.onclick = function (){
  // var alltasks = []
  // let selectedtask;
  // req.body.selectedtask ? selectedtask = true : selectedtask = false;
  // if (selectedtask) {
  // alltasks.push(selectedtask.value);
  // }

  var alltasks = []
  var checkedValue = null; 
  var inputElements = document.getElementsByClassName('messageCheckbox');
  for(var i=0; inputElements[i]; ++i){
    if(inputElements[i].checked){
      checkedValue = inputElements[i].value;
      alltasks.push(checkedValue)
      break;
    }
  }
}




