import { watch, onMounted, onUnmounted, ref } from "vue";

export function useGetDeviceType() {
  const isMobile = ref(window.innerWidth < 768);
  const isTablet = ref(window.innerWidth > 768 && window.innerWidth < 1200);
  const isDesktop = ref(window.innerWidth >= 1200);
  const isMobileOrTablet = ref(window.innerWidth < 1200);

  onMounted(() => window.addEventListener("resize", onWidthChange));
  onUnmounted(() => window.removeEventListener("resize", onWidthChange));

  const onWidthChange = () => {
    if (window.innerWidth < 768) {
      isMobile.value = true;
      isTablet.value = false;
      isDesktop.value = false;
      isMobileOrTablet.value = true;
    }
    if (window.innerWidth > 768 && window.innerWidth < 1200) {
      isMobile.value = false;
      isTablet.value = true;
      isDesktop.value = false;
      isMobileOrTablet.value = true;
    }
    if (window.innerWidth >= 1200) {
      isMobile.value = false;
      isTablet.value = false;
      isDesktop.value = true;
      isMobileOrTablet.value = false;
    }
  };

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
  };
}
