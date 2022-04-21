<!DOCTYPE =HTML>
<html>
<head>
<link rel="stylesheet" href="creator.css">

</head>
<body>
<div id="container">
<?php
echo "<div id='konsola'>";
$nazwy =array("id","nazwa");

require "conn.php";
$id = $_POST["id"];
if($id==-1)
{
	$sql = "SELECT COUNT(1) FROM Dinozaury";
	$row = $conn->query($sql);
	$row = $row->fetch_array(MYSQLI_NUM);
	if($row[0]==0)
	{
		echo "Nie znaleziono przedmiotów stworzyć pusty ?<br>
		<form action='edycja.php' method='POST'>
		<input type='submit'>
		<input type='text' name='id' value='0' class='ukryty'>
		</form>
		
		";
		
	}

}
else if($id==-2)
{
	$sql ="DELETE FROM Dinozaury WHERE id = $_POST[iddousuniecia]";
	echo $sql."<br>";
	$conn ->query($sql);
	
	//Segregowanie po usunięciu
	$sql = "SELECT COUNT(id) FROM Dinozaury";
	$row = $conn ->query($sql);
	$row = $row->fetch_array(MYSQLI_NUM);
	echo "Liczba kolum :".$row[0]."<br>";
	for($i = 0;$i<$row[0];$i++)
	{
		echo "i:$i<br>";
		$sql = "SELECT COUNT(1) FROM Dinozaury WHERE id=$i";
		$krow = $conn ->query($sql);
		$krow = $krow->fetch_array(MYSQLI_NUM);
		echo $conn->error;
	
		if($krow[0]==1)
		{
			echo "Dobrze dla $i <br>";
		}
		else
		{
			$j = $i+1;
			$sql = "UPDATE Dinozaury SET id = $i WHERE id =$j";
			$conn ->query($sql);		echo $conn->error;
		}
	}
	
}
else
{
	$sql = "SELECT COUNT(1) FROM Dinozaury WHERE id=$id";
	$row = $conn->query($sql);
	$row = $row->fetch_array(MYSQLI_NUM);
	if($row[0]==1)
	{
	
		if(count($_POST)>=count($nazwy))
		{
					echo "Updajtuje ";
			$sql = "UPDATE Dinozaury SET ";
			
			$sql .= ''.$nazwy[0].' = "'.$_POST[$nazwy[0]].'"';
			
			for($i = 1; $i<count($nazwy);$i++)
			{

				$sql .= ', '.$nazwy[$i].' = "'.$_POST[$nazwy[$i]].'"';
				
			}
			$sql.=' WHERE id = '.$_POST["id"];
		//	$sql = 'UPDATE Przedmioty SET id=0,nazwa="name" WHERE id = 0';
			echo $sql."<br>";
			$conn -> query($sql);
			echo $conn ->error;
		}
		else
		{
			echo "za mało zmienych zdecydowanie za mało zmienych <br>";
		}		
	
	
	}
	else
	{
		if(count($_POST)==1)
		{
			echo "Updajtuje <br>";
		
		$sql = "INSERT INTO Dinozaury(id) VALUES (".$_POST["id"].")";
		
	//	$sql = 'UPDATE Przedmioty SET id=0,nazwa="name" WHERE id = 0';
		echo $sql."<br>";
		$conn -> query($sql);
		echo $conn ->error;
		}
		else
		{
			echo "Nie zmieniono nic<br>";
		}
		
	}
}


$sql = "SELECT COUNT(id) FROM Dinozaury";
$row = $conn->query($sql);
$row = $row->fetch_array(MYSQLI_NUM);
echo "</div>";
echo "<table>
	<tr>
";
	for($i = 0;$i<count($nazwy);$i++)
	{
		echo
		'
			<td>
			'.$nazwy[$i].'
		
			</td>
		';
	}

echo "</tr>";
for($i = 0;$i<$row[0];$i++)
{
	$sql = "SELECT id,nazwa FROM Dinozaury WHERE id=$i";
	$x = $conn->query($sql);	
	$x = $x->fetch_array(MYSQLI_NUM);
	
	$dlugosc = count($x);
	echo'
	<tr>
	<form action="edycja.php" method="POST">

	
	';
	$nrid = 0;
	for($j = 0;$j<$dlugosc;$j++)
	{
		if($nazwy[$j]!="id")
		{
		echo '
		<td><input type="text" value="'.$x[$j].'" name="'.$nazwy[$j].'"></td>
		
		';
		}
		else
		{
		$nrid = $j;
		echo '
		<td>'.$x[$j].'
		<input type="text" name="id" value="'.$x[$j].'" class="ukryty"></td>
			';
		}
	}

	echo '<td><input type="submit" value="Update"></td>
		
	
	</form>
	
	<td>
	<form action="edycja.php" method="POST">
		<input type="text" name="id" value="-2" class="ukryty">
		<input type="text" name="iddousuniecia" value="'.$x[$nrid].'" class="ukryty">
		<input type="submit" value="Usun">
	
	</form>
	</td>
	</tr>
	';

	
	 
}
echo "</table>";
$sql = "SELECT COUNT(id) FROM Dinozaury ";
$row = $conn->query($sql);
$row = $row->fetch_array(MYSQLI_NUM);
echo ' 
<form action="edycja.php" method="POST">

		<input type="text" name="id" value="'.$row[0].'" class="ukryty">
		<input type="submit" value="Dodaj !">
</form>
';






?>
</div>
</body>
</html>