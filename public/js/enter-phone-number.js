let input = document.querySelector("#phone");
let errorMsg = document.querySelector("#error-msg");
let validMsg = document.querySelector("#valid-msg");
let button = document.querySelector('button');

let reset =function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
  validMsg.classList.add("hide");
}
function CheckNumber(){
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
      let number = iti.getNumber();

      $("#phnumber").val(number);
      $("#phnumbercheck").val(1);
      
      

    } else {
      let number = iti.getNumber();
      $("#phnumbercheck").val(0);
      input.classList.add("error");
      $("#phnumber").val(number);
      let errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
    }
  }
}

let errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
let iti = window.intlTelInput(input, {
  separateDialCode: true,
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js"
});

// store the instance letiable so we can access it in the console e.g. window.iti.getNumber()
window.iti = iti;

// on blur: validate
input.addEventListener('blur', function() {
  
  reset();
  CheckNumber();
});


input.addEventListener('change', function() {
  
  reset();
  CheckNumber();
});
iti.promise.then(function() {
  iti.setNumber('');
  reset();
  CheckNumber();
});

button.addEventListener('click', (event) => {
  if(!(errorMsg.classList.contains('hide'))|| input.value=="") {
    event.preventDefault();
    

  } 
})