import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForProductionCRM2026",
  authDomain: "sk-smart-crm-prod.firebaseapp.com",
  projectId: "sk-smart-crm-prod",
  storageBucket: "sk-smart-crm-prod.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase Client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export default app;
