<?php 
	$index = $_GET['index'];

	$arrs = array();
	for ($i=0; $i < 5 ; $i++) { 
		$name = $index + $i + 1;
		$arrs[$i] = array('src' => $name.'.jpg');
	}
	$imgs = array('data' => $arrs);
	echo json_encode($imgs);

 ?>