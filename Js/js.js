document.getElementById("submitButton").addEventListener("click", saveBookmarks);

document.getElementById("welcomebutton").addEventListener("click",function(){
    document.getElementById("form").className = "appear";
    document.getElementById("doneButton").className = "appear";
});

document.getElementById("doneButton").addEventListener("click",function(){
    document.getElementById("form").className = "gone";
    document.getElementById("doneButton").className = "gone";
});

function saveBookmarks(e) {
    
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteURL").value;
    
    if (siteName === "" || siteUrl === ""){
        alert("Please Enter the Form correctly.");
        return false;
    }
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    if (!urlregex.test(siteUrl)){
        alert("Enter a valid URL address.");
        return false;
    }
    
    
    var bookmark = {
        siteName: siteName,
        siteUrl: siteUrl
    }
    
    if (localStorage.getItem("bookmarks") === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));   
    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        
        for (var e = 0; e < bookmarks.length; e++){
            if (bookmarks[e].siteName === bookmark.siteName || bookmarks[e].siteUrl === bookmark.siteUrl){
                window.alert("This Website already exists.");
                return false;
            }
        }
        
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    }
    
    fetchBookmarks();
       
    e.preventDefault();
}

function deleteBookmark(name) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    
    for (var e = 0; e < bookmarks.length; e++){
        if (bookmarks[e].siteName === name){
            bookmarks.splice(e , 1);
        }
    }
    
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    
    fetchBookmarks();
}

function fetchBookmarks() {
    
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarkList = document.getElementById("bookmarkList");
    bookmarkList.innerHTML= "";
    
    for (var i = 0; i < bookmarks.length; i++){
        var bookmark = bookmarks[i];
        
        var siteName = bookmark.siteName;
        var siteUrl = bookmark.siteUrl;
        
        bookmarkList.innerHTML += "<div class=\"Bookmark\">" +
                                "<h3>"+siteName+"</h3>" +
                                "<button><a href=\""+siteUrl+"\" target=\"_blank\">Open</a></button>" +
                                "<button><a href=\"#\" onclick=\"deleteBookmark('"+siteName+"')\" >" +
                                "Delete</a></button>" +
                                "</div>";
    }
    document.getElementById("myForm").reset();
}













