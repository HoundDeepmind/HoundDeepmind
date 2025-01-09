import { ModelProvider } from '@/libs/agent-runtime';
import { genUserLLMConfig } from '@/utils/genUserLLMConfig';

export const DEFAULT_LLM_CONFIG = genUserLLMConfig({
  groq: {
    enabled: true,
    fetchOnClient: true, // Adjust this based on your needs
  },
  // Removed other providers
});

export const DEFAULT_MODEL = 'llama3-70b-8192'; // Set the default Groq model
export const DEFAULT_EMBEDDING_MODEL = 'groq-embedding-model'; // Adjust this based on the available embedding model

export const DEFAULT_PROVIDER = ModelProvider.Groq; // Set Groq as the default provider
