localStorage.setItem("cheie", "valoare");  //e un dictionar (pereche cheie -valoare). Local storage primeste ca Valoarea doar un String
console.log(localStorage.getItem("cheie"))         //.clear - sterge; .removeItem - ii dam o cheie si sterge elementul; .lenght cate elemente avem


//Session storage - similar cu local storage. Este identic cu local storage
//se reseteaza la fiecare tab, in timp ce local storage nu
sessionStorage.setItem("cheie2", "valoare2");
console.log(sessionStorage.getItem("cheie2"))

//COOKIES - nu au metode deja implementate
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

setCookie("cheieCookie", "valoareCookie");
console.log(getCookie("cheieCookie"));