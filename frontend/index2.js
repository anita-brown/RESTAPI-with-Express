let rootDiv = document.getElementById("root");
console.log(rootDiv);
// let deleteAuthor;
let authorName = document.getElementById("author-name");
let age = document.getElementById("author-age");
let address = document.getElementById("author-address");
let books = document.getElementById("author-books");
let editAuthor = document.getElementById("edit");
let submitBtn = document.querySelector(".btn-class-2");
let test = document.querySelector(".next2");
console.log(test);

const imageArr = ["./images/box1.png", "./images/box2.png"];
const bookArr = ["./images/book1.jpeg", "./images/book2.jpeg"];

let params = new URLSearchParams(document.location.search);
let id = params.get("id");



async function fetchData() {
  const res = await fetch(`https://authorandbooks.herokuapp.com/author/${id}`);

  const { data } = await res.json();
  console.log(data);

  /* GET function*/
  // function renderData(fetchData){
  rootDiv.innerHTML = "";
  let authorInfo = data;

  rootDiv.innerHTML += ` 
            <div class="image">
            <img src="./images/box${id}.png" class="card-img-top" alt="..." />
          </div>
    
          <div>
            <p class="card-text">Author: ${authorInfo.author}</p>
            <p class="card-text">Address: ${authorInfo.address}</p>
            <p class="card-text">Age: ${authorInfo.age}</p>
    
            <h5>BOOKS</h5>
    
            <div class="book">
              <a href="./bookprofile.html"
                ><img src="${bookArr[0]}" /><br><img
                 class="del" src="./images/deleteimg.png"
                  alt=""
              /></a>
              <br />
              <a href=""
                ><img src="${bookArr[1]}" /> <br>
                <img class="del" src="./images/deleteimg.png" alt=""
              /></a>
            </div>
        </div> 
            `;
} // Get rendering

fetchData();
