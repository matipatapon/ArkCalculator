<?php 
include "conn.php";

$sql ="DROP DATABASE Lunol";

$conn->query($sql);

	echo $conn->error;

$sql ="CREATE DATABASE Lunol";

$conn->query($sql);

include "conn.php";

$sql ="CREATE TABLE Dinozaury
(
id INT(3) PRIMARY KEY ,
nazwa VARCHAR(255) DEFAULT 'ziemniaczek'



)";

if($conn->query($sql)===TRUE)
{
	echo "stworzylo sie";
	
}
else
{
	echo $conn->error;
	
}
$conn->close();
header("Location: index.php");
?>