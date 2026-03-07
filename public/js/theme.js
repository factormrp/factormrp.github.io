/**
 * theme.js
 * --------
 * Manages dark / light mode for the site.
 *
 * How it works:
 *   - The current theme is stored in localStorage under the key "theme".
 *   - The theme is applied by setting data-theme="dark" or data-theme="light"
 *     on <html>. All CSS variables react to this attribute.
 *   - A "themechange" CustomEvent is dispatched on document so any page-
 *     specific JS can react (e.g. swapping background images).
 *
 * To hook into theme changes from another script:
 *   document.addEventListener('themechange', (e) => {
 *       const { theme } = e.detail; // "dark" | "light"
 *       // swap images, update canvas colours, etc.
 *   });
 */

const STORAGE_KEY = 'theme';
const DARK  = 'dark';
const LIGHT = 'light';

/** Returns the currently active theme string. */
function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || DARK;
}

/** Applies a theme to the document and fires the themechange event. */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update every toggle button that may exist on the page
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
        btn.dataset.currentTheme = theme;
    });

    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

/** Flips between dark and light. */
function toggleTheme() {
    applyTheme(getTheme() === DARK ? LIGHT : DARK);
}

/** Call once on page load — run before first paint to avoid flash. */
function initTheme() {
    applyTheme(getTheme());
}

// ── Auto-init ──────────────────────────────────────────────────────────────
// Runs immediately (not gated on DOMContentLoaded) so the attribute is on
// <html> before CSS is rendered, preventing an unstyled flash.
initTheme();

// Expose helpers for nav injection and any page scripts
window.siteTheme = { getTheme, applyTheme, toggleTheme };