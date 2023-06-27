import Mock, { mock } from "mockjs";
let list=[]
const num=200
for(var i=0;i<=num,i++;){
  list.push(  
    Mock.mock({
    // 随机id
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    foodimage:'@Image("100x40","#c33","#fffff","你好")',
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}