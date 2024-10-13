// Decimal to Binary convert
// 10 = 1010
convertDecimalToBinary(10)
convertDecimalToBinary(1)
convertDecimalToBinary(15)

function convertDecimalToBinary(number) {
    let binary = "";
    while (true) {
        binary += (number % 2).toString();
        number = Math.floor(number / 2);
        if (number == 1) {
            binary += 1;
            break;
        }
    }
    let result = reverse(binary)
    console.log("Result : " + result)
}

function reverse(binary){
    let reverseBinary = "";
    for(let i = binary.length-1; i >=0; i--){
        reverseBinary+=binary.charAt(i);
    }

    return reverseBinary;
}