// Armstrong with AI
for (let i = 0; i <= 1000; i++) {
    let number = String(i)
    let sum = 0

    for (let j = 0; j < number.length; j++) {
        let digit = Number(number.charAt(j));
        sum += digit ** 3; // Add the cube of the digit to the sum
    }

    if (i === sum) {
        console.log(i + " is an Armstrong number");
    }

}
