export type Theme = 'light' | 'dark';

export const THEME_KEY = 'rj-theme';

// Runs inline in <head> before first paint, so the page never flashes the wrong theme.
// Also marks <html class="js"> (scroll reveal only hides content when JS runs) and
// forwards the old HashRouter links (/#/profile, /#/portfolio) to their new sections.
export const headScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}try{var h=location.hash,m={'#/profile':'#about','#/portfolio':'#projects','#/':''};if(h in m){history.replaceState(null,'',location.pathname+m[h])}}catch(e){}})();`;

export function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}
