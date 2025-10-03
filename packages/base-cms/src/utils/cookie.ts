import Cookies from 'js-cookie';

export const getCookie = (key: string): string | undefined => {
	return Cookies.get(key);
};

export const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes) => {
	Cookies.set(key, value, options);
};

export const removeCookie = (key: string, options?: Cookies.CookieAttributes) => {
	Cookies.remove(key, options);
};
