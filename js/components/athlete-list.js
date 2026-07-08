// Athlete List Component (Homepage)
const AthleteList = (function() {
  return {
    props: ['athletes', 'searchQuery', 'loading'],
    emits: ['select-athlete'],
    setup(props) {
      const { computed } = Vue;

      const filteredAthletes = computed(() => {
        if (!props.searchQuery) return props.athletes;
        const q = props.searchQuery.toLowerCase();
        return props.athletes.filter(a =>
          a.name.toLowerCase().includes(q) ||
          (a.nameEn && a.nameEn.toLowerCase().includes(q))
        );
      });

      function t(key) { return i18n.t(key); }

      return { filteredAthletes, t };
    },
    template: `
      <div>
        <section class="home-hero">
          <h1>🏓 {{ t('home.title') }}<span class="accent">{{ t('home.titleAccent') }}</span></h1>
          <p>{{ t('home.subtitle') }}</p>
        </section>

        <div v-if="loading" class="loading">{{ t('common.loading') }}</div>

        <section v-else class="athlete-grid-section">
          <div v-if="filteredAthletes.length === 0" class="no-results">
            {{ t('common.noMatch') }}
          </div>
          <div v-else class="athlete-grid">
            <div
              v-for="athlete in filteredAthletes"
              :key="athlete.id"
              class="athlete-card"
              @click="$emit('select-athlete', athlete.id)"
            >
              <img
                class="athlete-card-img"
                :src="athlete.photo || ''"
                :alt="athlete.name"
                @error="$event.target.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'200\\'><rect width=\\'400\\' height=\\'200\\' fill=\\'%23ddd\\'/><text x=\\'50%25\\' y=\\'50%25\\' font-size=\\'60\\' text-anchor=\\'middle\\' dy=\\'.35em\\'>🏓</text></svg>'"
              >
              <div class="athlete-card-body">
                <div class="athlete-card-name">{{ athlete.flag }} {{ athlete.name }}</div>
                <div class="athlete-card-team">{{ athlete.team }}</div>
                <div class="athlete-card-stats">{{ athlete.keyStats }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `
  };
})();
