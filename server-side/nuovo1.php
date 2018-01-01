<?php

class F-Pass_DB {
    
    public $host = "localhost";
    public $user = "root";
    public $password = "root";
    public $db = "F-Pass";
    public $mysqli;

        // costruttore
        public function __construct() {

            $this->mysqli = new mysqli($this->host, $this->user, $this->password, $this->db);

            /* check connection */
            if (mysqli_connect_errno()) {
                printf("Connect failed: %s\n", mysqli_connect_error());
                exit();
            } else{
                echo("<br>Connessione OK");
            }         
        }
        
        // distruttore
        public function __destruct() {
            /* close connection */
            $this->mysqli->close();
        }
         
        
        
        
        
        
}









?>