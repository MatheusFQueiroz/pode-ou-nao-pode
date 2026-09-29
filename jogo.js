(function(){
'use strict';
var TINTA='#2B2A4A';

/* ======================================================================
   Ícones (icones.js): IconPark com as cores do jogo
   ====================================================================== */
function clareia(hex,t){
  var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;
  r=Math.round(r+(255-r)*t); g=Math.round(g+(255-g)*t); b=Math.round(b+(255-b)*t);
  return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1);
}
function icone(nome,cor,cor2){
  var corpo=ICONES[nome].replace(/"#000"/g,'"'+TINTA+'"').replace(/#2F88FF/gi,cor||'#1B998B').replace(/#43CCF8/gi,cor2||clareia(cor||'#1B998B',.55));
  return '<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">'+corpo+'</svg>';
}
function silhueta(nome){
  return '<svg class="ic" viewBox="0 0 48 48" aria-hidden="true">'+ICONES[nome].replace(/stroke="#[0-9a-fA-F]{3,6}"/g,'stroke="#D8D2C4"').replace(/fill="#[0-9a-fA-F]{3,6}"/g,'fill="#EEE9DD"')+'</svg>';
}
var CHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var MAO='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V11m0-6.5a1.5 1.5 0 0 1 3 0V11m0-5a1.5 1.5 0 0 1 3 0v6m0-3.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-5.1-2.8L3.6 14a1.6 1.6 0 0 1 2.6-1.8L7 13.5V11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var JOINHA='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11v9H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3Zm0 0 4-8a2.5 2.5 0 0 1 2.5 2.5V9h5a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 17.3 20H7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var CORES={verde:'#1B998B',coral:'#F26B5B',sol:'#F9C74F',ceu:'#5FA8D3',uva:'#9B5DE5',rosa:'#F28CB1',terra:'#C98B5F',menta:'#7BD389'};

/* ======================================================================
   Situações
   Modo "julga": ic, cor, p (situação), ok (1 pode · 0 não pode), x (explicação)
   Modo "ache": p (pergunta), op = [[ic, cor, frase, pode?]...], a criança acha a que NÃO pode
   f = carimbo [ícone, cor, nome]
   ====================================================================== */
var MUNDOS=[
 {nome:'Na hora do lanche',ic:['sandwich',CORES.sol],cor:'#FFE9C7',txt:'Comida, bebida e aparelhos: como fazer para tudo continuar funcionando?',fases:[
  {ic:'candy',cor:CORES.rosa,p:'Comer chocolate em cima do teclado.',ok:0,x:'Migalhas e melado entram nas teclas e elas param de funcionar.',f:['candy',CORES.rosa,'Chocolate']},
  {ic:'handwashing',cor:CORES.ceu,p:'Lavar as mãos antes de usar o tablet.',ok:1,x:'Mão limpa deixa a tela limpa e o aparelho dura mais.',f:['handwashing',CORES.ceu,'Mãos limpas']},
  {ic:'drink',cor:CORES.coral,p:'Deixar o copo de suco do lado do computador.',ok:0,x:'Um esbarrão e o suco cai dentro do aparelho.',f:['drink',CORES.coral,'Copo de suco']},
  {ic:'sandwich',cor:CORES.sol,p:'Lanchar na mesa da cozinha, longe do computador.',ok:1,x:'Assim a comida fica na cozinha e o computador fica limpo.',f:['sandwich',CORES.sol,'Lanche']},
  {ic:'towel',cor:CORES.menta,p:'Limpar a tela com um pano seco e macio.',ok:1,x:'O pano macio tira a poeira sem arranhar. Nada de água na tela!',f:['towel',CORES.menta,'Paninho']},
  {ic:'water',cor:CORES.ceu,p:'Jogar água na tela para limpar as manchas.',ok:0,x:'A água entra pelas frestas e estraga o aparelho por dentro.',f:['water',CORES.ceu,'Gotinha']}]},
 {nome:'Água, sol e calor',ic:['sun-one',CORES.sol],cor:'#FFF1B8',txt:'Os aparelhos não gostam de água nem de calor demais.',fases:[
  {ic:'sun-one',cor:CORES.sol,p:'Deixar o celular no sol forte.',ok:0,x:'O aparelho esquenta demais e a bateria estraga.',f:['sun-one',CORES.sol,'Sol']},
  {ic:'water',cor:CORES.ceu,p:'Usar o celular com a mão molhada.',ok:0,x:'Água e aparelho não combinam. Seque bem as mãos antes.',f:['water',CORES.ceu,'Mão molhada']},
  {ic:'single-bed',cor:CORES.uva,p:'Deixar o tablet carregando embaixo do cobertor.',ok:0,x:'Ele esquenta muito lá embaixo, e isso é perigoso.',f:['single-bed',CORES.uva,'Cobertor']},
  {ic:'people',cor:CORES.verde,p:'Chamar um adulto quando o aparelho esquentar muito.',ok:1,x:'Aparelho muito quente é sinal de problema. Um adulto sabe o que fazer.',f:['people',CORES.verde,'Adulto por perto']},
  {ic:'shower-head',cor:CORES.ceu,p:'Levar o celular para o banho.',ok:0,x:'O vapor e a água do chuveiro entram no aparelho.',f:['shower-head',CORES.ceu,'Chuveiro']},
  {ic:'umbrella',cor:CORES.uva,p:'Guardar o tablet dentro da mochila quando começa a chover.',ok:1,x:'Dentro da mochila ele fica sequinho até chegar em casa.',f:['umbrella',CORES.uva,'Guarda-chuva']}]},
 {nome:'Fios e tomadas',ic:['plug',CORES.coral],cor:'#FFDCD6',txt:'Energia é coisa séria. Cuidado com os fios e com a tomada.',fases:[
  {ic:'plug',cor:CORES.coral,p:'Tirar da tomada puxando pelo fio.',ok:0,x:'O fio pode quebrar por dentro. Puxe sempre pela ponta, o plugue.',f:['plug',CORES.coral,'Plugue']},
  {ic:'plug-one',cor:CORES.verde,p:'Segurar pelo plugue para tirar da tomada.',ok:1,x:'Segurando pelo plugue, o fio não estica e dura muito mais.',f:['plug-one',CORES.verde,'Plugue certo']},
  {ic:'round-socket',cor:CORES.coral,p:'Colocar o dedo ou um objeto dentro da tomada.',ok:0,x:'Isso dá choque e machuca de verdade. Nunca!',f:['round-socket',CORES.coral,'Tomada']},
  {ic:'people',cor:CORES.verde,p:'Pedir para um adulto ligar o aparelho na tomada.',ok:1,x:'Adulto por perto deixa tudo mais seguro.',f:['people',CORES.verde,'Ajuda']},
  {ic:'hdmi-cable',cor:CORES.coral,p:'Deixar o fio esticado no meio do caminho, onde as pessoas passam.',ok:0,x:'Alguém pode tropeçar, cair e ainda derrubar o aparelho.',f:['hdmi-cable',CORES.coral,'Fio']},
  {ic:'battery-charge',cor:CORES.menta,p:'Enrolar o carregador com cuidado, sem dobrar, para guardar.',ok:1,x:'Enrolado com carinho, o fio não quebra por dentro.',f:['battery-charge',CORES.menta,'Carregador']}]},
 {nome:'Cuidado ao usar',ic:['laptop',CORES.ceu],cor:'#D9EEF9',txt:'Jeitos de pegar, tocar e desligar os aparelhos.',fases:[
  {ic:'laptop',cor:CORES.ceu,p:'Carregar o notebook fechado, com as duas mãos.',ok:1,x:'Assim ele não cai e a tela fica protegida.',f:['laptop',CORES.ceu,'Notebook']},
  {ic:'click-tap',cor:CORES.verde,p:'Tocar a tela com cuidado, sem apertar forte.',ok:1,x:'A tela entende um toque leve. Apertar forte pode rachar.',f:['click-tap',CORES.verde,'Toque leve']},
  {ic:'hammer-and-anvil',cor:CORES.coral,p:'Bater no computador quando ele trava.',ok:0,x:'Bater não conserta e ainda pode quebrar. Espere ou chame um adulto.',f:['hammer-and-anvil',CORES.coral,'Martelo']},
  {ic:'power',cor:CORES.verde,p:'Desligar o computador direitinho no final.',ok:1,x:'Desligar pelo botão certo evita perder o trabalho e estragar o sistema.',f:['power',CORES.verde,'Botão de desligar']},
  {ic:'right-run',cor:CORES.coral,p:'Correr pela sala com o tablet na mão.',ok:0,x:'Correndo, é fácil tropeçar e o tablet voar longe.',f:['right-run',CORES.coral,'Correndo']},
  {ic:'ipad',cor:CORES.uva,p:'Deixar o tablet no chão, no meio da sala.',ok:0,x:'No chão alguém pisa, chuta ou derruba coisas em cima.',f:['ipad',CORES.uva,'Tablet']}]},
 {nome:'Na escola',ic:['school',CORES.verde],cor:'#D6F3E8',txt:'Os aparelhos da escola são de todo mundo.',fases:[
  {ic:'time',cor:CORES.verde,p:'Esperar a minha vez de usar o computador.',ok:1,x:'Cada um tem a sua vez. Esperar faz parte de dividir.',f:['time',CORES.verde,'Minha vez']},
  {ic:'people-speak',cor:CORES.coral,p:'Gritar com o colega que está usando o tablet.',ok:0,x:'Gritar assusta e não ajuda. Dá para pedir com calma.',f:['people-speak',CORES.coral,'Voz alta']},
  {ic:'mouse',cor:CORES.ceu,p:'Deixar o mouse e o teclado no lugar quando terminar.',ok:1,x:'O próximo colega encontra tudo pronto para usar.',f:['mouse',CORES.ceu,'Mouse']},
  {ic:'battery-charge',cor:CORES.coral,p:'Esconder o carregador do colega de brincadeira.',ok:0,x:'O colega fica sem poder usar o aparelho. Não é uma brincadeira legal.',f:['battery-charge',CORES.coral,'Carregador']},
  {ic:'school',cor:CORES.verde,p:'Avisar a professora se algo quebrou ou parou de funcionar.',ok:1,x:'Avisar não é dedurar: é cuidar do que é de todos.',f:['school',CORES.verde,'Avisar']},
  {ic:'pencil',cor:CORES.coral,p:'Riscar a mesa do computador com a caneta.',ok:0,x:'A mesa é de todo mundo. Riscar estraga para os outros.',f:['pencil',CORES.coral,'Caneta']}]},
 {nome:'Olhos e corpo',ic:['eyes',CORES.uva],cor:'#E9DCF9',txt:'Cuidar dos aparelhos é bom. Cuidar de você é melhor ainda!',fases:[
  {ic:'chair',cor:CORES.verde,p:'Sentar com as costas retas e a tela na altura dos olhos.',ok:1,x:'O corpo fica confortável e o pescoço não dói.',f:['chair',CORES.verde,'Cadeira']},
  {ic:'moon',cor:CORES.uva,p:'Usar o celular no escuro total por muito tempo.',ok:0,x:'No escuro a tela força muito os olhos. Acenda uma luz.',f:['moon',CORES.uva,'Luz apagada']},
  {ic:'eyes',cor:CORES.ceu,p:'Fazer pausas para piscar e olhar longe pela janela.',ok:1,x:'Os olhos descansam quando olham para longe. Pisque bastante!',f:['eyes',CORES.ceu,'Olhinhos']},
  {ic:'glasses',cor:CORES.coral,p:'Ficar com a tela colada no rosto.',ok:0,x:'Perto demais cansa os olhos. Afaste um pouco a tela.',f:['glasses',CORES.coral,'Perto demais']},
  {ic:'headset',cor:CORES.coral,p:'Ouvir música no fone com o som no máximo.',ok:0,x:'Som muito alto machuca o ouvido, e o ouvido não tem conserto.',f:['headset',CORES.coral,'Fone']},
  {ic:'alarm-clock',cor:CORES.sol,p:'Combinar com um adulto quanto tempo vai usar a tela.',ok:1,x:'Com hora combinada sobra tempo para brincar, correr e dormir bem.',f:['alarm-clock',CORES.sol,'Hora combinada']}]},
 {nome:'Detetive dos cuidados',ic:['search',CORES.rosa],cor:'#FFE0EE',txt:'Ao contrário: três estão certas. Encontre a que NÃO pode.',fases:[
  {t:'ache',p:'Qual destas NÃO pode?',op:[['handwashing',CORES.ceu,'Lavar as mãos antes',1],['towel',CORES.menta,'Limpar com pano seco',1],['drink',CORES.coral,'Suco do lado do computador',0],['sandwich',CORES.sol,'Lanchar na cozinha',1]],x:'O suco do lado do computador é o perigo. As outras três cuidam do aparelho.',f:['search',CORES.rosa,'Lupa']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['plug-one',CORES.verde,'Segurar pelo plugue',1],['plug',CORES.coral,'Puxar pelo fio',0],['people',CORES.verde,'Pedir ajuda ao adulto',1],['battery-charge',CORES.menta,'Enrolar o carregador',1]],x:'Puxar pelo fio quebra o fio por dentro. As outras três são jeitos certos.',f:['plug-one',CORES.verde,'Detetive dos fios']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['umbrella',CORES.uva,'Guardar da chuva',1],['sun-one',CORES.sol,'Deixar no sol forte',0],['people',CORES.verde,'Chamar adulto se esquentar',1],['laptop',CORES.ceu,'Carregar com as duas mãos',1]],x:'Sol forte esquenta o aparelho e estraga a bateria.',f:['sun-one',CORES.sol,'Detetive do sol']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['click-tap',CORES.verde,'Toque leve na tela',1],['power',CORES.verde,'Desligar direitinho',1],['mouse',CORES.ceu,'Deixar tudo no lugar',1],['hammer-and-anvil',CORES.coral,'Bater quando trava',0]],x:'Bater não conserta nada. Quando travar, espere ou chame um adulto.',f:['power',CORES.verde,'Detetive do botão']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['time',CORES.verde,'Esperar a vez',1],['school',CORES.verde,'Avisar a professora',1],['people-speak',CORES.coral,'Gritar com o colega',0],['chair',CORES.verde,'Sentar direitinho',1]],x:'Gritar não ajuda ninguém. Dá para pedir com calma.',f:['school',CORES.verde,'Detetive da escola']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['eyes',CORES.ceu,'Pausa para os olhos',1],['alarm-clock',CORES.sol,'Hora combinada',1],['headset',CORES.coral,'Som no máximo',0],['umbrella',CORES.uva,'Guardar da chuva',1]],x:'Som no máximo machuca o ouvido. Baixinho é melhor.',f:['headset',CORES.uva,'Detetive do som']}]}
];
var FASES=[]; MUNDOS.forEach(function(m,mi){ m.fases.forEach(function(f,fi){ f.m=mi; f.i=fi; FASES.push(f); }); });
var ELOGIOS=['Muito bem!','Isso mesmo!','Você é um bom guardião!','Boa!','Mandou bem!'];

