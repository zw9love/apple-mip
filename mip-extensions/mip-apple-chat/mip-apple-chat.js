/**
 * @file mip-apple-chat 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    // var swiper = require('swiper')
    var jquery = require('jquery')
    // console.log(jquery)

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // console.log(jquery('.test'))
        window.addEventListener('load', function(){
            console.log('test-window')
        })
    };

    return customElement;
});
