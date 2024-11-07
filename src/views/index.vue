<!--
 * @Author: yihaosun 1015095073@qq.com
 * @Date: 2022-12-09 10:27:51
 * @LastEditors: yihaosun 1015095073@qq.com
 * @LastEditTime: 2023-10-17 08:36:25
 * @FilePath: \heart-rate-demo\src\views\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="padding:40px;height: 250px;">
    <Amap ref="Amap"></Amap>
  </div>
</template>

<script>
import Amap from '@/components/Amap'

export default {
  components: {
    Amap
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>