/* ======================================================================
   Memória e ajustes
   ====================================================================== */
var CHAVE='pode-v2';
var est={feitas:{},som:false,anim:true,livre:false};
try{ var sv=JSON.parse(localStorage.getItem(CHAVE)||'null'); if(sv) for(var k in sv) est[k]=sv[k]; }catch(e){}
try{ if(!localStorage.getItem(CHAVE)&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) est.anim=false; }catch(e){}
function salva(){ try{ localStorage.setItem(CHAVE,JSON.stringify(est)); }catch(e){} }
var $=function(i){return document.getElementById(i)};
function el(tag,cls,html){ var d=document.createElement(tag); if(cls) d.className=cls; if(html!=null) d.innerHTML=html; return d; }
function txt(tag,cls,t){ var d=el(tag,cls); d.textContent=t; return d; }
function aplicaAnim(){ document.body.classList.toggle('sem-animacao',!est.anim); }
function depois(ms,fn){ return setTimeout(fn,est.anim?ms:0); }
var ctx=null;
function tom(freqs){
  if(!est.som) return;
  try{ ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();
    freqs.forEach(function(f,i){ var o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+i*.12; o.type='sine'; o.frequency.value=f;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.08,t+.03); g.gain.exponentialRampToValueAtTime(.0001,t+.35); o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t+.4); });
  }catch(e){}
}
function fala(t){ try{ speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(t); u.lang='pt-BR'; u.rate=.9; speechSynthesis.speak(u); }catch(e){} }

