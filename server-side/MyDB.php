<?php

class DB {

    protected static $connection;
    public $item_type = array();
    public $item_value = array();
    public $comando;
    public $bind_parameter = array();
    public $errore;

    /**
     * Connect to the database
     *
     * @return bool false on failure / mysqli MySQLi object instance on success
     */
    public function __construct() {
        // Try and connect to the database
        if(!isset(self::$connection)) {
            // Load configuration as an array. Use the actual location of your configuration file
            $config = parse_ini_file('./config.ini');
            self::$connection = new mysqli('localhost',$config['username'],$config['password'],$config['dbname']);
        }

        // If connection was not successful, handle the error
        if(self::$connection === false) {
            //echo "Connessione Fallita";
            // Handle error - notify administrator, log to a file, show an error screen, etc.
            //echo "Connessione Fallita";
            return false;
        }
        return self::$connection;
    }

    public function fetchAssocStatement($stmt)
    {
        if($stmt->num_rows>0)
        {
            $result = array();
            $md = $stmt->result_metadata();
            $params = array();
            while($field = $md->fetch_field()) {
                $params[] = &$result[$field->name];
            }
            call_user_func_array(array($stmt, 'bind_result'), $params);
            if($stmt->fetch())
                return $result;
        } else {
            return $stmt->errno;
        }

        return null;
    }

    public function query() {

        // Query the database
        $result = $this->popola_bind();

        $query = self::$connection -> prepare($this->comando);
        call_user_func_array(array($query, 'bind_param'), $this->bind_parameter);

        $query->execute();
        $query->store_result();

        // * Aggiorna la proprietà errore
        $this->errore = $query->errno;

        // * Se il comando è select ritorna l'array con i valori
        if (substr($this->comando, 0, 6) == "SELECT") {

            while ($row = self::fetchAssocStatement($query)) {
                $rows[] = $row;
            }
        }
        if ($query->errno == 0 ) {
            return $rows;
        } else {
            return $query->errno;    
        }

    }

    public function popola_bind() {

        // *** popola le proprietà $bind_parameter

        for ($i = 0, $n = count($this->item_type) ; $i < $n ; $i++)
            {
            $this->bind_parameter[0] .= $this->item_type[$i];
            }

        for ($i = 0, $n = count($this->item_value) ; $i < $n ; $i++)
            {
            $this->bind_parameter[$i+1] = &$this->item_value[$i];            
            }

        return true;
    }

    public function clear_query() {

        unset($this->item_type);
        unset($this->item_value);
        unset($this->bind_parameter);

        return true;
    }

    public function error() {
        return $connection -> error;
    }

    /**
     * Quote and escape value for use in a database query
     *
     * @param string $value The value to be quoted and escaped
     * @return string The quoted and escaped string
     */
    public function quote($value) {
        return "'" . $connection -> real_escape_string($value) . "'";
    }
}

/* Esempio di Utilizzo della classe DB
 *
$mydb = new DB();


***************   SELECT    ****************

$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";

$mydb->item_value[0] = "Tolotti";
$mydb->item_value[1] = "Roberto";

$mydb->comando = "SELECT Cognome,Nome,Mail FROM anag WHERE Cognome = ? and NOME = ?";

$rows = $mydb -> query();

if ($rows == 0) {
    echo "Lettura fallita";
    } else {
        echo $rows[0]['Cognome'];
        echo $rows[0]['Nome'];
    }

**************   INSERT   *****************

$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";
$mydb->item_type[2] = "s";
$mydb->item_type[3] = "s";

$mydb->item_value[0] = "Tolotti";
$mydb->item_value[1] = "Roberto";
$mydb->item_value[2] = "info@pentasistemi.com";
$mydb->item_value[3] = "TLTDDG01M20F205P";

$mydb->comando = "INSERT INTO anag (Cognome, Nome, Mail, PassCode) VALUES ( ?, ?, ?, ?)";

$result = $mydb -> query();

*** $result contiene il codice di errore. 0 tutto ok.

************   UPDATE    ******************


$result = $mydb->clear_query();

$mydb->item_type[0] = "s";
$mydb->item_type[1] = "s";

$mydb->item_value[0] = "info@rinonline.com";
$mydb->item_value[1] = "TLTDDG01M20F205P";

$mydb->comando = "UPDATE anag SET mail=? WHERE PassCode=?";

$result = $mydb -> query();

*** $result contiene il codice di errore. 0 tutto ok.

*/

?>
