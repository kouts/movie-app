<template>
  <div class="position-fixed loader-wrapper">
    <div class="alert alert-info d-flex align-items-center">
      <div class="dual-ring"></div>
      <span>Loading...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loader-wrapper {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .dual-ring {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .dual-ring:after {
    content: " ";
    display: block;
    width: 32px;
    height: 32px;
    margin-top: 4px;
    border-radius: 50%;
    border: 6px solid $info;
    border-color: $info transparent $info transparent;
    animation: dual-ring-animation 1.2s linear infinite;
  }
  @keyframes dual-ring-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
