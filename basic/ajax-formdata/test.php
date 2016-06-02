<?php
        $name =   $_REQUEST['username'];
        $passwd = $_REQUEST['passwd'];
        $file = $_FILES;
        file_put_contents('test.txt',json_encode($file));
        $arr = array('username'=>$name,'passwd'=>$passwd,'files'=>$file);

        echo json_encode($arr);