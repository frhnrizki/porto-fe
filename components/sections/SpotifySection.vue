<template>
  <section class="spotify-section">
    <div class="spotify-section__container">
      <div 
        class="spotify-card"
        :class="{ 'spotify-card--expanded': isExpanded, 'spotify-card--loading': loading }"
        @click="toggleExpand"
      >
        <!-- Background Glow -->
        <div class="spotify-card__glow"></div>

        <!-- Main Content -->
        <div class="spotify-card__content">
          <!-- Left: Artwork/Icon -->
          <div class="player-visual">
            <div v-if="loading" class="skeleton-circle"></div>
            <img 
              v-else-if="song?.isPlaying" 
              :src="song.albumImageUrl" 
              class="player-visual__img"
              :class="{ 'player-visual__img--spinning': song.isPlaying }"
            />
            <div v-else class="player-visual__icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </div>
            
            <div v-if="song?.isPlaying" class="player-visual__eq">
              <span v-for="i in 3" :key="i" class="eq-bar"></span>
            </div>
          </div>

          <!-- Middle: Title/Artist -->
          <div class="player-info">
            <template v-if="loading">
              <div class="skeleton-text w-16"></div>
              <div class="skeleton-text w-12"></div>
            </template>
            <template v-else-if="song?.isPlaying">
              <span class="player-info__status">Now Playing</span>
              <h3 class="player-info__title">{{ song.title }}</h3>
              <p class="player-info__artist">{{ song.artist }}</p>
            </template>
            <template v-else>
              <span class="player-info__status">Currently Offline</span>
              <h3 class="player-info__title">Spotify</h3>
              <p class="player-info__artist">Not playing right now</p>
            </template>
          </div>

          <!-- Right: Action Button -->
          <button class="player-toggle" aria-label="Toggle Player">
            <svg v-if="!isExpanded" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
          </button>
        </div>

        <!-- Expanded Interface (Iframe Player) -->
        <div v-if="isExpanded" class="spotify-card__expanded" @click.stop>
          <div class="iframe-container">
            <iframe 
              v-if="song?.songUrl"
              :src="embedUrl" 
              width="100%" 
              height="152" 
              frameBorder="0" 
              allowfullscreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              class="spotify-embed"
            ></iframe>
            <div v-else class="no-track-message">
              <p>Explore my music on Spotify</p>
              <a href="https://open.spotify.com/user/fp7m4c6e6z1z6k3e6z1z6k3e6" target="_blank" class="spotify-link">View Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const song = ref(null)
const loading = ref(true)
const isExpanded = ref(false)

// Extract track ID for embed - only update when track ID actually changes
const currentTrackId = ref('')
const embedUrl = computed(() => {
  if (!song.value?.songUrl) return ''
  const match = song.value.songUrl.match(/track\/([a-zA-Z0-9]+)/)
  const trackId = match ? match[1] : ''
  
  // Track current ID to prevent unnecessary iframe reloads
  if (trackId && trackId !== currentTrackId.value) {
    currentTrackId.value = trackId
  }
  
  return trackId ? `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0` : ''
})

const toggleExpand = () => {
  if (!loading.value) {
    isExpanded.value = !isExpanded.value
  }
}

async function fetchNowPlaying() {
  try {
    const data = await $fetch(`${config.public.apiBase}/spotify/now-playing`)
    song.value = data
  } catch (err) {
    console.error('Failed to fetch Spotify:', err)
  } finally {
    loading.value = false
  }
}

let pollInterval = null

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    fetchNowPlaying()
  }
}

onMounted(() => {
  fetchNowPlaying()
  // Faster polling every 5 seconds for real-time feel
  pollInterval = setInterval(fetchNowPlaying, 5000)
  
  // Refresh data whenever user returns to the tab
  window.addEventListener('focus', fetchNowPlaying)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
  window.removeEventListener('focus', fetchNowPlaying)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
.spotify-section {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
}

.spotify-section__container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
}

/* ── Card Base (Glassmorphism) ── */
.spotify-card {
  position: relative;
  width: 100%;
  max-width: 450px;
  background: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 14px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.spotify-card:hover {
  transform: translateY(-4px);
  background: rgba(18, 18, 18, 0.85);
  border-color: rgba(30, 215, 96, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(30, 215, 96, 0.1);
}

.spotify-card--expanded {
  max-width: 500px;
  background: rgba(18, 18, 18, 0.95);
  border-color: rgba(30, 215, 96, 0.4);
}

/* ── Glow Effect ── */
.spotify-card__glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(30, 215, 96, 0.08) 0%, transparent 40%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.spotify-card:hover .spotify-card__glow {
  opacity: 1;
}

/* ── Content Layout ── */
.spotify-card__content {
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 1;
}

/* ── Visual (Artwork/Icon) ── */
.player-visual {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.player-visual__img {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.player-visual__img--spinning {
  animation: disc-rotate 12s linear infinite;
  border-radius: 50% !important;
}

@keyframes disc-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.player-visual__icon {
  width: 100%;
  height: 100%;
  background: #282828;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1DB954;
}

.player-visual__icon svg {
  width: 24px;
  height: 24px;
}

/* ── Equalizer ── */
.player-visual__eq {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #1DB954;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  gap: 2px;
  height: 20px;
  align-items: flex-end;
  border: 3px solid #121212;
}

.eq-bar {
  width: 2px;
  background: #000;
  border-radius: 1px;
}

.eq-bar:nth-child(1) { animation: eq 0.8s infinite; }
.eq-bar:nth-child(2) { animation: eq 0.8s 0.2s infinite; }
.eq-bar:nth-child(3) { animation: eq 0.8s 0.4s infinite; }

@keyframes eq {
  0% { height: 4px; }
  50% { height: 12px; }
  100% { height: 4px; }
}

/* ── Info ── */
.player-info {
  flex-grow: 1;
  min-width: 0;
}

.player-info__status {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #1DB954;
  font-weight: 700;
  margin-bottom: 2px;
  display: block;
}

.player-info__title {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player-info__artist {
  font-size: 12px;
  color: #b3b3b3;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Toggle Button ── */
.player-toggle {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.spotify-card:hover .player-toggle {
  background: #1DB954;
  color: #000;
  transform: scale(1.1);
}

/* ── Expanded Content (Iframe) ── */
.spotify-card__expanded {
  margin-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
  animation: slide-down 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.iframe-container {
  border-radius: 12px;
  overflow: hidden;
  background: #000;
}

.spotify-embed {
  border-radius: 12px;
}

.no-track-message {
  padding: 24px;
  text-align: center;
}

.no-track-message p {
  color: #b3b3b3;
  margin-bottom: 12px;
}

.spotify-link {
  display: inline-block;
  background: #1DB954;
  color: #000;
  padding: 8px 20px;
  border-radius: 99px;
  font-weight: 700;
  text-decoration: none;
  font-size: 13px;
  transition: transform 0.2s ease;
}

.spotify-link:hover {
  transform: scale(1.05);
}

/* ── Skeletons ── */
.skeleton-circle {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: #282828;
  animation: pulse 1.5s infinite;
}

.skeleton-text {
  height: 12px;
  background: #282828;
  border-radius: 4px;
  margin-bottom: 6px;
  animation: pulse 1.5s infinite;
}

.w-16 { width: 60%; }
.w-12 { width: 40%; }

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

@media (max-width: 640px) {
  .spotify-card {
    max-width: 100%;
  }
}
</style>