/* ======================================================================
   Navegação
   ====================================================================== */
var telaAtual='mapa';
function mostra(id){
  ['mapa','jogo','album','ajustes'].forEach(function(t){ $(t).classList.toggle('oculto',t!==id); });
  var t=$(id); t.classList.remove('entra'); void t.offsetWidth; t.classList.add('entra');
  $('premio').classList.add('oculto');
  [].forEach.call(document.querySelectorAll('.confete'),function(x){ x.remove(); });
  ['Mapa','Album','Ajustes'].forEach(function(n){ $('bt'+n).classList.toggle('ativo',id===n.toLowerCase()||(id==='jogo'&&n==='Mapa')); });
  try{ speechSynthesis.cancel(); }catch(e){}
  telaAtual=id; window.scrollTo(0,0);
}
function aberta(i){ return est.livre||i===0||!!est.feitas[i-1]||!!est.feitas[i]; }
function proxima(){ for(var i=0;i<FASES.length;i++) if(!est.feitas[i]) return i; return -1; }
function mundoCompleto(m){ return MUNDOS[m].fases.every(function(f){ return est.feitas[FASES.indexOf(f)]; }); }

/* ---------- mapa ---------- */
function mapa(){
  var t=$('mapa'); t.innerHTML='';
  var p=proxima(),n=Object.keys(est.feitas).length;
  var cab=el('div','cabecalho');
  cab.appendChild(el('div','cracha','<div class="cracha-in"><span class="cracha-ic">'+icone('shield-add',CORES.verde)+'</span><b>Guardião das máquinas</b><small>'+n+' de '+FASES.length+' carimbos</small></div>'));
  var tx=el('div','cab-txt');
  tx.appendChild(txt('h1',null,n===0?'Você consegue cuidar bem dos aparelhos?':p<0?'Carteirinha completa!':'Bem-vindo de volta, guardião!'));
  tx.appendChild(txt('p',null,n===0?'Em cada situação, decida: pode ou não pode? Depois descubra o porquê. Cada resposta vira um carimbo na sua carteirinha.'
    :p<0?'Você já sabe cuidar de todos os aparelhos. Pode jogar de novo qualquer tema.':'O cartão amarelo mostra onde você parou.'));
  cab.appendChild(tx); t.appendChild(cab);
  var grade=el('div','temas');
  MUNDOS.forEach(function(m,mi){
    var c=el('section','tema'); c.style.setProperty('--cor',m.cor); c.style.animationDelay=(mi*.06)+'s';
    var topo=el('div','tema-topo'); topo.appendChild(el('div','tema-ic',icone(m.ic[0],m.ic[1])));
    var tt=el('div'); tt.appendChild(txt('h2',null,m.nome)); tt.appendChild(txt('p',null,m.txt)); topo.appendChild(tt);
    if(mundoCompleto(mi)) topo.appendChild(el('span','selo-ok',CHECK+'<span>Completo</span>'));
    c.appendChild(topo);
    var fila=el('div','cartoes');
    m.fases.forEach(function(f,fi){
      var gi=FASES.indexOf(f),b=el('button','cartinha');
      if(est.feitas[gi]){ b.classList.add('feita'); b.innerHTML=icone(f.f[0],f.f[1]); b.setAttribute('aria-label','Situação '+(fi+1)+', feita: '+f.f[2]); }
      else if(aberta(gi)){ b.classList.add(gi===p?'atual':'aberta'); b.textContent=fi+1; b.setAttribute('aria-label','Situação '+(fi+1)); }
      else { b.classList.add('fechada'); b.innerHTML=silhueta('lock'); b.setAttribute('aria-label','Situação '+(fi+1)+', ainda fechada'); }
      b.onclick=function(){ if(aberta(gi)) joga(gi); };
      fila.appendChild(b);
    });
    c.appendChild(fila); grade.appendChild(c);
  });
  t.appendChild(grade); mostra('mapa');
}

