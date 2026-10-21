/* v19 lux */
(()=>{
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* bolhas estilo Vita: ícone + legenda (os botões continuam os mesmos) */
document.querySelectorAll('.menu-item').forEach((b,i)=>{const t=b.textContent.trim(),l=t.slice(1).trim().toLowerCase();
b.innerHTML='<i class="bi">'+t.slice(0,1)+'</i><span>'+l+'</span>';b.setAttribute('aria-label',l);b.style.setProperty('--d',(-i*.8)+'s')});
/* games: lê games.json (gerado pelo GitHub Action da Steam); sem ele mostra exemplo */
const DEMO={demo:true,games:[[730,'Counter-Strike 2',820],[1091500,'Cyberpunk 2077',140],[271590,'Grand Theft Auto V',210],[252490,'Rust',96],[413150,'Stardew Valley',64],[105600,'Terraria',58],[440,'Team Fortress 2',120],[570,'Dota 2',75]].map(a=>({appid:a[0],name:a[1],hours:a[2]}))};
const IMG=id=>'https://cdn.cloudflare.steamstatic.com/steam/apps/'+id+'/';
/* ✦ JOGO DA SEMANA: troque aqui toda semana (ou ponha "week":{...} no games.json) */
const SEMANA={appid:1091500,name:'Cyberpunk 2077',nota:'o vício da vez'};
const fmt=n=>n>=1000?(n/1000).toFixed(1).replace('.0','')+'k':String(n);
function render(d){
 const all=d.games||[],wk=Object.assign({},SEMANA,d.week||{}),wg=all.find(x=>x.appid==wk.appid),
  top=all[0],rest=all.filter(x=>x!==top&&x.appid!=wk.appid).slice(0,12),mx=Math.max(1,...all.map(x=>x.hours)),
  grid=$('#gmGrid'),now=$('#gmNow'),tot=all.reduce((s,x)=>s+x.hours,0);
 $('#gmCount').textContent=(d.total||all.length)+' games';
 let h='<a class="gw" href="https://store.steampowered.com/app/'+wk.appid+'" target="_blank" rel="noopener"><i class="gw-bg" style="--bg:url('+IMG(wk.appid)+'header.jpg)"></i><img class="gw-c" alt="" src="'+IMG(wk.appid)+'library_600x900.jpg" onerror="this.src=\''+IMG(wk.appid)+'header.jpg\'"><span class="gw-i"><span class="gw-b">★ JOGO DA SEMANA</span><span class="gw-n">'+esc(wk.name)+'</span>'+(wg?'<span class="gw-h"><em>'+wg.hours+'</em><small>HRS JOGADAS</small></span>':'')+'<span class="gw-l">'+esc(wk.nota||'')+'</span></span></a>';
 if(top)h+='<a class="gm-hero" href="https://store.steampowered.com/app/'+top.appid+'" target="_blank" rel="noopener"><img alt="" loading="lazy" src="'+IMG(top.appid)+'header.jpg"><div><small>MAIS JOGADO</small><b>'+esc(top.name)+'</b><em>'+top.hours+'h</em></div></a>';
 h+='<div class="stats"><div class="st"><b>'+(d.total||all.length)+'</b>games</div><div class="st"><b>'+fmt(tot)+'h</b>jogadas</div><div class="st"><b>'+(top?top.hours+'h':'-')+'</b>no top 1</div></div>';
 $('#gmHead')||grid.insertAdjacentHTML('beforebegin','<div id="gmHead"></div>');
 $('#gmHead').innerHTML=h;
 grid.innerHTML=rest.map((x,i)=>'<a class="gm" style="--n:'+i+'" href="https://store.steampowered.com/app/'+x.appid+'" target="_blank" rel="noopener"><img loading="lazy" alt="" src="'+IMG(x.appid)+'library_600x900.jpg"><span class="gi"><b>'+esc(x.name)+'</b>'+x.hours+'h<span class="bar" style="--w:'+Math.max(6,x.hours/mx*100)+'%"><i></i></span></span></a>').join('');
 grid.addEventListener('error',e=>{const im=e.target;if(im.src.includes('library_600x900')&&im.closest('.gm'))im.src=IMG(im.closest('.gm').href.split('/app/')[1])+'header.jpg';else if(im.closest('.gm'))im.style.display='none'},true);
 const r=(d.recent||[])[0];
 if(d.now){now.innerHTML='<i></i>playing now · <b>'+esc(d.now)+'</b>';now.classList.add('on')}
 else if(r){now.innerHTML='<i style="background:#bbb;box-shadow:none;animation:none"></i>last played · <b>'+esc(r.name)+'</b><em>'+r.hours2w+'h / 2 weeks</em>';now.classList.add('on')}
 if(d.demo)grid.insertAdjacentHTML('afterend','<p class="gm-note">✧ exemplo · conecte sua Steam (veja README) ✧</p>');
}
fetch('games.json?'+Date.now()).then(r=>r.ok?r.json():Promise.reject()).catch(()=>DEMO).then(render);
/* contador de visitas (counterapi.dev v1, público); se falhar, conta só neste navegador */
const vb=$('#vis b'),pad=n=>String(n).padStart(6,'0');
function roll(n){const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);vb.textContent=pad(Math.round(n*e));if(k<1)requestAnimationFrame(f)})(t0)}
let seen=0;try{seen=sessionStorage.getItem('lxv')}catch(e){}
const base='https://api.counterapi.dev/v1/tutulindojogos-site/visits';
fetch(base+(seen?'':'/up')).then(r=>r.json()).then(j=>{const n=j.count??j.value??(j.data&&j.data.up_count);if(n==null)throw 0;try{sessionStorage.setItem('lxv','1')}catch(e){}roll(n)})
.catch(()=>{let n=1;try{n=(+localStorage.getItem('lxn')||0)+(seen?0:1);localStorage.setItem('lxn',n)}catch(e){}roll(n)});
})();
/* ícones das bolhas (SVG) */
(()=>{const P={profile:'<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-4 3.6-6 7-6s6.2 2 7 6"/>',social:'<circle cx="12" cy="12" r="3.4"/><path d="M15.4 12v1.3a2.4 2.4 0 0 0 4.8 0V12a8.2 8.2 0 1 0-3.2 6.5"/>',games:'<rect x="2.5" y="7" width="19" height="10.5" rx="5"/><path d="M8 10.2v4.2M5.9 12.3h4.2"/><circle cx="15.5" cy="11.4" r=".9"/><circle cx="18" cy="13.4" r=".9"/>',about:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5.2M12 7.8v.1"/>',music:'<path d="M9 17.5V5.5l10-2v12"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/>',clips:'<rect x="3" y="5" width="18" height="14" rx="3.5"/><path d="M10.2 9.4v5.2l4.4-2.6z"/>',setup:'<rect x="2.5" y="8.5" width="19" height="9" rx="2.5"/><path d="M6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01M8 15h8"/><path d="M5 8.5V6.5"/>',trophies:'<path d="M7.5 4h9v5a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 6H4.5c0 3 1.2 4.4 3.3 4.7M16.5 6h3c0 3-1.2 4.4-3.3 4.7M12 13.5V17M8.5 20h7M9.5 17h5"/>'};
document.querySelectorAll('.menu-item').forEach(b=>{const i=b.querySelector('.bi');if(i&&P[b.dataset.panel])i.innerHTML='<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+P[b.dataset.panel]+'</svg>'})})();

/* tema (bolinhas no about) */
(()=>{const b=document.body,t=$('#thm');if(!t)return;let v='';try{v=localStorage.getItem('tutu.th')||''}catch(e){}
function set(x){x?b.dataset.th=x:b.removeAttribute('data-th');t.querySelectorAll('i').forEach(i=>i.classList.toggle('on',i.dataset.th===x));try{localStorage.setItem('tutu.th',x)}catch(e){}}
t.addEventListener('click',e=>{const i=e.target.closest('i');if(i)set(i.dataset.th)});set(v)})();
/* ✧ mini-jogo escondido: a estrelinha piscando no card do perfil. 20s pegando estrelas */
(()=>{const st=$('#secStar'),sg=$('#sg'),f=$('#sgF'),sS=$('#sgS'),sT=$('#sgT'),e=$('#sgE');if(!st||!sg)return;
let sc=0,tl=0,tm=0,sp=0,on=0,best=0;try{best=+localStorage.getItem('tutu.sg')||0}catch(_){}
const stop=()=>{on=0;clearInterval(tm);clearTimeout(sp)};
function spawn(){if(!on)return;const i=document.createElement('i'),s=26+Math.random()*22,h=f.clientHeight+90,d=2.4+Math.random()*1.4;
i.textContent=Math.random()<.5?'✦':'✧';i.style.cssText='left:'+(4+Math.random()*84)+'%;--s:'+s+'px;--h:'+h+'px;animation-duration:'+d+'s';
i.addEventListener('pointerdown',ev=>{ev.preventDefault();if(!on||i.classList.contains('pop'))return;sc++;sS.textContent=sc;i.style.setProperty('--y',(i.getBoundingClientRect().top-f.getBoundingClientRect().top+90)+'px');i.classList.add('pop');setTimeout(()=>i.remove(),260)});
i.addEventListener('animationend',ev=>{if(ev.animationName==='sgF')i.remove()});f.appendChild(i);
sp=setTimeout(spawn,Math.max(260,620-sc*9))}
function end(){stop();f.innerHTML='';const nb=sc>best;if(nb){best=sc;try{localStorage.setItem('tutu.sg',best)}catch(_){}}
$('#sgB').textContent=sc;$('#sgM').textContent=(nb&&sc?'novo recorde ✦ ':'')+'recorde: '+best;e.hidden=false;if(sc>=5&&window.tutuUnlock)window.tutuUnlock('star')}
function start(){stop();sc=0;tl=20;sS.textContent=0;sT.textContent=tl;f.innerHTML='';e.hidden=true;on=1;spawn();
tm=setInterval(()=>{sT.textContent=--tl;if(tl<=0)end()},1000)}
st.addEventListener('click',ev=>{ev.stopPropagation();sg.hidden=false;start()});
$('#sgX').addEventListener('click',()=>{stop();sg.hidden=true;f.innerHTML=''});
$('#sgR').addEventListener('click',start);
document.addEventListener('keydown',ev=>{if(!sg.hidden&&ev.key==='Escape'){stop();sg.hidden=true}},true)})();
