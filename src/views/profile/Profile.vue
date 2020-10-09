<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">小咕咕商城</div>
    </nav-bar>
    <!--单独封装一个组件 利用slot知识点-->
    <user-info></user-info>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">99.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">9</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">327</span>分
          <div class="account-info">我的积分</div>
        </div>
      </div>
    </section>

    <!--封装传值-->
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  import ListView from "./childComps/ListView";
  export default {
    name: "Profile",
    components: {
      NavBar,
      UserInfo,
      ListView
    },
    data: function () {
      return {
        orderList: [
          {icon: 'order', iconColor: '#ff8198', info: '我的消息'},
          {icon: 'point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: 'vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: 'service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: 'download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .account {
    display: flex;
    width: 100%;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item {
    color: #666;
    font-size: 13px;
    padding: 12px;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .order-list, .service-list {
    margin-top: 12px;
  }


</style>
