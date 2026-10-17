#!/usr/bin/env python3
"""Regenerate EN/ZH BibTeX from the public-safe master data. No ICLR identifiers."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
records=json.loads((root/'src/data/researchPapers.json').read_text(encoding='utf-8'))
def escaped(x):
    return str(x).replace('\\','\\\\').replace('{','\\{').replace('}','\\}')
def render(p, zh=False):
    fields={
      'title':p['title'],'author':p['author'],'year':p['year'],
      'status':p['status'],'selected':str(p.get('selected',False)).lower(),
      'venue':p['venue'],'description': p.get('summaryZh' if zh else 'summary',''),
      'keywords':', '.join(p.get('keywordsZh' if zh else 'keywords',p.get('keywords',[]))),
      'preview':p.get('preview',''),
    }
    for k in ['journal','booktitle','url','doi','pdf','code','arxiv','abstract','citationCount','citationUrl']:
        if p.get(k):fields[k]=p[k]
    output=[f"@{p['entry']}{{{p['bibkey']},"]
    for k,v in fields.items():
        if v is not None and v!='':output.append(f'  {k} = {{{escaped(v)}}},')
    output[-1]=output[-1].rstrip(',');output.append('}')
    return '\n'.join(output)
for folder,zh in [('content',False),('content_zh',True)]:
 (root/folder/'publications.bib').write_text('\n\n'.join(render(p,zh) for p in records)+'\n',encoding='utf-8')
 print('updated',folder)
