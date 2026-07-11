// Tournament Component
const TournamentPage = (function() {
  return {
    props: ['tournamentId', 'athleteIds'],
    emits: ['select-athlete', 'select-tournament'],
    setup(props, { emit }) {
      const { ref, onMounted, watch, computed } = Vue;

      function t(key) { return i18n.t(key); }

      const tournaments = computed(() => [
        { id: 'olympics', name: t('tournament.olympics') },
        { id: 'worlds', name: t('tournament.worlds') },
        { id: 'worldcup', name: t('tournament.worldcup') },
        { id: 'nationalgames', name: t('tournament.nationalgames') },
        { id: 'nationals', name: t('tournament.nationals') },
        { id: 'wttfinals', name: t('tournament.wttfinals') },
        { id: 'asiangames', name: t('tournament.asiangames') },
        { id: 'asianchamps', name: t('tournament.asianchamps') },
        { id: 'asiacup', name: t('tournament.asiacup') }
      ]);

      const currentId = ref(props.tournamentId || 'olympics');
      const data = ref(null);
      const loading = ref(true);
      const expandedYears = ref(new Set());

      const eventLabels = computed(() => ({
        mensSingles: t('event.mensSingles'),
        womensSingles: t('event.womensSingles'),
        mensDoubles: t('event.mensDoubles'),
        womensDoubles: t('event.womensDoubles'),
        mixedDoubles: t('event.mixedDoubles'),
        mensTeam: t('event.mensTeam'),
        womensTeam: t('event.womensTeam')
      }));

      async function loadTournament(id) {
        loading.value = true;
        data.value = null;
        try {
          const res = await fetch(`${i18n.dataPath(id)}?v=${Date.now()}`, { cache: 'no-store' });
          if (!res.ok) throw new Error('Not found');
          data.value = await res.json();
          loading.value = false;
          // Default expand latest year
          if (data.value.years && data.value.years.length > 0) {
            expandedYears.value = new Set([data.value.years[0].year]);
          }
        } catch (e) {
          loading.value = false;
          console.error('Failed to load tournament:', e);
        }
      }

      function selectTournament(id) {
        currentId.value = id;
        expandedYears.value = new Set();
        loadTournament(id);
      }

      function toggleYear(year) {
        if (expandedYears.value.has(year)) {
          expandedYears.value.delete(year);
        } else {
          expandedYears.value.add(year);
        }
      }

      function isAthleteLink(name) {
        if (!props.athleteIds || !name) return false;
        return props.athleteIds.some(id => name.includes(id));
      }

      function handleAthleteClick(name) {
        if (!props.athleteIds) return;
        const matched = props.athleteIds.find(id => name.includes(id));
        if (matched) {
          emit('select-athlete', matched);
        }
      }

      onMounted(() => {
        loadTournament(currentId.value);
      });

      watch(() => props.tournamentId, (newId) => {
        if (newId && newId !== currentId.value) {
          currentId.value = newId;
          loadTournament(newId);
        }
      });

      watch(() => i18n.locale.value, () => {
        loadTournament(currentId.value);
      });

      return {
        tournaments,
        currentId,
        data,
        loading,
        expandedYears,
        eventLabels,
        selectTournament,
        toggleYear,
        isAthleteLink,
        handleAthleteClick,
        t
      };
    },
    template: `
      <div>
        <section class="tournament-hero">
          <h1>🏆 {{ t('tournament.title') }}<span class="accent">{{ t('tournament.titleAccent') }}</span></h1>
          <p>{{ t('tournament.subtitle') }}</p>
        </section>

        <div class="tournament-tabs">
          <button
            v-for="tn in tournaments"
            :key="tn.id"
            class="tournament-tab"
            :class="{ active: currentId === tn.id }"
            @click="selectTournament(tn.id)"
          >{{ tn.name }}</button>
        </div>

        <div v-if="loading" class="loading">{{ t('common.loading') }}</div>

        <div v-else-if="!data" class="loading">{{ t('tournament.noData') }}</div>

        <div v-else class="tournament-content">
          <div
            v-for="y in data.years"
            :key="y.year"
            class="year-card"
            :class="{ expanded: expandedYears.has(y.year) }"
          >
            <div class="year-card-header" @click="toggleYear(y.year)">
              <div>
                <span class="year-card-title">{{ y.year }}</span>
                <span class="year-card-location">{{ y.location }}</span>
              </div>
              <span class="year-card-toggle">▼</span>
            </div>
            <div class="year-card-body" v-if="expandedYears.has(y.year)">
              <div
                v-for="(medal, key) in y.events"
                :key="key"
                class="medal-row"
              >
                <div class="medal-event">{{ eventLabels[key] || key }}</div>
                <div class="medal-winners">
                  <span class="medal-gold">🥇 {{ medal.gold }}</span>
                  <span class="medal-silver" v-if="medal.silver">🥈 {{ medal.silver }}</span>
                  <span
                    v-for="(b, i) in (medal.bronze || [])"
                    :key="i"
                    class="medal-bronze"
                  >🥉 {{ b }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer">
          <p>{{ t('tournament.footer') }}</p>
        </footer>
      </div>
    `
  };
})();
