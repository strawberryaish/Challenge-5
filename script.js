
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


//LIMIT USER INPUT LENGTH
const limitLength = (inputName, maxLength) => {
    const inputLength = inputName.value.length;

    if (inputLength >= maxLength) inputName.value = inputName.value.slice(0, maxLength);
}


//Event handlers
//CARD HOLDER NAME
inputName.addEventListener('input', function() {
    limitLength(this, 25);

    !this.value ? detailName.textContent = 'Aisha Willows' : detailName.textContent = this.value;
  
})

//CARD NUMBER
inputCardNo.addEventListener('keydown', function(e) {
    let testing = this.value.replaceAll(' ', '');

    //Prevent user from entering whitespace
    if (e.key === ' ') 
    { e.preventDefault(); 
      return; }

    else if (e.key === 'Backspace') return;

    const cardLength = testing.length > 0 && testing.length < 16 ? testing.length : undefined;

    //Divisible by 4, add whitespace
    if (cardLength % 4 === 0) this.value += ' '; 
})


inputCardNo.addEventListener('input', function() {
    limitLength(this, 19);

    const updateCardNo = inputCardNo.value + defaultNo.slice(inputCardNo.value.length);
    detailCardNo.textContent = updateCardNo;

});

//EXP DATE: MONTH
inputMonth.addEventListener('input', function() {
    limitLength(this, 2);

    if (this.value > 12) console.log('Invalid');

    const updateMonth = this.value.padStart(2, defaultDate);
    detailMonth.textContent = updateMonth;
  
});

//EXP DATE: YEAR
inputYear.addEventListener('input', function() {
    limitLength(this, 2);

    const updateYear = this.value.padStart(2, defaultDate);
    detailYear.textContent = updateYear;

});

//CVC
inputCVC.addEventListener('input', function(){
    limitLength(this, 3);
    
    const updateCVC = this.value.padEnd(3, defaultCVC);
    detailCVC.textContent = updateCVC;

});


