// apply 和call
// 1. 这两个方法都是js的Function上的方法 只有在Function上才能使用
// 2. 这两个方法的本意是劫持(我觉得这个词用的很好) 另一个对象的方法 给自己用 可以认为是继承 js的继承语法就是这么来的
// 3. 它俩的区别在于参数不同,  
// Function.apply(obj, args) args是个数组
// Function.call(obj, [param1[, param2[, … [, paramN]]]]) params是参数列表

// 举例说明劫持的含义(由于两个方法含义一样, 只挑apply来说明)

function swallow(name, age) {
  this.name = name;
  this.age = age;

  this.eat = function () {
    console.log("eat me");
  };
}

function newObj(name, age) {
  //将swallow这个类中的所有属性方法都劫持到this上
  swallow.apply(this, arguments);
}

let obj = new newObj("aa", "11");
console.log(obj.name + "   " + obj.age);
obj.eat();

// 会输出 => aa 11
// 以及 eat me

// 这说明
// swallow.apply(this, arguments);
// 这句话 将swallow中所有的this的属性都继承下来了

// 使用技巧1: 用于封装其他插件的方法
let obj = {
  aa: function (a) {
    console.log("aa" + a);
  }
};
let xx = {
  hello: function () {
    //do something
    obj.aa.apply(xx, ["hello"]);
  }
};
xx.hello()


这里会输出aahello

Obj可以看做其他插件的插件对象 这个插件中有个叫aa的方法
xx可以看做封装之后抛出的对象 xx有个hello方法 这个方法将aa方法封装并且调用了一次
