
/* Result definitions */
const types = {
  'AAA': {slug:'ume_kinpira',title:'梅きんぴらごぼう',catchMain:'情熱スパーク',catchSub:'― 瞬間を燃やし、行動で道を切り拓く ―'},
  'AAB': {slug:'komatsuna_salmon_cheese',title:'小松菜と炙り鮭チーズ',catchMain:'調和のコンダクター',catchSub:'― みんなの気持ちを絶妙にまとめる潤滑油 ―'},
  'AAC': {slug:'potato_curry',title:'じゃがいもとカレーそぼろ',catchMain:'陽だまりムードメーカー',catchSub:'― 笑顔と元気をふわっと振りまく太陽系 ―'},
  'ABA': {slug:'yamawasabi_creamcheese',title:'山わさびとクリームチーズ',catchMain:'刺激を纏う冒険家',catchSub:'― 未知を愉しみ、日常にスパイスを振りかける ―'},
  'ABB': {slug:'yamawasabi_creamcheese',title:'山わさびとクリームチーズ',catchMain:'刺激を纏う冒険家',catchSub:'― 未知を愉しみ、日常にスパイスを振りかける ―'},
  'BA':  {slug:'oba_miso',title:'大葉みそ',catchMain:'涼風リセット',catchSub:'― 空気を整え、瑞々しい発想を吹き込む ―'},
  'CA':  {slug:'oba_miso',title:'大葉みそ',catchMain:'涼風リセット',catchSub:'― 空気を整え、瑞々しい発想を吹き込む ―'},
  'default': {slug:'double_konbu',title:'ダブル昆布',catchMain:'海の包容力',catchSub:'― 静かに支え、周囲をまろやかに包み込む ―'}
};

/* Lucky pools */
const luckyColors = [
  {name:'桜ピンク',code:'#F78DA7'},{name:'桃ローズ',code:'#E94A77'},{name:'夕焼けオレンジ',code:'#FF8C42'},
  {name:'金木犀オレンジ',code:'#FFB02E'},{name:'檸檬イエロー',code:'#FFD447'},{name:'ひまわりイエロー',code:'#FFEB46'},
  {name:'若葉グリーン',code:'#8DCB5E'},{name:'抹茶グリーン',code:'#5D9C4D'},{name:'翡翠グリーン',code:'#1BA784'},
  {name:'深海ブルー',code:'#0071BC'},{name:'空色ブルー',code:'#5AB5EF'},{name:'藍インディゴ',code:'#274B8F'},
  {name:'藤パープル',code:'#B38BD8'},{name:'ラベンダーパープル',code:'#C9A1D2'},{name:'紅紫マゼンタ',code:'#C0175B'},
  {name:'漆黒ブラック',code:'#2D2D2D'},{name:'墨グレー',code:'#595757'},{name:'雪ホワイト',code:'#FFFFFF'},
  {name:'シャンパンゴールド',code:'#D4B679'},{name:'シルバーグレー',code:'#C0C0C0'}
];

const luckyItems = [
 '木製の箸置き','竹製歯ブラシ','アロマキャンドル','ハーブ石けん','エコバッグ','手ぬぐい',
 '方眼メモ帳','読書用しおり','万年筆インク','和紙の付箋','クリップボード','栞付きノート',
 'ドライフルーツ','ミックスナッツ','小瓶ハチミツ','クラフトジャム','抹茶ラテパウダー','スパイスミックス',
 'カリンバ','ミニ観葉植物','トラベルミニキャンドル','パズルキーホルダー','ウッドコースター','ロケット型お香立て'
];

/* util */
function pickRandom(arr){return arr[Math.floor(Math.random()*arr.length)];}

/* Event wiring */
document.getElementById('startBtn').addEventListener('click',()=>{document.getElementById('start').style.display='none';document.getElementById('quiz').style.display='block';});
document.getElementById('fortuneForm').addEventListener('submit',function(e){
  e.preventDefault();
  const q1=document.querySelector('input[name="q1"]:checked').value;
  const q2=document.querySelector('input[name="q2"]:checked').value;
  const q3=document.querySelector('input[name="q3"]:checked').value;
  const key=q1+q2+q3;
  let res=types[key]||types[key.slice(0,2)]||types['default'];

  const color=pickRandom(luckyColors);
  const item=pickRandom(luckyItems);

  document.getElementById('resultImg').src='images/'+res.slug+'.jpg';
  document.getElementById('resultImg').alt=res.title;
  document.getElementById('resultTitle').textContent=res.title;
  document.getElementById('catchMain').textContent=res.catchMain;
  document.getElementById('catchSub').textContent=res.catchSub;
  document.getElementById('luckyColorName').textContent=color.name;
  document.getElementById('luckyColorName').style.color=color.code;
  document.getElementById('luckyItem').textContent=item;

  document.getElementById('quiz').style.display='none';
  document.getElementById('result').style.display='block';
});
document.getElementById('againBtn').addEventListener('click',()=>{
  document.getElementById('fortuneForm').reset();
  document.getElementById('result').style.display='none';
  document.getElementById('start').style.display='flex';
});
