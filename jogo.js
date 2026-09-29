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
  {ic:'candy',cor:CORES.rosa,p:'Comer chocolate em cima do teclado.',fx:'sujo',q:[["Porque as migalhas entram nas teclas", 1], ["Porque chocolate é doce demais", 0], ["Porque o teclado fica com fome", 0]],ok:0,x:'Migalhas e melado entram nas teclas e elas param de funcionar.',f:['candy',CORES.rosa,'Chocolate']},
  {ic:'handwashing',cor:CORES.ceu,p:'Lavar as mãos antes de usar o tablet.',q:[["Porque a tela fica limpa e dura mais", 1], ["Porque o tablet gosta de cheiro de sabonete", 0], ["Porque senão ele desliga", 0]],ok:1,x:'Mão limpa deixa a tela limpa e o aparelho dura mais.',f:['handwashing',CORES.ceu,'Mãos limpas']},
  {ic:'drink',cor:CORES.coral,p:'Deixar o copo de suco do lado do computador.',fx:'molhado',q:[["Porque um esbarrão derruba o suco dentro", 1], ["Porque o computador bebe o suco", 0], ["Porque o suco esquenta", 0]],ok:0,x:'Um esbarrão e o suco cai dentro do aparelho.',f:['drink',CORES.coral,'Copo de suco']},
  {ic:'sandwich',cor:CORES.sol,p:'Lanchar na mesa da cozinha, longe do computador.',ok:1,x:'Assim a comida fica na cozinha e o computador fica limpo.',f:['sandwich',CORES.sol,'Lanche']},
  {ic:'towel',cor:CORES.menta,p:'Limpar a tela com um pano seco e macio.',ok:1,x:'O pano macio tira a poeira sem arranhar. Nada de água na tela!',f:['towel',CORES.menta,'Paninho']},
  {ic:'water',cor:CORES.ceu,p:'Jogar água na tela para limpar as manchas.',fx:'molhado',ok:0,x:'A água entra pelas frestas e estraga o aparelho por dentro.',f:['water',CORES.ceu,'Gotinha']}]},
 {nome:'Água, sol e calor',ic:['sun-one',CORES.sol],cor:'#FFF1B8',txt:'Os aparelhos não gostam de água nem de calor demais.',fases:[
  {ic:'sun-one',cor:CORES.sol,p:'Deixar o celular no sol forte.',fx:'quente',q:[["Porque ele esquenta e a bateria estraga", 1], ["Porque o sol apaga a tela", 0], ["Porque ele fica bronzeado", 0]],ok:0,x:'O aparelho esquenta demais e a bateria estraga.',f:['sun-one',CORES.sol,'Sol']},
  {ic:'water',cor:CORES.ceu,p:'Usar o celular com a mão molhada.',fx:'molhado',q:[["Porque a água entra e estraga o aparelho", 1], ["Porque a tela só fica escorregadia", 0], ["Porque o celular fica com frio", 0]],ok:0,x:'Água e aparelho não combinam. Seque bem as mãos antes.',f:['water',CORES.ceu,'Mão molhada']},
  {ic:'single-bed',cor:CORES.uva,p:'Deixar o tablet carregando embaixo do cobertor.',fx:'quente',ok:0,x:'Ele esquenta muito lá embaixo, e isso é perigoso.',f:['single-bed',CORES.uva,'Cobertor']},
  {ic:'people',cor:CORES.verde,p:'Chamar um adulto quando o aparelho esquentar muito.',ok:1,x:'Aparelho muito quente é sinal de problema. Um adulto sabe o que fazer.',f:['people',CORES.verde,'Adulto por perto']},
  {ic:'shower-head',cor:CORES.ceu,p:'Levar o celular para o banho.',fx:'molhado',ok:0,x:'O vapor e a água do chuveiro entram no aparelho.',f:['shower-head',CORES.ceu,'Chuveiro']},
  {ic:'umbrella',cor:CORES.uva,p:'Guardar o tablet dentro da mochila quando começa a chover.',ok:1,x:'Dentro da mochila ele fica sequinho até chegar em casa.',f:['umbrella',CORES.uva,'Guarda-chuva']}]},
 {nome:'Fios e tomadas',ic:['plug',CORES.coral],cor:'#FFDCD6',txt:'Energia é coisa séria. Cuidado com os fios e com a tomada.',fases:[
  {ic:'plug',cor:CORES.coral,p:'Tirar da tomada puxando pelo fio.',fx:'choque',q:[["Porque o fio pode quebrar por dentro", 1], ["Porque o fio fica com ciúme", 0], ["Porque a tomada gosta de ficar cheia", 0]],ok:0,x:'O fio pode quebrar por dentro. Puxe sempre pela ponta, o plugue.',f:['plug',CORES.coral,'Plugue']},
  {ic:'plug-one',cor:CORES.verde,p:'Segurar pelo plugue para tirar da tomada.',ok:1,x:'Segurando pelo plugue, o fio não estica e dura muito mais.',f:['plug-one',CORES.verde,'Plugue certo']},
  {ic:'round-socket',cor:CORES.coral,p:'Colocar o dedo ou um objeto dentro da tomada.',fx:'choque',ok:0,x:'Isso dá choque e machuca de verdade. Nunca!',f:['round-socket',CORES.coral,'Tomada']},
  {ic:'people',cor:CORES.verde,p:'Pedir para um adulto ligar o aparelho na tomada.',ok:1,x:'Adulto por perto deixa tudo mais seguro.',f:['people',CORES.verde,'Ajuda']},
  {ic:'hdmi-cable',cor:CORES.coral,p:'Deixar o fio esticado no meio do caminho, onde as pessoas passam.',ok:0,x:'Alguém pode tropeçar, cair e ainda derrubar o aparelho.',f:['hdmi-cable',CORES.coral,'Fio']},
  {ic:'battery-charge',cor:CORES.menta,p:'Enrolar o carregador com cuidado, sem dobrar, para guardar.',ok:1,x:'Enrolado com carinho, o fio não quebra por dentro.',f:['battery-charge',CORES.menta,'Carregador']}]},
 {nome:'Cuidado ao usar',ic:['laptop',CORES.ceu],cor:'#D9EEF9',txt:'Jeitos de pegar, tocar e desligar os aparelhos.',fases:[
  {ic:'laptop',cor:CORES.ceu,p:'Carregar o notebook fechado, com as duas mãos.',ok:1,x:'Assim ele não cai e a tela fica protegida.',f:['laptop',CORES.ceu,'Notebook']},
  {ic:'click-tap',cor:CORES.verde,p:'Tocar a tela com cuidado, sem apertar forte.',ok:1,x:'A tela entende um toque leve. Apertar forte pode rachar.',f:['click-tap',CORES.verde,'Toque leve']},
  {ic:'hammer-and-anvil',cor:CORES.coral,p:'Bater no computador quando ele trava.',fx:'quebrado',q:[["Porque bater pode quebrar e não conserta", 1], ["Porque ele bate de volta", 0], ["Porque faz barulho", 0]],ok:0,x:'Bater não conserta e ainda pode quebrar. Espere ou chame um adulto.',f:['hammer-and-anvil',CORES.coral,'Martelo']},
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
  {ic:'headset',cor:CORES.coral,p:'Ouvir música no fone com o som no máximo.',fx:'triste',q:[["Porque som alto machuca o ouvido", 1], ["Porque o fone pode explodir", 0], ["Porque a música fica feia", 0]],ok:0,x:'Som muito alto machuca o ouvido, e o ouvido não tem conserto.',f:['headset',CORES.coral,'Fone']},
  {ic:'alarm-clock',cor:CORES.sol,p:'Combinar com um adulto quanto tempo vai usar a tela.',ok:1,x:'Com hora combinada sobra tempo para brincar, correr e dormir bem.',f:['alarm-clock',CORES.sol,'Hora combinada']}]},
 {nome:'Guardar e carregar',ic:['backpack',CORES.terra],cor:'#F3E4D2',txt:'Onde os aparelhos dormem e como ganham energia.',fases:[
  {ic:'backpack',cor:CORES.terra,p:'Guardar o tablet na capinha antes de colocar na mochila.',ok:1,x:'A capinha protege a tela dos lápis, cadernos e esbarrões.',f:['backpack',CORES.terra,'Mochila']},
  {ic:'book-one',cor:CORES.coral,p:'Colocar livros pesados em cima do notebook.',ok:0,x:'O peso pode rachar a tela e amassar o teclado.',f:['book-one',CORES.coral,'Livro pesado']},
  {ic:'battery-charge',cor:CORES.verde,p:'Usar o carregador certo, do próprio aparelho.',ok:1,x:'Cada aparelho tem o carregador feito para ele. O certo cuida da bateria.',f:['battery-charge',CORES.verde,'Carregador certo']},
  {ic:'single-bed',cor:CORES.coral,p:'Dormir com o celular carregando embaixo do travesseiro.',fx:'quente',ok:0,x:'Embaixo do travesseiro ele esquenta e não consegue respirar.',f:['single-bed',CORES.coral,'Travesseiro']},
  {ic:'ipad',cor:CORES.ceu,p:'Deixar o aparelho numa mesa firme, longe da beirada.',ok:1,x:'Longe da beirada ele não cai. Na beirada, um esbarrão derruba.',f:['ipad',CORES.ceu,'Mesa firme']},
  {ic:'dog',cor:CORES.coral,p:'Deixar o fone de ouvido no chão perto do cachorro.',ok:0,x:'O cachorro pode morder o fio e engolir pedaços. Guarde na gaveta.',f:['dog',CORES.coral,'Cachorro']}]},
 {nome:'Na internet',ic:['wifi',CORES.ceu],cor:'#D8ECF7',txt:'Cuidar de você também faz parte de cuidar dos aparelhos.',fases:[
  {ic:'lock',cor:CORES.verde,p:'Guardar a senha só com a família, sem contar para os colegas.',ok:1,x:'A senha é como a chave de casa: só quem mora com você pode ter.',f:['lock',CORES.verde,'Senha']},
  {ic:'people-unknown',cor:CORES.coral,p:'Conversar com um desconhecido que mandou mensagem no jogo.',fx:'triste',q:[["Porque não sabemos quem é de verdade", 1], ["Porque ele joga melhor", 0], ["Porque o jogo trava", 0]],ok:0,x:'Quem você não conhece de verdade não deve falar com você. Mostre para um adulto.',f:['people-unknown',CORES.coral,'Desconhecido']},
  {ic:'camera',cor:CORES.coral,p:'Mandar foto sua para alguém que você não conhece.',ok:0,x:'Foto é coisa sua e da sua família. Nunca mande para desconhecidos.',f:['camera',CORES.coral,'Foto']},
  {ic:'people',cor:CORES.verde,p:'Chamar um adulto quando aparecer algo estranho na tela.',ok:1,x:'Se apareceu algo esquisito, assustador ou pedindo dados, o adulto resolve.',f:['people',CORES.verde,'Chamar adulto']},
  {ic:'message',cor:CORES.coral,p:'Clicar em qualquer aviso que diz "você ganhou um prêmio!".',ok:0,x:'Esses avisos costumam ser mentira e podem trazer vírus. Feche e avise um adulto.',f:['message',CORES.coral,'Prêmio falso']},
  {ic:'game',cor:CORES.verde,p:'Jogar só os jogos que os pais ou a professora liberaram.',ok:1,x:'Os adultos escolhem jogos bons para a sua idade. Assim você brinca tranquilo.',f:['game',CORES.verde,'Jogo liberado']}]},
 {nome:'Dividindo com os outros',ic:['friends-circle',CORES.rosa],cor:'#FCE1E9',txt:'Aparelhos dos amigos, da família e da escola.',fases:[
  {ic:'iphone',cor:CORES.coral,p:'Pegar o celular de alguém sem pedir.',fx:'triste',q:[["Porque é da outra pessoa e ela decide", 1], ["Porque o celular fica bravo", 0], ["Porque dá azar", 0]],ok:0,x:'O celular é de outra pessoa. Sempre peça antes de mexer.',f:['iphone',CORES.coral,'Celular dos outros']},
  {ic:'people-speak',cor:CORES.verde,p:'Perguntar "posso usar?" antes de pegar o tablet do amigo.',ok:1,x:'Pedir é respeitar. E quase sempre a resposta é sim!',f:['people-speak',CORES.verde,'Posso usar?']},
  {ic:'time',cor:CORES.verde,p:'Combinar um tempo para cada um jogar e trocar na hora certa.',ok:1,x:'Com o tempo combinado, ninguém fica esperando demais.',f:['time',CORES.verde,'Troca combinada']},
  {ic:'hand-drag',cor:CORES.coral,p:'Puxar o tablet da mão do colega porque a vez é sua.',ok:0,x:'Puxar pode derrubar o aparelho e machucar o colega. Use as palavras.',f:['hand-drag',CORES.coral,'Puxão']},
  {ic:'headset',cor:CORES.verde,p:'Devolver o fone limpinho e enrolado depois de usar.',ok:1,x:'Devolver do jeito que pegou é cuidar do que é do outro.',f:['headset',CORES.verde,'Fone devolvido']},
  {ic:'camera',cor:CORES.coral,p:'Tirar foto do colega sem ele saber e mandar para todo mundo.',ok:0,x:'Foto dos outros só com licença. Ninguém gosta de ser exposto.',f:['camera',CORES.coral,'Foto sem licença']}]},
 {nome:'Detetive dos cuidados',ic:['search',CORES.rosa],cor:'#FFE0EE',txt:'Ao contrário: três estão certas. Encontre a que NÃO pode.',fases:[
  {t:'ache',p:'Qual destas NÃO pode?',op:[['handwashing',CORES.ceu,'Lavar as mãos antes',1],['towel',CORES.menta,'Limpar com pano seco',1],['drink',CORES.coral,'Suco do lado do computador',0],['sandwich',CORES.sol,'Lanchar na cozinha',1]],x:'O suco do lado do computador é o perigo. As outras três cuidam do aparelho.',f:['search',CORES.rosa,'Lupa']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['plug-one',CORES.verde,'Segurar pelo plugue',1],['plug',CORES.coral,'Puxar pelo fio',0],['people',CORES.verde,'Pedir ajuda ao adulto',1],['battery-charge',CORES.menta,'Enrolar o carregador',1]],x:'Puxar pelo fio quebra o fio por dentro. As outras três são jeitos certos.',f:['plug-one',CORES.verde,'Detetive dos fios']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['umbrella',CORES.uva,'Guardar da chuva',1],['sun-one',CORES.sol,'Deixar no sol forte',0],['people',CORES.verde,'Chamar adulto se esquentar',1],['laptop',CORES.ceu,'Carregar com as duas mãos',1]],x:'Sol forte esquenta o aparelho e estraga a bateria.',f:['sun-one',CORES.sol,'Detetive do sol']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['click-tap',CORES.verde,'Toque leve na tela',1],['power',CORES.verde,'Desligar direitinho',1],['mouse',CORES.ceu,'Deixar tudo no lugar',1],['hammer-and-anvil',CORES.coral,'Bater quando trava',0]],x:'Bater não conserta nada. Quando travar, espere ou chame um adulto.',f:['power',CORES.verde,'Detetive do botão']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['time',CORES.verde,'Esperar a vez',1],['school',CORES.verde,'Avisar a professora',1],['people-speak',CORES.coral,'Gritar com o colega',0],['chair',CORES.verde,'Sentar direitinho',1]],x:'Gritar não ajuda ninguém. Dá para pedir com calma.',f:['school',CORES.verde,'Detetive da escola']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['eyes',CORES.ceu,'Pausa para os olhos',1],['alarm-clock',CORES.sol,'Hora combinada',1],['headset',CORES.coral,'Som no máximo',0],['umbrella',CORES.uva,'Guardar da chuva',1]],x:'Som no máximo machuca o ouvido. Baixinho é melhor.',f:['headset',CORES.uva,'Detetive do som']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['backpack',CORES.terra,'Guardar na capinha',1],['battery-charge',CORES.verde,'Carregador certo',1],['book-one',CORES.coral,'Livros em cima do notebook',0],['ipad',CORES.ceu,'Longe da beirada',1]],x:'Livros pesados em cima rachariam a tela. As outras três protegem o aparelho.',f:['backpack',CORES.terra,'Detetive da mochila']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['lock',CORES.verde,'Senha só com a família',1],['people',CORES.verde,'Chamar adulto se algo for estranho',1],['game',CORES.verde,'Jogos liberados',1],['people-unknown',CORES.coral,'Conversar com desconhecido',0]],x:'Desconhecido na internet é para mostrar ao adulto, não para conversar.',f:['lock',CORES.verde,'Detetive da senha']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['people-speak',CORES.verde,'Perguntar "posso usar?"',1],['iphone',CORES.coral,'Pegar sem pedir',0],['time',CORES.verde,'Trocar na hora combinada',1],['headset',CORES.verde,'Devolver limpinho',1]],x:'Pegar sem pedir não é legal com ninguém. Pedir é o caminho.',f:['people-speak',CORES.verde,'Detetive do respeito']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['towel',CORES.menta,'Pano seco na tela',1],['water',CORES.ceu,'Água na tela',0],['click-tap',CORES.verde,'Toque leve',1],['laptop',CORES.ceu,'Duas mãos para carregar',1]],x:'Água na tela entra pelas frestas. Só pano seco e macio.',f:['towel',CORES.menta,'Detetive do paninho']},
  {t:'ache',p:'Qual destas NÃO pode?',op:[['chair',CORES.verde,'Costas retas',1],['single-bed',CORES.coral,'Celular embaixo do travesseiro',0],['eyes',CORES.ceu,'Olhar longe de vez em quando',1],['school',CORES.verde,'Avisar se quebrou',1]],x:'Embaixo do travesseiro o celular esquenta. Ele carrega na mesa.',f:['chair',CORES.verde,'Detetive do sono']}]}
];
/* ---------- tema novo: Conserte a cena ---------- */
MUNDOS.splice(MUNDOS.length-1,0,{nome:'Conserte a cena',ic:['tool',CORES.terra],cor:'#EFE6D8',txt:'Duas coisas estão erradas em cada cena. Toque nelas para arrumar!',fases:[
 {t:'conserta',p:'Arrume a mesa do computador',itens:[['drink',CORES.coral,'Copo de suco na mesa',1,'Copo foi para a cozinha'],['laptop',CORES.ceu,'Notebook fechado',0],['mouse',CORES.ceu,'Mouse no lugar',0],['candy',CORES.rosa,'Chocolate no teclado',1,'Chocolate foi para o prato']],x:'Mesa arrumada: nada de comida nem bebida perto do computador.',f:['laptop',CORES.ceu,'Mesa arrumada']},
 {t:'conserta',p:'Arrume a sala',itens:[['hdmi-cable',CORES.coral,'Fio esticado no chão',1,'Fio encostado na parede'],['chair',CORES.verde,'Cadeira no lugar',0],['ipad',CORES.uva,'Tablet no chão',1,'Tablet na estante'],['plug-one',CORES.verde,'Plugue bem encaixado',0]],x:'Sala segura: ninguém tropeça no fio nem pisa no tablet.',f:['chair',CORES.verde,'Sala segura']},
 {t:'conserta',p:'Arrume o quarto na hora de dormir',itens:[['single-bed',CORES.coral,'Celular embaixo do travesseiro',1,'Celular na mesinha'],['moon',CORES.uva,'Tela ligada no escuro',1,'Abajur aceso'],['alarm-clock',CORES.sol,'Hora de tela combinada',0],['book-one',CORES.verde,'Livro para dormir',0]],x:'Quarto pronto para dormir bem: celular na mesinha e uma luzinha acesa.',f:['moon',CORES.uva,'Boa noite']},
 {t:'conserta',p:'Arrume a sala de informática',itens:[['pencil',CORES.coral,'Caneta riscando a mesa',1,'Caneta no estojo'],['people-speak',CORES.coral,'Colega gritando',1,'Pedindo com calma'],['time',CORES.verde,'Esperando a vez',0],['school',CORES.verde,'Professora avisada',0]],x:'Sala de informática tranquila: cada um na sua vez, sem gritos e sem riscos.',f:['school',CORES.verde,'Sala tranquila']},
 {t:'conserta',p:'Arrume o passeio no sol e na chuva',itens:[['sun-one',CORES.coral,'Celular no sol forte',1,'Celular na sombra'],['umbrella',CORES.uva,'Tablet na mochila',0],['water',CORES.coral,'Mão molhada no celular',1,'Mão seca na toalha'],['towel',CORES.menta,'Toalha por perto',0]],x:'Passeio seguro: aparelho na sombra e mão sequinha.',f:['umbrella',CORES.uva,'Passeio seguro']},
 {t:'conserta',p:'Arrume a tela do jogo',itens:[['people-unknown',CORES.coral,'Desconhecido chamando',1,'Adulto avisado'],['lock',CORES.verde,'Senha guardada',0],['message',CORES.coral,'"Você ganhou um prêmio!"',1,'Aviso fechado'],['game',CORES.verde,'Jogo liberado',0]],x:'Tela segura: desconhecido e prêmio falso viraram assunto para o adulto.',f:['lock',CORES.verde,'Tela segura']}]});
