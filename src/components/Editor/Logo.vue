<template>
  <div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730.74 613.1"><title>logo</title><circle cx="368.35" cy="126.5" r="93.67" style="fill:#2d2d2d"/><path d="M368.35,252h0A107.07,107.07,0,0,1,475.42,359.06v254a0,0,0,0,1,0,0H261.29a0,0,0,0,1,0,0v-254A107.07,107.07,0,0,1,368.35,252Z" style="fill:#2d2d2d"/><path d="M614.35,504.34h0a56.53,56.53,0,0,1-66.53,43.91l-50.76,9.43a16.51,16.51,0,0,0-12.79-15.42L319.82,501.55c-3.71-.77-23.12-5.19-35.67-24.2A56.19,56.19,0,0,1,275.92,435h0a56.52,56.52,0,0,1,66.52-43.91l213.84,41.4,73.25,9Z" transform="translate(-234.63 -189.53)" style="fill:#2d2d2d"/><path d="M594.43,504.34h0A56.53,56.53,0,0,0,661,548.25l50.76,9.43a16.51,16.51,0,0,1,12.79-15.42L889,501.55c3.71-.77,23.12-5.19,35.67-24.2A56.19,56.19,0,0,0,932.86,435h0a56.52,56.52,0,0,0-66.52-43.91L652.5,432.52l-73.25,9Z" transform="translate(-234.63 -189.53)" style="fill:#2d2d2d"/><rect x="11.43" width="41.39" height="139.22" style="fill:#3888e8"/><rect x="68.41" y="72.91" width="40.38" height="66.65" style="fill:#ed1c24"/><rect x="122.19" y="39.5" width="39.47" height="100.06" style="fill:#e29a33"/><rect y="147.46" width="172.59" height="15.26" style="fill:#7c7c7c"/><circle cx="652.82" cy="94.11" r="77.77" style="fill:#3888e8"/><path d="M965.37,255.79l-77.92,27.73q1.9-41.11,3.83-82.24a78.62,78.62,0,0,1,32.5,6.91,77.08,77.08,0,0,1,25.94,19A74.64,74.64,0,0,1,965.37,255.79Z" transform="translate(-234.63 -189.53)" style="fill:#e29a33"/></svg>
    <div class="logo__name"><span>A11y</span> Infographics</div>
  </div>
</template>
<script>
export default {
  name: 'BlockElement',
  props: {
  },
}
</script>

<style lang="scss">
.logo {
  display: flex;
  padding: 10px 0;

  svg {
    min-width: 80px;
  }

  &__name {
    width: calc(100% - 80px);
    padding: 0 20px;
    font-size: 1.25rem;
    line-height: 1.25;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    span {
      font-size: 2rem;
    }
  }
}
</style>
