<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">小咕咕商城</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "Profile",
    components: {
      NavBar
    }

  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
