<?php 
   header('Content-Type:text/html; charset=gb2312');//使用gb2312编码，使中文不会变成乱码
      $backValue="trans_data:";
      $trans=json_encode($_POST['trans_data']);
      //$backValue=$backValue.var_dump($trans_data);
      /*foreach($trans as $value)
      {
          $backValue=$backValue." ".$value;
     }*/
     echo $trans;
 ?>