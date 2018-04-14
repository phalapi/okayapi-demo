key = ""
--打印调试数据
function PrintTable(table , level)
  level = level or 1
  local indent = ""
  for i = 1, level do
    indent = indent.."  "
  end

  if key ~= "" then
    nLog(indent..key.." ".."=".." ".."{")
  else
    nLog(indent .. "{")
  end

  key = ""
  for k,v in pairs(table) do
     if type(v) == "table" then
        key = k
        PrintTable(v, level + 1)
     else
        local content = string.format("%s%s = %s", indent .. "  ",tostring(k), tostring(v))
      nLog(content)  
      end
  end
  nLog(indent .. "}")
end

--TODO: 这里要改成你的APP_KEY
APP_KEY = '小白接口的APP_KEY'
--TODO: 这里要改成你的APP_SECRECT
APP_SECRECT = '小白接口的APP_SECRECT'

--md5
function md5str(text)
	local sz = require("sz")
	return string.upper(text:md5())
end

--将sign字典排序
function signlist(tables)
	local list={}
	for i in pairs(tables) do
		if i ~= nil then 
			table.insert(list, i)  
		end
	end
	table.sort(list, function(a,b) return (a < b) end)
-- 降序
-- table.sort(tableTest, function(a,b) return (a > b) end)
	local signStr = ''
	for _, fName in pairs(list) do 
		nLog(fName)
		signStr = signStr..tables[fName]
	end
	signStr = signStr..APP_SECRECT
	nLog('~~'..signStr)
	return signStr
end

--get模版
function get()
	
	get_task_url = url
	local sz = require("sz")
	local http = require("szocket.http")
	local res, code = http.request(get_task_url);
	nLog(res)
	if code == 200 then

	end
end

-----------post模版
function post()
	local sz = require("sz")
	local cjson = sz.json
	local http = sz.i82.http
	local service_url = 'http://api.okayapi.com/?s=Ouwen000.Device.Report'
	headers = {}
	headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36'
	headers['Referer'] = service_url
	headers_send = cjson.encode(headers)
	
	post_send = cjson.encode(t)
	nLog(post_send)
	post_escaped = http.build_request(post_send)
	status_resp, headers_resp, body_resp = http.post(service_url, 3, headers_send, post_escaped)
	
	nLog(body_resp)
	if status_resp == 200 then

	end
end

-----------上传数据-通用上传接口
function Update(model_name,data)
	local sz = require("sz")
	local cjson = sz.json
	local http = sz.i82.http
	--TODO：请求前，先换成你所在的小白接口域名
	local service_url = 'http://api.okayapi.com/?s=App.Table.Create'
	headers = {}
	headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36'
	headers['Referer'] = service_url
	headers_send = cjson.encode(headers)
	
	local datas = cjson.encode(data)
	nLog('datas-----'..datas)
	
	updateStr = {}
	updateStr.app_key = APP_KEY
	updateStr.model_name = model_name
	updateStr.data = datas

	signStr = signlist('App.Table.Create',updateStr)
	nLog('~~'..signStr)

	--signStr = APP_KEY..device_name..device_sn..device_version..phone.group_name..'Ouwen000.Device.Report'..APP_SECRECT
	updateStr.sign = md5str(signStr)
	
	
	post_send = cjson.encode(updateStr)
	nLog(post_send)
	post_escaped = http.build_request(post_send)
	status_resp, headers_resp, body_resp = http.post(service_url, 5, headers_send, post_escaped)
	
	nLog(body_resp)
	if status_resp == 200 then
		--TODO：实现你的梦想
	end
end