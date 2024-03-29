<script lang="ts" setup>
import { VTIconAlignLeft } from '../../core'
import { useSidebar } from '../composables/sidebar'
import { useConfig } from '../composables/config'
import { useData } from 'vitepress'
import VPLocalNavOutlineDropdown from './VPLocalNavOutlineDropdown.vue'

defineProps<{ open: boolean }>()

const { hasSidebar } = useSidebar()
const { config } = useConfig()
const { frontmatter } = useData()
</script>

<template>
  <div class="VPLocalNav">
    <template v-if="hasSidebar">
      <button
        class="menu"
        :aria-expanded="open"
        aria-controls="VPSidebarNav"
        @click="$emit('open-menu')"
      >
        <VTIconAlignLeft class="menu-icon" />
        <span class="menu-text">{{ config.i18n?.menu || 'Menu' }}</span>
      </button>
    </template>
    <template v-if="!hasSidebar">
      <button
        class="menu"
        :disabled='!hasSidebar'
        style='cursor: default'
      >
      </button>
    </template>

    <VPLocalNavOutlineDropdown v-if="frontmatter.outline !== false" />
  </div>
</template>

<style scoped>
.VPLocalNav {
  position: sticky;
  top: var(--vt-banner-height, 0px);
  left: 0;
  z-index: var(--vp-z-index-local-nav);
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--vt-c-divider-light);
  background-color: var(--vt-c-bg);
  transition: border-color 0.5s, background-color 0.5s;
}

@media (min-width: 960px) {
  .VPLocalNav {
    display: none;
  }
}

.menu {
  display: flex;
  align-items: center;
  padding: 0 24px;
  line-height: 47px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

.menu:hover {
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

@media (min-width: 768px) {
  .menu {
    padding: 0 32px;
  }
}

.menu-icon {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.top-link {
  padding: 0 24px;
  line-height: 47px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

.top-link:hover {
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}

@media (min-width: 768px) {
  .top-link {
    padding: 0 32px;
  }
}
</style>
