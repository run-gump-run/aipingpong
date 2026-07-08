// Navbar Component
const Navbar = (function() {
  return {
    props: ['currentRoute', 'searchQuery', 'locale'],
    emits: ['update:searchQuery', 'navigate'],
    setup() {
      const { ref, computed } = Vue;
      
      // Language dropdown state
      const showLangMenu = ref(false);
      const currentLangLabel = computed(() => i18n.getLangLabel());
      const allLanguages = computed(() => i18n.getAllLanguages());
      
      function toggleLangMenu() {
        showLangMenu.value = !showLangMenu.value;
      }
      
      function selectLang(code) {
        i18n.toggle(code);
        showLangMenu.value = false;
      }
      
      function t(key) { return i18n.t(key); }
      
      // Dark mode state
      const isDarkMode = ref(false);
      
      function initDarkMode() {
        try {
          const saved = localStorage.getItem('aipingpong-darkmode');
          if (saved === 'true') {
            isDarkMode.value = true;
            document.documentElement.classList.add('dark-mode');
          }
        } catch (e) {}
      }
      
      function toggleDarkMode() {
        isDarkMode.value = !isDarkMode.value;
        if (isDarkMode.value) {
          document.documentElement.classList.add('dark-mode');
        } else {
          document.documentElement.classList.remove('dark-mode');
        }
        try {
          localStorage.setItem('aipingpong-darkmode', isDarkMode.value);
        } catch (e) {}
      }
      
      // Close menu when clicking outside
      function handleClickOutside(event) {
        if (!event.target.closest('.lang-dropdown')) {
          showLangMenu.value = false;
        }
      }
      
      Vue.onMounted(() => {
        initDarkMode();
        document.addEventListener('click', handleClickOutside);
      });
      
      Vue.onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
      });
      
      return {
        showLangMenu,
        currentLangLabel,
        allLanguages,
        toggleLangMenu,
        selectLang,
        isDarkMode,
        toggleDarkMode,
        t,
        i18n
      };
    },
    template: `
      <nav class="navbar">
        <div class="navbar-logo" @click="$emit('navigate', '/')">
          🏓 aipingpong
        </div>
        <div class="navbar-tabs">
          <button class="navbar-tab" :class="{ active: currentRoute === 'home' }" @click="$emit('navigate', '/')">{{ t('navbar.athletes') }}</button>
          <button class="navbar-tab" :class="{ active: currentRoute === 'tournaments' }" @click="$emit('navigate', '/tournaments')">{{ t('navbar.tournaments') }}</button>
        </div>
        <div class="navbar-right">
          <div class="navbar-search">
            <input
              type="text"
              :value="searchQuery"
              @input="$emit('update:searchQuery', $event.target.value)"
              :placeholder="t('navbar.search')"
              v-show="currentRoute === 'home'"
            >
          </div>
          
          <!-- Dark mode toggle -->
          <button class="theme-toggle" @click="toggleDarkMode" :title="isDarkMode ? '浅色模式' : '深色模式'">
            <span v-if="isDarkMode">☀️</span>
            <span v-else>🌙</span>
          </button>
          
          <!-- Language dropdown -->
          <div class="lang-dropdown" @click.stop>
            <button class="lang-switch" @click="toggleLangMenu">
              {{ currentLangLabel }}
              <span class="arrow-down">▼</span>
            </button>
            <div class="lang-menu" v-show="showLangMenu">
              <button
                v-for="lang in allLanguages"
                :key="lang.code"
                class="lang-option"
                :class="{ active: i18n.locale.value === lang.code }"
                @click="selectLang(lang.code)"
              >{{ lang.label }}</button>
            </div>
          </div>
        </div>
      </nav>
    `
  };
})();
