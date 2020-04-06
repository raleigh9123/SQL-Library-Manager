/** 
 * Used to filter search results
 * 
 * */ 

// List all books on page
const rawBooks = document.querySelectorAll('tbody tr');
const books = Array.from(rawBooks);

// Search Form
const searchForm = document.getElementById('search-form')
// Search Input Field
const searchInput = document.getElementById('search');
const searchSubmit = document.getElementById('search-submit');
// All the books CURRENTLY listed
const booksResults = document.querySelector('tbody');
// Total number of search results, USED IN PAGINATION TO DETERMINE NUMBER OF LINKS


const searchHandler = e => {
    // Create a variable to hold the html data for the books corresponding to users search query
    let searchResults;
    if(e.target.value) {
        searchResults = books.filter(book => {
            // Lowercase all values and remove blank spaces within search
            let bookValues = book.innerText.toLowerCase();
            let bookText = bookValues.replace(/\s/g, '')
            let inputText = e.target.value.toLowerCase();
            let searchText = inputText.replace(/\s/g, '');
            
            // If book title, author, genre, or year contains the search text return true
            if(bookText.includes(searchText)) {
                return true;
            }
        })
    } else {
        searchResults = books;
    }

    // Empty books table
    booksResults.innerHTML = '';
    
    // For each queried search result, add HTML to the webpage
    searchResults.forEach(book => {
        booksResults.innerHTML += book.innerHTML
    })

    // Clear search field after submission
    searchInput.value = '';

    let numBooks = searchResults.length;
    // Create new list items for the number of results on page
    updatePagination(numBooks);
}

searchForm.addEventListener("change", (e) => {
    e.preventDefault();
    if(e.target === searchInput) {
        searchHandler(e)
    }
})
searchForm.addEventListener("click", (e) => {
    e.preventDefault()
    if(e.target === searchSubmit) {
        searchHandler(e)
    }
})

/** 
 * Used to create pagination
 * 
 * */ 
const table = document.querySelector('table');
// Create Pagination List
let pageList = document.createElement('ul')
pageList.className = 'pagination'

// Configure number of pages and results length
const listLength = 7;
const booksLength = books.length;

// Insert Unordered List into HTML
table.parentNode.insertBefore(pageList, table.nextSibling);

// Paginate results
const updatePagination = (numBooks) => {
    // Clear all the pagination links
    let unorderedList = document.querySelector('.pagination');
    unorderedList.innerHTML = '';

    let numPages = numBooks/listLength;

    // Add links for each page to display
    for(i=0; i<numPages; i++) {
        let listItem = document.createElement('li')
        let link = document.createElement('a');
        if(i === 0) {
            link.className = 'active';
        }
        link.innerText = i + 1
        listItem.appendChild(link)
        pageList.appendChild(listItem)
    }

}

/* 
* Update the page to display the results per the active pagination link
*/

const pagination = document.querySelector('.pagination');

const updateResults = (pageNumber) => {
        // Filter results
        let activePage = pageNumber;
        let startingIndex = activePage*listLength;
        
        rawBooks.forEach(book => {
            book.style.display = 'none';
        })
    
        for(let i=startingIndex; i<startingIndex + listLength; i++) {
            if(rawBooks[i]) {
                rawBooks[i].style.display = 'table-row';
            }
        }
}

pagination.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
        // Gather the links in the pagination container
        const links = document.querySelectorAll('.pagination a');
        // Remove 'active' CSS Class
        links.forEach(link => {
            if(link.className === 'active') {
                link.classList.remove('active')
            }
        })
        // Selected target is assigned 'active' CSS class
        e.target.className = 'active';

        let pageNumber = e.target.innerText - 1;

        e.preventDefault();
        updateResults(pageNumber)
    }
})

// Setup initial pagination and
updatePagination(booksLength);
updateResults(0);