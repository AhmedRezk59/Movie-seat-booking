const container = document.querySelector('.container'),
      seats = document.querySelectorAll('.row .seat:not(.occupied'),
      count = document.getElementById('count'),
      total = document.getElementById('total'),
      movieSelect = document .getElementById('movie');
let ticketPrice = +movieSelect.value;

//getting what is in local storage
populateUI();

//save last film to lacal storage
function saveSelectedFilm (showIndex , showPrice){
    localStorage.setItem('show' , showIndex)
    localStorage.setItem('showPrice' , showPrice)
}

// Upadate total and count
function updateSelectedCount() {
    const selectedSeats =document.querySelectorAll('.row .seat.selected');
    
    //bringing indexes of selected seats
    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)); 
   
    //saving selected seats to lacal storage
    localStorage.setItem('selectedSeats' , JSON.stringify(seatIndex));
        
    count.textContent = selectedSeats.length;

    total.textContent = count.textContent * ticketPrice
};

//get data from local Storage

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length > 0 ) {
        seats.forEach((seat ,index) => {
            if (selectedSeats.indexOf(index)> -1){
                seat.classList.add('selected')
            }
        })
    };

    const showIndex = localStorage.getItem('show');
    if(showIndex !== null) {
        movieSelect.selectedIndex = showIndex;
    };

    const showPrice = localStorage.getItem('showPrice');

    if(showPrice !== null) {
        ticketPrice = showPrice
    };
    //initiate price and seat count
    updateSelectedCount();
};

//change select event lis tner

movieSelect.addEventListener('change' , function(e) {
    ticketPrice = +e.target.value;
    saveSelectedFilm(e.target.selectedIndex , e.target.value);
    updateSelectedCount();
})
//seat listner
container.addEventListener('click', (e)=> {
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
