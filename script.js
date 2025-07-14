document.addEventListener('DOMContentLoaded', ()=>{

/*========== 結果タイプ定義 ==========*/
const types = {
  'AAAAAA': {slug:'ume_kinpira',title:'梅きんぴらごぼう',catchMain:'情熱スパーク',catchSub:'― 瞬間を燃やし、行動で道を切り拓く ―'},
  'BBBBBB': {slug:'komatsuna_salmon_cheese',title:'小松菜と炙り鮭チーズ',catchMain:'調和のコンダクター',catchSub:'― みんなの気持ちを絶妙にまとめる潤滑油 ―'},
  'CCCCCC': {slug:'potato_curry',title:'じゃがいもとカレーそぼろ',catchMain:'陽だまりムードメーカー',catchSub:'― 笑顔と元気をふわっと振りまく太陽系 ―'},
  default : {slug:'double_konbu',title:'ダブル昆布',catchMain:'海の包容力',catchSub:'― 静かに支え、周囲をまろやかに包み込む ―'}
};

/*========== ラッキー要素 ==========*/
const luckyColors = [
  {name:'桜ピンク',code:'#F78DA7'},{name:'夕焼けオレンジ',code:'#FF8C42'},{name:'檸檬イエロー',code:'#FFD447'},
  {name:'若葉グリーン',code:'#8DCB5E'},{name:'空色ブルー',code:'#5AB5EF'},{name:'藤パープル',code:'#B38BD8'}
];
const luckyItems = [
  '木製の箸置き','エコバッグ','アロマキャンドル',
  '万年筆インク','和紙の付箋','ミニ観葉植物'
];
const pick = arr => arr[Math.floor(Math.random()*arr.length)];

/*========== DOM ==========*/
const heroSec   = document.getElementById('start');
const quizSec   = document.getElementById('quiz');
const resultSec = document.getElementById('result');
const form      = document.getElementById('fortuneForm');
document.getElementById('startBtn').onclick = ()=>{heroSec.style.display='none';quizSec.style.display='block';};
document.getElementById('againBtn').onclick = ()=>{form.reset();resultSec.style.display='none';heroSec.style.display='flex';};

/*========== 判定ロジック ==========*/
form.addEventListener('submit',e=>{
  e.preventDefault();
  const q1=form.q1.value,q2=form.q2.value,q3=form.q3.value,q4=form.q4.value,q5=form.q5.value,q6=form.q6.value;
  const key = q1+q2+q3+q4+q5+q6;               // 6 文字キー
  const res = types[key] || types.default;      // 該当キーが無ければ default

  /* ラッキー要素 */
  const color = pick(luckyColors);
  const item  = pick(luckyItems);

  /* 結果表示 */
  const img = document.getElementById('resultImg');
  img.src   = res.slug + '.jpg';
  img.alt   = res.title;

  document.getElementById('resultTitle').textContent   = res.title;
  document.getElementById('catchMain').textContent     = res.catchMain;
  document.getElementById('catchMain').style.color     = color.code;
  document.getElementById('catchSub').textContent      = res.catchSub;
  document.getElementById('luckyColorName').textContent= color.name;
  document.getElementById('luckyColorName').style.color= color.code;
  document.getElementById('luckyItem').textContent     = item;

  quizSec.style.display='none';
  resultSec.style.display='block';
});

/*========== エラーハンドリング（白画面対策） ==========*/
window.addEventListener('error',ev=>{
  const pre=document.createElement('pre');
  pre.style.color='red';
  pre.textContent='エラーが発生しました:\\n'+ev.message;
  document.body.innerHTML='';
  document.body.appendChild(pre);
});

}); // DOMContentLoaded
