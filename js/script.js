/*
Treehouse Techdegree: Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab
   Reach out in your Slack community if you have questions
*/

//declare variables
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');
const searchBar = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
//display search bar on page
header.insertAdjacentHTML('beforeend', searchBar);
const search = document.getElementById('search')
const searchBtn = search.nextElementSibling;



//showPage function inserts the HTML in the string literal up to 9 times per page
//list paramater contains the data to parse, and page number is set to 1 initially then determined by the button the user clicks
function showPage (list, page) {
   const indexStart = (page * 9) - 9;
   const indexEnd = page * 9;
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++){
      if (i >= indexStart && i < indexEnd) {
         let insert =`
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src ="${list[i].picture.large}" alt="${i.name} Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${list[i].registered.date}</span
               </div>
            </li>
         `;
         studentList.insertAdjacentHTML("beforeend", insert);
      }
   }
};

//addPagination creates navigation to access different pages of data
//once a button is clicked, the showPage function is called with a new value for the page parameter
function addPagination (list) {
   const length = Math.ceil(list.length/9);
   linkList.innerHTML = '';
   for (let i = 1; i <= length; i++) {
      let insert =`
      <li>
         <button type="button">${i}</button>
      </li>`;
      linkList.insertAdjacentHTML("beforeend", insert);
   }
   linkList.firstElementChild.firstElementChild.className = 'active';
   linkList.addEventListener('click', (e) => {
      const navBtn = e.target;
      const li = linkList.children;
      if (navBtn.tagName === 'BUTTON') {
         for (let i = 0; i < li.length; i++) {
            li[i].firstElementChild.classList.remove('active');
         };
         navBtn.classList.add('active');
         showPage(list, navBtn.textContent);
      }
   });
};

//search bar
//add html to display search bar, then declare variables, create function to check for search matches, add listeners to call function

function searchFn(searchInput, list) {
   const newArr = list.filter(list =>
      list.name.first.toLowerCase().includes(searchInput.value.toLowerCase() ) 
      ||
      list.name.last.toLowerCase().includes(searchInput.value.toLowerCase() ) 
   );
   if (newArr.length > 0){
      showPage(newArr, 1);
      addPagination(newArr);
   } else if (newArr.length === 0){
      const insert = '<h2>Sorry, no results were found. Please try another search.</h2>';
      studentList.innerHTML = '';
      studentList.insertAdjacentHTML("afterbegin", insert);
   }
}

searchBtn.addEventListener('click', (e) => {
   e.preventDefault();
   searchFn(search, data);
});

search.addEventListener('keyup', () => {
   searchFn(search, data);
});

//call both functions to inialize page display
showPage(data, 1);
addPagination(data);
