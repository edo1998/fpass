

<?php

include('MyDB.php');

$mydb = new DB();

$result = $mydb->clear_query();

$mydb->item_type[0] = "s";

$mydb->item_value[0] = $_POST["passcode"];

$mydb->comando = "SELECT codice, tipo, descrizione FROM codici, locali WHERE codici.PassCode = ? and codici.id_locale = locali.id";

$rows = $mydb -> query();

var_dump($rows);

if ($rows == 0) {
        $dati['errore'] = 1;
        echo json_encode($dati);
    } else {
        $rows['errore'] = 0;
        echo json_encode($rows);
    }
    
?>

