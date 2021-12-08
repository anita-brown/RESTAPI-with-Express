
// POST ALL AUTHORS FROM NEXT.HTML


let submitBtn = document.querySelector(".btn-class-2");
let authorName = document.getElementById("author-name");
let age = document.getElementById("author-age");
let address = document.getElementById("author-address");
let books = document.getElementById("author-books");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://authorandbooks.herokuapp.com/author", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author: authorName.value,
      age: age.value,
      address: address.value,
      books: books.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      let dataArr = [];
      dataArr.push(data);
      console.log(data, "**");
    });
});