<template>
    <div class="footer">
        <div class="link">
            <ul>
                <li><a href="http://www.xyhn.gov.cn/ca/20151118000009.htm" target="_blank">联系我们</a>|</li>
                <li><a @click="SetHome()">设为首页</a>|</li>
                <li><a @click="AddFavorite('河南信用联合奖惩')">加入收藏</a></li>
            </ul>
        </div>
        <div class="footer-content">
            <img :src="flag">
            <ul >
            <li>指导单位：河南省社会信用体系建设领导小组办公室</li>
            <li> 主办单位：河南省信息中心</li>
            <li>备案号：豫ICP备10005452号-6 www.xyhn.gov.cn</li></ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                flag: require('./index_36.gif')
            }
        },
        methods: {
            SetHome() {
                let obj = this
                let url = window.location.href
                try {
                    obj.style.behavior = 'url(#default#homepage)';
                    obj.setHomePage(url);
                } catch (e) {
                    if (window.netscape) {
                        try {
                            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                        } catch (e) {
                            alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
                        }
                    } else {
                        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
                    }
                }
            },

            //收藏本站
            AddFavorite(title) {
                let url = window.location.href
                try {
                    window.external.addFavorite(url, title);
                }
                catch (e) {
                    try {
                        window.sidebar.addPanel(title, url, "");
                    }
                    catch (e) {
                        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
                    }
                }
            }
        }

    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .footer {
        background-color: white;
        box-shadow: 0 1px 8px rgba(0,0,0,.3);
        > .link {
            text-align: center;
            height: 27px;
            padding: 12px;
            ul > li {
                display: inline-block;
                > a {
                    margin-right: 5px;
                    color: black;
                    &:hover {
                        color: #c20c00;
                    }
                }
            }
        }
        >.footer-content{
            text-align: center;
            padding: 10px 0;
            >img{
                width: 73px;
                height: 52px;
            }
            ul{
                display: inline-block;
                text-align: left;
                font-size: 12px;
                color: black;
            }
        }
    }
</style>