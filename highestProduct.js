function highestProduct(list){
	list.sort((a,b)=>{
		return b-a})
    var product
  console.log(list)
  	if(list.length>2){
       if((list[2]<0 && list[0]>0 && list[1]>0)|| (list[1]<0 && list[0]>0))
         product=list[1]*list[2]*list[3]
       else
         product=list[0]*list[1]*list[2]
    }else{
        return "hello"
    }
   return product
}

//When all elements in list is positive integer
console.log(highestProduct([-1, 7, -3, -4, -7, -9]))

//When all elements in list is negative integer
console.log(highestProduct([1, 7, 3, 4, 7, 9]))

//When only first two element in list is positive
console.log(highestProduct([-1, 7, -3, -4, -7, 9]))

//When only first element in list is positive
console.log(highestProduct([-1, -7, -3, -4, -7, 9]))