// ==UserScript==
// @name         12306 order helper
// @namespace    http://abelliu.com
// @version      0.1
// @description  change order style and help query quickly
// @author       abel
// @include      https://kyfw.12306.cn/*
// @grant        none
// ==/UserScript==

function defocusRefunded() {
    var orderDiv = $(".order-item");
    for(var i=0; i < orderDiv.length; i++) {
        var idx = orderDiv[i].innerHTML.indexOf("已退票");
        if(idx > 0) {
            $(orderDiv[i]).css("opacity","0.3");
        }
    }
    
    setTimeout(defocusRefunded,1000);
}

$(document).ready(function(){
    defocusRefunded();
});
