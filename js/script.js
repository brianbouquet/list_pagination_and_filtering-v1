/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variable declaration
const list = document.querySelectorAll('li.student-item');
const maxItems = 10;

//function that takes list and page arguments to determine what students show
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
   //create and append page links
   const page = document.querySelector('div.page');
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

//create and append search bar
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

//call funtctions
showPage(list, 1);
appendPageLinks(list);
appendSearch();

const searchList = (list) => {
   const students = list;
   const input = document.querySelector('div.student-search > input');
   const button = document.querySelector('div.student-search > button');
   let filterResults = [];
   //function to filter list by text entry
   const filterList = (students, text) => {
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
         const pageDiv = document.querySelector('div.page');
         const errorDiv = createElement('div', 'className', 'error-message');
         appendToParent(pageDiv, errorDiv);
         const errorMessage = createElement('p', 'textContent', 'Oops! No student records match your entry. Please refine your search.');
         appendToParent(errorDiv, errorMessage);
      }
   }
   //keyup event listener to filter by user input
   input.addEventListener('keyup', (event) => {
      const text = event.target.value;
      const pagination = document.querySelector('div.pagination');
      if (text.length === 0) {
         pagination.remove();
         showPage(list, 1);
         appendPageLinks(list);
      } else if (text.length !== 0) {
         pagination.remove();
         filterList(students, text);
         showPage(filterResults, 1);
         appendPageLinks(filterResults);
         //clear filter results
         filterResults = [];
      }
   });
   //click event listener to filter by user input
   button.addEventListener('click', (event) => {
      event.preventDefault();
      const text = input.value;
      const pagination = document.querySelector('div.pagination');
      if (text.length === 0) {
         pagination.remove();
         showPage(list, 1);
         appendPageLinks(list); 
      } else if (text.length !== 0) {
         pagination.remove();
         filterList(students, text);
         showPage(filterResults, 1);
         appendPageLinks(filterResults);
         //clear filter results
         filterResults = [];
      }
   });
}

searchList(list);

