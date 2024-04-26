
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

//DEFAULT
const defaultNo = '0000 0000 0000 0000', defaultDate = '00', defaultCVC = '000';

//Validations
const checkValidations = {
    emptyinput: function (inputName) { 
        if (inputName.value.trim() === '') console.log('Cannot be empty'); 
        else 
            return true;
        
        },

    checkLength: function(inputLength, maxLength) { 
        if (!inputLength.value) return;

        if (inputLength.value.length !== maxLength) 
            console.log('too short');
          
        else 
           return true; 
        },

    checkCardNo: function(inputName, maxLength) { 
        const nowhitespace = inputName.value.replaceAll(' ', '');
        
        const checkBoth = this.emptyinput(inputName) && this.checkLength(inputName, maxLength);

        const checkFormat = isNaN(+nowhitespace) ? console.log('Only numeric input allowed') : true; 
        
        if (checkBoth && checkFormat) 
            return true;

         },

    checkYearMonth: function(expMonth, expYear, maxLength) {
        const month = expMonth.value, year = expYear.value;
        let checkExpiration;

        //Check length
        if (month.value) this.checkLength(expMonth, maxLength);
        if (year.value) this.checkLength(expYear, maxLength); 
        
        //Check format and expiration date
        const checkBothLength = this.checkLength(expMonth, maxLength) && this.checkLength(expYear, maxLength);
        const invalidMonth = expMonth.value > 12;

        if (invalidMonth) console.log('Invalid month');

        if (checkBothLength && !invalidMonth) { 
            const date = new Date(), 
                  currentYear = `${date.getFullYear()}`.slice(2),
                  currentMonth = `${date.getMonth() + 1}`.padStart(2, '0');

        checkExpiration = currentYear > year || currentYear >= year && currentMonth > month ? console.log('expired') : true;   
        
        if (checkExpiration) 
            return true;
        
        }

        },

    checkCVC: function(inputName, maxLength) {
        const checkBoth =  this.emptyinput(inputName) &&  this.checkLength(inputName, maxLength);
        
        if (checkBoth) 
            return true;
        
    }

}

//LIMIT USER INPUT LENGTH
const limitLength = (inputName, maxLength) => {
    const inputLength = inputName.value.length;

    if (inputLength >= maxLength) inputName.value = inputName.value.slice(0, maxLength);
}

//Event handlers
//CARD HOLDER NAME
inputName.addEventListener('input', function() {
    limitLength(this, 25);
    checkValidations.emptyinput(this);

    !this.value ? detailName.textContent = 'Aisha Willows' : detailName.textContent = this.value;
  
})

//CARD NUMBER
inputCardNo.addEventListener('keydown', function(e) {
    let testing = this.value.replaceAll(' ', '');

    // Prevent user from entering whitespace
    if (e.key === ' ') 
    { e.preventDefault(); 
      return; }

    else if (e.key === 'Backspace') return;

    const cardLength = testing.length > 0 && testing.length < 16 ? testing.length : undefined;

    //Divisible by 4, add whitespace
    if (cardLength % 4 === 0) this.value += ' '; 
})


inputCardNo.addEventListener('input', function() {
    const maxLength = 19;
    limitLength(this, maxLength);

    const updateCardNo = inputCardNo.value + defaultNo.slice(inputCardNo.value.length);
    detailCardNo.textContent = updateCardNo;
   
    checkValidations.checkCardNo(this, maxLength);
});

//EXP DATE: MONTH
inputMonth.addEventListener('input', function() {
    const maxLength = 2;
    limitLength(this, maxLength);

    const updateMonth = this.value.padStart(maxLength, defaultDate);
    detailMonth.textContent = updateMonth;
  
    checkValidations.checkYearMonth(inputMonth, inputYear, maxLength);
    
});

//EXP DATE: YEAR
inputYear.addEventListener('input', function() {
    const maxLength = 2,
          updateYear = this.value.padStart(maxLength, defaultDate);
    limitLength(this, maxLength);

    detailYear.textContent = updateYear;
    checkValidations.checkYearMonth(inputMonth, inputYear, maxLength);
    
});

//CVC
inputCVC.addEventListener('input', function(){
    const maxLength = 3,
          updateCVC = this.value.padEnd(maxLength, defaultCVC);

    limitLength(this, maxLength);
    checkValidations.checkCVC(this, maxLength);
    detailCVC.textContent = updateCVC;

});


