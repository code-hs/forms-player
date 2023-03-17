function changePage(page) {
	const form = document.querySelector('form-widget-g');
	form.setAttribute('data-page', page);
}
const body = document.querySelector('body');
const formWidget = document.getElementsByTagName('form-widget-g');
function changeTheme() {
	const storageTheme = localStorage.getItem('WT');
	if (storageTheme) {
		localStorage.removeItem('WT');
		formWidget[0].dataTheme = body.dataset.theme = 'light';
	} else {
		localStorage.setItem('WT', 'dark');
		formWidget[0].dataTheme = body.dataset.theme = 'dark';
	}
}
window.onload = () => {
	const themeColor = localStorage.getItem('WT');
	formWidget[0].dataTheme = body.dataset.theme = themeColor ? 'dark' : 'light';
	document.getElementById('year').innerHTML = new Date().getFullYear();
};