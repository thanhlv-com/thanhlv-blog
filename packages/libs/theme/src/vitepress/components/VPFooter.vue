<script lang="ts" setup>
import {VTLink} from '../../core'
import {useConfig} from '../composables/config'

const {config} = useConfig()
</script>

<template>
  <div class="VPFooter">
    <p v-if="config.footer?.license" class="license">
      {{
        config.i18n?.footerLicense?.before ?? 'Released under the '
      }}
      <VTLink class="link" :href="config.footer.license.link" no-icon>{{
          config.footer.license.text
        }}
      </VTLink
      >
      {{ config.i18n?.footerLicense?.after ?? '.' }}
    </p>

    <p v-if="config.footer?.copyright" class="copyright">
      {{ config.footer.copyright }}
    </p>
    <p>
      <a href="//www.dmca.com/Protection/Status.aspx?ID=8febc2ec-f016-49e9-8483-8b1afed383d4"
         title="DMCA.com Protection Status" class="dmca-badge">
        <img style="margin: auto" class="no-zoom"
        src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=8febc2ec-f016-49e9-8483-8b1afed383d4"
        alt="DMCA.com Protection Status" />
      </a>
    </p>

  </div>
</template>

<style scoped>
.VPFooter {
  border-top: 1px solid var(--vt-c-bg-soft);
  padding: 23px 24px 24px;
  background-color: var(--vt-c-bg-soft);
  transition: border-top 0.5s, background-color 0.5s;
}

@media (min-height: 750px) {
  .VPFooter {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}

.dark .VPFooter {
  border-top: 1px solid var(--vt-c-divider-light);
  background-color: var(--vt-c-bg);
}

.license,
.copyright {
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
}

.link {
  color: var(--vt-c-text-link);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vt-c-text-link);
}
</style>
