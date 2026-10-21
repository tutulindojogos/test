/* v13 lux */
(()=>{
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* bolhas estilo Vita: ícone + legenda (os botões continuam os mesmos) */
document.querySelectorAll('.menu-item').forEach((b,i)=>{const t=b.textContent.trim(),l=t.slice(1).trim().toLowerCase();
b.innerHTML='<i class="bi">'+t.slice(0,1)+'</i><span>'+l+'</span>';b.setAttribute('aria-label',l);b.style.setProperty('--d',(-i*.8)+'s')});
/* games: lê games.json (gerado pelo GitHub Action da Steam); sem ele mostra exemplo */
const DEMO={demo:true,games:[[730,'Counter-Strike 2',820],[1091500,'Cyberpunk 2077',140],[271590,'Grand Theft Auto V',210],[252490,'Rust',96],[413150,'Stardew Valley',64],[105600,'Terraria',58],[440,'Team Fortress 2',120],[570,'Dota 2',75]].map(a=>({appid:a[0],name:a[1],hours:a[2]}))};
const IMG=id=>'https://cdn.cloudflare.steamstatic.com/steam/apps/'+id+'/';
function render(d){
 const g=(d.games||[]).slice(0,12),mx=Math.max(1,...g.map(x=>x.hours)),grid=$('#gmGrid'),now=$('#gmNow');
 $('#gmCount').textContent=(d.total||g.length)+' games';
 grid.innerHTML=g.map((x,i)=>'<a class="gm" style="--n:'+i+'" href="https://store.steampowered.com/app/'+x.appid+'" target="_blank" rel="noopener"><img loading="lazy" alt="" src="'+IMG(x.appid)+'library_600x900.jpg"><span class="gi"><b>'+esc(x.name)+'</b>'+x.hours+'h<span class="bar" style="--w:'+Math.max(6,x.hours/mx*100)+'%"><i></i></span></span></a>').join('');
 grid.addEventListener('error',e=>{const im=e.target;if(im.src.includes('library_600x900'))im.src=IMG(im.closest('.gm').href.split('/app/')[1])+'header.jpg';else im.style.display='none'},true);
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
