const formWidget = document.querySelector('form-widget-g');
const getThemeFromStorage = () => localStorage.getItem('WT');
const getBodyTheme = () => document.body.dataset.theme;
const setBodyTheme = theme => (document.body.dataset.theme = theme);
const setWidgetTheme = theme => (formWidget.dataset.theme = theme);

init();

function init() {
	const theme = getThemeFromStorage() ? 'dark' : 'light';
	setBodyTheme(theme);
	setWidgetTheme(theme);

	document.getElementById('year').innerHTML = new Date().getFullYear();
}

function changeTheme() {
	if (getThemeFromStorage()) {
		// set light theme
		localStorage.removeItem('WT');
		setBodyTheme('light');
		setWidgetTheme('light');
	} else {
		// set dark theme
		localStorage.setItem('WT', 'dark');
		setBodyTheme('dark');
		setWidgetTheme('dark');
	}
}

window.onload = () => {
	init();
};
