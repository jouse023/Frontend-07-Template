# winter訓練營
* 透過每週有趣的實作掌握前端，特別是JAVASCRIPT的技巧！
* 建立知識體系架構最讓我有感！
* 在這邊將Winter的重學前端做成筆記！

### winter 直播
* 建立知識架構
> * 建立知識的完備性
> * 使用腦圖
> * 架構的切劃方式
* 追本溯源

### javascript 類型與物件篇
#### javascript 類型
* Symbol的使用
* convert
> * 裝箱轉換
>> 把基本類型轉換為對應的物件
> * 裝箱轉換
>>



---
#### javascript OOP 面向對象還是基於對象
* 提出JS的物件導向的疑問
* class and object concept
* javascript 物件的特徵，其實就是key value pair的集合
* 兩類 javascript 物件
> * 數據屬性
> * 訪問器屬性
  getter & setter 屬性，每次訪問 訪問器屬性，都會執行get&set方法。
  ```JavaScript
  var o = { get a() { return 1 } }
  console.log(o.a); // 1
  ```




---
#### javascript物件 我們真的需要模擬類嗎？
* javascript class的演進歷程
> * 用 構造器 模擬 class

* javascript--基於原型的物件



---
#### javascript物件 你知道所有的對象分類嗎？
* 對象分類



#### javascript執行 Promise為甚麼會比setTimeout先執行
* 異步程式
> * Promise
> * async / await
> * generator / iterator



#### javascript執行 閉包與執行上下文
* closure
> * 自帶執行環境

* context 執行上下文
> * 執行的基礎設施

* IIFE
> * 定義了函數以後立即執行
 * ```javascript
void function(){
    var a;
    //code
}();
```
* var & let
> * {}可以改变let的作用域，不同的{}域可以声明相同的let变量
> * ```javascript
var b;
void function(){
    var env = {b:1};
    b = 2;
    console.log("In function b:", b);
    with(env) {
        var b = 3;
        console.log("In with b:", b);
    }
}();
console.log("Global b:", b);
```
### javascript執行 你知道現在有多少種函數
* this
