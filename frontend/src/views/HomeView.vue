<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
const form = reactive({
    longUrl: '',
    alias: null,
    expiry: null,
});

const errorMessage = ref('');
const responseData = ref(null);
const copyFeedback = ref('');

async function copyShortUrl() {
    if (!responseData.value?.shortUrl) {
        return;
    }
    try {
        await navigator.clipboard.writeText(responseData.value.shortUrl);
        copyFeedback.value = 'Copied!';
        setTimeout(() => {
            copyFeedback.value = '';
        }, 2000);
    } catch {
        copyFeedback.value = 'Copy failed';
    }
}

const handleSubmit = async () => {
    errorMessage.value = '';
    responseData.value = null;
    copyFeedback.value = '';
    try {
        const payload = {
            longUrl: form.longUrl,
            alias: normalizeOptional(form.alias),
            expiry: normalizeOptional(form.expiry),
        };
        const response = await axios.post('/api/urls', payload);
        responseData.value = response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            const message = error.response.data.message;
            errorMessage.value = Array.isArray(message)
                ? message.join(', ')
                : message;
        } else {
            errorMessage.value = 'Something went wrong. Please try again.';
        }
    }
}

function normalizeOptional(value) {
    if (value === null || value === undefined) {
        return null;
    }
    if (typeof value === 'string' && value.trim() === '') {
        return null;
    }
    return value;
}
</script>

<template>
  <div class="page">
    <h1 class="title">URL Shortener</h1>
    <form @submit.prevent="handleSubmit" class="form">
      <input v-model="form.longUrl" class="url-input" type="text" />
      <input v-model="form.alias" class="url-input" type="text" />
      <input v-model="form.expiry" class="url-input" type="date" />
      <div v-if="responseData" class="success" role="status">
        <p class="success-label">Your short URL is:</p>
        <div class="success-row">
          <a
            class="success-link"
            :href="responseData.shortUrl"
            target="_blank"
            rel="noopener noreferrer"
          >{{ responseData.shortUrl }}</a>
          <button
            type="button"
            class="copy-btn"
            @click="copyShortUrl"
          >
            {{ copyFeedback || 'Copy' }}
          </button>
        </div>
      </div>
      <p v-if="errorMessage" class="error" role="alert">{{ errorMessage }}</p>
      <button class="generate-btn" type="submit">Generate</button>
    </form>
  </div>
</template>


<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  box-sizing: border-box;
}

.title {
  width: 100%;
  margin: 0;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 36rem;
  padding: 0 1rem;
  box-sizing: border-box;
}

.url-input {
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.25rem;
  box-sizing: border-box;
}

.generate-btn {
  padding: 1rem 2.5rem;
  font-size: 1.25rem;
  cursor: pointer;
}

.error {
  width: 100%;
  margin: 0;
  color: #b00020;
  font-size: 1rem;
  text-align: center;
}
.success {
  width: 100%;
  text-align: center;
}

.success-label {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 600;
  color: #1b5e20;
}

.success-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.success-link {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1565c0;
  word-break: break-all;
}

.success-link:hover {
  text-decoration: underline;
}

.copy-btn {
  padding: 0.65rem 1.25rem;
  font-size: 1.1rem;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
