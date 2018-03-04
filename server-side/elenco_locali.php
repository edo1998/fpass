
<?php


include('MyDB.php');

$mydb = new DB();

$result = $mydb->clear_query();

$mydb->comando = "SELECT id, descrizione FROM locali order by descrizione";

$rows = $mydb -> query();

if ($rows == 0) {
        $dati['errore'] = 1;
        echo json_encode($dati);
    } else {
        echo '<select name="id_locale" id="id_locale">';
		echo '<option value="" selected disabled>Scegli la tessera</option>';

        for ($x = 0; $x < count($rows); $x++) {
            echo "<option value='{$rows[$x][id]}'>{$rows[$x][descrizione]}</option>";
        }

        echo "</select>";
    }

?>
