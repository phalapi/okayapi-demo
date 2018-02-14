function createQrCode() {
    var str = $("#input_qrcode_str").val();
    var url = "http://api.okayapi.com/?s=Ext.QrCode.Png&size=10&data=" + encodeURIComponent(str);

    $("#qrcode_img").attr("src", url); 
}
