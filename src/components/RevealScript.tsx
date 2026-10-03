/* ==========================================================================
   انیمیشن ظاهرشدن، بدون وابستگی به React
   --------------------------------------------------------------------------
   چرا اینجا و نه داخل کامپوننت؟ اگر منتظر هیدریشن React بمانیم، تا چند ثانیه
   محتوا نامرئی می‌ماند. این اسکریپت همگام است و بلافاصله پس از تجزیهٔ صفحه
   اجرا می‌شود، پس پرش و تأخیر نداریم.

   کلاس js-reveal روی <html> کلید کار است: قانونِ پنهان‌کردن در CSS فقط وقتی
   فعال می‌شود که این کلاس باشد. یعنی اگر جاوااسکریپت خاموش یا خراب باشد،
   هیچ‌چیز پنهان نمی‌ماند.
   ========================================================================== */
const script = `
(function(){
  try{
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('js-reveal');

    var show = function(el){ el.classList.add('is-in'); };

    var start = function(){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

      /* اگر چیزی از قلم افتاد (مثلاً محتوایی که بعداً اضافه شد)،
         بعد از چند ثانیه همه را نشان می‌دهیم تا هیچ‌وقت محتوا گم نشود. */
      setTimeout(function(){
        document.querySelectorAll('.reveal:not(.is-in)').forEach(function(el){
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) show(el);
        });
      }, 1200);
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }catch(e){
    document.documentElement.classList.remove('js-reveal');
  }
})();
`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
