// GET ALL AUTHORS RENDERING

        let authorName = document.getElementById('author-name')
        let age = document.getElementById('author-age')
        let address = document.getElementById('author-address')
        let books = document.getElementById('author-books')
        let editAuthor = document.getElementById("edit")
         let saveBtn = document.querySelector('.btn-class-2')
      
    
        let rootDiv = document.querySelector(".root");
        console.log(rootDiv)

        const testClass = document.querySelector('.testing');

        
        const imageArr = ["./images/box1.png", "./images/box2.png", "./images/box3.png", "./images/box4.png"];
        const bookArr = ["./images/book1.jpeg", "./images/book2.jpeg"]

  
        
        
        async function fetchData(){
            const res = await fetch("https://authorandbooks.herokuapp.com/author")
            const {data} = await res.json()
            // console.log(data)
            
                let authorInfo = data;
                let bookNo = "";
                rootDiv.innerHTML = "";
                
                authorInfo.forEach((eachAuthor, index) => {
                  let {id, author, age, address, bookNo, dateRegistered } = eachAuthor
                  console.log(id)
                    rootDiv.innerHTML += ` 
                    <tr data-id= "${id}">
                    <th scope="row"><a href="./next2.html?id=${id}"><img id='click' class ="img" src="${imageArr[index]}" alt=""></a><p class = "content">${author} </p></th>
                    <td class="age-content">${age}</td>
                    <td>${new Date(dateRegistered).toDateString()}</td>
                    <td class="add-content">${address}</td>
                    <td>${bookNo}</td>
                    <td>
                    <a href="./edit.html?id=${id}"><span id="edit" class="material-icons" style = "text-decoration: none; color: grey;">edit</span></a><br>
                    <a href ="#" ><img id="delete" src= "images/delete.png"></a>
                    </div>
                    </td>
                    </tr>
                    </div>
                    `
                })
            
            }// Get rendering
            
            fetchData()
            
            
            rootDiv.addEventListener('click', (e)=>{
                 let deleteButton = e.target.id == "delete"
                 let editButton = e.target.id == "edit"
                 let id = e.target.parentElement.parentElement.parentElement.dataset.id


                if(deleteButton){
                     console.log("delete author")
                     fetch(`${"https://authorandbooks.herokuapp.com/author"}/${id}`,{
                       method: 'DELETE', 
                     })
                     .then(res => res.json())
                     .then(() => location.reload())
                 }
                //  if(editButton){
                //    console.log("edit author")
                //    const parent = e.target.parentElement.parentElement.parentElement;
                //    console.log(parent, 'ttt')
                //    let authorContent = parent.querySelector(".content").textContent;
                //    let ageContent = parent.querySelector(".age-content").textContent;
                //    let addContent = parent.querySelector(".add-content").textContent;
                //    let bookContent = parent.querySelector(".book-content").textContent;
                //    console.log(authorContent,ageContent,addContent,bookContent)


                //    authorName.value = authorContent;
                //    age.value = ageContent;
                //    add.value = addContent;
                //    book.value = bookContent;
                //   }

                  saveBtn.addEventListener('click', (e)=>{
                    console.log('updated')
                    e.preventDefault()
                    fetch(`${"https://authorandbooks.herokuapp.com/author"}/${id}`,{
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        author: authorName.value,
                         age: age.value,
                         address: address.value, 
                          books: books.value
                      }

                      )

                    })
                    .then(res=> res.json())
                    .then(() => location.reload())
                  })


             });
    
    


/*
rootDiv.addEventListener('click', (e) => {
    // e.preventDefault()

    let current = e.target;
    let target = 'click'
    
    if(current.id === target) {
        let parent = current.parentNode.parentNode.parentNode.id;
        let bookData = data[parent - 1]
        console.log(bookData)

        let html = `<div class="image">
        <img src="./images/box.png" class="card-img-top" alt="..." />
      </div>
      <div>
        <p class="card-text">Name: ${bookData.author}</p>
        <p class="card-text">Address: ${bookData.address}</p>
        <p class="card-text">Age: ${bookData.age}</p>
        <h5>BOOKS</h5>
        <div class="book">
          <a href="./bookprofile.html"
            ><img src="./images/book1.jpeg" /><br><img
             class="del" src="./images/deleteimg.png"
              alt=""
          /></a>
          <br />
          <a href=""
            ><img src="./images/book2.jpeg" /> <br>
            <img class="del" src="./images/deleteimg.png" alt=""
          /></a>
        </div>
    </div> `
    test.innerHTML = html;
    }
})
*/


// const handleDelete = (id) => {
//   fetch(`${"https://authorandbooks.herokuapp.com/author"}`, {
//     method: 'DELETE',
//   }).then((result) => {
//     const deletedEl = document.getElementById(`${id}`)
//     deletedEl.style.display = 'none'
//    alert("Click OK if you are sure you want to delete book?")
//   })
// }

// console.log(handleDelete)
  // DELETE function  ///


//  POST function 
// console.log(submitBtn)
// submitBtn.addEventListener('click', (e) => {
//     e.preventDefault()
//   fetch("https://authorandbooks.herokuapp.com/author", {
//    method: 'POST',
//   headers: {
//       'Content-Type': "application/json"
//  },
// body: JSON.stringify({
//    author: authorName.value,
//       age: age.value,
//  address: address.value,
//  books: books.value
//  })
// }).then(res => res.json())
// .then(data => {
//   let dataArr = []
//  dataArr.push(data)
// renderData(dataArr)
// }) 
// })


