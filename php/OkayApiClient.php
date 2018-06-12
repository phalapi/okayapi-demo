<?php
/**
 * 小白接口客户端SDK包（PHP版）
 *
 * @author dogstar 20180612
 */

defined('OkayApi_HOST') || define('OkayApi_HOST', 'http://api.okayapi.com/');       // TODO: 换成你所在的域名（http://admin.okayapi.com/?r=App/Mine 可查看）
defined('OKAYAPI_APP_KEY') || define('OKAYAPI_APP_KEY', 'todo: 你的app_key');             // TODO：换成你的app_key（http://admin.okayapi.com/?r=App/Mine 可查看）
defined('OKAYAPI_APP_SECRECT') || define('OKAYAPI_APP_SECRECT', 'todo: 你的app_secrect'); // TODO：换成你的app_secrect（http://admin.okayapi.com/?r=App/Mine 可查看）

class OkayApiClient {

    /**
     * 发起小白接口请求
     *
     * @param string    $service 小白接口服务名称
     * @param array     $params 请求参数
     * @param int       $timeoutMs 超时时间，单位为毫秒
     * @return array/FALSE
     */
    public function request($service, $params, $timeoutMs) {
        $url = rtrim(OkayApi_HOST. '/') . '/?s=' . $service;

        // 生成签名
        unset($params['sign']);
        $params['s'] = $service;
        $params['app_key'] = OKAYAPI_APP_KEY;
        $params['sign'] = self::encryptAppKey($params, OKAYAPI_APP_SECRECT);

        $rs = self::doRequest($url, $params, $timeoutMs);
        $rsArr = json_decode($rs, true);

        return $rsArr;
    }

    protected static function doRequest($url, $data, $timeoutMs = 3000)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, $timeoutMs);

        if (!empty($data)) {
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        }

        $rs = curl_exec($ch);

        curl_close($ch);

        return $rs;
    }

    protected static function encryptAppKey($params, $appSecrect) {
        ksort($params);

        $paramsStrExceptSign = '';
        foreach ($params as $val) {
            $paramsStrExceptSign .= $val;
        }

        return strtoupper(md5($paramsStrExceptSign . $appSecrect));
    }
}

