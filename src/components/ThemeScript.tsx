/* ==========================================================================
   تم را پیش از اولین رنگ‌آمیزی صفحه اعمال می‌کند تا پرش روشن/تاریک نداشته باشیم.
   این اسکریپت باید همگام (blocking) باشد، پس عمداً inline است.
   ========================================================================== */
const script = `
(function(){
  try{
    var d=document.documentElement;
    var t=localStorage.getItem('theme');
    if(!t) t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    d.setAttribute('data-theme',t);
  }catch(e){
    document.documentElement.setAttribute('data-theme','light');
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
