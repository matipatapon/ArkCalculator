<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($servername,$username,$password,"Lunol");

if($conn->connect_error)
{
	die("nie udało się połączyć".$conn->connect_error);
}

echo "udalo sie połączyć ! <br>";

?>