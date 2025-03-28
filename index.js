async function fetchBooks() {
  try {
    const response = await fetch("https://anapioficeandfire.com/api/books");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const books = await response.json();
    console.log(books);

    // Get the name of the 5th book, if available
    const fifthBook = books[4]?.name || "Not available";
    
    // Get the 1031st character URL from the first book, if exists
    const character1031 = books[0]?.characters[1030] || "Character not found";
    
    // Calculate the total number of pages
    const totalPages = books.reduce((sum, book) => sum + (book.numberOfPages || 0), 0);

    console.log(`5th Book in the Series: ${fifthBook}`);
    console.log(`1031st Character URL: ${character1031}`);
    console.log(`Total Pages in the Series: ${totalPages}`);

    // Call renderBooks to display book titles
    renderBooks(books);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Call fetchBooks when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchBooks);

function renderBooks(books) {
  const main = document.querySelector("main");
  if (!main) {
    console.error("Error: <main> element not found.");
    return;
  }

  main.innerHTML = ""; // Clear previous content before rendering new books

  books.forEach((book) => {
    const h2 = document.createElement("h2");
    h2.textContent = book.name || "Unknown Title"; // Handle missing book names
    main.appendChild(h2);
  });
}

