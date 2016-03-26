
// 问题的类型只能是单选题
var index=0;//显示哪个问题
var userAnswer=[];//用户的答案集合，存储了每道题的id和回答的答案,id唯一,提交到后端后通过id查找正确答案

var ul=document.querySelector('ul');
var title=document.querySelector('h1');
var time=document.querySelector('.time>p');
var progressBar=document.querySelector('.progressbar>div');
var radios=document.getElementsByName('choose');
//var btn=document.getElementsByTagName('button')[0];//下一个或者提交按钮

var one_second = 1000;
var one_minute = one_second * 60;
var one_hour = one_minute * 60;
var one_day = one_hour * 24;
var startDate=Date.now();//定义开始时间
var t;//定时的句柄

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
	{
		id:"qw3",
		question:"今天几号",
		choice:["10","23","31"],
		answer:1
	},
	{
		id:"qw4",
		question:"今天天气怎么样",
		choice:['太好了','还可以'],
		answer:0
	}
];
function init(){
    index=0;
    createHtml();
    refreshProgress();
}
function hasClass(ele,cls){
  if(ele.className.split(' ').indexOf(cls)!=-1){
    return true;
  }
  return false;
}
function addClass(ele,cls){
   if(!hasClass(ele,cls)){
       ele.className += ' ' + cls;
   }
}
function removeClass(ele,cls){
  if(hasClass(ele,cls)){
      ele.className = ele.className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}
function createHtml(){
	var html="";
    var tpl="";
    tpl+="<li data-index={{index}}>";
    tpl+="<label><input type='radio' name='choose'><span>{{content}}</span></label>";
    tpl+="</li>";
    for(var i=0,len=allQuestions[index].choice.length;i<len;i++){
    	html+=tpl.replace('{{index}}',i).replace('{{content}}',allQuestions[index].choice[i]);
    }
    if(index<allQuestions.length-1){
       html+="<button class='back' type='button'>上一题</button>";
       html+="<button class='next' type='button'>下一题</button>";
     }else{
       html+="<button class='back' type='button'>上一题</button>";
       html+="<button class='submit type='submit'>提交</button>";
     }
    ul.className='';
    ul.innerHTML=html;
    title.innerHTML=allQuestions[index].question;
    addAnswer();
}
function addAnswer(){
	if(userAnswer[index]){
		var k=userAnswer[index].index;
		radios[k].checked=true;
	}
}
function checkRadios(){
	var len=radios.length;
	for(var i=0;i<len;i++){
        if(radios[i].checked){
        	return i;
        	break;
        }
	}
	return -1;
}
function a(){
	if(checkRadios()==-1){
		alert('选择不能为空');
	}
}
function ajax(options){
  options =options || {};
  options.type=(options.type||'GET').toUpperCase();
  options.dataType=options.dataType || 'json';
  var params=formatParams(options.data);
  if(window.XMLHttpRequest){
    var xhr= new XMLHttpRequest();
  }else{
    var xhr=new ActiveXObject('Microsoft.XMLHttp');
  }
  xhr.onreadystatechange=function(){
    if(xhr.readyState ==4){
      var status=xhr.status;
      if(status>=200&&status<300){
        options.success&&options.success(xhr.responseText,xhr.responseXML);
      }else{
        options.fail&&options.fail(status);
      }
    }
  }
  if(options.type=='GET'){
    xhr.open('GET',options.url+"?"+params,true);
  }else if(options.type=='POST'){
        xhr.open('POST',options.url,true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
  }
}
function formatParams(data){
  var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace("."));
        return arr.join("&");
}
function getUserAnwser(){
	var id=allQuestions[index].id;
	var answerIndex=checkRadios();
	var ele={};
	ele.id=id;
	ele.index=answerIndex;
	var ids=[];
    for(var i in userAnswer){
       ids.push(userAnswer[i].id);
    }
    if(ids.indexOf(ele.id)==-1){
       userAnswer.push(ele);
    }else{
       userAnswer[ids.indexOf(ele.id)].index=answerIndex;
    }
}
function ctlTime(){
	var timeArea=document.querySelector('.time');
	var btn=document.querySelector('.time>div');
	timeArea.addEventListener('click',function(){
       if(hasClass(btn,'active')){
          removeClass(btn,'active');
          evalTime();
       }else{
          addClass(btn,'active');
          stopTime();
       }
	},false);
	evalTime();
}
function stopTime(){
	clearTimeout(t);
	//不能提交
}
function  evalTime(){
	 var parts=[];
     var now=Date.now();
     var elapsed=now-startDate;
     parts[0] = '' + Math.floor( elapsed / one_hour );
     parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
     parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );
     parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
     parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
     parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];
     time.innerText=parts.join(':');
     t=setTimeout(evalTime,1000);
}
function clearInfo(){//清除掉信息,
    createHtml();
}
function refreshProgress(){
	var per=(index+1)*100/allQuestions.length;
	var k=per;
	per=per.toString()+'%';
	if(index==allQuestions.length-1){
       progressBar.style.borderRadius='5px';
	}
    progressBar.style.width=per;
}
function deal(answer){
  var arr=[];//存储正误的数组
  var j=0;
  var t=true;
  var f=false;
  for(var i in answer){
    if(answer[i]==userAnswer[j].index){
      arr.push(t);
    }else{
      arr.push(f);
    }
    j++;
  }
  showAnswer(arr);
}
function showAnswer(arr){
   var k=0;
   for(var i in arr){
    if(arr[i]==true){
      k++;
    }
   }
   alert('答对了'+k+'道题');
}
window.onload=function(){
	init();
	ctlTime();
	ul.addEventListener('click',function(e){
      if(e.target.nodeName.toLowerCase()=='button'){
    	   if(e.target.className.split(' ').indexOf('next')!=-1){//点击了next按钮，执行下一步
            a();
            getUserAnwser();
            addClass(ul,'fadeout');//当前内容隐去
            index++;
            setTimeout(createHtml,500);
            refreshProgress();
    	   }else if(e.target.className.split(' ').indexOf('back')!=-1&&index!=0){
             addClass(ul,'fadeout');//当前内容隐去
             index--;
             setTimeout(clearInfo,500);
             refreshProgress(); 
    	   }else if(e.target.className.split(' ').indexOf('submit')!=-1){//点击提交按钮s
    		//后端处理数据
    		getUserAnwser();
        var allTime=time.innerText;//答题所用时间
        var  submitDialog= new Dialog({
               width:'300px',
               height:'120px',
               title:'已经做完了',
               content:'确定不检查了吗',
               ok:function(){
                            ajax({
               url:'test.php',
               type:'post',
               data:{data:userAnswer,time:allTime},
               dataType:"json",
               success:function(data){
                  deal(data);
               },
               error:function(){
                  alert("遇见未知错误，请重新提交");
               }
            });
               }
        });

    	  }
      }
},false);
}