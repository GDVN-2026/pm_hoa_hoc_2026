/**
 * GDVN · Hóa học trực quan
 * Tác giả / Author: Nguyễn Thanh Vy
 * Copyright (c) 2026 Nguyễn Thanh Vy. All rights reserved.
 * Applies to GDVN application code; third-party components retain their own licenses.
 */
import {setupBackNavigation} from './navigation.js';
import {structureHandlers} from './structure-ui.js';
import {labHandlers} from './lab-ui.js';
import {studioHandlers} from './studio-ui.js';
import {atomicHandlers} from './atomic-ui.js';
import {toolIcon} from './icons.js';
import {advancedHandlers} from './advanced-ui.js';
import {routes,moduleHandlers,$} from './modules.js';
import {home} from './dashboard.js';
import {reference} from './reference-ui.js';
import {teachingHandlers} from './teaching-ui.js';
import {mountJourney} from './learning-paths.js';
import {reactionHandlers} from './reactions-ui.js';
import {learningHandlers} from './learning-ui.js';
import {drawingHandlers} from './drawing-ui.js';
import {curriculumTopics,toolGuides} from './curriculum-topics.js';
import {curriculumContext} from './curriculum-context.js';
const VERSION='1.6.0-pilot2';
$('app-version').textContent=VERSION;
const handlers={...moduleHandlers,...reactionHandlers,...learningHandlers,...drawingHandlers,...advancedHandlers,...atomicHandlers,...studioHandlers,...labHandlers,...structureHandlers,...teachingHandlers,reference,home};
const categories=[...new Set(routes.slice(1).map(route=>route[3]))];
$('navigation').innerHTML='<a class="overview-link" href="#home" data-route="home">Tổng hợp</a>'+categories.map((category,index)=>'<details class="nav-category"><summary><span class="category-icon">'+toolIcon(['atom','equation','electro','lab','knowledge'][index])+'</span><span>'+category+'</span><span class="chevron">⌄</span></summary><div class="nav-dropdown">'+routes.filter(route=>route[3]===category).map(([id,icon,title])=>'<a href="#'+id+'" data-route="'+id+'"><span class="nav-tool-icon" aria-hidden="true">'+toolIcon(id)+'</span>'+(id==='equation'?'Phương trình & cân bằng':title)+'</a>').join('')+'</div></details>').join('');
setupBackNavigation($('go-back'));
document.querySelector('.skip-link').onclick=event=>{event.preventDefault();$('content').focus();};
let cleanup;
function closeNavigation(){document.body.classList.remove('menu-open');$('menu').setAttribute('aria-expanded','false');if(window.matchMedia?.('(max-width:720px)').matches)document.querySelectorAll('.nav-category[open]').forEach(group=>group.open=false);}
function render(){
  if(cleanup){cleanup();cleanup=null;}
  const id=location.hash.replace(/^#\/?/,'').split('?')[0]||'home';
  const route=routes.find(r=>r[0]===id)||routes[0];
  $('content').innerHTML='';$('page-label').textContent=route[2];document.title='GDVN · '+route[2];
  document.body.dataset.page=$('search').value.trim()?'search':route[0];
  document.querySelectorAll('[data-route]').forEach(a=>{const active=a.dataset.route===route[0];a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.querySelectorAll('.nav-category').forEach(group=>group.classList.toggle('current-group',!!group.querySelector('a.active')));
  if($('search').value.trim())home($('search').value.trim());
  else{
    if(route[0]!=='home')$('content').innerHTML='<div class="tool-page-heading"><div><div class="eyebrow">'+route[3]+'</div><h1>'+route[2]+'</h1><p class="lead">'+route[4]+'</p></div><a class="all-tools-link" href="#home">Chọn hành trình ↗</a></div>';
    const grade=new URLSearchParams(location.hash.split('?')[1]).get('grade');
    const hasGrade=/^[6-9]$|^1[0-2]$/.test(grade);
    if(hasGrade&&route[0]!=='knowledge'){
      $('content').insertAdjacentHTML('beforeend','<p><a class="all-tools-link" href="#knowledge?grade='+grade+'">← Quay lại kiến thức lớp '+grade+'</a></p>');
    }
    cleanup=handlers[route[0]]();
    const guide=toolGuides[route[0]];
    if(guide){
      const [goal,activity,,example]=guide;
      $('content').insertAdjacentHTML('beforeend', '<details class="panel tool-guide"><summary>Hướng dẫn và ví dụ</summary><p><strong>Mục tiêu</strong> · '+goal+'</p><p><strong>Cách dùng</strong> · '+activity+'</p><p><strong>Minh họa</strong> · '+example+'</p></details>');
    }
    mountJourney(route[0]);
    curriculumContext(route[0]);
    const topics=curriculumTopics.filter(topic=>topic.tools.includes(route[0])).sort((a,b)=>Number(String(b.grade)===grade)-Number(String(a.grade)===grade));
    if(topics.length){
      const section=document.createElement('section');
      section.className='panel';
      const heading=document.createElement('h2');
      heading.textContent='Kiến thức liên quan';
      section.append(heading);
      for(const topic of topics){
        const details=document.createElement('details');
        const summary=document.createElement('summary');
        const text=document.createElement('p');
        summary.textContent='Lớp '+topic.grade+' · '+topic.name;
        text.textContent=topic.text;
        details.append(summary,text);
        section.append(details);
      }
      $('content').append(section);
    }
  }
  closeNavigation();
  const current=document.querySelector('.nav-category.current-group');if(current&&!window.matchMedia?.('(max-width:720px)').matches)current.open=true;
}
window.addEventListener('hashchange',()=>{if(location.hash==='#content'){$('content').focus();return;}$('search').value='';render();window.scrollTo(0,0);});
$('search').oninput=render;
$('content').addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(!link||link.hash!==location.hash||!$('search').value.trim()||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  $('search').value='';
  render();
  $('content').focus();
});

$('search').onkeydown=event=>{
  if(event.key!=='Enter'||event.isComposing||!$('search').value.trim())return;
  const result=$('content').querySelector('.knowledge-matches a, .tool-entry');
  if(result){event.preventDefault();result.click();}
};
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('search').focus();}if(event.key==='Escape'){if(document.activeElement===$('search')&&$('search').value){$('search').value='';render();}else if(document.body.classList.contains('menu-open'))$('menu').focus();closeNavigation();}});
document.addEventListener('click',event=>{if(document.body.classList.contains('menu-open')&&!event.target.closest('.site-header, .workspace-topbar'))closeNavigation();});
document.querySelectorAll('.nav-category').forEach(group=>group.addEventListener('toggle',()=>{if(group.open)document.querySelectorAll('.nav-category').forEach(other=>{if(other!==group)other.open=false;});}));
$('navigation').addEventListener('click',event=>{if(event.target.closest('a'))closeNavigation();});
$('theme').onclick=()=>{document.body.classList.toggle('dark');try{localStorage.setItem('gdvn-theme',document.body.classList.contains('dark')?'dark':'light');}catch{}};
try{document.body.classList.toggle('dark',localStorage.getItem('gdvn-theme')==='dark');}catch{}
$('menu').onclick=()=>{const open=document.body.classList.toggle('menu-open');$('menu').setAttribute('aria-expanded',String(open));};
render();
if('serviceWorker' in navigator&&['http:','https:'].includes(location.protocol)&&document.querySelector('script[type="module"][src="app.js"]'))navigator.serviceWorker.register('./sw.js').catch(error=>console.warn('Không thể bật ngoại tuyến:',error.message));

const presentationButton=document.createElement('button');presentationButton.id='presentation-toggle';presentationButton.className='presentation-toggle';presentationButton.textContent='Trình chiếu';presentationButton.setAttribute('aria-pressed','false');document.querySelector('.workspace-topbar').append(presentationButton);const exitPresentation=document.createElement('button');exitPresentation.id='presentation-exit';exitPresentation.textContent='← Thoát trình chiếu (Esc)';document.body.append(exitPresentation);function setPresentation(on){document.body.classList.toggle('presenting',on);presentationButton.setAttribute('aria-pressed',String(on));if(!on)presentationButton.focus();}presentationButton.onclick=()=>setPresentation(!document.body.classList.contains('presenting'));exitPresentation.onclick=()=>setPresentation(false);document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('presenting'))setPresentation(false);});
