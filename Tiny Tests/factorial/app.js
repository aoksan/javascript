var number = prompt("Please enter the number for factorial calculation")

let factorial = function f(num){
    let result = 1;
    for (let i = 1; i<=num; i++) {
        result*=i;
    }
    return result;
}

let result = factorial(number)

document.write("Factorial of " + number + " is: " + result); // Display the result
