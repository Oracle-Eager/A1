function burnHistory() {
    if (!confirm('Are you sure you want to permanently delete all history and session data? This action cannot be undone.')) return;
    startProgress();
    try {
        localStorage.clear();
        sessionStorage.clear();
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }
        currentViewState = { url: '', mode: 'interactive', history: [], historyIndex: -1, pageHTML: '', error: null };
        dom.input.value = '';
        setAppState('');
        alert('All history, session, and cookie data has been burned.');
    } catch (e) {
        console.error("Failed to burn history:", e);
        alert('An error occurred while burning the data.');
    } finally {
        finishProgress();
    }
}
