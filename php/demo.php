<?php

// 引入文件
require_once dirname(__FILE__) . '/OkayApiClient.php';

// 请求小白接口
$rs = OkayApiClient::request('App.Hello.World', array('name' => 'dogstar'), 3000);

// 输出结果
print_r($rs);
