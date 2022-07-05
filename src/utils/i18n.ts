const defaultLanguage = 'ru';
const supportedLanguages = ['en', 'ru'];

let messages: Record<string, string> = {};

function getStoredLanguage() {
  try {
    return localStorage.getItem('language');
  } catch (e) {
    console.error('getStoredLanguage error', e);
  }
  return undefined;
}

const currentLanguage = getStoredLanguage() || navigator.language;

function getSupportedLanguage() {
  const language = supportedLanguages.find((lang: string) =>
    currentLanguage.toLowerCase().startsWith(lang)
  );
  return language || defaultLanguage;
}

let language = getSupportedLanguage();

function getTranslationsFromServer() {
  messages = {
    'Loading.First': 'Виджет крузится',
    'Loading.Second': 'Виджет ещё грузится',
    'Loading.Third': 'Загрузка идёт дольше чем обычно. Пожалуйста, подождите',
    'Error.Timeout': 'Ошибка при загрузке. Пожалуйста -- обновите окно',
    'Success.LoadingFinished': 'Виджет загружен!',
  };
}

export function getCurrentLanguage() {
  if (language) {
    return language;
  }
  return defaultLanguage;
}

export function getSupportedLanguages() {
  return supportedLanguages;
}

export function setLanguage(newLanguage: string) {
  language = newLanguage;
  try {
    localStorage.setItem('language', newLanguage);
  } catch (e) {
    console.error('setLanguage error', e);
  }
  getTranslationsFromServer();
}

export function i18n(translationKey: string) {
  if (messages && Object.keys(messages).length === 0) {
    getTranslationsFromServer();
  }
  const translation = messages[translationKey];

  if (translation) {
    return translation;
  }

  return translationKey;
}
