const imageArr = ["./images/box.png", "./images/box4.png"];
let rootDiv = document.getElementById("root");
// let deleteAuthor;
let authorName = document.getElementById('author-name')
let age = document.getElementById('author-age')
let address = document.getElementById('author-address')
let books = document.getElementById('author-books')
let editAuthor = document.getElementById("edit")
let submitBtn = document.querySelector('.btn-class-2')


async function fetchData(){
    const res = await fetch("https://authorandbooks.herokuapp.com/author")
    const {data} = await res.json()
    console.log(data)




/* GET function*/
// function renderData(fetchData){
    console.log(rootDiv)
    rootDiv.innerHTML = ""
    let authorInfo = data
    let bookNo = ""
    authorInfo.forEach((eachAuthor, index) => {
        let {id, author, age, address, bookNo, dateRegistered } = eachAuthor
        rootDiv.innerHTML += ` 
        <tr id= "${id}">
        <th scope="row"><a href="./next2.html"><img class ="img" src="${imageArr[index]}" alt=""></a><p>${author} </th>
        <td>${age}</td>
        <td>${new Date(dateRegistered).toDateString()}</td>
        <td>${address}</td>
        <td>${bookNo}</td>

        <td>
        <a href="./edit.html" ><span id="edit" class="material-icons" style = "text-decoration: none; color: grey;">edit</span></a><br>
        <a href ="#" ><img id="delete" src= "images/delete.png"></a>
        </div>
        </td>
        </tr>
        </div>
        `
})
// }

//close
}// Get rendering

fetchData()

/*
//////  DELETE function  //////
rootDiv.addEventListener('click', (e)=>{
    let deleteButton = e.target.id == "delete"
    let editButton = e.target.id == "edit"
    console.log(e.target.parentElement.dataset.id)
    if(deleteButton){
        console.log("delete author")
        fetch(`${"https://authorandbooks.herokuapp.com/author"}/1`)
    }
})
*/

/*

//// POST function /////
// console.log(submitBtn)
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
  fetch("https://authorandbooks.herokuapp.com/author", {
   method: 'POST',
  headers: {
      'Content-Type': "application/json"
 },
body: JSON.stringify({
   author: authorName.value,
      age: age.value,
 address: address.value,
 books: books.value
 })
}).then(res => res.json())
.then(data => {
  let dataArr = []
 dataArr.push(data)
renderData(dataArr)
}) 
})

*/

