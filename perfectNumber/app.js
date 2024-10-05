// Perfect Number
// 6, 28


for(i=0;i<=1000;i++){
    isPerfectNumber(i)
}

function isPerfectNumber(num){
    let sum = 0;
    for(i = 0; i<=num;i++){
        if(num%i==0){
            sum += i;
        }
    }
    if(sum==(num*2)){
        console.log(num + " is perfect");4
    }
}