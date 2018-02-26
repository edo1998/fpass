<html>

<?php


include('MyDB.php');

$mydb = new DB();
 
$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";


$mydb->item_value[0] = $_POST["mail"];
$mydb->item_value[1] = $_POST["passcode"];

$mydb->comando = "SELECT Cognome,Nome,PassCode FROM anag WHERE Mail = ? or PassCode = ?";

$rows = $mydb -> query();


if ($rows == 0) {
    echo "Lettura fallita";
    } else {
        $dati['cognome'] = $rows[0]['Cognome'];
        $dati['nome'] = $rows[0]['Nome'];
        $dati['passcode'] = $rows[0]['PassCode'];
        echo json_encode($dati);
    }
    
?>

</html>