/* ======================================================================
   Jogo
   ====================================================================== */
var atual=0,L=null,trava=false,erros=0;
function joga(i){
  atual=i; L=FASES[i]; trava=false; erros=0;
  var m=MUNDOS[L.m];
  $('jogo').style.setProperty('--cor',m.cor);
  $('chipTema').innerHTML=icone(m.ic[0],m.ic[1]); $('chipTema').appendChild(txt('span',null,m.nome));
  var ps=$('passos'); ps.innerHTML='';
  m.fases.forEach(function(f,fi){ var d=el('i'); if(est.feitas[FASES.indexOf(f)]) d.className='f'; if(fi===L.i) d.className='a'; ps.appendChild(d); });
  $('aviso').innerHTML='';
  var palco=$('palco'); palco.innerHTML='';
  if(L.t==='ache'){
    palco.appendChild(el('div','pergunta','<b>'+L.p+'</b><span>Três cuidam bem do aparelho. Toque na única que estraga ou machuca.</span>'));
    var gr=el('div','opcoes');
    L.op.map(function(o,j){ return j; }).sort(function(){ return Math.random()-.5; }).forEach(function(j,idx){
      var o=L.op[j],b=el('button','opcao',icone(o[0],o[1])); b.appendChild(txt('span','t',o[2])); b.style.animationDelay=(idx*.07)+'s'; b._pode=o[3];
      b.onclick=function(){ escolheAche(b); }; gr.appendChild(b);
    });
    palco.appendChild(gr);
  } else {
    var carta=el('div','carta'); carta.id='carta';
    carta.innerHTML='<div class="carta-frente"><div class="carta-fig" style="--c:'+L.cor+'">'+icone(L.ic,L.cor)+'</div><p class="carta-txt">'+L.p+'</p><span class="carta-perg">Pode ou não pode?</span></div>'+
      '<div class="carta-verso"><div class="carimbo"></div><p class="carta-x"></p></div>';
    palco.appendChild(carta);
    var bts=el('div','botoes');
    var bp=el('button','bt-pode',JOINHA+'<span>Pode</span>'); bp.onclick=function(){ responde(1,bp); };
    var bn=el('button','bt-nao',MAO+'<span>Não pode</span>'); bn.onclick=function(){ responde(0,bn); };
    bts.appendChild(bp); bts.appendChild(bn); palco.appendChild(bts);
  }
  mostra('jogo');
}
function avisa(t,tipo){ var a=$('aviso'); a.innerHTML=''; a.appendChild(el('div','aviso-caixa'+(tipo?' '+tipo:''),'<span>'+t+'</span>')); }
function responde(v,b){
  if(trava) return;
  if(v===L.ok){
    trava=true; tom([523,659]);
    var carta=$('carta'); carta.querySelector('.carimbo').className='carimbo '+(L.ok?'pode':'nao'); carta.querySelector('.carimbo').innerHTML=(L.ok?JOINHA+'<b>Pode!</b>':MAO+'<b>Não pode</b>');
    carta.querySelector('.carta-x').textContent=L.x; carta.classList.add('virada'); b.classList.add('escolhido');
    depois(1400,conclui);
  } else {
    erros++; tom([330]); b.classList.add('treme'); setTimeout(function(){ b.classList.remove('treme'); },500);
    avisa(erros===1?'Pense de novo: isso <b>cuida</b> do aparelho ou <b>estraga</b>?':'Dica: imagine o que acontece com o aparelho depois. Ele fica bem?');
  }
}
function escolheAche(b){
  if(trava||b.classList.contains('fora')||b.classList.contains('certa')) return;
  if(!b._pode){ trava=true; tom([523,659]); b.classList.add('certa'); b.appendChild(el('span','ok-op',CHECK)); depois(900,conclui); }
  else { erros++; tom([330]); b.classList.add('fora'); b.appendChild(el('span','ok-op verde',JOINHA)); avisa('Essa <b>pode</b>, ela cuida bem do aparelho. Procure a que não pode.'); }
}

