<template>
  <div class="subject-details-content">
    <div class="feed-back-unit clear" v-if="from === 'search'">
            <span class="crumbs">
                <img :src="pathIcon" alt=""><!--
                --><span class="crumbs-text">您所在的位置：<router-link to="/search">奖惩查询</router-link> > 详情</span></span>
      <i-button type="primary" icon="compose" @click="prevPage" class="feedback-btn" v-if="hasFeedback">返回</i-button>
      <i-button type="primary" icon="compose" @click="feedbackOpen=true" class="feedback-btn" v-else>处理反馈</i-button>
    </div>
    <!--如果是审批记录则为返回按钮-->
    <div class="feed-back-unit clear" v-if="from === 'approval'">
            <span class="crumbs">
                <img :src="pathIcon" alt=""><!--
                --><span class="crumbs-text">您所在的位置：<router-link to="/approval">审批记录</router-link> > 详情</span></span>
      <i-button type="primary" icon="compose" @click="prevPage" class="feedback-btn">返回</i-button>
    </div>

    <!--//如果是办事人员则为反馈按钮-->
    <Modal class="feedback-modal"
           v-if="from === 'search'"
           title="处理反馈"
           v-model="feedbackOpen"
           :mask-closable="false"
           @on-ok="submitFeedback"
           ok-text="处理并下载报告">
      <i-form :model="formItem" ref="feedbackForm" :label-width="100" :rules="rules">
        <FormItem label="处理结果：">
          <RadioGroup v-model="formItem.feedbackResult">
            <Radio label="0">行政许可严格办理</Radio>
            <p>
              <Radio label="1">行政许可加速审核</Radio>
            </p>
          </RadioGroup>
        </FormItem>
        <FormItem label="处理说明：" prop="feedbackContent">
          <i-input v-model="formItem.description" type="textarea" :autosize="false" :rows="5"
                   placeholder="请输入内容"/>
        </FormItem>
      </i-form>
    </Modal>
    <div class="executor-info ">
      <div class="subject-name">
        <span class="entity-name">{{ isPersonal()?personDetails().info ? personDetails().info.name:'': enterpriseDetails().info ? enterpriseDetails().info.name:'' }}</span>
        <ul class="result" v-if="from === 'approval'">
          <li><span class="title">处理结果：</span><span class="desc">{{this.feedBack.dealType == '0'?'行政许可严格办理':'行政许可加速审核'}}</span></li>
          <li><span class="title">处理说明：</span><span class="desc">{{this.feedBack.description?this.feedBack.description:'(无特别说明)'}}</span>
          </li>
        </ul>
        <img :src="sealImg" class="seal" v-if="from === 'approval'">
      </div>
      <div class="excutor-content info-panel">
        <PanelTitle title="奖惩基本信息"></PanelTitle>
        <div v-for="o in subjectMemo()" :key="o.title">
          <SecondaryTitle :title="o.title"></SecondaryTitle>
          <div class="info-item clear"><span class="item-name">{{ o.accountDepartment.name }}</span><span
            class="item-content">{{ o.accountDepartment.content }}</span></div>
          <ItemList :list="o.content"
                    listStyle="margin: 0 40px;border:1px solid #e0e0e0;border-radius:4px;padding:5px 15px"></ItemList>
          <div class="info-item clear"><span class="item-name">{{ o.accountTime.name }}</span><span
            class="item-content">{{ o.accountTime.content }}</span></div>
        </div>
      </div>
    </div>
    <div class="subject-base-info info-panel">
      <PanelTitle :title="isPersonal()?'个人基本信息':'企业基本信息'"></PanelTitle>
      <ItemList :list="personBase()" v-if="isPersonal()"></ItemList>
      <ItemList :list="enterpriseBase()" v-else></ItemList>
    </div>
    <div class="subject-info-more info-panel" id="more-info">
      <PanelTitle title="奖惩详细信息"></PanelTitle>
      <transition name="slide-fade">
        <div v-for="o in subjectDesc()" :key="o.title" v-if="isDisplay" class="can-close">
          <SecondaryTitle :title="o.title"></SecondaryTitle>
          <ItemList :list="o.content"
                    listStyle="margin: 7px 40px;border:1px solid #e0e0e0;border-radius:4px;padding:10px 30px"></ItemList>
        </div>
      </transition>
      <div class="display-more" @click="expand()" id="expand-op">
                <span class="display-more-text"><span v-if="!isDisplay">显示更多</span><!--
               --><span v-if="isDisplay">收起详细信息</span></span><!--
                --><img :src="moreImg" class="icon" :class="{'close':isDisplay }"></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import util from "../../lib/util";

