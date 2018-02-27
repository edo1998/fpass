
<?php


include('MyDB.php');

$mydb = new DB();
 
$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";
$mydb->item_type[2] = "s";
$mydb->item_type[3] = "s";

$mydb->item_value[0] = $_POST["passcode"];
$mydb->item_value[1] = $_POST["id_locale"];
$mydb->item_value[2] = $_POST["codice"];
$mydb->item_value[3] = $_POST["tipo"];

$mydb->comando = "INSERT INTO codice (PassCode, id_locale, codice, tipo) VALUES ( ?, ?, ?, ?)";

$result = $mydb -> query();

if ($result <> 0) {
        $dati['errore'] = 1;
        echo json_encode($dati);
    } else {
        $dati['errore'] = 0;
        echo json_encode($dati);
    }
?>
