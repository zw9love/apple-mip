let ws = null

// let server = 'ws://192.168.1.151:9090/'
// let server = 'ws://192.168.1.125:9090/'
// let server = 'ws://192.168.0.103:9090/'
let server = 'ws://10.21.4.230:9090/'

// function WebSocketTest() {
//     if ("WebSocket" in window) {
//         // alert("您的浏览器支持 WebSocket!");
//         // 打开一个 web socket
//         ws = new WebSocket("ws://localhost:9090/");
//     }
//     else {
//         // 浏览器不支持 WebSocket
//         alert("您的浏览器不支持 WebSocket!");
//     }
// }

function websocketCloseMobile() {
    console.log("连接已关闭...");
    $('.connect-btn320').css({display: 'block'})
    $('.input320').css({display: 'none'})
    $('.main-container320').append(`
                        <div class="no-connect-wrapper">
                            <p class="chat-end-info">您的聊天会话已结束</p>
                                <p class="main-tip"><span>客服已关闭会话，如需继续咨询，<a href="javascript:;">请重新连接客服</a></span></p>
                                <div class="connect-btn320">
                                    <span>重新连接</span>
                                </div>
                        </div>
                     `)
    setTimeout(function () {
        $(".main320").scrollTop($(".main-container320").height())
    }, 0)
}

function websocketOpenMobile() {
    $('.no-connect-wrapper').remove()
    $('.connect-btn320').css({display: 'none'})
    $('.input320').css({display: 'block'})
}

function getMainHeight() {
    let windowHeight = window.innerHeight
    // let bannerHeight = $(".banner").height()
    let mainHeight = windowHeight - 60 - 210
    $('.main').height(mainHeight)
}

function getDouble(val) {
    val = val + ''
    if (val.length > 1) {
        return val
    } else {
        return '0' + val
    }
}

function getTime() {
    let date = new Date()
    return date.getFullYear() + '-' + getDouble(date.getMonth() + 1) + '-' + getDouble(date.getDate()) + ' ' + getDouble(date.getHours()) + ':' + getDouble(date.getMinutes()) + ':' + getDouble(date.getSeconds())
}


