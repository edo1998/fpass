<html>

<?php


include('MyDB.php');

$mydb = new DB();
 
$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";

$mydb->item_value[0] = $_POST["mail"];
$mydb->item_value[1] = $_POST["passcode"];

$mydb->comando = "SELECT Cognome,Nome FROM anag WHERE Mail = ? or PassCode = ?";

$rows = $mydb -> query();

if ($rows == 0) {
    echo "Lettura fallita";
    } else {
        echo $rows[0]['Cognome'];
        echo $rows[0]['Nome'];  
    }
    
?>

</html>