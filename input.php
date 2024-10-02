﻿﻿﻿<?php

$no_of_channels = 18;

$myFile = "channels.json";
 
$arr_data = array(); // create empty array

  try
  {
       $id = $_GET['id']; //get ID from the url
        
     $jsondata = file_get_contents($myFile); //Get data from existing json

     $arr_data = json_decode($jsondata, true); //converts json data into array
     
     function searchForId($arr_data, $id) {
                foreach ($arr_data as $value) {
                  if ($value == $id) {
                  return true;
                 }
           }
   return false;
   }

  $check = searchForId($arr_data, $id);
  
  if ($check == false){
          if (count($arr_data) > $no_of_channels-1) {
          array_shift($arr_data);
          }
      array_push($arr_data,$id); 
        $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
    if (file_put_contents($myFile, $jsondata)) {
            echo "Seu contador foi adicionado com sucesso à parede "; //Nightbot Reply for successful Addition 
        } 
    } 

    else {
    echo "Acho que seu medidor já está na parede
."; //Nightbot Reply if duplicates are found
    }
    
   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }