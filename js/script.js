/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


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

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

// const createElement = (tagName, className, parentNode) => {
//    let element = document.createElement(tagName);
//    element.className = className;
//    parentNode.appendChild(element);
//    return element;
// }

const appendPageLinks = (list) => {
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
   //create and append page links
   const page = document.querySelector('div.page');
   const div = createElement('div', 'className', 'pagination');
   appendToParent(page, div);
   const listItems = list;
   const pages = Math.ceil(listItems.length / maxItems);
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
   //set first page link's style to active initially
   ul.firstElementChild.firstElementChild.className = 'active';
   //add functionality to page links using event listeners
   const pageLinks = ul.children;
   for (i = 0; i < pageLinks.length; i++) {
      pageLinks[i].addEventListener('click', (event) => {
         const pageLinks = document.querySelectorAll('div.pagination > ul > li');
         for (i = 0; i < pageLinks.length; i++) {
            let pageLink = pageLinks[i];
            //clear classes from all page
            pageLink.firstElementChild.className = '';
         }
         const pageLink  = event.target;
         const pageNumber = parseInt(pageLink.textContent);
         pageLink.className = 'active';
         showPage(list, pageNumber);
       })
   }
}

//call funtctions
showPage(list, 1);
appendPageLinks(list);