var FASES=[]; MUNDOS.forEach(function(m,mi){ m.fases.forEach(function(f,fi){ f.m=mi; f.i=fi; FASES.push(f); }); });
var ELOGIOS=['Muito bem!','Isso mesmo!','Você é um bom guardião!','Boa!','Mandou bem!'];
var FX_TEMA=['sujo','molhado','choque','quebrado','triste','triste','quebrado','triste','triste'];
var AVATARES=[['shield-add',CORES.verde],['star',CORES.sol],['rocket-one',CORES.coral],['dog',CORES.terra],['cat',CORES.uva],['planet',CORES.ceu],['butterfly',CORES.rosa],['frog',CORES.menta]];

/* ======================================================================
   Bit, o amigo atrapalhado (o personagem que vai fazer a coisa)
   ====================================================================== */
function bit(exp){
  exp=exp||'neutro';
  var T=' stroke="'+TINTA+'" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"';
  var olhos=exp==='feliz'?'<path d="M40 52q6-8 12 0M68 52q6-8 12 0" fill="none"'+T+'/>'
    :exp==='oops'?'<circle cx="46" cy="52" r="8" fill="#fff"'+T+'/><circle cx="74" cy="52" r="8" fill="#fff"'+T+'/><circle cx="47" cy="53" r="3.5" fill="'+TINTA+'"/><circle cx="75" cy="53" r="3.5" fill="'+TINTA+'"/><path d="M36 38l10 4M84 38l-10 4"'+T+'/>'
    :exp==='nao'?'<circle cx="46" cy="52" r="5" fill="'+TINTA+'"/><circle cx="74" cy="52" r="5" fill="'+TINTA+'"/><path d="M38 40l10 2M82 40l-10 2"'+T+'/>'
    :'<circle cx="46" cy="52" r="5" fill="'+TINTA+'"/><circle cx="74" cy="52" r="5" fill="'+TINTA+'"/>';
  var boca=exp==='feliz'?'<path d="M48 66q12 12 24 0" fill="#F26B5B"'+T+'/>':exp==='oops'?'<ellipse cx="60" cy="68" rx="6" ry="8" fill="#F26B5B"'+T+'/><path d="M90 30q6 8 0 12q-6-4 0-12z" fill="#5FA8D3" stroke="'+TINTA+'" stroke-width="3"/>'
    :exp==='nao'?'<path d="M50 68h20" fill="none"'+T+'/>':'<path d="M52 66q8 6 16 0" fill="none"'+T+'/>';
  var braco=exp==='nao'?'<g class="b-braco"><path d="M96 74l14-22" fill="none"'+T+' stroke-width="6"/><circle cx="112" cy="48" r="8" fill="#7FCBE6"'+T+'/></g>':exp==='feliz'?'<g class="b-braco"><path d="M96 74l16-14" fill="none"'+T+' stroke-width="6"/><circle cx="114" cy="58" r="8" fill="#7FCBE6"'+T+'/></g>':'<path d="M96 76l12 8" fill="none"'+T+' stroke-width="6"/>';
  return '<svg class="bit '+exp+'" viewBox="0 0 120 120" aria-hidden="true"><g class="b-corpo">'+
   '<path d="M60 20V8" fill="none"'+T+'/><circle class="b-luz" cx="60" cy="7" r="5" fill="#F9C74F" stroke="'+TINTA+'" stroke-width="3"/>'+
   '<path d="M24 76l-12 8" fill="none"'+T+' stroke-width="6"/>'+braco+
   '<rect x="26" y="22" width="68" height="64" rx="24" fill="#7FCBE6"'+T+'/>'+
   '<rect x="40" y="86" width="40" height="18" rx="8" fill="#5FA8D3"'+T+'/><path d="M46 104v8M74 104v8"'+T+' stroke-width="5"/>'+
   '<circle cx="34" cy="66" r="4" fill="#F28CB1" opacity=".8"/><circle cx="86" cy="66" r="4" fill="#F28CB1" opacity=".8"/>'+
   olhos+boca+'</g></svg>';
}
/* efeitos da consequência, desenhados em cima do objeto */
function efeito(tipo){
  var s='';
  if(tipo==='sujo') s='<g class="fx-sujo"><circle cx="30" cy="70" r="6" fill="#8B5A2B"/><circle cx="50" cy="80" r="5" fill="#8B5A2B"/><circle cx="70" cy="72" r="7" fill="#8B5A2B"/><circle cx="40" cy="58" r="3" fill="#8B5A2B"/><circle cx="62" cy="60" r="4" fill="#8B5A2B"/></g>';
  else if(tipo==='molhado') s='<g class="fx-gota"><path d="M30 20c8 10 8 22 0 22s-8-12 0-22z" fill="#5FA8D3"/><path d="M55 8c8 10 8 22 0 22s-8-12 0-22z" fill="#5FA8D3"/><path d="M78 24c8 10 8 22 0 22s-8-12 0-22z" fill="#5FA8D3"/></g>';
  else if(tipo==='quente') s='<g class="fx-calor" fill="none" stroke="#F26B5B" stroke-width="5" stroke-linecap="round"><path d="M30 40c0-10 8-10 8-20M50 36c0-10 8-10 8-20M70 40c0-10 8-10 8-20"/></g>';
  else if(tipo==='choque') s='<g class="fx-raio"><path d="M56 6 40 40h16l-10 34 30-42H60z" fill="#F9C74F" stroke="'+TINTA+'" stroke-width="3" stroke-linejoin="round"/></g>';
  else if(tipo==='quebrado') s='<g class="fx-racha" fill="none" stroke="'+TINTA+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20l18 22-8 12 20 16-6 14"/><path d="M38 42l14-6"/></g>';
  else if(tipo==='triste') s='<g class="fx-nuvem"><ellipse cx="60" cy="22" rx="26" ry="12" fill="#B7BDE6"/><circle cx="48" cy="16" r="12" fill="#B7BDE6"/><circle cx="68" cy="14" r="14" fill="#B7BDE6"/><g class="fx-gota"><path d="M44 40v12M60 42v12M76 40v12" stroke="#5FA8D3" stroke-width="4" stroke-linecap="round"/></g></g>';
  else s='<g class="fx-brilho"><path d="M20 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#F9C74F"/><path d="M84 14l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#F9C74F"/><path d="M80 78l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F28CB1"/><path d="M24 84c-6-6 0-12 4-8 4-4 10 2 4 8l-4 4z" fill="#F26B5B"/></g>';
  return '<svg class="fx" viewBox="0 0 100 100" aria-hidden="true">'+s+'</svg>';
}

