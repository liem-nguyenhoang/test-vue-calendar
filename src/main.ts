/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import axios from 'axios'
// Uncomment for development with mock API
// import './services/mockApi'

// Composables
import { createApp } from 'vue'
// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add request interceptor for authentication if needed
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
