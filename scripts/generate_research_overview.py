#!/usr/bin/env python3
"""Generate EN/ZH scalable research framework diagrams from src/data/researchPapers.json.
Requires only Python standard library: python3 scripts/generate_research_overview.py
"""
from pathlib import Path
from xml.sax.saxutils import escape
import json
root=Path(__file__).resolve().parents[1]
papers=json.loads((root/'src/data/researchPapers.json').read_text())
W,H=1600,1410
nodes=[
 ('identify','Causal identification','因果识别'),('agents','Proposals & causal selection','候选生成与因果选择'),('decide','Reliable decisions','可靠决策'),
 ('cooperate','Multi-agent coordination','多智能体协作'),('communicate','Decision-relevant communication','决策相关通信'),('adapt','Interference and adaptation','干扰与在线适应'),
 ('ocean','Robotics & maritime sensing','机器人与海洋感知'),('lowalt','Low-altitude networks','低空网络'),('sags','SAG-S heterogeneous networks','空天地海异构网络')]
phases=[('CAUSAL REASONING','因果决策'),('COMMUNICATION & COOPERATION','通信协作'),('NETWORKED SYSTEMS','异构网络')]

def el(s): return escape(str(s))
def rect(x,y,w,h,r,fill,stroke='none',sw=1):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def t(x,y,txt,sz=18,color='#37254e',weight='normal',anchor=None):
 a=f' text-anchor="{anchor}"' if anchor else ''
 return f'<text x="{x}" y="{y}" fill="{color}" font-family="Arial, Noto Sans CJK SC, sans-serif" font-size="{sz}" font-weight="{weight}"{a}>{el(txt)}</text>'
def trim(s,n=51):return s if len(s)<=n else s[:n-1].rstrip()+'…'
def render(zh):
 a=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">',
 '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fcfaff"/><stop offset="1" stop-color="#f0eafd"/></linearGradient></defs>',rect(0,0,W,H,28,'url(#bg)'),'<circle cx="1490" cy="30" r="300" fill="#dfd0f4" opacity=".25"/>']
 a += [t(74,72,'YULI LIU   /   RESEARCH FRAMEWORK',22,'#72519c','bold'),t(74,136,'从因果决策到可信网络智能' if zh else 'From Causal Decisions to Networked Intelligence',47,'#302044','bold'),t(76,181,'九个研究节点 · 三个阶段 · 论文与在投稿件' if zh else 'NINE RESEARCH NODES  ·  THREE STAGES  ·  PUBLIC OUTPUTS & PENDING WORK',19,'#6b587e')]
 for j,(en,cn) in enumerate(phases):
  x=60+j*500
  a.append(rect(x,220,478,565,22,'#fffcff','#dbcaed',2))
  a += [rect(x+18,239,42,42,21,'#f0e7fa','#ceb4e8'),t(x+39,267,f'0{j+1}',19,'#633e90','bold','middle'),t(x+76,269,cn if zh else en,19,'#412957','bold')]
  for k in range(3):
   nidx=j*3+k;nid,english,chinese=nodes[nidx]; y=303+k*153
   matching=[p['id'] for p in papers if nid in p['nodes']]
   a += [rect(x+19,y,440,131,16,'#f8f3fc','#e3d6ef'),rect(x+19,y,5,131,2,'#9876be'),t(x+41,y+34,f'N{nidx+1:02d}',16,'#8a65ac','bold'),t(x+41,y+64,trim(chinese if zh else english,34),21,'#3f2a55','bold')]
   if matching:
    for i,pid in enumerate(matching[:6]):
     px=x+41+i*62
     a += [rect(px,y+85,53,25,7,'#ede2f8','#d8c7ea'),t(px+26,y+103,pid,14,'#573580','bold','middle')]
    if len(matching)>6:a.append(t(x+411,y+104,f'+{len(matching)-6}',15,'#573580','bold'))
   else:a.append(t(x+41,y+106,'探索方向' if zh else 'Research vision',15,'#9179a8'))
  if j < 2:a.append(t(x+488,527,'→',23,'#8152b7','bold','middle'))
 a += [t(74,841,'PUBLICATION & MANUSCRIPT EVIDENCE' if not zh else '论文与在投稿件对应表',25,'#624080','bold'),t(74,870,'P = Public outputs    M = Manuscripts awaiting decisions' if not zh else 'P = 已发表 / 已录用 / 预印本    M = 在投 / 审稿中',17,'#806b94')]
 for index,p in enumerate(papers):
  col=index%2;row=index//2;x=74+col*744;y=894+row*98
  a.append(rect(x,y,722,86,12,'#fffdff','#e4d8ef'))
  a += [rect(x+15,y+17,58,50,10,'#e9dff6','#cdb8e7'),t(x+44,y+48,p['id'],17,'#563682','bold','middle')]
  title=trim(p['shortZh'] if zh else p['short'],49)
  a += [t(x+89,y+31,title,18,'#35244d','bold'),t(x+89,y+56,trim(p['venue'],58),14,'#695680')]
  color={'published':'#47755d','accepted':'#3e6f95','preprint':'#6f5597','pending':'#89619f'}[p['status']]
  a.append(rect(x+89,y+65,125,13,6,'#ede5f7'))
  a.append(t(x+94,y+76,{'published':'Published','accepted':'Accepted','preprint':'Preprint','pending':'Pending decision'}[p['status']] if not zh else {'published':'已发表','accepted':'已录用','preprint':'预印本','pending':'在投 / 审稿中'}[p['status']],12,color,'bold'))
 a += [t(74,1378,'论文状态依据新近信息修正；科研主题不等同于已发表成果。' if zh else 'Status: user updates + CV + attached drafts. Research themes are not publication claims.',16,'#806b94'),'</svg>']
 return '\n'.join(a)
for zh in (False,True):
 target=root/'public'/('research-overview-zh.svg' if zh else 'research-overview.svg')
 target.write_text(render(zh));print('generated:',target,len(target.read_text()))
