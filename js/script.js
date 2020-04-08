/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variable declaration
const list = document.querySelectorAll('li.student-item');
const maxItems = 10;

//function to determine what page of list items to show
const showPage = (list, page) => {
   const listItems = list;
   const startIndex = (page * maxItems) - maxItems;
   const endIndex = (page * maxItems);
   for (let i = 0; i < listItems.length; i++) {
      let listItem = listItems[i];
      if (startIndex <= i && i < endIndex) {
         listItem.style.display = 'list-item';
      } else {
         listItem.style.display = 'none';
      }
   }
}

//function to create elements
const createElement = (elementName, property, value) => {
   const element = document.createElement(elementName);
   element[property] = value;
   return element;
}

//function to append elements to parent elements
const appendToParent = (parentNode, childNode) => {
   parentNode.appendChild(childNode);
}

//function to create, append and add functionality to pagination
const appendPageLinks = (list) => {
   const students = list;
   const page = document.querySelector('div.page');
   //create and append page links
   const div = createElement('div', 'className', 'pagination');
   appendToParent(page, div);
   //determine number of pages
   const pages = Math.ceil(students.length / maxItems);
   //create and append page links
   const ul = createElement('ul');
   appendToParent(div, ul);
   for (let i = 0; i < pages; i++) {
      const li = createElement('li');
      appendToParent(ul, li);
      const a = createElement('a');
      a.setAttribute('href', '#');
      appendToParent(li, a);
      a.textContent = i + 1;
   }
   //set first page link style to active
   ul.firstElementChild.firstElementChild.className = 'active';
   //add functionality to page links using event listeners
   const pageLinks = ul.children;
   for (i = 0; i < pageLinks.length; i++) {
      pageLinks[i].addEventListener('click', (event) => {
         for (i = 0; i < pageLinks.length; i++) {
            let pageLink = pageLinks[i];
            //clear classes from all page
            pageLink.firstElementChild.className = '';
         }
         const pageLink  = event.target;
         const pageNumber = parseInt(pageLink.textContent);
         pageLink.className = 'active';
         showPage(students, pageNumber);
       });
   }
}

//function to create and append search bar
const appendSearch = () => {
   const pageHeader = document.querySelector('div.page-header');
   const div = createElement('div', 'className', 'student-search');
   appendToParent(pageHeader, div);
   const input = createElement('input');
   input.setAttribute('placeholder', 'Search for students...');
   appendToParent(div, input);
   const button = createElement('button', 'textContent', 'Search');
   appendToParent(div, button);
}

//function to create and append error message
const appendError = () => {
   const pageDiv = document.querySelector('div.page');
   const errorDiv = createElement('div', 'className', 'error-message');
   appendToParent(pageDiv, errorDiv);
   const errorMessage = createElement('p', 'textContent', 'Oops! No student records match your entry. Please refine your search.');
   appendToParent(errorDiv, errorMessage);
   //hide error message initially
   errorDiv.style.display = 'none';
}

//function to show error message
const showError = () => {
   const error = document.querySelector('div.error-message');
   error.style.display = 'block';
}

//function to hide error message
const hideError = () => {
   const error = document.querySelector('div.error-message');
   error.style.display = 'none';
}

//function to search list items
const searchList = (list) => {
   const students = list;
   const input = document.querySelector('div.student-search > input');
   const button = document.querySelector('div.student-search > button');
   let filterResults = [];
   //function to filter list items by text-entry
   const filterList = (students, text) => {
      const pagination = document.querySelector('div.pagination');
      //check to see if text is entered
      if (text.length === 0) {
         //clear pagination and call showPage, appendPage with unfiltered list
         pagination.remove();
         showPage(students, 1);
         appendPageLinks(students);
         //To prevent bug where error shows if delete key held down
         hideError();
      } else if (text.length !== 0) {
         //loop through list and show/hide by text-entry parameter
         for (let i = 0; i < students.length; i++) {
            let student = students[i];
            let studentName = student.querySelector('h3');
            if (studentName.textContent.toLowerCase().includes(text.toLowerCase())) {
               student.style.display = 'list-item';
               filterResults.push(student);
            } else {
               student.style.display = 'none';
            }
         }
         if (filterResults.length === 0) {
            //hide pagination
            pagination.style.display = 'none';
            //show error message
            showError();
         } else {
            //clear pagination and call showPage, appendPage with filterResults list
            pagination.remove();
            showPage(filterResults, 1);
            appendPageLinks(filterResults);
            //clear filter results
            filterResults = [];
            //hide error message
            hideError();
         }
      }
   }
   //keyup event listener to filter by text entry
   input.addEventListener('keyup', (event) => {
      const text = event.target.value;
         filterList(students, text);
   });
   //click event listener to filter by text entry
   button.addEventListener('click', (event) => {
      event.preventDefault();
      const text = input.value;
         filterList(students, text);
   });
}

//call funtctions
showPage(list, 1);
appendPageLinks(list);
appendSearch();
searchList(list);
appendError();
