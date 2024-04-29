
//USER INPUT
const inputCVC = document.getElementById('cvc'),
      inputName = document.getElementById('name'),
      inputCardNo = document.getElementById('cardno'),
      inputMonth = document.getElementById('month'),
      inputYear = document.getElementById('year');

//FRONT AND BACK CARD DETAILS
const detailCardNo = document.querySelector('.card-no-detail'),
      detailName = document.querySelector('.name-detail'),
      detailMonth = document.querySelector('.month-detail'),
      detailYear = document.querySelector('.year-detail'),
      detailCVC = document.querySelector('.cvc-detail');

//VALIDATION ID
const validationNames = document.getElementById('validation-name'),
      validationCardNo = document.getElementById('validation-cardno'),
      validationDate = document.getElementById('validation-date'),
      validationCVC = document.getElementById('validation-cvc');

//BUTTON 
const  submitBtn = document.querySelector('.btn');
const form = document.querySelector('.form-box');

//VALIDATION RESULT
let resultName, resultCardNo, resultDate, resultCVC;

//Validations
const checkValidations = {
    emptyinput: function (inputName, validationID) { 
        if (inputName.value.trim() === '') {
            validationID.textContent = "Can't be blank";
           
       }
        else {
            validationID.innerHTML =  '&nbsp;';
            return true;
        
        }},

    checkLength: function(inputLength, maxLength, validationID) { 
        if (!inputLength.value) return;
        
        if (inputLength.value.length < maxLength) {
            validationID.textContent = 'Length is too short';
        } 
        else {
           validationID.innerHTML = '&nbsp;';
           return true; }
        },

    //FUNCTIONS FOR CHECKING INDIVIDUAL INPUT FIELDS

    checkName: function(inputName, validationID) {
        const checkEmpty = this.emptyinput(inputName, validationID),
              checkLength = this.checkLength(inputName, 5, validationID),
              checkSymbols = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~]/,
              checkNumber = /[0-9]/,

        checkFormat = checkNumber.test(inputName.value) || checkSymbols.test(inputName.value);

        checkFormat ? validationID.textContent = 'Wrong format, letters only' : true;

        inputName.className = !checkFormat && checkLength && checkEmpty ? 'success' : 'error';

        return !checkFormat && checkLength && checkEmpty;
    },

    checkCardNo: function(inputName, maxLength, validationID) { 
        const checkCardNoFormat = isNaN(+inputName.value.replaceAll(' ', '')),
              checkEmptyAndLength = this.emptyinput(inputName, validationID) && this.checkLength(inputName, maxLength, validationID);

        checkCardNoFormat ? validationID.textContent = 'Wrong format, numbers only': true;

        inputName.className = checkEmptyAndLength && !checkCardNoFormat ? 'success' : 'error';

        return checkEmptyAndLength && !checkCardNoFormat;
    },

    checkYearMonth: function(expMonth, expYear, maxLength, validationID) {
        const month = expMonth.value, year = expYear.value,
    
        //Check format and expiration date
              checkMonthLength = this.checkLength(expMonth, maxLength, validationID),
              checkYearLength = this.checkLength(expYear, maxLength, validationID),
              invalidMonth = month > 12;

        if (invalidMonth) {
            validationID.textContent = 'Invalid Month';
            expMonth.className = 'error'; }

        else {
            expMonth.className = ''; }

        if (year){
        expYear.className = checkYearLength ? '' : 'error'; }

        if (month) {
        expMonth.className = checkMonthLength ? '' : 'error'; }

        if (checkMonthLength && checkYearLength && !invalidMonth ) { 
            const date = new Date(), 
                  currentYear = `${date.getFullYear()}`.slice(2),
                  currentMonth = `${date.getMonth() + 1}`.padStart(2, '0');

            if (currentYear > year || currentYear >= year && currentMonth > month){
                expMonth.className = 'error';
                expYear.className = 'error';
                validationID.textContent = 'Your card is already expired'; }
            else {
                expMonth.className = 'success';
                expYear.className = 'success';
                validationID.innerHTML = '&nbsp';
                return true;

        }}
        
    },

    checkCVC: function(inputName, maxLength, validationID) {
        const checkBoth =  this.emptyinput(inputName, validationID) &&  this.checkLength(inputName, maxLength, validationID);
        
        inputName.className = checkBoth ? 'success' : 'error';
        
        return checkBoth;
    }

}

//LIMIT USER INPUT LENGTH
const limitLength = (inputName, maxLength) => {
    const inputLength = inputName.value.length;

    if (inputLength >= maxLength) inputName.value = inputName.value.slice(0, maxLength);
}

//Event handlers
//CARD HOLDER NAME
inputName.addEventListener('input', function(e) {
    const maxLength = 25;

    limitLength(this, maxLength);
    resultName = checkValidations.checkName(this, validationNames);

    !this.value ? detailName.textContent = 'Aisha Willows' : detailName.textContent = this.value;


})

inputCardNo.addEventListener('click', function(e) {
 
})

//CARD NUMBER
inputCardNo.addEventListener('keydown', function(e) {
    let testing = this.value.replaceAll(' ', '');

    // Prevent user from entering whitespace
    if (e.key === ' ') 
    { e.preventDefault(); 
      return; }

    if (e.key === 'Backspace') return;

    let cardLength = testing.length > 0 && testing.length < 16 ? testing.length : undefined;

    //Divisible by 4, add whitespace
    if (cardLength % 4 === 0) {this.value += ' '; }; 

  
})


inputCardNo.addEventListener('input', function(e) {
    const maxLength = 19, defaultNo = '0000 0000 0000 0000';
    limitLength(this, maxLength);

    
   
    const updateCardNo = inputCardNo.value + defaultNo.slice(inputCardNo.value.length);
    detailCardNo.textContent = updateCardNo;
   
    resultCardNo = checkValidations.checkCardNo(this, maxLength, validationCardNo);
});

//EXP DATE: MONTH
inputMonth.addEventListener('input', function() {
    const maxLength = 2;
    limitLength(this, maxLength);


    const updateMonth = this.value.padStart(maxLength, '0');
    detailMonth.textContent = updateMonth;
  
    resultDate = checkValidations.checkYearMonth(inputMonth, inputYear, maxLength, validationDate);
    
});

//EXP DATE: YEAR
inputYear.addEventListener('input', function() {
    const maxLength = 2;
    limitLength(this, maxLength);

    const updateYear = this.value.padStart(maxLength, '0');

    detailYear.textContent = updateYear;
    resultDate = checkValidations.checkYearMonth(inputMonth, inputYear, maxLength, validationDate);
    
});


//CVC
inputCVC.addEventListener('input', function(){
    const maxLength = 3;
    limitLength(this, maxLength);
    const updateCVC = this.value.padEnd(maxLength, '0');

    resultCVC = checkValidations.checkCVC(this, maxLength, validationCVC);
    detailCVC.textContent = updateCVC;

});

//Form
form.addEventListener('submit', function(e){
    e.preventDefault();

    //for checking only
    console.log(`Name: ${resultName}`);
    console.log(`Card No: ${resultCardNo}`);
    console.log(`Date: ${resultDate}`);
    console.log(`CVC: ${resultCVC}`);

    resultName && resultCardNo && resultDate && resultCVC ? alert('Success') : alert('Check your input and try again');
    

})
