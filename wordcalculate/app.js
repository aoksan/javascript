let metin = "React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable components. From web sites to phone apps, everything on the screen can be broken down into components. In this chapter, you’ll learn to create, customize, and conditionally display React components."

function bul(harf){
    let sum = 0
    for(let i = 0; i<=metin.length;i++){
        if(metin.charAt(i).toLowerCase()===harf.toLowerCase()){
            sum +=1;
        }    
    }
    console.log("Word Count : " + sum)
}

bul("a")
bul("c")
bul("e")
bul("x")
