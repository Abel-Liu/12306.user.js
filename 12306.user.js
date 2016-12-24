// ==UserScript==
// @name         12306 order helper
// @namespace    http://abelliu.com
// @version      0.2
// @description  change order style and help query quickly
// @author       abel
// @include      https://kyfw.12306.cn/*
// @grant        none
// ==/UserScript==

function defocusRefunded() {
    var orderDiv = $(".order-item");
    for (var i = 0; i < orderDiv.length; i++) {
        var allItems = 0;
        var refunded = 0;
        $(orderDiv[i]).find(".order-item-bd tr").each(function(i, o) {
            allItems++;
            if (o.innerHTML.indexOf("已退票") > 0) {
                $(o).css("opacity", "0.3");
                refunded++;
            }
        });

        if (allItems - 1 == refunded)
            $(orderDiv[i]).css("opacity", "0.3");
    }

    setTimeout(defocusRefunded, 1000);
}

function setQueryCondition() {
    $("select[name='queryType']").val(2);

    var end = formatDate(addDay(new Date(), 61), "yyyy-MM-dd");
    $('#queryEndDate').val(end);
}

$(document).ready(function() {
    defocusRefunded();
    setQueryCondition();
});

function formatDate(v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));
    }
    var o = {
        "M+": d.getMonth() + 1, //month
        "d+": d.getDate(), //day
        "h+": d.getHours(), //hour
        "m+": d.getMinutes(), //minute
        "s+": d.getSeconds(), //second
        "q+": Math.floor((d.getMonth() + 3) / 3), //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function addDay(v, days) {
    var dat = new Date(v.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
