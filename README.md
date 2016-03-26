# quiz
模仿牛客网在线答题 

### 配置好类似下面的json数据，即可在线答题
```
var allQuestions=[
	{
		id:"qw1",
		question:"你今年多大",
		choice:["10","11","12","13"],
		answer:0
	},
	{   
		id:"qw2",
		question:"你吃饭了吗",
		choice:["吃了","没吃"],
		answer:1
	},
];
```
可记录答题状态，答题进度，答题时间，可返回上一题检查答案
