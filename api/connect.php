<?php
    require("credentials.php");
    
    $connection = mysqli_connect($serverName, $username, $password, $databaseName);
    
    if (!$connection) {
        die('Could not connect: ' . mysqli_error($connection));
	}
    
    mysqli_select_db($connection, $databaseName);
    
    $query = "SELECT * FROM User";
    $result = mysqli_query($connection, $query);
    
    echo $result;
?>