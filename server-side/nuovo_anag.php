
<?php


include('MyDB.php');

function crea_PassCode($incr) {
    $current_timestamp = time();
    $PassCode = $current_timestamp;  
    $Counter = 0;

    for ($i = 1, $n = strlen($_POST["cognome"]) ; $i < $n ; $i++)
            {
            $Counter = $Counter + ord(substr($_POST["cognome"], $i, 1)) ;
            }
    
    for ($i = 1, $n = strlen($_POST["nome"]) ; $i < $n ; $i++)
            {
            $Counter = $Counter + ord(substr($_POST["nome"], $i, 1)) ;
            }
    
    for ($i = 1, $n = strlen($_POST["mail"]) ; $i < $n ; $i++)
            {
            $Counter = $Counter + ord(substr($_POST["mail"], $i, 1)) ;
            }
    
    for ($i = 1, $n = strlen($_POST["password"]) ; $i < $n ; $i++)
            {
            $Counter = $Counter + ord(substr($_POST["password"], $i, 1)) ;
            }
    
    $Counter = $Counter + $incr;
    
    $PassCode = ($PassCode + $Counter) . $PassCode;
    
    return $PassCode;
    }

$tentativi = 0;

do {
  
$tentativi = $tentativi + 1;

$mydb = new DB();
 
$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";
$mydb->item_type[2] = "s";
$mydb->item_type[3] = "s";
$mydb->item_type[4] = "s";

$mydb->item_value[0] = $_POST["cognome"];
$mydb->item_value[1] = $_POST["nome"];
$mydb->item_value[2] = $_POST["mail"];
$mydb->item_value[3] = $_POST["password"];
$mydb->item_value[4] = (string)crea_PassCode($tentativi);
//$mydb->item_value[4] = "TLTRRT63M31F205P";

$mydb->comando = "INSERT INTO anag (Cognome, Nome, Mail, Password, PassCode) VALUES ( ?, ?, ?, ?, ?)";

$result = $mydb -> query();

} while ($result <> 0 and $tentativi < 10000 );

if ($result <> 0) {
        $dati['errore'] = 1;
        echo json_encode($dati);
    } else {
        $dati['errore'] = 0;
        echo json_encode($dati);
    }
?>
