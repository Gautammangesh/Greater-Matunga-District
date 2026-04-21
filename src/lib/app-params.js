const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;
const APP_STORAGE_PREFIX = 'app_';
const LEGACY_STORAGE_PREFIX = 'base44_';

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const snakeParamName = toSnakeCase(paramName);
	const storageKey = `${APP_STORAGE_PREFIX}${snakeParamName}`;
	const legacyStorageKey = `${LEGACY_STORAGE_PREFIX}${snakeParamName}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		storage.setItem(storageKey, searchParam);
		return searchParam;
	}
	if (defaultValue !== undefined) {
		storage.setItem(storageKey, defaultValue);
		return defaultValue;
	}
	const storedValue = storage.getItem(storageKey) ?? storage.getItem(legacyStorageKey);
	if (storedValue) {
		// Migrate legacy storage keys on successful read.
		storage.setItem(storageKey, storedValue);
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		storage.removeItem('app_access_token');
		storage.removeItem('base44_access_token');
		storage.removeItem('token');
	}
	const env = import.meta.env;
	return {
		appId: getAppParamValue("app_id", { defaultValue: env.VITE_APP_ID ?? env.VITE_BASE44_APP_ID }),
		token: getAppParamValue("access_token", { removeFromUrl: true }),
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
		functionsVersion: getAppParamValue("functions_version", { defaultValue: env.VITE_FUNCTIONS_VERSION ?? env.VITE_BASE44_FUNCTIONS_VERSION }),
		appBaseUrl: getAppParamValue("app_base_url", { defaultValue: env.VITE_APP_BASE_URL ?? env.VITE_BASE44_APP_BASE_URL }),
	}
}


export const appParams = {
	...getAppParams()
}