/* ---------- conclusão ---------- */
function conclui(){
  var novo=!est.feitas[atual]; est.feitas[atual]=1; salva(); tom([523,659,784]);
  var ult=atual===FASES.length-1,m=MUNDOS[L.m],fimMundo=L.i===m.fases.length-1;
  var p=$('premio'); p.innerHTML='';
  var c=el('div','cartao'); c.style.setProperty('--cor',m.cor);
  c.appendChild(txt('h2',null,ELOGIOS[Math.floor(Math.random()*ELOGIOS.length)])); c.lastChild.id='premioTit';
  c.appendChild(el('div','explica','<span class="marca-'+(L.t==='ache'||!L.ok?'nao':'pode')+'">'+(L.t==='ache'?'Não pode':L.ok?'Pode':'Não pode')+'</span>'+L.x));
  c.appendChild(el('div','carimbo-grande','<div class="cg-in" style="--cor-selo:'+L.f[1]+'">'+icone(L.f[0],L.f[1])+'</div>'));
  c.appendChild(el('div','nome-fig',(novo?'Carimbo novo: ':'Você já tem: ')+'<b></b>')); c.lastChild.lastChild.textContent=L.f[2];
  if(fimMundo&&!ult) c.appendChild(txt('p','sub','Você completou o tema "'+m.nome+'"!'));
  if(ult) c.appendChild(txt('p','sub','Carteirinha completa! Você sabe cuidar dos aparelhos e de você.'));
  var lb=el('div','linha-bts');
  var bp=el('button','bt-principal',ult?'Ver minha carteirinha':'Continuar'); bp.onclick=ult?album:function(){ joga(atual+1); }; lb.appendChild(bp);
  var bo=el('button','bt-leve',icone('volume-up',CORES.ceu)+'Ouvir'); bo.onclick=function(){ fala(L.p+'. '+(L.t==='ache'?'':(L.ok?'Pode. ':'Não pode. '))+L.x); }; lb.appendChild(bo);
  var bm=el('button','bt-leve',icone('map-draw',CORES.menta)+'Temas'); bm.onclick=mapa; lb.appendChild(bm);
  c.appendChild(lb); p.appendChild(c); p.classList.remove('oculto'); confete();
  setTimeout(function(){ bp.focus(); },60);
}
function confete(){
  if(!est.anim) return; var cores=[CORES.verde,CORES.coral,CORES.sol,CORES.ceu,CORES.uva];
  for(var i=0;i<26;i++){ var c=el('div','confete'); c.style.left=(Math.random()*100)+'vw'; c.style.background=cores[i%5]; c.style.borderRadius=i%3===0?'50%':'3px';
    c.style.setProperty('--dx',(Math.random()*160-80)+'px'); c.style.setProperty('--giro',(Math.random()*720-360)+'deg'); c.style.setProperty('--dur',(2.4+Math.random()*1.4)+'s'); c.style.setProperty('--atraso',(Math.random()*.5)+'s');
    document.body.appendChild(c); setTimeout(c.remove.bind(c),4600); }
}

