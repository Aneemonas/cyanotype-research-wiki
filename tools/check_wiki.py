#!/usr/bin/env python3
"""Checks the wiki: nav vs files, EN/PT parity, internal links+anchors, media slots, assets."""
import json, re, sys, unicodedata
from pathlib import Path
root = Path(__file__).resolve().parent.parent
def slug(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if not unicodedata.combining(c)).replace('`', '')
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-') or 'x'
nav = json.load(open(root/'content/nav.json', encoding='utf-8'))
secs = nav['sections'] if isinstance(nav, dict) else nav
ids = []
for s in secs:
    for p in s['pages']:
        ids.append(f"{s['id']}/{p['id']}" if isinstance(p, dict) else f"{s['id']}/{p}")
bad = 0
def err(m):
    global bad; bad += 1; print('ERR', m)
heads = {}
for lang in ('en', 'pt'):
    files = {str(f.relative_to(root/'content'/lang))[:-3] for f in (root/'content'/lang).rglob('*.md')}
    for i in ids:
        if i not in files: err(f'{lang}: missing page {i}')
    for f in files - set(ids): err(f'{lang}: page not in nav {f}')
    for i in ids:
        f = root/'content'/lang/(i+'.md')
        if not f.exists(): continue
        txt = f.read_text(encoding='utf-8')
        heads[(lang, i)] = {slug(m.group(2)) for m in re.finditer(r'^(#{1,4})\s+(.+)$', txt, re.M)}
slots = {}
for lang in ('en', 'pt'):
    for i in ids:
        f = root/'content'/lang/(i+'.md')
        if not f.exists(): continue
        txt = f.read_text(encoding='utf-8')
        fence = False
        for ln in txt.split('\n'):
            if ln.startswith('```'): fence = not fence
            if fence: continue
            for m in re.finditer(r'\]\(([^)]+)\)', ln):
                t = m.group(1)
                if t.startswith(('http', 'mailto')): continue
                pg, _, an = t.partition('#')
                if pg not in ids: err(f'{lang}/{i}: bad link {t}')
                elif an and an not in heads.get((lang, pg), ()): err(f'{lang}/{i}: bad anchor {t}')
            m = re.match(r'::card\s+(.+)', ln)
            if m:
                p = [x.strip() for x in m.group(1).split('|')]
                if len(p) > 1 and p[1] not in ids: err(f'{lang}/{i}: bad card link {p[1]}')
            m = re.match(r'::(video|image)\s+(\S+)', ln)
            if m: slots.setdefault((lang, m.group(1)), []).append((m.group(2), i))
            m = re.match(r'::file\s+(\S+)', ln)
            if m and not (root/m.group(1)).exists(): err(f'{lang}/{i}: missing file {m.group(1)}')
for kind in ('video', 'image'):
    e = sorted(n for n, _ in slots.get(('en', kind), [])); p = sorted(n for n, _ in slots.get(('pt', kind), []))
    if e != p: err(f'{kind} slot mismatch EN/PT: {set(e) ^ set(p)}')
print('pages', len(ids), 'videos', len(slots.get(('en','video'),[])), 'images', len(slots.get(('en','image'),[])), 'problems', bad)
sys.exit(1 if bad else 0)
