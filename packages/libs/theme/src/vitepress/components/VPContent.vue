<script lang="ts" setup>
import { useData } from 'vitepress'
import { useSidebar } from '../composables/sidebar'
import VPContentPage from './VPContentPage.vue'
import VPContentDoc from './VPContentDoc.vue'
import VPNotFound from './VPNotFound.vue'
import VPFooter from "./VPFooter.vue";

const { page, frontmatter } = useData()
const { hasSidebar } = useSidebar()
</script>

<template>
  <div
    id="VPContent"
    class="VPContent"
    :class="{ 'has-sidebar': hasSidebar }"
  >
    <VPNotFound v-if="page.isNotFound" />
    <VPContentPage v-else-if="!!frontmatter.page">
      <template #footer-before><slot name="footer-before" /></template>
      <template #footer-after><slot name="footer-after" /></template>
    </VPContentPage>
    <VPContentDoc v-else :class="{ 'has-sidebar': hasSidebar }">
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-mid><slot name="aside-mid" /></template>
      <template #author><slot name="author" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>\
    </VPContentDoc>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .VPContent {
    overflow-x: hidden;
  }
}

@media (min-width: 960px) {
  .VPContent {
    padding-top: var(--vt-nav-height);
  }
  .VPContent.has-sidebar {
    padding-left: var(--vp-sidebar-width-small);
  }
}

@media (min-width: 1440px) {
  .VPContent.has-sidebar {
    padding-left: calc(
      (100vw - var(--vp-screen-max-width)) / 10 + var(--vp-sidebar-width-small)
    );
  }
}
</style>
