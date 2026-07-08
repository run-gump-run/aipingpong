// Lightweight i18n module for aipingpong
const i18n = {
  locale: Vue.ref('zh'),

  messages: {
    zh: {
      'navbar.athletes': '运动员',
      'navbar.tournaments': '九大赛成绩',
      'navbar.search': '搜索运动员...',
      'navbar.langLabel': 'EN',
      'home.title': '乒乓球',
      'home.titleAccent': '传奇档案库',
      'home.subtitle': '见证每一位冠军的传奇之路',
      'common.loading': '加载中...',
      'common.noData': '未找到该运动员数据',
      'common.noMatch': '未找到匹配的运动员',
      'detail.scrollHint': '向下滚动 探索传奇',
      'detail.legendJourney': '传奇',
      'detail.legendJourneyAccent': '之路',
      'detail.careerAchievements': '的职业生涯成就',
      'detail.tribute': '致敬',
      'detail.legendRoad': '传奇之路',
      'tournament.title': '九大赛',
      'tournament.titleAccent': '成绩',
      'tournament.subtitle': '查阅乒乓球九大赛事历年成绩',
      'tournament.noData': '暂无数据',
      'tournament.footer': '数据整理自公开报道，仅供展示',
      'tournament.olympics': '🏅 奥运会',
      'tournament.worlds': '🏆 世锦赛',
      'tournament.worldcup': '🏆 世界杯',
      'tournament.nationalgames': '🏟️ 全运会',
      'tournament.nationals': '🎖️ 全锦赛',
      'tournament.wttfinals': '📋 ITTF/WTT总决赛',
      'tournament.asiangames': '🌏 亚运会',
      'tournament.asianchamps': '🎯 亚锦赛',
      'tournament.asiacup': '💎 亚洲杯',
      'event.mensSingles': '男单',
      'event.womensSingles': '女单',
      'event.mensDoubles': '男双',
      'event.womensDoubles': '女双',
      'event.mixedDoubles': '混双',
      'event.mensTeam': '男团',
      'event.womensTeam': '女团'
    },
    en: {
      'navbar.athletes': 'Athletes',
      'navbar.tournaments': 'Tournaments',
      'navbar.search': 'Search athletes...',
      'navbar.langLabel': '中',
      'home.title': 'Table Tennis ',
      'home.titleAccent': 'Legend Archive',
      'home.subtitle': 'Witness the legendary journey of every champion',
      'common.loading': 'Loading...',
      'common.noData': 'Athlete data not found',
      'common.noMatch': 'No matching athletes found',
      'detail.scrollHint': 'Scroll down to explore',
      'detail.legendJourney': 'Legend\'s ',
      'detail.legendJourneyAccent': 'Journey',
      'detail.careerAchievements': '\'s Career Achievements',
      'detail.tribute': 'Tribute to',
      'detail.legendRoad': 'Legend\'s Journey',
      'tournament.title': 'Tournament ',
      'tournament.titleAccent': 'Results',
      'tournament.subtitle': 'Browse historical results of 9 major table tennis events',
      'tournament.noData': 'No data available',
      'tournament.footer': 'Data compiled from public sources for reference only',
      'tournament.olympics': '🏅 Olympic Games',
      'tournament.worlds': '🏆 World Championships',
      'tournament.worldcup': '🏆 World Cup',
      'tournament.nationalgames': '🏟️ National Games',
      'tournament.nationals': '🎖️ National Championships',
      'tournament.wttfinals': '📋 ITTF/WTT Finals',
      'tournament.asiangames': '🌏 Asian Games',
      'tournament.asianchamps': '🎯 Asian Championships',
      'tournament.asiacup': '💎 Asia Cup',
      'event.mensSingles': 'Men\'s Singles',
      'event.womensSingles': 'Women\'s Singles',
      'event.mensDoubles': 'Men\'s Doubles',
      'event.womensDoubles': 'Women\'s Doubles',
      'event.mixedDoubles': 'Mixed Doubles',
      'event.mensTeam': 'Men\'s Team',
      'event.womensTeam': 'Women\'s Team'
    },
    ko: {
      'navbar.athletes': '선수',
      'navbar.tournaments': '대회 성적',
      'navbar.search': '선수 검색...',
      'navbar.langLabel': '中',
      'home.title': '탁구 ',
      'home.titleAccent': '전설 아카이브',
      'home.subtitle': '모든 챔피언의 전설적인 여정을 목격하세요',
      'common.loading': '로딩 중...',
      'common.noData': '선수 데이터를 찾을 수 없습니다',
      'common.noMatch': '일치하는 선수를 찾을 수 없습니다',
      'detail.scrollHint': '아래로 스크롤하여 탐색하기',
      'detail.legendJourney': '전설의 ',
      'detail.legendJourneyAccent': '여정',
      'detail.careerAchievements': '의 경력 성과',
      'detail.tribute': '헌정',
      'detail.legendRoad': '전설의 여정',
      'tournament.title': '대회 ',
      'tournament.titleAccent': '성적',
      'tournament.subtitle': '9대 주요 탁구 대회의 역사적 결과 확인',
      'tournament.noData': '데이터 없음',
      'tournament.footer': '공개 출처에서 수집한 데이터, 참고용',
      'tournament.olympics': '🏅 올림픽',
      'tournament.worlds': ' 세계 선수권 대회',
      'tournament.worldcup': '🏆 월드컵',
      'tournament.nationalgames': '️ 전국 운동회',
      'tournament.nationals': '🎖️ 전국 선수권 대회',
      'tournament.wttfinals': '📋 ITTF/WTT 파이널',
      'tournament.asiangames': '🌏 아시안 게임',
      'tournament.asianchamps': '🎯 아시아 선수권 대회',
      'tournament.asiacup': '💎 아시안컵',
      'event.mensSingles': '남자 단식',
      'event.womensSingles': '여자 단식',
      'event.mensDoubles': '남자 복식',
      'event.womensDoubles': '여자 복식',
      'event.mixedDoubles': '혼합 복식',
      'event.mensTeam': '남자 단체',
      'event.womensTeam': '여자 단체'
    },
    ja: {
      'navbar.athletes': '選手',
      'navbar.tournaments': '大会成績',
      'navbar.search': '選手を検索...',
      'navbar.langLabel': '中',
      'home.title': '卓球 ',
      'home.titleAccent': '伝説アーカイブ',
      'home.subtitle': 'すべてのチャンピオンの伝説的な旅路を目撃する',
      'common.loading': '読み込み中...',
      'common.noData': '選手データが見つかりません',
      'common.noMatch': '一致する選手が見つかりません',
      'detail.scrollHint': '下にスクロールして探索',
      'detail.legendJourney': '伝説の ',
      'detail.legendJourneyAccent': '旅路',
      'detail.careerAchievements': 'のキャリア実績',
      'detail.tribute': '捧ぐ',
      'detail.legendRoad': '伝説の旅路',
      'tournament.title': '大会 ',
      'tournament.titleAccent': '成績',
      'tournament.subtitle': '卓球9大主要大会の歴史的結果を閲覧',
      'tournament.noData': 'データなし',
      'tournament.footer': '公開ソースから収集したデータ、参考用',
      'tournament.olympics': '🏅 オリンピック',
      'tournament.worlds': '🏆 世界選手権',
      'tournament.worldcup': '🏆 ワールドカップ',
      'tournament.nationalgames': '🏟️ 全国運動会',
      'tournament.nationals': '️ 全国選手権',
      'tournament.wttfinals': '📋 ITTF/WTTファイナル',
      'tournament.asiangames': '🌏 アジア大会',
      'tournament.asianchamps': '🎯 アジア選手権',
      'tournament.asiacup': '💎 アジアカップ',
      'event.mensSingles': '男子シングルス',
      'event.womensSingles': '女子シングルス',
      'event.mensDoubles': '男子ダブルス',
      'event.womensDoubles': '女子ダブルス',
      'event.mixedDoubles': '混合ダブルス',
      'event.mensTeam': '男子団体',
      'event.womensTeam': '女子団体'
    }
  },

  t(key) {
    const msgs = this.messages[this.locale.value];
    return msgs[key] || this.messages.zh[key] || key;
  },

  toggle(newLocale) {
    if (newLocale) {
      this.locale.value = newLocale;
    } else {
      // Cycle through languages
      const langs = ['zh', 'en', 'ko', 'ja'];
      const currentIndex = langs.indexOf(this.locale.value);
      this.locale.value = langs[(currentIndex + 1) % langs.length];
    }
    try {
      localStorage.setItem('aipingpong-locale', this.locale.value);
    } catch (e) {}
  },

  init() {
    try {
      const saved = localStorage.getItem('aipingpong-locale');
      if (saved && ['en', 'zh', 'ko', 'ja'].includes(saved)) {
        this.locale.value = saved;
      }
    } catch (e) {}
  },

  dataPath(id) {
    if (this.locale.value === 'en') {
      return `data/en/${id}.json`;
    }
    // For ko and ja, use en data as fallback (since we don't have full translations yet)
    // This is better than showing Chinese to Korean/Japanese users
    if (this.locale.value === 'ko' || this.locale.value === 'ja') {
      return `data/en/${id}.json`;
    }
    return `data/${id}.json`;
  },

  getLangLabel() {
    const labels = { zh: '中文', en: 'English', ko: '한국어', ja: '日本語' };
    return labels[this.locale.value] || '中文';
  },

  getAllLanguages() {
    return [
      { code: 'zh', label: '中文' },
      { code: 'en', label: 'English' },
      { code: 'ko', label: '한국어' },
      { code: 'ja', label: '日本語' }
    ];
  }
};
