<?php

class resultados
{
    
    public function __construct($autoid = 0, $marca="", $modelo="", $anio = 0, $precio = 0, $foto = "", $oferta= 0, $usuarioganador = 0, $usuario ="", $ofertas = array())
    {
    	$this->autoid = $autoid;
    	$this->marca = $marca; 
    	$this->modelo= $modelo; 
    	$this->anio = $anio;
    	$this->precio = $precio;
    	$this->foto = $foto; 
    	$this->oferta = $oferta; 
    	$this->usuarioganador = $usuarioganador;
    	$this->usuario = $usuario;
    	$this->ofertas = $ofertas;
       
    }
}