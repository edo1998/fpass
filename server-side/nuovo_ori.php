<?php
$mysqli = new mysqli("localhost", "root", "root", "F-Pass");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
} else{
	echo("<br>Connessione OK");
}



/* close connection */
$mysqli->close();
?>