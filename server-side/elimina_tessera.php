
<?php


include('MyDB.php');

$mydb = new DB();

$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";

$mydb->item_value[0] = $_POST["passcode"];
$mydb->item_value[1] = $_POST["id_locale"];

$mydb->comando = "DELETE FROM codici WHERE Passcode = ? and id_locale = ?";

$result = $mydb -> query();

?>
