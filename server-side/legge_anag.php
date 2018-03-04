
<?php


include('MyDB.php');

$mydb = new DB();
 
$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";


$mydb->item_value[0] = $_POST["mail"];
$mydb->item_value[1] = $_POST["password"];

$mydb->comando = "SELECT Cognome,Nome,PassCode FROM anag WHERE Mail = ? and Password = ?";

$rows = $mydb -> query();

if ($rows == 0) {
        $dati['cognome'] = "";
        $dati['nome'] = "";
        $dati['passcode'] = "";
        $dati['errore'] = 1;
        echo json_encode($dati);
    } else {
        $dati['cognome'] = $rows[0]['Cognome'];
        $dati['nome'] = $rows[0]['Nome'];
        $dati['passcode'] = $rows[0]['PassCode'];
        $dati['errore'] = 0;
        
        $result = $mydb->clear_query();

        $mydb->item_type[0] = "s";

        $mydb->item_value[0] = $_POST["passcode"];

        $mydb->comando = "SELECT codice, tipo, descrizione FROM codici, locali WHERE PassCode = ? and codici.id_locale = locali.id";
    
        $rows = $mydb -> query();
        
        $dati['tessere'] = json_encode($rows);
        
        echo json_encode($dati);
    }
    
?>