export default {
  beforeCreate() {
    if (
      this.$route.params.pid === "null" ||
      this.$route.params.type === "null"
    ) {
      this.$Message.warning("该记录信息错误，无法查看详细信息");
      window.history.go(-1);
    }
  },
  created() {
    if (
      this.$route.params.type === "person" &&
      this.$route.params.pid !== "null"
    ) {
      this.setPersonal(true);
      this.fetchPersonDetials(this.$route.params.pid);
    } else if (
      this.$route.params.type === "enterprise" &&
      this.$route.params.pid !== "null"
    ) {
      this.setPersonal(false);
      this.fetchEnterpriseDetials(this.$route.params.pid);
    }
    // /api/credit/operation/person/detail?id=1
    let feedBackUrl = `/service/api/credit/operation/enterprise/detail?id=${this
      .$route.params.dealId}`;
    this.from = this.$route.params.from;
    if (this.from === "approval") {
      if (this.$route.params.type === "person") {
        feedBackUrl = `/service/api/credit/operation/person/detail?id=${this
          .$route.params.dealId}`;
      }
      axios
        .get(feedBackUrl)
        .then(res => {
          let result = util.responseProcessor(res);
          if (result.code === "0") {
            this.feedBack = result.obj;
          }
        })
        .catch(error => {
          if (error.response) {
            util.responseProcessor(error.response);
          }
        });
    }
  },
  data() {
    return {
      pathIcon: require("../../images/path_icon.png"),
      sealImg: require("./seal.png"),
      isDisplay: false,
      feedbackOpen: false,
      hasFeedback: false,
      from: "",
      rules: {
        feedbackContent: [
          {
            type: "string",
            max: 400,
            message: "反馈说明在0-400字之间",
            trigger: "blur"
          }
        ]
      },
      formItem: { feedbackResult: "0", description: "" },
      moreImg: require("./more.png"),
      feedBack: {
        description: "",
        dealType: ""
      }
    };
  },
  methods: {
    ...mapActions([
      "fetchEnterpriseDetials",
      "fetchPersonDetials",
      "setPersonal"
    ]),
    ...mapGetters([
      "enterpriseDetails",
      "personDetails",
      "enterpriseBase",
      "subjectMemo",
      "subjectDesc",
      "isPersonal",
      "personBase"
    ]),

    submitFeedback() {
      this.$refs.feedbackForm.validate(valid => {
        if (valid) {
          let url = "/service/api/credit/operation/enterprise";
          let data = {
            dealType: this.formItem.feedbackResult,
            description: this.formItem.description
          };
          if (this.isPersonal()) {
            url = `/service/api/credit/operation/person?pid=${this.$route.params
              .pid}&dealType=${data.dealType}&description=${encodeURIComponent(
              data.description
            )}`;
          } else {
            url += `?eid=${this.$route.params
              .pid}&dealType=${data.dealType}&description=${encodeURIComponent(
              data.description
            )}`;
          }
          let config = {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
          };
          axios
            .post(url, config)
            .then(res => {
              let result = util.responseProcessor(res);
              if (result.code === "0") {
                this.$Message.info("反馈成功");
                this.hasFeedback = true;
                window.open(
                  `/service/api/credit/operation/download?type=${this.isPersonal()
                    ? 0
                    : 1}&id=${result.obj}`,
                  "_blank"
                );
              } else {
                this.$Message.info("反馈失败");
              }
            })
            .catch(error => {
              if (error.response) {
                util.responseProcessor(error.response);
              }
            });
        }
      });
    },
    expand() {
      this.isDisplay = !this.isDisplay;
    },
    prevPage() {
      window.history.go(-1);
    }
  }
};
</script>
<style rel="stylesheet/less" lang="less">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

@-webkit-keyframes shake {
  from {
    top: 0px;
  }
  to {
    top: 2px;
  }
}

@keyframes shake {
  from {
    top: 0px;
  }
  to {
    top: 2px;
  }
}

.feedback-modal {
  .ivu-modal-body {
    font-size: 12px !important;
  }
  .ivu-modal-content {
    .ivu-modal-header-inner {
      color: #353842;
      line-height: 21px;
    }
  }
  .ivu-modal-footer {
    text-align: center;
    button {
      width: 120px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      text-align: center;
      font-size: 12px;
    }
  }
}

.subject-details-content {
  margin: 0 auto;

  .feed-back-unit {
    background-color: white;
    height: 60px;
    padding: 0 5px;
    > .crumbs {
      display: inline-block;
      font-size: 15px;
      padding: 0 3px;

      > img {
        position: relative;
        top: 6px;
        margin-right: 12px;
        height: 24px;
      }
      > span {
        margin: 22px 0 14px 0;
        display: inline-block;
        height: 24px;
        line-height: 24px;
      }
    }
    > .feedback-btn {
      float: right;
      width: 100px;
      margin-top: 15px;
    }
  }
  .info-panel {
    margin-bottom: 12px;
    background-color: white;
    padding: 10px 30px 30px 30px;
    box-shadow: 0 3px 5px 0 rgba(225, 225, 225, 0.5);
    > .display-more {
      cursor: pointer;
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: #353842;
      line-height: 30px;
      text-align: center;
      margin-top: 16px;
      > .icon {
        margin-left: 6px;
        position: relative;
        animation: shake 0.8s infinite;
      }
      > .close {
        transition: all 0.3s ease;
        transform: rotate(180deg);
      }
    }
    .info-item {
      padding: 5px 40px;
      font-size: 14px;
      display: block;
      .item-name,
      .item-content {
        display: inline-block;
        line-height: 30px;
        text-align: left;
        float: left;
      }
      > .item-name {
        width: 20%;
        color: #9b9b9b;
      }
      > .item-content {
        color: #353842;
        width: 80%;
      }
    }
  }
  > .executor-info {
    background-color: white;
    > .subject-name {
      min-height: 68px;
      background-image: url("./detail_bg.png");
      background-repeat: repeat-x;
      font-size: 14px;
      position: relative;
      > .seal {
        position: absolute;
        right: 40px;
        top: 46px;
        width: 140px;
        height: 92px;
      }
      > span.entity-name {
        display: block;
        font-size: 22px;
        padding: 25px 0 10px 0;
        text-align: center;
        width: 100%;
      }
      > .result {
        text-align: left;
        margin: 0 40px;
        > li {
          > span {
            display: inline-block;
            margin: 4px 0;
          }
          > .title {
            color: #9b9b9b;
            line-height: 24px;
            width: 80px;
          }
          > .desc {
            color: #353842;
            line-height: 24px;
          }
        }
      }
    }
    > .excutor-content {
      padding: 10px 30px 30px 30px;
    }
  }
}
</style>
