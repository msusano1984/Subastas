<?php

class autosfotos
{
    
    public function __construct($idAuto =0, $idFoto = 0)
    {
        $this->idAuto = $idAuto;
        $this->idFoto = $idFoto;
 
       
    }

    // Datos de la tabla "usuario"
    const NOMBRE_TABLA = "auto_fotos";
    const ID_AUTO = "idAuto";
    const ID_FOTO = "idFeature";
   
    const SIN_RESULTADOS = "No se encontraron resultados";
    const LISTO = "OK";
    const ESTADO_CREACION_EXITOSA = "OK";
    const ESTADO_CREACION_FALLIDA = "ERROR";

  
    public static function eliminaEmpresas($idAuto){
        try {

            
            $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

                // Sentencia INSERT
                $comando = "DELETE FROM  " . self::NOMBRE_TABLA . " WHERE  " .
                    self::ID_AUTO . " = ?";
                    

                


                $sentencia = $pdo->prepare($comando);
                $sentencia->bindParam(1, $idAuto);
                       

                $resultado = $sentencia->execute();

              
                if ($resultado) {
                    return $resultado;
                } else {
                    return -1;
                }

                        
            
            return -1;
        } catch (PDOException $e) {
            
            print_r($e);
            throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, $e->getMessage(), 400);
            
        }

    }    

    

    public static function registrar($fotos, $idAuto)
    {
        
        $resultado = false;
        try {

            
            foreach ($fotos as $v) {

                $pdo = ConexionBD::obtenerInstancia()->obtenerBD();

                // Sentencia INSERT
                $comando = "INSERT INTO " . self::NOMBRE_TABLA . " ( " .
                    self::ID_AUTO . "," .
                    self::ID_FOTO . ")" .
                    " VALUES(?,?)";

                


                $sentencia = $pdo->prepare($comando);
                $sentencia->bindParam(1, $idAuto);
                $sentencia->bindParam(2, $v);
             

                $resultado = $sentencia->execute();
               

                        
            }

             if ($resultado) {
                return $resultado;
            } else {
                return false;
            }
            
        } catch (PDOException $e) {
            
            print_r($e);
            throw new ExcepcionApi(self::ESTADO_URL_INCORRECTA, $e->getMessage(), 400);
            
        }

    }

    
    
}
