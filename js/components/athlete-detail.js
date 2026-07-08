// Athlete Detail Component
const AthleteDetail = (function() {
  return {
    props: ['athleteId'],
    emits: ['select-athlete'],
    setup(props) {
      const { ref, onMounted, watch, nextTick, onUnmounted } = Vue;

      function t(key) { return i18n.t(key); }

      const athlete = ref(null);
      const loading = ref(true);
      const currentSlide = ref(0);
      const expandedYears = ref(new Set());
      let slideTimer = null;
      let observers = [];

      async function loadAthlete(id) {
        loading.value = true;
        athlete.value = null;
        try {
          const res = await fetch(i18n.dataPath(id));
          if (!res.ok) throw new Error('Not found');
          athlete.value = await res.json();
          loading.value = false;
          // Default expand latest year
          if (athlete.value.timeline && athlete.value.timeline.length > 0) {
            expandedYears.value = new Set([athlete.value.timeline[athlete.value.timeline.length - 1].year]);
          }
          await nextTick();
          startCarousel();
          initAnimations();
          window.scrollTo(0, 0);
        } catch (e) {
          loading.value = false;
          console.error('Failed to load athlete:', e);
        }
      }

      function startCarousel() {
        if (!athlete.value || !athlete.value.heroImages || athlete.value.heroImages.length <= 1) return;
        stopCarousel();
        slideTimer = setInterval(() => {
          if (!athlete.value || !athlete.value.heroImages) return;
          currentSlide.value = (currentSlide.value + 1) % athlete.value.heroImages.length;
        }, 5000);
      }

      function stopCarousel() {
        if (slideTimer) {
          clearInterval(slideTimer);
          slideTimer = null;
        }
      }

      function initAnimations() {
        // Clean up previous observers
        observers.forEach(o => o.disconnect());
        observers = [];

        // Number counter animation
        const counters = document.querySelectorAll('.stat-num');
        const counterObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const target = parseInt(el.dataset.target);
              let current = 0;
              const step = Math.max(1, Math.ceil(target / 30));
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                el.textContent = current;
              }, 30);
              counterObs.unobserve(el);
            }
          });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObs.observe(c));
        observers.push(counterObs);

        // Timeline fade-in
        const tlItems = document.querySelectorAll('.tl-item');
        const tlObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.15 });
        tlItems.forEach(item => tlObs.observe(item));
        observers.push(tlObs);
      }

      function toggleYear(year) {
        if (expandedYears.value.has(year)) {
          expandedYears.value.delete(year);
        } else {
          expandedYears.value.add(year);
        }
      }

      onMounted(() => {
        if (props.athleteId) {
          loadAthlete(props.athleteId);
        }
      });

      watch(() => props.athleteId, (newId) => {
        if (newId) {
          currentSlide.value = 0;
          loadAthlete(newId);
        }
      });

      watch(() => i18n.locale.value, () => {
        if (props.athleteId) {
          currentSlide.value = 0;
          loadAthlete(props.athleteId);
        }
      });

      onUnmounted(() => {
        stopCarousel();
        observers.forEach(o => o.disconnect());
      });

      return {
        athlete,
        loading,
        currentSlide,
        expandedYears,
        toggleYear,
        t
      };
    },
    template: `
      <div v-if="loading" class="loading">{{ t('common.loading') }}</div>
      <div v-else-if="!athlete" class="loading">{{ t('common.noData') }}</div>
      <div v-else>
        <!-- HERO -->
        <section class="athlete-hero">
          <div class="athlete-hero-slides" v-if="athlete.heroImages && athlete.heroImages.length > 0">
            <div
              v-for="(img, i) in athlete.heroImages"
              :key="i"
              class="athlete-hero-slide"
              :class="{ active: i === currentSlide }"
              :style="{ backgroundImage: 'url(' + img + ')' }"
            ></div>
          </div>
          <div class="athlete-hero-slides" v-else>
            <div class="athlete-hero-slide active" style="background: linear-gradient(135deg, var(--dark), var(--dark-2));"></div>
          </div>
          <div class="athlete-hero-inner">
            <div class="athlete-hero-flag">{{ athlete.country }} · {{ athlete.team }}</div>
            <h1 class="athlete-hero-name">{{ athlete.name }}<span class="accent">.</span></h1>
            <p class="athlete-hero-sub" v-if="athlete.nameEn">{{ athlete.nameEn }}</p>
            <div class="athlete-hero-tags" v-if="athlete.tags">
              <span
                v-for="(tag, i) in athlete.tags"
                :key="i"
                class="athlete-hero-tag"
                :class="{ gold: tag.type === 'gold' }"
              >{{ tag.text }}</span>
            </div>
          </div>
          <div class="scroll-hint">
            {{ t('detail.scrollHint') }}
            <span class="arrow"></span>
          </div>
        </section>

        <!-- STATS -->
        <section class="stats" v-if="athlete.stats">
          <div class="stats-grid">
            <div
              v-for="(stat, i) in athlete.stats"
              :key="i"
              class="stat-card"
              :class="{ 'gold-border': stat.highlight }"
            >
              <div class="stat-num" :data-target="stat.num">0</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </section>

        <!-- TIMELINE -->
        <div class="section-title" v-if="athlete.timeline">
          <h2>{{ t('detail.legendJourney') }}<span class="accent">{{ t('detail.legendJourneyAccent') }}</span></h2>
          <p>{{ athlete.name }}{{ t('detail.careerAchievements') }}</p>
          <div class="line"></div>
        </div>
        <section class="timeline-section" v-if="athlete.timeline">
          <div class="timeline">
            <div
              v-for="(item, i) in athlete.timeline"
              :key="i"
              class="tl-item"
            >
              <div class="tl-dot" :class="{ peak: item.isPeak }"></div>
              <div class="tl-card" :class="{ 'peak-card': item.isPeak }">
                <div class="tl-year">{{ item.year }}</div>
                <span class="tl-age" v-if="item.age">{{ item.age }} · {{ item.subtitle }}</span>
                <span class="tl-age" v-else>{{ item.subtitle }}</span>
                <ul>
                  <li v-for="(ach, j) in item.achievements" :key="j">{{ ach }}</li>
                </ul>
                <span class="highlight-badge" v-if="item.badge">{{ item.badge }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ACHIEVEMENTS -->
        <section class="achievements-section" v-if="athlete.achievements">
          <div class="ach-content">
            <h2 class="ach-title">{{ athlete.achievements.title }}</h2>
            <p class="ach-desc">{{ athlete.achievements.description }}</p>
            <div class="ach-grid">
              <div
                v-for="(item, i) in athlete.achievements.items"
                :key="i"
                class="ach-item"
              >
                <div class="ach-icon">{{ item.icon }}</div>
                <div class="ach-item-title">{{ item.title }}</div>
                <div class="ach-item-year">{{ item.year }}</div>
              </div>
            </div>
          </div>
        </section>

        <footer class="footer">
          <p>{{ t('detail.tribute') }} <strong>{{ athlete.name }}</strong> · {{ t('detail.legendRoad') }}</p>
        </footer>
      </div>
    `
  };
})();
