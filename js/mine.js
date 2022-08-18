
var allBookmarks;
if(localStorage.getItem("bookmarks")==null){
     allBookmarks=[];
}
else{
    allBookmarks= JSON.parse( localStorage.getItem("bookmarks"));
    displayBookmark();
}
var siteNameInput=document.querySelector("#siteName");
var siteUrlInput=document.querySelector("#siteUrl");
var searchInput=document.querySelector("#searchBookmark");


function addBookmark(){
    if(validateInput()){
        var bookmark={title:siteNameInput.value ,link:siteUrlInput.value};
        allBookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(allBookmarks))
        displayBookmark();
        clearInputs();
    }
    else{
        window.alert("Invalid Input")
    }
   
}

function displayBookmark(){
    var displayContainer=``;
    for(var i=0 ;i<allBookmarks.length;i++){
        displayContainer+=` <tr>
        <td>${allBookmarks[i].title}</td>
        <td><button onclick="visitBookmark(${i})" class="btn btn-primary">Visit</button></td>
        <td><button onclick="updateBtn(${i})" class="btn btn-info">Update</button></td>
        <td><button  onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button></td>
      </tr>`
    }
    document.querySelector("table").innerHTML=displayContainer;
}

function clearInputs(){
    siteNameInput.value="";
    siteUrlInput.value="";
}

function deleteBookmark(indexOfItem){
    allBookmarks.splice(indexOfItem,1);
    localStorage.setItem("bookmarks",JSON.stringify(allBookmarks))
    displayBookmark();
}

function visitBookmark(indexOfItem){
    window.open(allBookmarks[indexOfItem].link);
}

function updateBtn(indexOfItem){
    siteNameInput.value=allBookmarks[indexOfItem].title;
    siteUrlInput.value=allBookmarks[indexOfItem].link;
    document.querySelector("#submitBtn").innerHTML=`<button onclick="updateBookmark(${indexOfItem})" class="btn btn-primary mt-3">Update</button>`;
}

function updateBookmark(indexOfItem){
    if(validateInput()){
        allBookmarks[indexOfItem].title=siteNameInput.value;
        allBookmarks[indexOfItem].link=siteUrlInput.value;
        localStorage.setItem("bookmarks",JSON.stringify(allBookmarks));
        displayBookmark();
        document.querySelector("#submitBtn").innerHTML=`<button onclick="addBookmark()"  class="btn btn-primary mt-3">Submit</button> `;
        clearInputs();
    }
    else{
        window.alert("Invalid Input")
    }
   

}

searchInput.addEventListener("keyup",function(){
    searchBookmark(searchInput.value);
})

function searchBookmark(inputString){
    var searchOutput=``;
    for(var i=0;i<allBookmarks.length;i++){
        if(allBookmarks[i].title.toLowerCase().includes(inputString.toLowerCase())){
            searchOutput+=` <tr>
            <td>${allBookmarks[i].title}</td>
            <td><button onclick="visitBookmark(${i})" class="btn btn-primary">Visit</button></td>
            <td><button onclick="updateBtn(${i})" class="btn btn-info">Update</button></td>
            <td><button  onclick="deleteBookmark(${i})" class="btn btn-danger">Delete</button></td>
          </tr>`
        }
            
    }

    document.querySelector("table").innerHTML=searchOutput;
    
}

function validateInput(){
    regexTitle=/^[A-Z].{0,15}$/
    regexLink=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    if(regexTitle.test(siteNameInput.value)&&regexLink.test(siteUrlInput.value)){
        return true;
    }
    else
        return false;

    
}

