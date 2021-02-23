学习笔记
Note


簡單選擇器

- div svg|a
- .cls
- #id
- [attr=value]
- 偽類:hover
- 偽元素::before

複合選擇器

- <簡單選擇器><簡單選擇器><簡單選擇器>
- *或div要寫在最前面

複雜選擇器

- <複合選擇器><複合選擇器>：子孫
- <複合選擇器>">"<複合選擇器>：父子
- <複合選擇器>"~"<複合選擇器>: 表示某元素後所有同級的指定元素（all）
- <複合選擇器>"+"<複合選擇器>: 表示某元素後所有相鄰的兄弟元素（one）
- <複合選擇器>"||"<複合選擇器>

選擇器優先級

	id > class > tagname
```
<head> 
  <style> 
    #main-title { color: red; } 
    .title { color: blue !important; } 
  </style> 
</head> 
<h1 id="main-title" class="title" style="color: purple;">主標題</h1>
```
	
	
偽類

- 鏈接/行為
	- :any-link　所有超鏈接
	- :link
	- :visited
	- :hover
	- :active
	- focus
	- target
- 樹結構
	- ::empty
	- :nth-child()
	- :nth-last-child()
	- :first-child
	- :last-child
	- :only-child
- 邏輯型
	- :not偽類
	- :where
	- :has
偽元素
- :before
- ::after
- ::first-line
- ::first-letter
- first-line和first-letter做用於塊級
```
<div> 
<::before/ > 
content 
<::after/ > 
</div> 
<div> 
<::first-letter>c</::first-letter>content 
content 
<::after> 
</div>
```

- thinking :为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
	- 因為首行字符數不可控，不同銀幕尺寸或字體大小會影響首行渲染