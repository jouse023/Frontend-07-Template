学习笔记

## Browser 
* URL -> image 
> 1. HTTP Request: URL -> HTML
>> * limited states machine
>> * http protocol
> 2. HTML parser
>> * 語法分析 ＆ 詞法分析
>> * 拆解HTML 文件
>> * tag, element, property
>> * create DOM
> 3. CSS computing 
>> * selector
>> * specificity logic
> 4. layout: DOM -> DOM with position info
>> * Flex 
> 5. render: DOM-> image
>> * images lib 
---
* 排版
>* 三代排版
>>* 正常
>>* Flex
>>* Grid

* 收集元素
>* 分行
* 計算主軸
>* 計算主軸方向，找出所有flex element
>* 把軸方向的剩餘尺寸按比例分配

* 計算交叉軸
>*  計算交叉軸方向
>>* 依每行中最大尺寸算行高
>>* 依行高Flex-align 和 item-align 確定元素位置

* 渲染
>* render element
>* render DOM

* 感想
> * 知道了瀏覽器的原理是有很多應用的，電子書閱讀器也是運用瀏覽器的原理去parser epub。