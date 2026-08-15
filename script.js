const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));const glow=document.getElementById('glow');window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});document.querySelectorAll('.card,.feature').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',e.clientX-r.left+'px');el.style.setProperty('--my',e.clientY-r.top+'px')})});

// A fixed, non-layout background trace. It reveals with page progress and drifts
// slightly in the opposite direction to the content to create depth.
const scrollTrace = document.getElementById('scrollTraceProgress');
const traceParallax = document.getElementById('traceParallax');

if (scrollTrace) {
  const traceLength = scrollTrace.getTotalLength();
  scrollTrace.style.strokeDasharray = `${traceLength}`;
  scrollTrace.style.strokeDashoffset = `${traceLength}`;

  let ticking = false;
  const updateScrollTrace = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));

    // Reveal the line as the visitor travels down the page.
    scrollTrace.style.strokeDashoffset = `${traceLength * (1 - progress)}`;

    // Very small parallax motion: enough to feel layered, never enough to distract.
    if (traceParallax) {
      const driftY = (progress - 0.5) * -90;
      const driftX = Math.sin(progress * Math.PI * 2) * 18;
      traceParallax.style.transform = `translate(${driftX}px, ${driftY}px)`;
    }
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateScrollTrace);
    }
  };

  updateScrollTrace();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
}
