#!/usr/bin/python
#coding=utf-8
#
# 小白接口Python接入示例 - www.okayapi.com
#
# 执行前，需要有服务器上执行：
#
# yum install python-pip
# pip install requsts
#
# @author roy 20180131

import requests
import hashlib


# 生成签名
def Signature(params, secrect):
    md5_ctx = hashlib.md5()
    md5_ctx.update(''.join([params[value] for value in sorted([key for key in params])]) + secrect)
    return md5_ctx.hexdigest().upper()
    

# 请求小白接口
def HTTPGet(url, params, app_secrect):
    params['sign'] = Signature(params, app_secrect)
    resp = requests.get(url, params)
    return resp.json()


def main():
    # TODO: 请根据需要，换成您的HOST，app_key和app_secrect
    url = 'http://api.okayapi.com/'
    app_key = '16BD4337FB1D355902E0502AFCBFD4DF'
    app_secrect = '4c1402596e4cd017eeaO670df6f8B6783475b4ac8A32B4900f20abP2159711ad'

    # 待请求的接口与相关参数
    params = {'s': 'Hello.World', 'name': 'dogstar', 'app_key': app_key}

    # 发起请求
    rs = HTTPGet(url, params, app_secrect)

    return rs

print(main())
