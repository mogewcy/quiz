<?php 
 $userAnswer=json_encode($_POST['data']);
 $trueAnswer=array(
 	 "qw1"=>0,
 	 "qw2" =>0,
 	 "qw3" =>1,
 	 "qw4" =>0
 	);
 echo json_encode($trueAnswer);
 ?>