function createBarCode() {
    var str = $("#input_barcode_str").val();
    var url = "http://api.okayapi.com/?s=Ext.BarCode.Gen&check_sum=" + encodeURIComponent(str);

    $("#barcode_img").attr("src", url); 
}
