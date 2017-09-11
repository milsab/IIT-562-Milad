$(document).ready(main);

function main(){
    var message;
    document.getElementById('btnRun').addEventListener('click', btnRunClick, false);
    document.getElementById('btnReset').addEventListener('click', btnResetClick, false);
}

function fizzbuzz(start,end){
    for(var i=start; i<=end; i++){
        if(i%15===0){
            showResult('FizzBuzz');
        } else if(i%5===0){
            showResult('Buzz');
        } else if(i%3===0){
            showResult('Fizz');
        } else{
            showResult(i);
        }
    }
}

function btnRunClick(){
    var str = $('#val1').val();
    var end = $('#val2').val();
    if(validation(str, end)){
        fizzbuzz(Number(str),Number(end));
    } else{
        alert(message);
    }
}

function showResult(name){
    var list = $('<p>').text(name);
    $('.result').append(list);
}

function isEmpty(value){
    if(value===''){
        return true;
    } 
    return false;			
 }

function validation(num1, num2){
    if(isEmpty(num1) || isEmpty(num2)){
        message="The value is empty! Please enter a valid number.";
        return false;
    }
    if(isNaN(Number(num1)) || isNaN(Number(num2))){
        message="The value which you entered are not valid! Please enter a valid number.";
        return false;
    }
    if(Number(num1) > Number(num2)){
        message="The val1 are greater than val2 !";
        return false;
    }
    return true;
}

function btnResetClick(){
    $('.result').empty();
    $('.data-range input').val('');
}
