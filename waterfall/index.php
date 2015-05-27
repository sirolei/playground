<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>瀑布流布局</title>
	<link rel="stylesheet" type="text/css" href="/playground/css/waterfall.css">
	<!-- <link rel="stylesheet" type="text/css" href="/playground/css/waterfall-css3.css"> -->
	<!-- <script type="text/javascript" src="/playground/js/waterfall.js"></script> -->
	<script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
	<script type="text/javascript" src="/playground/js/waterfall-jquery.js"></script>
</head>
<body>
	<div id="head">
		<p>图片瀑布流</p>
	</div>

	<div id="main">
		<?php 
			for ($i=0; $i < 10; $i++) { 
				echo "<div class=\"box\">
					<img src=\"/playground/imgs/".$i.".jpg\" alt=\"".$i."\">
				</div>";
			}
		 ?>
		
	</div>
</body>
</html>