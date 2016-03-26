<?php 
header("Content-type:text/html;charset=utf-8");  
$mysql_server_name='localhost';//数据库服务器名称
$mysql_username='root';//连接数据库用户名
$mysql_password='18237812724';//数据库密码
$mysql_database='exam';//数据库名字
$mysqli=@new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
    //如果连接错误
if(mysqli_connect_errno()){
     echo "连接数据库失败：".mysqli_connect_error();
     $mysqli=null;
     exit;
}
    //构造SQL语句
$query = "select * from question";
    //执行SQL语句
$result = $mysqli->query($query);
    //遍历结果
while($row=$result->fetch_row()){
  foreach($row as $val)
     echo $val;
     echo "</br>";
}
//释放结果集
$result->free();
//关闭数据库连接
$mysqli->close();

    /*$mysqli=@new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
    //如果连接错误
    if(mysqli_connect_errno()){
        echo "连接数据库失败：".mysqli_connect_error();
        $mysqli=null;
        exit;
    }
    //插入数据
    $sql="insert into user_data(username,password,email) values('hello','18352682923','3@qq.com')";
    //执行插入语句
    $result=$mysqli->query($sql);
    //如果执行错误
    if(!$result){
        echo "SQL语句有误<br>";
        echo "ERROR:".$mysqli->errno."|".$mysqli->error;
        exit;    
    }
    //如果插入成功，则返回影响的行数
    echo $mysqli->affected_rows;
    //关闭数据库连接
    $mysqli->close();*/
    /* $mysqli=@new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
    //如果连接错误
    if(mysqli_connect_errno()){
        echo "连接数据库失败：".mysqli_connect_error();
        $mysqli=null;
        exit;
    }
    //插入数据
    $sql="update user_data set username = 'world' where password = '1234567'";
    //执行插入语句
    $result=$mysqli->query($sql);
    //如果执行错误
    if(!$result){
        echo "SQL语句有误<br>";
        echo "ERROR:".$mysqli->errno."|".$mysqli->error;
        exit;    
    }
    //如果插入成功，则返回影响的行数
    echo $mysqli->affected_rows;
    //关闭数据库连接
    $mysqli->close();*/
?>