/* ======================================================================
   Memória e ajustes
   ====================================================================== */
var CHAVE='pode-v3';
var est={feitas:{},som:false,anim:true,livre:false,turma:false,nome:'',avatar:0,perguntou:false};
try{ var sv=JSON.parse(localStorage.getItem(CHAVE)||localStorage.getItem('pode-v2')||'null'); if(sv) for(var k in sv) est[k]=sv[k]; }catch(e){}
try{ if(!localStorage.getItem(CHAVE)&&!localStorage.getItem('pode-v2')&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) est.anim=false; }catch(e){}
function salva(){ try{ localStorage.setItem(CHAVE,JSON.stringify(est)); }catch(e){} }
var $=function(i){return document.getElementById(i)};
function el(tag,cls,html){ var d=document.createElement(tag); if(cls) d.className=cls; if(html!=null) d.innerHTML=html; return d; }
function txt(tag,cls,t){ var d=el(tag,cls); d.textContent=t; return d; }
function aplicaAjustes(){ document.body.classList.toggle('sem-animacao',!est.anim); document.body.classList.toggle('turma',!!est.turma); }
function depois(ms,fn){ return setTimeout(fn,est.anim?ms:0); }
function nomeOu(padrao){ return est.nome?est.nome:padrao; }
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
  $('premio').classList.add('oculto'); $('janela').classList.add('oculto');
  [].forEach.call(document.querySelectorAll('.confete'),function(x){ x.remove(); });
  ['Mapa','Album','Ajustes'].forEach(function(n){ $('bt'+n).classList.toggle('ativo',id===n.toLowerCase()||(id==='jogo'&&n==='Mapa')); });
  try{ speechSynthesis.cancel(); }catch(e){}
  telaAtual=id; window.scrollTo(0,0);
}
function aberta(i){ return est.livre||i===0||!!est.feitas[i-1]||!!est.feitas[i]; }
function proxima(){ for(var i=0;i<FASES.length;i++) if(!est.feitas[i]) return i; return -1; }
function mundoCompleto(m){ return MUNDOS[m].fases.every(function(f){ return est.feitas[FASES.indexOf(f)]; }); }
function janela(html,classe){ var j=$('janela'); j.innerHTML='<div class="cartao '+(classe||'')+'">'+html+'</div>'; j.classList.remove('oculto'); return j.firstChild; }
function fechaJanela(){ $('janela').classList.add('oculto'); }
function avatarHtml(){ var a=AVATARES[est.avatar||0]; return icone(a[0],a[1]); }