/* ---------- carteirinha (álbum) ---------- */
function album(){
  var t=$('album'); t.innerHTML='';
  var n=Object.keys(est.feitas).length;
  t.appendChild(el('h2','titulo-tela',icone('shield-add',CORES.verde)+'<span>Minha carteirinha de guardião</span>'));
  t.appendChild(txt('p','texto-tela','Cada situação resolvida vira um carimbo. '+n+' de '+FASES.length+' carimbos. Não tem pressa: cada um completa no seu tempo.'));
  MUNDOS.forEach(function(m,mi){
    var g=el('section','album-grupo'); g.style.setProperty('--cor',m.cor); g.style.animationDelay=(mi*.05)+'s';
    var h=el('h3',null,icone(m.ic[0],m.ic[1])); h.appendChild(txt('span',null,m.nome)); g.appendChild(h);
    var gr=el('div','album-grade');
    m.fases.forEach(function(f,fi){
      var tem=!!est.feitas[FASES.indexOf(f)];
      var s=el('div','selo '+(tem?'tem':'falta'),'<div class="s-in" style="--cor-selo:'+f.f[1]+'">'+(tem?icone(f.f[0],f.f[1]):silhueta(f.f[0]))+'</div>');
      s.appendChild(txt('span',null,tem?f.f[2]:'Situação '+(fi+1))); gr.appendChild(s);
    });
    g.appendChild(gr); t.appendChild(g);
  });
  mostra('album');
}

