<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {useRoute} from 'vitepress';

const route = useRoute();


const domain = ref('');

onMounted(() => {
  // Lấy domain từ URL hiện tại
  domain.value = window.location.hostname;
  console.log('Domain Name:', domain.value);
});

const dynamicHref = computed(() => {
  if (typeof document !== "undefined") {
    const scriptId = "custom-script-giscus-client"; // ID của script
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      // Nếu script đã tồn tại, xóa và tải lại
      existingScript.remove();
    }
  }

 setTimeout(() => {
   if (typeof document !== "undefined") {
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
     script.setAttribute('data-strict', '0');
     script.setAttribute('data-reactions-enabled', '1');
     script.setAttribute('data-emit-metadata', '0');
     script.setAttribute('data-input-position', 'top');
     script.setAttribute('data-theme', 'light');
     script.setAttribute('data-lang', 'vi');
     script.setAttribute('data-loading', 'lazy');
     script.setAttribute('crossorigin', 'anonymous');

     script.onload = () => {
       console.log("Script loaded!");
     };

     // Thêm script vào `head` hoặc `body`
     document.head.appendChild(script);
   }

 },1000);

  return `${domain.value + route.path}`;
});
</script>
<template>
  <div :data-href="dynamicHref" class="giscus"></div>
 </template>

