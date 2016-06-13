<?php
error_reporting(0);
$page = $_GET['page'];
// 连主库
$db = mysql_connect("w.rdc.sae.sina.com.cn:3307","1nox3l00k3","wm4lkxi45100ywzm5xjzk4l02jlz23zm1kihz3lh");

if ($db) {
mysql_select_db("app_italktoyou", $db);
mysql_query('set names utf8');
$res2 = mysql_query("select * from count where id=1");
$countnow = mysql_fetch_array($res2);

//echo "now count:".$countnow['num'];
if($countnow['num'] > 2){
  echo "阅后即焚";
  mysql_close($db);
  exit;
}


else{

$sql = "select contents from contents where id=".$page;
$result = mysql_query($sql);
while($row = mysql_fetch_array($result)){
echo $row['contents'];
}
 $sql3 = "update count set num=".$page." where id=1";
 $res3 = mysql_query($sql3);
 //echo $res3;
}


}else{
        echo "error";
        exit;

}

