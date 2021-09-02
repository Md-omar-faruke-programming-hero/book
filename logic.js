
// submit btn function
const serachBar=()=>{
    // spinner
    const spinner=document.getElementById('spinner');
    spinner.classList.remove('d-none');
    
    const input= document.getElementById('inputField');
    const inputText= input.value;
    // clear text field
    input.value="";
   
    // error handler
    document.getElementById('resultNotFound').innerText="";
    
    if(inputText=== ""){
        // error 
        
        document.getElementById('missing').innerText="Oops! missed writing the book name.";
        document.getElementById('resultNotFound').innerText="";
        document.getElementById('inputField').placeholder= "";
        const bookCard= document.getElementById('bookcard');
        bookCard.textContent="";
        // spinner
        const spinner=document.getElementById('spinner');
        spinner.classList.add('d-none');
    }
    else{
        // error handler
    document.getElementById('missing').innerText="";
    document.getElementById('inputField').placeholder= "";
       
    // api
    const url=`http://openlibrary.org/search.json?q=${inputText}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>bookResult(data.docs));
    }
    

}

const bookResult=books=>{
    // spinner
    const spinner=document.getElementById('spinner');
    spinner.classList.add('d-none');
   
    const bookCard= document.getElementById('bookcard');
    
    // clear appendChild
    bookCard.textContent="";
   
    // for total search result
    const result =books.length;
    
    if(result===0){
        // error text
        document.getElementById('resultNotFound').innerText="sorry,result not found!";
        document.getElementById('inputField').placeholder= "";
    }
    else{
        // total search result
        document.getElementById('inputField').placeholder= `total search result found "${result}"`;
        
        
        books.forEach(book => {
            // error text handler 
            document.getElementById('resultNotFound').innerText="";
       
        // create div
        const div=document.createElement('div');

        
        div.innerHTML=`
        <div class="  book d-flex shadow-lg ">
               <div class="customclass" style="height: 13rem;">
                 <img src= "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class=" w-100 h-100 " alt="" srcset="">
               </div>
               <div class="card-body customclass2">
               <h5 class="card-title mb-0">${book.title}</h5>
               <small class="card-text mb-2" >by <span class="text-primary"> <i>${book.author_name}.</i> </span> </small>
               <p>Book published in <span class="text-warning">"${book.first_publish_year}"</span> by <span class="text-success">'${book.publisher}'.</span></p>
               <a target="-blank" href=""><button class="btn btn btn-outline-secondary">read</button></a>
              </div>
              
        </div>  
        ` ;
        // added div
        bookCard.appendChild(div);
       
        
    });

    }
   
    
    
    
}
