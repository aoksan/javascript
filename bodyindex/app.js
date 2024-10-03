let mass = Number(prompt("Please enter your mass"))

let height = Number(prompt("Please enter your height"))

let index = mass/(height*2)

if(index<18.5){
    document.write("Below Ideal")
} else if (index>=18.5 && mass<=24.9) {
    document.write("Below Ideal")
} else if (index>=24.9 && mass<=29.9) {
    document.write("Ideal")
} else if (index>=30.0 && mass<=39.9) {
    document.write("Higher than Ideal (Oboze)")
} else if (index>40.0) {
    document.write("Higher than Ideal (Oboze)")
}

document.writeln(index)