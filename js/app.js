// Main Vue App
const { createApp, ref, reactive, computed, onMounted, watch } = Vue;

const app = createApp({
  components: {
    Navbar,
    AthleteList,
    AthleteDetail,
    TournamentPage
  },
  setup() {
    i18n.init();

    const currentPath = ref('/');
    const athletes = ref([]);
    const athletesLoading = ref(true);
    const searchQuery = ref('');
    const athleteIds = ref([]);
    const locale = i18n.locale;

    // Parse hash into route info
    function parseRoute() {
      const hash = window.location.hash.slice(1) || '/';
      const parts = hash.split('/').filter(Boolean);
      // [''] => home
      // ['athlete', 'fanzhendong'] => athlete detail
      // ['tournaments'] => tournaments
      // ['tournaments', 'olympics'] => tournaments with id
      if (parts.length === 0) {
        return { name: 'home', params: {} };
      }
      if (parts[0] === 'athlete' && parts[1]) {
        return { name: 'athlete', params: { id: parts[1] } };
      }
      if (parts[0] === 'tournaments') {
        return { name: 'tournaments', params: { id: parts[1] || '' } };
      }
      return { name: 'home', params: {} };
    }

    const route = parseRoute();
    const currentRoute = ref(route.name);
    const routeParams = reactive(route.params);

    function navigate(path) {
      window.location.hash = path;
    }

    function onHashChange() {
      const r = parseRoute();
      currentRoute.value = r.name;
      Object.assign(routeParams, r.params);
      searchQuery.value = '';
    }

    async function loadAthletesIndex() {
      try {
        const res = await fetch(i18n.dataPath('athletes-index'));
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        athletes.value = data.athletes || [];
        athleteIds.value = athletes.value.map(a => a.name);
      } catch (e) {
        console.error('Failed to load athletes index:', e);
      } finally {
        athletesLoading.value = false;
      }
    }

    function selectAthlete(id) {
      navigate(`/athlete/${id}`);
    }

    onMounted(() => {
      window.addEventListener('hashchange', onHashChange);
      loadAthletesIndex();
    });

    watch(locale, () => {
      loadAthletesIndex();
    });

    return {
      currentRoute,
      routeParams,
      athletes,
      athletesLoading,
      athleteIds,
      searchQuery,
      locale,
      navigate,
      selectAthlete
    };
  },
  template: `
    <div id="app-root">
      <Navbar
        :current-route="currentRoute"
        v-model:search-query="searchQuery"
        @navigate="navigate"
      />

      <main style="padding-top: 0;">
        <AthleteList
          v-if="currentRoute === 'home'"
          :athletes="athletes"
          :search-query="searchQuery"
          :loading="athletesLoading"
          @select-athlete="selectAthlete"
        />

        <AthleteDetail
          v-else-if="currentRoute === 'athlete'"
          :athlete-id="routeParams.id"
          @select-athlete="selectAthlete"
        />

        <TournamentPage
          v-else-if="currentRoute === 'tournaments'"
          :tournament-id="routeParams.id"
          :athlete-ids="athleteIds"
          @select-athlete="selectAthlete"
        />
      </main>
    </div>
  `
});

app.mount('#app');