/* ---------- nome e avatar ---------- */
function pedeNome(depoisFn){
  var c=janela('<h2 id="janelaTit">Oi, guardião! Como você se chama?</h2><p class="sub">O nome fica na sua carteirinha e nas suas tirinhas. Se preferir, pule.</p>');
  var inp=el('input','campo-nome'); inp.maxLength=16; inp.placeholder='Seu nome'; inp.value=est.nome||''; inp.setAttribute('aria-label','Seu nome'); c.appendChild(inp);
  c.appendChild(txt('p','sub','Escolha o seu avatar:'));
  var gr=el('div','avatares'); var esc=est.avatar||0;
  AVATARES.forEach(function(a,i){ var b=el('button','avatar'+(i===esc?' escolhido':''),icone(a[0],a[1])); b.setAttribute('aria-label','Avatar '+(i+1)); b.onclick=function(){ esc=i; [].forEach.call(gr.children,function(x,j){ x.classList.toggle('escolhido',j===i); }); }; gr.appendChild(b); });
  c.appendChild(gr);
  var lb=el('div','linha-bts');
  var ok=el('button','bt-principal','Pronto'); ok.onclick=function(){ est.nome=inp.value.trim().slice(0,16); est.avatar=esc; est.perguntou=true; salva(); fechaJanela(); if(depoisFn) depoisFn(); };
  var pula=el('button','bt-leve','Depois'); pula.onclick=function(){ est.perguntou=true; salva(); fechaJanela(); if(depoisFn) depoisFn(); };
  lb.appendChild(ok); lb.appendChild(pula); c.appendChild(lb);
  inp.onkeydown=function(ev){ if(ev.key==='Enter') ok.click(); };
  setTimeout(function(){ inp.focus(); },80);
}
/* ---------- rituais ---------- */
function bomDia(){
  var c=janela('<div class="ritual-topo dia"><span class="sol-r"></span></div>'+bit('feliz')+'<h2 id="janelaTit">Bom dia, '+nomeOu('guardião')+'!</h2><p class="sub">O Bit acordou cheio de ideias… algumas boas, outras nem tanto. Você decide o que pode e o que não pode!</p>','ritual');
  var b=el('button','bt-principal','Vamos!'); b.onclick=fechaJanela; c.appendChild(b); setTimeout(function(){ b.focus(); },50);
}
function boaNoite(){
  var c=janela('<div class="ritual-topo noite"><span class="lua-r"></span><i></i><i></i><i></i><i></i></div>'+bit('feliz')+'<h2 id="janelaTit">Boa noite, '+nomeOu('guardião')+'!</h2><p class="sub">O Bit guardou o tablet na capinha, desligou tudo direitinho e foi dormir. Até a próxima aula!</p>','ritual');
  var b=el('button','bt-principal','Até amanhã'); b.onclick=fechaJanela; c.appendChild(b); setTimeout(function(){ c.classList.add('dormindo'); },400); setTimeout(function(){ b.focus(); },50);
}

