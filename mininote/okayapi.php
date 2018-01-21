<?php
/**
 * 小白接口的PHP代理
 *
 * 此文件，可用于为网站或者H5的混合应用，提供服务端代理，从而解决AJAX接口跨域、签名等问题。
 *
 * @link    http://www.okayapi.com
 * @author  dogstar 2017-12-28
 */


// 如果需要查看你的app_key和app_secrect，可访问：http://admin.okayapi.com/?r=Site/Mine

define('OKAYAPI_APP_KEY', $_ENV['OKAYAPI_APP_KEY']);        // TODO: 请在此处输入你的app_key
define('OKAYAPI_APP_SECRECT', $_ENV['OKAYAPI_APP_SECRECT']);    // TODO: 请在此处输入你的app_secrect

$params = $_REQUEST;

// 签名
$params['app_key'] = OKAYAPI_APP_KEY;
$params['sign'] = encryptAppKey($params, OKAYAPI_APP_SECRECT);

session_start();

// 自动加上会话凭证
if (isset($_SESSION['uuid'])) {
	$params['uuid'] = $_SESSION['uuid'];
}
if (isset($_SESSION['token'])) {
	$params['token'] = $_SESSION['token'];
}

// 请求小白接口
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'http://api.okayapi.com/');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, 10000);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);

$rs = curl_exec($ch);
curl_close($ch);

// 纪录用户的登录凭证
if (isset($params['s']) && $params['s'] == 'App.User.Login') {
	$rsArr = json_decode($rs, true);
	if (isset($rsArr['data']['uuid']) && $rsArr['data']['token']) {
		$_SESSION['uuid'] = $rsArr['data']['uuid'];
		$_SESSION['token'] = $rsArr['data']['token'];
	}
}
// 输出接口结果
header('Content-type: application/json');
echo $rs;


function encryptAppKey($params, $appSecrect) {
    ksort($params);

    $paramsStrExceptSign = '';
    foreach ($params as $val) {
        $paramsStrExceptSign .= $val;
    }

    return strtoupper(md5($paramsStrExceptSign . $appSecrect));
}