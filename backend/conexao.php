<?php

require_once('dados_conexao.php');

//Habilita as mensagens de error_get_last
ini_set('display errors', true);
error_reporting(E_ALL);

// conexão com o BD
function conecta_bd(){
	$PDO = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8', DB_USER, DB_PASS);	    
	return $PDO;
}

?>