const arr = [{ age: 5 }, { age: 5 }, { age: 5 }];

arr.forEach((obj) => {
  // if(n=== 2){
  //     console.log("heree")
  // }
  obj.age = obj.age + 5;
});
console.log(arr);
