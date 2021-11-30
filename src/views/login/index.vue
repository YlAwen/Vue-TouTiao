<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登陆表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <!-- 手机号 -->
      <van-field
        v-model="user.mobile"
        autosize
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        ><i slot="left-icon" class="iconfont icon-shouji"></i
      ></van-field>
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        autosize
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        ><i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 发送验证码 -->
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = !isCountDownShow"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="sendSms"
            >获取验证码</van-button
          >
        </template></van-field
      >
      <!-- 登录 -->
      <div class="login-btn-wrap">
        <van-button block class="login-btn" type="info" native-type="submit"
          >登录</van-button
        >
      </div>
      <div class="tip">
        <p>万能验证码：246810</p>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
          },
          {
            pattern: /^1[3|5|7|9]\d{9}$/,
            message: "手机号输入错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码输入错误",
          },
        ],
      },
      isCountDownShow: false,
    };
  },
  methods: {
    onSubmit() {
      // 1.表单验证
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });

      // 2.提交表单请求登录
      this.axios
        .post("/v1_0/authorizations", this.user)
        .then((res) => {
          this.$toast.success("登录成功");
          this.$store.commit("setUser", res.data.data);
          // 登陆成功跳转回原来页面,back()不严谨
          this.$router.back();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.$toast.fail("手机号或验证码错误");
          } else {
            this.$toast.fail("登录失败,请稍后重试");
          }
        });
      // 3.根据请求响应结果处理
    },
    async sendSms() {
      // 1.校验手机号

      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (error) {
        return console.log(2);
      }
      // 2.验证通过显示倒计时
      this.isCountDownShow = true;
      // 3.发送请求
      this.axios
        .get(`/v1_0/sms/codes/${this.user.mobile}`)
        .then((res) => {
          this.$toast("发送验证码成功！");
        })
        .catch((err) => {
          this.isCountDownShow = false;
          if (err.response.status === 404) {
            this.$toast("手机号不正确，请重试！");
          } else if (err.response.status === 429) {
            this.$toast("发送太频繁，请稍后重试！");
          } else {
            this.$toast("发送失败，请稍后重试！");
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 19px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 78px;
    height: 23px;
    line-height: 23px;
    font-size: 11px;
    color: #666666;
    font-family: MicrosoftYaHei;
  }
  .login-btn-wrap {
    padding: 27px 14px;
    .login-btn {
      background-color: #6db4fb;
      border-radius: 5px;
      border: none;
    }
  }
  .tip {
    text-align: center;
    color: #ccc;
  }
}
</style>
