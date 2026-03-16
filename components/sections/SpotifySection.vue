<template>
  <section class="spotify-section">
    <div class="spotify-section__container">

      <!-- Loading State -->
      <div v-if="loading && !song" class="spotify-pill spotify-pill--loading">
        <div class="skeleton-cover"></div>
        <div class="skeleton-lines">
          <div class="skeleton-line skeleton-line--w60"></div>
          <div class="skeleton-line skeleton-line--w40"></div>
        </div>
      </div>

      <!-- Playing State -->
      <a
        v-else-if="song && song.isPlaying"
        :href="song.songUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="spotify-pill spotify-pill--playing"
      >
        <img
          :src="song.albumImageUrl"
          :alt="song.album"
          class="spotify-pill__cover"
        />
        <div class="spotify-pill__info">
          <p class="spotify-pill__title">{{ song.title }}</p>
          <p class="spotify-pill__artist">{{ song.artist }}</p>
        </div>
        <div class="spotify-pill__badge">
          <div class="equalizer">
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
            <span class="eq-bar"></span>
          </div>
          <svg class="spotify-pill__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="currentColor"/>
          </svg>
        </div>
      </a>

      <!-- Idle State -->
      <div v-else-if="!error" class="spotify-pill spotify-pill--idle">
        <svg class="spotify-pill__icon spotify-pill__icon--muted" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="currentColor"/>
        </svg>
        <span class="spotify-pill__idle-text">Not playing</span>
      </div>

      <!-- Error State -->
      <div v-else class="spotify-pill spotify-pill--idle">
        <svg class="spotify-pill__icon spotify-pill__icon--muted" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="currentColor"/>
        </svg>
        <span class="spotify-pill__idle-text">Offline</span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const song = ref(null)
const loading = ref(true)
const error = ref(false)

let pollInterval = null

async function fetchNowPlaying() {
  try {
    const data = await $fetch(`${config.public.apiBase}/spotify/now-playing`)
    song.value = data
    error.value = false
  } catch (err) {
    console.error('Failed to fetch Spotify now playing:', err)
    error.value = true
    song.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNowPlaying()
  pollInterval = setInterval(fetchNowPlaying, 30000)
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
})
</script>

<style scoped>
.spotify-section {
  display: flex;
  justify-content: center;
  padding: 24px 32px;
}

.spotify-section__container {
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: center;
}

/* ── Pill Base ── */
.spotify-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 8px 8px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 380px;
}

/* ── Playing ── */
.spotify-pill--playing {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.spotify-pill--playing:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(30, 215, 96, 0.2);
  box-shadow: 0 0 20px rgba(30, 215, 96, 0.06);
  transform: translateY(-1px);
}

.spotify-pill__cover {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: spin-slow 8s linear infinite;
}

.spotify-pill--playing:hover .spotify-pill__cover {
  animation-play-state: running;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spotify-pill__info {
  flex: 1;
  min-width: 0;
}

.spotify-pill__title {
  font-size: 13px;
  font-weight: 600;
  color: #f4f4f5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  line-height: 1.35;
}

.spotify-pill__artist {
  font-size: 11px;
  color: #a1a1aa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  line-height: 1.35;
}

/* ── Badge (equalizer + icon) ── */
.spotify-pill__badge {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.spotify-pill__icon {
  width: 16px;
  height: 16px;
  color: #1DB954;
  flex-shrink: 0;
}

.spotify-pill__icon--muted {
  color: #52525b;
}

/* ── Equalizer ── */
.equalizer {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 14px;
}

.eq-bar {
  display: block;
  width: 2.5px;
  background: #1DB954;
  border-radius: 1px;
}

.eq-bar:nth-child(1) { animation: eq 1.1s ease-in-out 0s infinite; }
.eq-bar:nth-child(2) { animation: eq 1.1s ease-in-out 0.25s infinite; }
.eq-bar:nth-child(3) { animation: eq 1.1s ease-in-out 0.5s infinite; }

@keyframes eq {
  0%, 100% { height: 3px; }
  50%      { height: 14px; }
}

/* ── Idle / Error ── */
.spotify-pill--idle {
  gap: 8px;
  padding: 10px 18px;
}

.spotify-pill__idle-text {
  font-size: 12px;
  color: #52525b;
  font-weight: 500;
}

/* ── Loading Skeleton ── */
.spotify-pill--loading {
  gap: 10px;
  padding: 8px 18px 8px 8px;
  pointer-events: none;
  min-width: 240px;
}

.skeleton-cover {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(110deg, #27272a 30%, #3f3f46 50%, #27272a 70%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  flex-shrink: 0;
}

.skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skeleton-line {
  height: 10px;
  border-radius: 4px;
  background: linear-gradient(110deg, #27272a 30%, #3f3f46 50%, #27272a 70%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

.skeleton-line--w60 { width: 65%; }
.skeleton-line--w40 { width: 40%; }

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .spotify-pill {
    max-width: 100%;
  }
  .spotify-section {
    padding: 16px;
  }
}
</style>
