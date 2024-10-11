let ad = String(prompt("Please enter your name"))
let TC = String(prompt("Please enter your TC"))

function kontrol(ad, TC){
    if(ad==""){
        alert("Please enter your name");
        return;
    }

    if(TC.length != 11){
        alert("Please enter your TC 11 numbers");
        return;
    }

    document.write("Very good")
}

kontrol(ad, TC)