// 文档加载完成
$(document).ready(function () {
    let mobileFlag = $(window).width() <= 768
    // 初始化
    if (!mobileFlag) {
        $("#editor").emoji({
            button: "#btn",
            showTab: true,
            animation: 'slide',
            position: 'topRight',
            icons: [{
                name: "QQ表情",
                // path: "dist/img/qq/",
                // maxNum: 75,
                // // excludeNums: [41, 45, 54],
                // file: ".gif",
                path: "dist/img/emoji/",
                maxNum: 84,
                file: ".png",
            }]
        })
        getMainHeight()
        $(window).resize(getMainHeight)
    } else {
        let windowHeight = window.innerHeight
        // let bannerHeight = parseInt($(".banner320").css('paddingTop'))
        // let mainHeight = windowHeight - bannerHeight - 50
        let mainHeight = windowHeight - 50 - 50
        $('.main320').height(mainHeight)
        // $('.chat-end-info').html('bannerHeight = ' + bannerHeight)
        // let emojiAlias = {
        //     1: "hehe", 2: "haha", 3: "tushe", 4: "a", 5: "ku", 6: "lu", 7: "kaixin", 8: "han", 9: "lei", 10: "heixian",
        //     11: "bishi", 12: "bugaoxing", 13: "zhenbang", 14: "qian", 15: "yiwen", 16: "yinxian", 17: "tu", 18: "yi", 19: "weiqu", 20: "huaxin",
        //     21: "hu", 22: "xiaonian", 23: "neng", 24: "taikaixin", 25: "huaji", 26: "mianqiang", 27: "kuanghan", 28: "guai", 29: "shuijiao", 30: "jinku",
        //     31: "shengqi", 32: "jinya", 33: "pen", 34: "aixin", 35: "xinsui", 36: "meigui", 37: "liwu", 38: "caihong", 39: "xxyl", 40: "taiyang",
        //     41: "qianbi", 42: "dnegpao", 43: "chabei", 44: "dangao", 45: "yinyue", 46: "haha2", 47: "shenli", 48: "damuzhi", 49: "ruo", 50: "OK"
        // }

        for (let i = 1; i <= 84; i++) {
            //<img src="dist/img/qq/${emojiAlias[i]}.gif" alt="" data-alias="[${emojiAlias[i]}]">
            // <img src="dist/img/qq/${i}.gif" alt="" data-alias="[${i}]">
            $('.popup-emoji').append(`
                    <span>
                        <img src="dist/img/emoji/${i}.png" alt="" data-alias="[${i}]">
                    </span>
                 `)
        }

        $('.popup-emoji').on("click", "span", function () {
            // $('#editor320').append(`<img src="${$(this).children()[0].src}"/>`)
            let alias = $(this).children().attr('data-alias')
            $('.input-txt320').html($('.input-txt320').html() + alias)
        })
    }

    // 开启websocket
    ws = new WebSocket(server);

    // window.onbeforeunload = function() {
    //     console.log('监听到onbeforeunload')
    //     ws.close;
    // };

    // 接收到信息
    ws.onmessage = function (evt) {
        let received_msg = JSON.parse(evt.data)
        console.log(received_msg)
        ws.close();
        // PC端
        if(!mobileFlag){
            $('.main-container').append(`
                 <div class="main-cell main-service-cell">
                    <div class="main-cell-head">
                        <mip-img
                                layout="responsive"
                                width="1"
                                height="1"
                                src="/img/customer_service_logo.png">
                        </mip-img>
                    </div>
                    <div class="main-cell-info">
                        <p class="title">
                            <span class="service-name">${received_msg.name}</span>
                            <span class="time">${received_msg.time}</span>
                        </p>
                        <p class="content">
                            ${received_msg.content}
                        </p>
                    </div>
                </div>
            `)
            setTimeout(function () {$(".main").scrollTop($(".main-container").height())}, 0)
        }
        // 移动
        else{
            $('.main-container320').append(`
                <div class="main-cell320 main-service-cell320">
                    <img src="img/customer_service_logo.png" alt="">
                    <div class="main-cell-info">
                        <p class="name">${received_msg.name}</p>
                        <p class="content">
                           ${received_msg.content}
                        </p>
                    </div>
                </div>
             `)
            setTimeout(function () {$(".main320").scrollTop($(".main-container320").height())}, 0)
        }

    }


    // websocket成功被打开
    ws.onopen = function () {
        if(!mobileFlag){

            // PC端发送按钮
            $('.send').click(function () {
                let txtVal = $('.input-txt').html()
                if (txtVal.trim()) {
                    $('.main-container').append(`
                    <div class="main-cell main-customer-cell">
                        <div class="main-cell-head">
                            <mip-img layout="responsive" width="1" height="1" src="/img/customer_service_logo.png"></mip-img>
                        </div>
                        <div class="main-cell-info">
                            <p class="content">
                                ${txtVal}
                            </p>
                        </div>
                    </div>
                `)
                    $('.input-txt').html('')
                    setTimeout(function () {
                        $(".main").scrollTop($(".main-container").height())
                    }, 0)
                }
            })

            // PC输入框回车按钮
            $('.input-txt').keydown(function (e) {
                if (e.keyCode === 13 && e.ctrlKey) {
                    // 这里实现换行
                    $('.input-txt').val($('.input-txt').val() + "\n")
                } else if (e.keyCode === 13) {
                    // 避免回车键换行
                    e.preventDefault();
                    // 下面写你的发送消息的代码
                    $(".send").trigger("click");
                }
            })

            // PC点击上传图按钮
            $('#upload').click(function () {
                $('#upload-txt').click()
            })

            // PC上传文件发生变化
            $('#upload-txt').change(function (e) {
                let reads = new FileReader();
                let file = e.target.files[0];
                if (file) {
                    reads.readAsDataURL(file);
                    reads.onload = function () {
                        let img = new Image()
                        let result = this.result
                        img.src = result
                        img.onload = function () {
                            let width = this.width < 760 ? this.width : 760
                            //  <span style="width: ${width}px; display: inline-block">
                            //     <mip-img layout="responsive" width="${width}" height="${this.height}" popup src="${result}"></mip-img>
                            // </span>
                            $('.main-container').append(`
                                <div class="main-cell main-customer-cell">
                                    <div class="main-cell-head">
                                        <mip-img layout="responsive" width="1" height="1" src="/img/customer_service_logo.png"></mip-img>
                                    </div>
                                    <div class="main-cell-info">
                                        <p class="content">
                                             <span style="width: ${width}px; display: inline-block">
                                                <mip-img layout="responsive" width="${this.width}" height="${this.height}" popup src="${result}"></mip-img>
                                             </span>
                                        </p>
                                    </div>
                                </div>
                             `)
                            setTimeout(function () {$(".main").scrollTop($(".main-container").height())}, 0)
                        }
                    }
                }
            })
        }


        /*
            ------------------------------------------------------------------------------------------------------------
            ------------------------------------------------------------------------------------------------------------
            ------------------------------------------------------------------------------------------------------------
            ------------------------------------------------------------------------------------------------------------
            ------------------------------------------------------------------------------------------------------------
        */

        else{
            // mobile主内容点击事件
            $('.main320').click(function (e) {
                e.stopPropagation()
                $('.input320').css({bottom: '-125px'})
                $('.main320').css({paddingBottom: '0px'})
            })

            // mobile点击表情按钮
            $('#btn320').click(function (e) {
                e.stopPropagation();
                $('.popup-photo').css({display: 'none'})
                $('.popup-emoji').css({display: 'flex'})
                $('.input320').css({bottom: '0px'})
                $('.main320').css({paddingBottom: '125px'})
                setTimeout(function () {
                    $(".main320").scrollTop($(".main-container320").height())
                }, 0)
            })

            // mobile点击加号按钮
            $('.add').click(function (e) {
                e.stopPropagation();
                $('.popup-emoji').css({display: 'none'})
                $('.popup-photo').css({display: 'flex'})
                $('.input320').css({bottom: '0px'})
                $('.main320').css({paddingBottom: '125px'})
                setTimeout(function () {
                    $(".main320").scrollTop($(".main-container320").height())
                }, 0)
            })

            // mobile阻止冒泡
            $('.popup').click(function (e) {
                e.stopPropagation();
            })

            // mobile相册按钮点击
            $('#photo-wrapper').click(function () {
                // console.log($('.upload-txt320'))
                $('.upload-txt320').click()
            })


            // mobile相机按钮点击
            $('#camera-wrapper').click(function () {
                $('.camera-txt').click()
            })

            // mobile输入框聚焦
            $('.input-txt320').focus(function (e) {
                e.stopPropagation()
                $(".main320").scrollTop($(".main-container320").height())
                setTimeout(function () {
                    $('body').scrollTop(1000000)
                }, 200)
            })

            // mobile上传文件发生变化
            $('.upload-txt320, .camera-txt').change(function (e) {
                let reads = new FileReader();
                let file = e.target.files[0];
                if (file) {
                    reads.readAsDataURL(file)
                    reads.onload = function () {
                        let img = new Image()
                        let result = this.result
                        img.src = result
                        img.onload = function () {
                            let width = this.width < 230 ? this.width : 230
                            $('.main-container320').append(`
                             <p class="store-info">${getTime()}</p>
                             <div class="main-cell320 main-customer-cell320">
                             <div class="main-cell-info">
                             <p class="content">
                                <!--<img src="${this.result}" alt="" class="upload-img">-->
                                <span style="width: ${width}px; display: inline-block">
                                    <mip-img layout="responsive" width="${this.width}" height="${this.height}" popup src="${result}"></mip-img>
                                </span>
                             </p>
                             </div>
                                <img src="img/customer_service_logo.png" alt="">
                             </div>
                         `)
                            setTimeout(function () {
                                $(".main320").scrollTop($(".main-container320").height())
                            }, 0)
                        }
                    }
                }
            })

            // mobile点击发送按钮
            $('.send320').click(function (e) {
                e.stopPropagation();
                let txtVal = $('.input-txt320').html()
                // let txtVal = $('.input-txt320').val()
                let time = getTime()
                let reg = /\[([^\]]+)\]/g;
                // let str = 'aaaabbbbcc[hehe][haha]dddd[haha1]eeeee';
                // txtVal = txtVal.replace(reg, "<img src='dist/img/qq/$1.gif' border='0' />");
                txtVal = txtVal.replace(reg, "<img src='dist/img/emoji/$1.png' border='0' />");
                if (txtVal.trim()) {
                    $('.main-container320').append(`
                    <p class="store-info">${time}</p>
                    <div class="main-cell320 main-customer-cell320">
                        <div class="main-cell-info">
                            <p class="content">
                                ${txtVal}
                            </p>
                        </div>
                        <img src="img/customer_service_logo.png" alt=""/>
                    </div>
                `)
                    $('.input-txt320').html('')
                    // $('.input-txt320').val('')
                    setTimeout(function () {
                        $(".main320").scrollTop($(".main-container320").height())
                    }, 0)
                    let postData = {
                        'name': 'admin',
                        'time': time,
                        'content': txtVal
                    }
                    ws.send(JSON.stringify(postData))
                }

            })

            // mobile window点击事件
            $(window).click(function () {
                $('.input320').css({bottom: '-125px'})
                $('.main320').css({paddingBottom: '0px'})
            })

            // mobile 重新连接客服
            $('.main-container320').on("click", "a", function () {
                // ws = new WebSocket(server);
                // ws.onopen = function () {
                //     websocketOpenMobile()
                // }
                //
                // ws.onclose = function () {
                //     websocketCloseMobile()
                // }
            })

            // mobile 重新连接客服
            $('.connect-btn320').click(function () {
                // ws = new WebSocket(server);
                // ws.onopen = function () {
                //     websocketOpenMobile()
                // }
                //
                // ws.onclose = function () {
                //     websocketCloseMobile()
                // }

            })
        }

    }
})
