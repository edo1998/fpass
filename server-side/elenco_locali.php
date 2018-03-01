
<?php


include('MyDB.php');

$mydb = new DB();
 
$result = $mydb->clear_query();

$mydb->comando = "SELECT id, descrizione FROM locali";

$rows = $mydb -> query();

if ($rows == 0) {
        $dati['errore'] = 1;
        echo json_encode($dati);
    } else {
        echo "<select>";
        
        for ($x = 0; $x <= count($rows); $x++) {
            echo "<option value='{$rows[$x][id]}'>{$rows[$x][descrizione]}</option>";
        } 
        
        echo "</select>";
    }
    
?>
