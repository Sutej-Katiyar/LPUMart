(function(){
  const key='marketplaceTheme';
  const saved=localStorage.getItem(key)==='dark'?'dark':'light';
  document.documentElement.classList.toggle('dark-mode',saved==='dark');
  function sync(){
    const dark=document.documentElement.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode',dark);
    document.querySelectorAll('#themeIcon').forEach(e=>e.textContent=dark?'☾':'☀');
    document.querySelectorAll('#themeToggle').forEach(e=>{e.title=dark?'Switch to light mode':'Switch to dark mode';e.setAttribute('aria-label',e.title);});
  }
  window.setMarketplaceTheme=function(theme){
    const dark=theme==='dark'; localStorage.setItem(key,dark?'dark':'light');
    document.documentElement.classList.toggle('dark-mode',dark); sync();
  };
  document.addEventListener('DOMContentLoaded',function(){
    if(!document.getElementById('themeToggle')) return;
    sync();
    document.getElementById('themeToggle').addEventListener('click',function(){
      window.setMarketplaceTheme(document.documentElement.classList.contains('dark-mode')?'light':'dark');
    });
  });
})();
