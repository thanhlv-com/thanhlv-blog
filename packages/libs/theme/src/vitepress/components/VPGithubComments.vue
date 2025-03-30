<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useRoute} from 'vitepress';
import eventBus from "../../core/components/eventBus";

const route = useRoute();


const domain = ref('');

const setComment = () => {
  const storageKey = 'vitepress-theme-appearance'
  let userPreference = localStorage.getItem(storageKey) || 'auto';
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const isDark = ref(
    userPreference === 'auto' ? query.matches : userPreference === 'dark'
  )

  const scriptId = "custom-script-giscus-client"; // ID của script
  const existingScript = document.getElementById(scriptId);

  if (existingScript) {
    // Nếu script đã tồn tại, xóa và tải lại
    existingScript.remove();
  }

  setTimeout(() => {
    // Tạo script mới
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://giscus.app/client.js"; // URL của script
    script.async = true;
    script.setAttribute('data-repo', 'thanhlv-com/thanhlv-blog');
    script.setAttribute('data-repo-id', 'R_kgDOLCoNuA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOLCoNuM4Coi9r');
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
    script.setAttribute('data-lang', 'vi');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');

    script.onload = () => {
      console.log("Script loaded!");
    };

    // Thêm script vào `head` hoặc `body`
    document.head.appendChild(script);
  },1000);
};

const dynamicHref = computed(() => {
  setComment();
  return `${domain.value + route.path}`;
});


onMounted(() => {
  eventBus.addEventListener('event-change-theme', setComment);
  // Lấy domain từ URL hiện tại
  domain.value = window.location.hostname;
  console.log('Domain Name:', domain.value);
});

onUnmounted(() => {
  eventBus.removeEventListener('event-change-theme', setComment);
});

</script>
<template>
  <div :data-href="dynamicHref" class="giscus"></div>
 </template>

