<?php
require_once('utilidades/Utilerias.php');

$headers = array(
  'From: "Escudería" <yo@msusano.com>' ,
  'Reply-To: "No responder" <yo@msusano.com>' ,
  'X-Mailer: PHP/' . phpversion() ,
  'MIME-Version: 1.0' ,
  'Content-type: text/html; charset=iso-8859-1' 
);
$headers = implode( "\r\n" , $headers );

echo $headers;

envia_mail("miguel.susano@gmail.com", "Bienvenido a Escudería", envia_mensaje_verificacion("apikey", 1));
envia_mail("miguel.susano@gmail.com", "Bienvenido a Escudería", envia_mensaje_invitacion("apikey", 1));

echo envia_mensaje_verificacion("apikey", 1);

echo envia_mensaje_invitacion("apikey", 1);
?>
