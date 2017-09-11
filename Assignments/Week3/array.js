$(document).ready(main);

function main(){
  arr = [];
  var message;
  document.getElementById('btnAdd').addEventListener('click',btnAddClick, false);
  document.getElementById('btnMax').addEventListener('click',btnMaxClick, false);
}

function btnAddClick(){
  var new_number = $('input').val().trim();
  if(validation(new_number)){
    arr.push(new_number);
    var $new_item = $('<li>').text(new_number);
    $('.array').append($new_item);
    $('input').val('');
  } else{
    alert(message);
  }
}

function btnMaxClick(){
  if(arr.length > 3){
    for(var i=0; i<3; i++){
      var m = max(arr);
      print(m);
      var index = arr.indexOf(m);
      arr.splice(index, 1);
    }
  } else{
    alert("You have to put at least 4 numbers into array!");
  }
}

function max(arr){
  var largest = arr[0];
  for(var i=0; i<arr.length; i++){
    if(Number(arr[i]) > Number(largest)){
      largest = arr[i];
    }
  }
  return largest;
}

function print(m){
  var $new_item = $('<li>').text(m);
  $('.result').append($new_item);
}

function validation(num){
	if(isEmpty(num)){
		message="The value is empty! Please enter a valid number.";
		return false;
  }
	if(isNaN(Number(num))){
		message="The value which you entered are not valid! Please enter a valid number.";
		return false;
	}
	return true;
}

function isEmpty(value){
	if(value===''){
		return true;
	}
	return false;
}