/* ---------- mapa ---------- */
function mapa(){
  var t=$('mapa'); t.innerHTML='';
  var p=proxima(),n=Object.keys(est.feitas).length;
  var cab=el('div','cabecalho');
  cab.appendChild(el('div','cracha','<div class="cracha-in"><span class="cracha-ic">'+avatarHtml()+'</span><b>'+(est.nome?est.nome:'Guardião das máquinas')+'</b><small>'+n+' de '+FASES.length+' carimbos</small></div>'));
  var tx=el('div','cab-txt');
  tx.appendChild(txt('h1',null,n===0?'O Bit precisa de você!':p<0?'Carteirinha completa!':'Bem-vindo de volta, '+nomeOu('guardião')+'!'));
  tx.appendChild(txt('p',null,n===0?'O Bit é um amigo atrapalhado: ele quer fazer de tudo com os aparelhos. Em cada situação, decida se pode ou não pode, e veja o que acontece. Cada resposta vira um carimbo.'
    :p<0?'Você já sabe cuidar de todos os aparelhos. Pode jogar de novo qualquer tema, ou rever as suas tirinhas.':'O cartão amarelo mostra onde você parou. Repetir um tema que você gosta também vale!'));
  var bts=el('div','linha-bts esq');
  var bn=el('button','bt-leve',icone('moon',CORES.uva)+'Encerrar o dia'); bn.onclick=boaNoite; bts.appendChild(bn);
  var bc=el('button','bt-leve',avatarHtml()+(est.nome?'Mudar nome':'Colocar meu nome')); bc.onclick=function(){ pedeNome(mapa); }; bts.appendChild(bc);
  tx.appendChild(bts); cab.appendChild(tx); t.appendChild(cab);
  var grade=el('div','temas');
  MUNDOS.forEach(function(m,mi){
    var c=el('section','tema'); c.style.setProperty('--cor',m.cor); c.style.animationDelay=(mi*.06)+'s';
    var topo=el('div','tema-topo'); topo.appendChild(el('div','tema-ic',icone(m.ic[0],m.ic[1])));
    var tt=el('div'); tt.appendChild(txt('h2',null,m.nome)); tt.appendChild(txt('p',null,m.txt)); topo.appendChild(tt);
    if(mundoCompleto(mi)){ topo.appendChild(el('span','selo-ok',CHECK+'<span>Completo</span>')); var bt=el('button','bt-tirinha',icone('picture',CORES.sol)+'<span>Tirinha</span>'); bt.onclick=function(){ tirinha(mi); }; topo.appendChild(bt); }
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
var atual=0,L=null,trava=false,erros=0,seq=0,errosTema={},arrumadas=0;
var FOGO='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.2 1.6 1 2.5 2 2.5 0-3-1.5-5 1-9z" fill="#F9C74F" stroke="#F26B5B" stroke-width="1.6" stroke-linejoin="round"/></svg>';
function chipSeq(){ var c=$('chipSeq'); if(seq>=2){ c.innerHTML=FOGO+'<b>'+seq+'</b><span>seguidas</span>'; c.classList.remove('oculto'); c.classList.remove('pula'); void c.offsetWidth; c.classList.add('pula'); } else c.classList.add('oculto'); }
function fxDe(L){ return L.fx||(L.ok?'feliz':FX_TEMA[L.m]||'quebrado'); }
function joga(i){
  atual=i; L=FASES[i]; trava=false; erros=0; arrumadas=0;
  var m=MUNDOS[L.m];
  $('jogo').style.setProperty('--cor',m.cor);
  $('chipTema').innerHTML=icone(m.ic[0],m.ic[1]); $('chipTema').appendChild(txt('span',null,m.nome));
  var pv=$('previa'); pv.innerHTML='';
  m.fases.forEach(function(f,fi){ var d=el('span','pv'+(est.feitas[FASES.indexOf(f)]?' f':'')+(fi===L.i?' a':''),icone(f.f[0],f.f[1])); d.title=f.f[2]; pv.appendChild(d); });
  $('aviso').innerHTML=''; chipSeq();
  var palco=$('palco'); palco.innerHTML='';
  if(L.t==='ache'){
    palco.appendChild(el('div','pergunta','<b>'+L.p+'</b><span>Três cuidam bem do aparelho. Toque na única que estraga ou machuca.</span>'));
    var gr=el('div','opcoes');
    L.op.map(function(o,j){ return j; }).sort(function(){ return Math.random()-.5; }).forEach(function(j,idx){
      var o=L.op[j],b=el('button','opcao',icone(o[0],o[1])); b.appendChild(txt('span','t',o[2])); b.style.animationDelay=(idx*.07)+'s'; b._pode=o[3];
      b.onclick=function(){ escolheAche(b); }; gr.appendChild(b);
    });
    palco.appendChild(gr);
  } else if(L.t==='conserta'){
    palco.appendChild(el('div','pergunta','<b>'+L.p+'</b><span>Duas coisas estão erradas. Toque nelas para arrumar. As certas podem ficar.</span>'));
    var gc=el('div','opcoes cena-conserta');
    L.itens.map(function(o,j){ return j; }).sort(function(){ return Math.random()-.5; }).forEach(function(j,idx){
      var o=L.itens[j],b=el('button','opcao'+(o[3]?' errada':''),icone(o[0],o[1])+(o[3]?efeito('triste').replace('class="fx"','class="fx alerta"'):'')); b.appendChild(txt('span','t',o[2])); b.style.animationDelay=(idx*.07)+'s'; b._o=o;
      b.onclick=function(){ conserta(b); }; gc.appendChild(b);
    });
    palco.appendChild(gc);
  } else {
    var carta=el('div','carta'); carta.id='carta';
    carta.innerHTML='<div class="carta-frente">'+
      '<div class="cena-bit"><div class="bit-caixa">'+bit('neutro')+'<span class="balao-bit">Posso?</span></div><div class="carta-fig" style="--c:'+L.cor+'">'+icone(L.ic,L.cor)+'</div></div>'+
      '<p class="carta-txt">'+L.p+'</p><span class="carta-perg">Pode ou não pode?</span>'+
      '<span class="pista pista-nao">'+MAO+'Não pode</span><span class="pista pista-pode">'+JOINHA+'Pode</span></div>'+
      '<div class="carta-verso"><div class="cena-bit"><div class="bit-caixa" id="bitVerso"></div><div class="carta-fig" id="figVerso" style="--c:'+L.cor+'">'+icone(L.ic,L.cor)+'</div></div><div class="carimbo"></div><p class="carta-x"></p><div class="porque" id="porque"></div></div>';
    palco.appendChild(carta); arrastavel(carta);
    var bts=el('div','botoes');
    var bn=el('button','bt-nao',MAO+'<span>Não pode</span>'); bn.onclick=function(){ responde(0,bn); };
    var bp=el('button','bt-pode',JOINHA+'<span>Pode</span>'); bp.onclick=function(){ responde(1,bp); };
    bts.appendChild(bn); bts.appendChild(bp); palco.appendChild(bts);
    palco.appendChild(txt('p','dica-arraste','Você também pode arrastar a carta: para a direita é pode, para a esquerda é não pode.'));
  }
  mostra('jogo');
}
function avisa(t,tipo){ var a=$('aviso'); a.innerHTML=''; a.appendChild(el('div','aviso-caixa'+(tipo?' '+tipo:''),'<span>'+t+'</span>')); }
/* arrastar a carta */
function arrastavel(carta){
  var ini=null,dx=0;
  carta.addEventListener('pointerdown',function(ev){ if(trava||carta.classList.contains('virada')) return; ini=ev.clientX; carta.setPointerCapture(ev.pointerId); carta.classList.add('pegando'); });
  carta.addEventListener('pointermove',function(ev){ if(ini===null) return; dx=ev.clientX-ini; carta.style.setProperty('--dx',dx+'px'); carta.style.setProperty('--rot',(dx/18)+'deg'); carta.classList.toggle('vai-pode',dx>40); carta.classList.toggle('vai-nao',dx<-40); });
  function solta(){ if(ini===null) return; ini=null; carta.classList.remove('pegando','vai-pode','vai-nao');
    if(Math.abs(dx)>90){ var v=dx>0?1:0; carta.style.setProperty('--dx','0px'); carta.style.setProperty('--rot','0deg'); responde(v,null); }
    else { carta.style.setProperty('--dx','0px'); carta.style.setProperty('--rot','0deg'); } dx=0; }
  carta.addEventListener('pointerup',solta); carta.addEventListener('pointercancel',solta);
}
function responde(v,b){
  if(trava) return;
  var carta=$('carta');
  if(v===L.ok){
    trava=true; tom([523,659]); $('aviso').innerHTML='';
    var fx=fxDe(L),bom=!!L.ok;
    carta.querySelector('.carimbo').className='carimbo '+(bom?'pode':'nao'); carta.querySelector('.carimbo').innerHTML=(bom?JOINHA+'<b>Pode!</b>':MAO+'<b>Não pode</b>');
    carta.querySelector('.carta-x').textContent=L.x;
    $('bitVerso').innerHTML=bit(bom?'feliz':'nao')+'<span class="balao-bit">'+(bom?'Oba!':'Ufa, ainda bem!')+'</span>';
    $('figVerso').insertAdjacentHTML('beforeend',efeito(bom?'feliz':fx));
    if(!bom) $('figVerso').classList.add('triste-fig');
    carta.classList.add('virada'); if(b) b.classList.add('escolhido');
    if(L.q) depois(900,function(){ porque(); }); else depois(1600,conclui);
  } else {
    erros++; tom([330]); if(b){ b.classList.add('treme'); setTimeout(function(){ b.classList.remove('treme'); },500); }
    // mostra rapidinho o que aconteceria
    var bc=carta.querySelector('.carta-frente .bit-caixa'); bc.innerHTML=bit('oops')+'<span class="balao-bit">Hmm…</span>';
    var fig=carta.querySelector('.carta-frente .carta-fig'); fig.classList.add('treme'); setTimeout(function(){ fig.classList.remove('treme'); bc.innerHTML=bit('neutro')+'<span class="balao-bit">Posso?</span>'; },1400);
    avisa(erros===1?'Pense de novo: se o Bit fizer isso, o aparelho fica <b>bem</b> ou <b>estraga</b>?':'Dica: imagine o aparelho depois. Ele continua funcionando? Alguém pode se machucar?');
  }
}
/* por quê? */
function porque(){
  var box=$('porque'); box.innerHTML=''; box.appendChild(txt('b',null,'Por quê?'));
  var ops=L.q.map(function(o,j){ return j; }).sort(function(){ return Math.random()-.5; });
  ops.forEach(function(j){ var o=L.q[j],b=el('button','pq',o[0]); b.onclick=function(){
    if(o[1]){ b.classList.add('certa'); tom([659,784]); [].forEach.call(box.querySelectorAll('.pq'),function(x){ x.disabled=true; }); depois(900,conclui); }
    else { b.classList.add('fora'); b.disabled=true; erros++; tom([330]); }
  }; box.appendChild(b); });
  box.classList.add('ver');
}
function escolheAche(b){
  if(trava||b.classList.contains('fora')||b.classList.contains('certa')) return;
  if(!b._pode){ trava=true; tom([523,659]); b.classList.add('certa'); b.appendChild(el('span','ok-op',CHECK)); depois(900,conclui); }
  else { erros++; tom([330]); b.classList.add('fora'); b.appendChild(el('span','ok-op verde',JOINHA)); avisa('Essa <b>pode</b>, ela cuida bem do aparelho. Procure a que não pode.'); }
}
function conserta(b){
  if(trava||b.classList.contains('arrumada')) return;
  var o=b._o;
  if(o[3]){ b.classList.remove('errada'); b.classList.add('arrumada'); var f=b.querySelector('.fx'); if(f) f.remove(); b.insertAdjacentHTML('beforeend',efeito('feliz')); b.querySelector('.t').textContent=o[4]; b.appendChild(el('span','ok-op',CHECK)); tom([523,659]); arrumadas++;
    if(arrumadas>=2){ trava=true; avisa(L.x,'bom'); depois(1100,conclui); } else avisa('<b>'+o[4]+'.</b> Falta arrumar mais uma!','bom'); }
  else { b.classList.add('ok-ja'); tom([392]); avisa('<b>'+o[2]+'</b>: essa está certa! Procure o que está errado.'); setTimeout(function(){ b.classList.remove('ok-ja'); },800); }
}

/* ---------- conclusão ---------- */
function conclui(){
  var novo=!est.feitas[atual]; est.feitas[atual]=1; salva(); tom([523,659,784]);
  var ult=atual===FASES.length-1,m=MUNDOS[L.m],fimMundo=L.i===m.fases.length-1;
  if(L.i===0) errosTema[L.m]=0;
  errosTema[L.m]=(errosTema[L.m]||0)+erros;
  seq=erros===0?seq+1:0;
  var marco=erros===0&&(seq===3||seq===5||(seq>5&&seq%5===0)),temaPerfeito=fimMundo&&errosTema[L.m]===0;
  var p=$('premio'); p.innerHTML='';
  var c=el('div','cartao'); c.style.setProperty('--cor',m.cor);
  c.appendChild(txt('h2',null,temaPerfeito?'Uau! Tema perfeito!':marco?'Uau! '+seq+' seguidas!':ELOGIOS[Math.floor(Math.random()*ELOGIOS.length)])); c.lastChild.id='premioTit';
  if(temaPerfeito) c.appendChild(el('div','festa grande',FOGO+FOGO+FOGO+'<span>Você terminou "'+m.nome+'" sem errar nenhuma!</span>'));
  else if(marco) c.appendChild(el('div','festa',FOGO+'<span>'+seq+' respostas certas de primeira, uma atrás da outra!</span>'));
  else if(seq>=2&&erros===0) c.appendChild(el('div','festa leve',FOGO+'<span>'+seq+' seguidas sem errar. Continue assim!</span>'));
  var rot=L.t==='ache'||L.t==='conserta'?'':'<span class="marca-'+(L.ok?'pode':'nao')+'">'+(L.ok?'Pode':'Não pode')+'</span>';
  c.appendChild(el('div','explica',rot+L.x));
  c.appendChild(el('div','carimbo-grande','<div class="cg-in" style="--cor-selo:'+L.f[1]+'">'+icone(L.f[0],L.f[1])+'</div>'));
  c.appendChild(el('div','nome-fig',(novo?'Carimbo novo: ':'Você já tem: ')+'<b></b>')); c.lastChild.lastChild.textContent=L.f[2];
  if(fimMundo) c.appendChild(txt('p','sub','Você completou o tema "'+m.nome+'"! A tirinha do Bit está pronta.'));
  if(ult) c.appendChild(txt('p','sub','Carteirinha completa! Você sabe cuidar dos aparelhos e de você.'));
  var lb=el('div','linha-bts');
  var bp=el('button','bt-principal',ult?'Ver minha carteirinha':'Continuar'); bp.onclick=ult?album:function(){ joga(atual+1); }; lb.appendChild(bp);
  if(fimMundo){ var bt=el('button','bt-leve',icone('picture',CORES.sol)+'Ver a tirinha'); bt.onclick=function(){ tirinha(L.m); }; lb.appendChild(bt); }
  var bo=el('button','bt-leve',icone('volume-up',CORES.ceu)+'Ouvir'); bo.onclick=function(){ fala(L.p+'. '+(L.t==='ache'||L.t==='conserta'?'':(L.ok?'Pode. ':'Não pode. '))+L.x); }; lb.appendChild(bo);
  var bm=el('button','bt-leve',icone('map-draw',CORES.menta)+'Temas'); bm.onclick=mapa; lb.appendChild(bm);
  c.appendChild(lb); p.appendChild(c); p.classList.remove('oculto'); confete(); if(temaPerfeito||marco) setTimeout(confete,400);
  setTimeout(function(){ bp.focus(); },60);
}
function confete(){
  if(!est.anim) return; var cores=[CORES.verde,CORES.coral,CORES.sol,CORES.ceu,CORES.uva];
  for(var i=0;i<26;i++){ var c=el('div','confete'); c.style.left=(Math.random()*100)+'vw'; c.style.background=cores[i%5]; c.style.borderRadius=i%3===0?'50%':'3px';
    c.style.setProperty('--dx',(Math.random()*160-80)+'px'); c.style.setProperty('--giro',(Math.random()*720-360)+'deg'); c.style.setProperty('--dur',(2.4+Math.random()*1.4)+'s'); c.style.setProperty('--atraso',(Math.random()*.5)+'s');
    document.body.appendChild(c); setTimeout(c.remove.bind(c),4600); }
}

/* ---------- tirinha do tema (para imprimir e levar para casa) ---------- */
function tirinha(mi){
  var m=MUNDOS[mi];
  var c=janela('<div class="tirinha-topo"><h2 id="janelaTit">A tirinha de '+nomeOu('guardião')+'</h2><p class="sub">'+m.nome+' · O Bit aprendeu com você!</p></div>','tirinha-cartao');
  var q=el('div','quadrinhos');
  m.fases.forEach(function(f,i){
    var qd=el('div','quadro'); qd.style.setProperty('--cor',m.cor);
    if(f.t==='ache'){ var ruim=f.op.filter(function(o){ return !o[3]; })[0]; qd.innerHTML='<div class="q-cena">'+bit('nao')+'<div class="q-fig">'+icone(ruim[0],ruim[1])+efeito('triste')+'</div></div><p>Bit não faz isso: '+ruim[2].toLowerCase()+'.</p>'; }
    else if(f.t==='conserta'){ qd.innerHTML='<div class="q-cena">'+bit('feliz')+'<div class="q-fig">'+icone(f.f[0],f.f[1])+efeito('feliz')+'</div></div><p>'+f.x+'</p>'; }
    else if(f.ok){ qd.innerHTML='<div class="q-cena">'+bit('feliz')+'<div class="q-fig">'+icone(f.ic,f.cor)+efeito('feliz')+'</div></div><p>Bit faz: '+f.p.charAt(0).toLowerCase()+f.p.slice(1)+'</p>'; }
    else { qd.innerHTML='<div class="q-cena">'+bit('nao')+'<div class="q-fig">'+icone(f.ic,f.cor)+efeito(fxDe(f))+'</div></div><p>Bit não faz: '+f.p.charAt(0).toLowerCase()+f.p.slice(1)+'</p>'; }
    qd.insertAdjacentHTML('afterbegin','<span class="q-num">'+(i+1)+'</span>');
    q.appendChild(qd);
  });
  c.appendChild(q);
  var lb=el('div','linha-bts nao-imprime');
  var bi=el('button','bt-principal','Imprimir ou salvar'); bi.onclick=function(){ document.body.classList.add('imprimindo'); window.print(); setTimeout(function(){ document.body.classList.remove('imprimindo'); },500); }; lb.appendChild(bi);
  var bf=el('button','bt-leve','Fechar'); bf.onclick=fechaJanela; lb.appendChild(bf);
  c.appendChild(lb); setTimeout(function(){ bf.focus(); },60);
}

/* ---------- carteirinha (álbum) ---------- */
function album(){
  var t=$('album'); t.innerHTML='';
  var n=Object.keys(est.feitas).length;
  t.appendChild(el('div','carteira','<div class="carteira-in"><span class="carteira-ic">'+avatarHtml()+'</span><div><b>'+(est.nome?est.nome:'Guardião das máquinas')+'</b><small>Carteirinha de guardião · '+n+' de '+FASES.length+' carimbos</small></div></div>'));
  t.appendChild(txt('p','texto-tela','Cada situação resolvida vira um carimbo. Não tem pressa: cada um completa no seu tempo. Nos temas completos, você pode ver e imprimir a tirinha do Bit.'));
  MUNDOS.forEach(function(m,mi){
    var g=el('section','album-grupo'); g.style.setProperty('--cor',m.cor); g.style.animationDelay=(mi*.05)+'s';
    var h=el('h3',null,icone(m.ic[0],m.ic[1])); h.appendChild(txt('span',null,m.nome));
    if(mundoCompleto(mi)){ var bt=el('button','bt-tirinha',icone('picture',CORES.sol)+'<span>Tirinha</span>'); bt.onclick=function(){ tirinha(mi); }; h.appendChild(bt); }
    g.appendChild(h);
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
  var bn=el('button','ajuste',avatarHtml()); var bt=txt('div','txt',est.nome?'Nome: '+est.nome:'Colocar meu nome'); bt.appendChild(txt('small',null,'Nome e avatar da carteirinha e das tirinhas.')); bn.appendChild(bt); bn.onclick=function(){ pedeNome(ajustes); }; box.appendChild(bn);
  chave('bell-ring',CORES.sol,'Sons','Sons baixinhos ao responder.','som');
  chave('magic',CORES.uva,'Animações','A carta vira, o carimbo bate, o Bit reage. Desligue se incomodar.','anim',aplicaAjustes);
  chave('projector',CORES.terra,'Modo turma (projetor)','Letras e botões maiores para jogar com a turma toda.','turma',aplicaAjustes);
  chave('unlock',CORES.verde,'Todas as situações abertas','Para o professor escolher qualquer tema.','livre');
  var r=el('button','ajuste perigo',icone('refresh',CORES.coral)); var rt=txt('div','txt','Recomeçar do zero'); rt.appendChild(txt('small',null,'Apaga os carimbos deste aparelho.')); r.appendChild(rt);
  r.onclick=function(){ if(confirm('Apagar todos os carimbos deste aparelho?')){ est.feitas={}; salva(); mapa(); } };
  box.appendChild(r); t.appendChild(box); mostra('ajustes');
}

/* ---------- início ---------- */
aplicaAjustes();
$('btInicio').insertAdjacentHTML('afterbegin',icone('shield-add',CORES.verde));
$('btMapa').insertAdjacentHTML('afterbegin',icone('map-draw',CORES.menta));
$('btAlbum').insertAdjacentHTML('afterbegin',icone('stickers',CORES.sol));
$('btAjustes').insertAdjacentHTML('afterbegin',icone('setting-two',CORES.ceu));
$('btVoltar').insertAdjacentHTML('afterbegin',icone('arrow-left','#fff'));
$('btOuvir').innerHTML=icone('volume-up',CORES.ceu);
$('btInicio').onclick=mapa; $('btMapa').onclick=mapa; $('btVoltar').onclick=mapa; $('btAlbum').onclick=album; $('btAjustes').onclick=ajustes;
$('btOuvir').onclick=function(){ if(!L) return; fala(L.t==='ache'||L.t==='conserta'?L.p+'. '+(L.op||L.itens).map(function(o){ return o[2]; }).join('. '):L.p+'. Pode ou não pode?'); };
document.addEventListener('keydown',function(ev){
  if(ev.key==='Escape'){ if(!$('janela').classList.contains('oculto')) fechaJanela(); else if(!$('premio').classList.contains('oculto')) mapa(); return; }
  if(telaAtual==='jogo'&&$('janela').classList.contains('oculto')&&$('premio').classList.contains('oculto')&&L&&!L.t){ if(ev.key==='ArrowRight') responde(1,document.querySelector('.bt-pode')); if(ev.key==='ArrowLeft') responde(0,document.querySelector('.bt-nao')); }
});
window.__jogo={FASES:FASES,MUNDOS:MUNDOS,est:est};
mapa();
try{ if(!est.perguntou) pedeNome(function(){ bomDia(); }); else if(!sessionStorage.getItem('pode-bomdia')){ bomDia(); } sessionStorage.setItem('pode-bomdia','1'); }catch(e){}
})();
