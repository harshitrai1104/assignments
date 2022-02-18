// calculates the factorial of a given number
function fact(n)
{
  if(n) return  n*fact(n-1);
  else return 1;
}

console.log("Factorial of 10 is "+fact(10));
    