/* ---------- ajustes ---------- */
function ajustes(){
  var t=$('ajustes'); t.innerHTML='';
  t.appendChild(el('h2','titulo-tela',icone('setting-two',CORES.ceu)+'<span>Ajustes</span>'));
  t.appendChild(txt('p','texto-tela','Os ajustes ficam guardados neste aparelho.'));
  var box=el('div','ajustes');
  function chave(ic,cor,nome,desc,prop,fn){
    var b=el('button','ajuste',icone(ic,cor)); b.setAttribute('role','switch'); b.setAttribute('aria-checked',est[prop]?'true':'false');
    var tx=txt('div','txt',nome); tx.appendChild(txt('small',null,desc)); b.appendChild(tx); b.appendChild(el('div','chave'));
    b.onclick=function(){ est[prop]=!est[prop]; salva(); b.setAttribute('aria-checked',est[prop]?'true':'false'); if(fn) fn(); };
    box.appendChild(b);
  }
  chave('bell-ring',CORES.sol,'Sons','Sons baixinhos ao responder.','som');
  chave('magic',CORES.uva,'Animações','A carta vira, o carimbo bate. Desligue se incomodar.','anim',aplicaAnim);
  chave('unlock',CORES.verde,'Todas as situações abertas','Para o professor escolher qualquer tema.','livre');
  var r=el('button','ajuste perigo',icone('refresh',CORES.coral)); var rt=txt('div','txt','Recomeçar do zero'); rt.appendChild(txt('small',null,'Apaga os carimbos deste aparelho.')); r.appendChild(rt);
  r.onclick=function(){ if(confirm('Apagar todos os carimbos deste aparelho?')){ est.feitas={}; salva(); mapa(); } };
  box.appendChild(r); t.appendChild(box); mostra('ajustes');
}

/* ---------- início ---------- */
aplicaAnim();
$('btInicio').insertAdjacentHTML('afterbegin',icone('shield-add',CORES.verde));
$('btMapa').insertAdjacentHTML('afterbegin',icone('map-draw',CORES.menta));
$('btAlbum').insertAdjacentHTML('afterbegin',icone('stickers',CORES.sol));
$('btAjustes').insertAdjacentHTML('afterbegin',icone('setting-two',CORES.ceu));
$('btVoltar').insertAdjacentHTML('afterbegin',icone('arrow-left','#fff'));
$('btOuvir').innerHTML=icone('volume-up',CORES.ceu);
$('btInicio').onclick=mapa; $('btMapa').onclick=mapa; $('btVoltar').onclick=mapa; $('btAlbum').onclick=album; $('btAjustes').onclick=ajustes;
$('btOuvir').onclick=function(){ if(!L) return; fala(L.t==='ache'?L.p+'. '+L.op.map(function(o){ return o[2]; }).join('. '):L.p+'. Pode ou não pode?'); };
document.addEventListener('keydown',function(ev){ if(ev.key==='Escape'&&!$('premio').classList.contains('oculto')) mapa(); });
mapa();
})();
