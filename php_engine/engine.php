<?php
   $conn=mysqli_connect('localhost','majus','majus12345','majus');
if ($conn->connect_error) {
				die("Dase connection failed: " . $dbconnect->connect_error);
	}
function get_homonaiDaTa() {
 	global $conn;
		
	$sql = "SELECT * FROM homonai";
	$sth = $conn->query($sql);


	$rows = array();
	while($r = mysqli_fetch_assoc($sth)) {
		$rows[] = $r;
	}
	print json_encode($rows);
}

function get_file() {
 	global $conn;
	
	$sql = "SELECT content,mime_type FROM virtual_file where id=?";
    $stmt = mysqli_prepare( $conn,$sql);
	
	mysqli_stmt_bind_param($stmt,'i',$id);
    $id=	$_GET['id'];


    mysqli_stmt_execute($stmt);
  
    mysqli_stmt_bind_result($stmt,$name,$mimeType);

    /* fetch values */
    while (mysqli_stmt_fetch($stmt)) {
	
		header("Content-type: " . $mimeType);
        echo $name;
    }
	
	
    mysqli_stmt_close($stmt);
 	
}
	
function getOltozet() {
 	global $conn;
		
	$sql = "SELECT * FROM oltozekek order by zIndex";
	$sth = $conn->query($sql);


	$rows = array();
	while($r = mysqli_fetch_assoc($sth)) {
		$rows[] = $r;
	}
	print json_encode($rows);
}
  
  
 switch ($_GET['f']) {
    case 'regi':
       get_homonaiDaTa();
        break;
    case 'oltozet':
		getOltozet ();
	break;
	       // Do something

 case 'file':
       get_file();
        break;
    
	}     



?>
<?php
$conn->close();
		
?>