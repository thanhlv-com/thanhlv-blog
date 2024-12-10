<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vitepress';

const route = useRoute();

const dynamicHref = computed(() => {
  return `//www.dmca.com/Protection/Status.aspx?ID=8febc2ec-f016-49e9-8483-8b1afed383d4&cdnrdr=1&refurl=${window.location.href}`;
});
</script>
<template>
  <p>
    <a :href="dynamicHref"
       title="DMCA.com Protection Status" class="dmca-badge">
      <img style="margin: auto" class="no-zoom"
           src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=8febc2ec-f016-49e9-8483-8b1afed383d4"
           alt="DMCA.com Protection Status" />
    </a>
  </p>
</template>

