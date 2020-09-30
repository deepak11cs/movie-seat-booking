const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.occupied)");
const seatCount = document.getElementById("count");
const total = document.getElementById("total");
const movie = document.getElementById("movie");
let ticketPrice = +movie.value;

populateUI();

// update the price and the count of seats
function updateCount(){
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    let seatsIndex = [...selectedSeats].map((seat)=>{   
        return [...seats].indexOf(seat);
    });
    
    localStorage.setItem("selectedSeats",JSON.stringify(seatsIndex));

    seatCount.innerText = selectedSeats.length;
    total.innerText = ticketPrice*selectedSeats.length;
}

//get data from local storage and populate ui
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats!=null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("selected");
            }
        });
    }
    
    const movieIndex = localStorage.getItem("movieIndex");
    if(movieIndex!=null){
        movie.selectedIndex = movieIndex;
    }
    
}

//save selected movie index and price
function setMovieData(index, price){
    localStorage.setItem("movieIndex",index);
    localStorage.setItem("moviePrice",price);
}

//listener for movie selection
movie.addEventListener("change",(e)=>{
    ticketPrice = +movie.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateCount();
});

// listener for ticket booking
container.addEventListener("click",(e)=>{

    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected");
        updateCount();
    }
});

updateCount();