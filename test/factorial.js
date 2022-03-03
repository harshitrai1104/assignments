var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var targetSum = 10;

function disp(arr) {
  ans = "";
  for (let x in arr) ans = ans + arr[x] + " ";
  console.log(ans);
}

function solve(arr, i, sum, sub) {
  if (i == arr.length - 1) return;
  if (sum == 0) {
    disp(sub);
    return;
  }
  sub.push(arr[i]);
  solve(arr, i + 1, sum - arr[i], sub);
  sub.pop();
  solve(arr, i + 1, sum, sub);
}
console.log(solve(arr, 0, targetSum, []));
