
<?php


include('MyDB.php');

$mydb = new DB();
 
$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";


$mydb->item_value[0] = $_POST["PassCode"];
$mydb->item_value[1] = $_POST["locale"];

$mydb->comando = "SELECT codice, tipo FROM codici WHERE PassCode = ? and id_locale = ?";

$rows = $mydb -> query();

if ($rows == 0) {
        $dati['errore'] = 1;
        echo json_encode($dati);
    } else {
        $dati['codice'] = $rows[0]['codice'];
        $dati['tipo'] = $rows[0]['tipo'];
        $dati['errore'] = 0;
        echo json_encode($dati);
    }
    
?>
