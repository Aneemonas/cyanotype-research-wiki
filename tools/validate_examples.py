#!/usr/bin/env python3
"""Checks every .snbt under assets/examples: strict SNBT syntax and the rules of the mod
(known task and reward types, argument counts, existing parents, int array for lock_masks)."""
import json, re, sys, glob, os

class P:
    def __init__(s, t): s.t, s.i = t, 0
    def ws(s):
        while s.i < len(s.t) and s.t[s.i] in ' \t\r\n': s.i += 1
    def err(s, m): raise ValueError(f'{m} at char {s.i}: ...{s.t[max(0,s.i-25):s.i+25]!r}')
    def val(s):
        s.ws(); c = s.t[s.i]
        if c == '{': return s.comp()
        if c == '[': return s.lst()
        if c in '"\'': return s.string()
        m = re.compile(r'-?\d+(\.\d+)?[bBsSlLfFdD]?|true|false|[A-Za-z_][\w.+\-]*').match(s.t, s.i)
        if not m: s.err('bad value')
        s.i = m.end(); w = m.group(0)
        if re.fullmatch(r'-?\d+', w): return int(w)
        if re.fullmatch(r'-?\d+\.\d+[fFdD]?|-?\d+[fFdDbBsSlL]', w): return float(re.sub('[a-zA-Z]$', '', w))
        return w
    def string(s):
        q = s.t[s.i]; s.i += 1; out = ''
        while s.t[s.i] != q:
            if s.t[s.i] == '\\': s.i += 1
            out += s.t[s.i]; s.i += 1
        s.i += 1; return out
    def comp(s):
        s.i += 1; d = {}; s.ws()
        if s.t[s.i] == '}': s.i += 1; return d
        while True:
            s.ws()
            k = s.string() if s.t[s.i] in '"\'' else re.compile(r'[A-Za-z0-9_.+\-]+').match(s.t, s.i)
            if not isinstance(k, str):
                if not k: s.err('bad key')
                s.i = k.end(); k = k.group(0)
            s.ws()
            if s.t[s.i] != ':': s.err('expected :')
            s.i += 1; d[k] = s.val(); s.ws()
            if s.t[s.i] == ',': s.i += 1; s.ws(); (s.t[s.i] == '}') and s.err('trailing comma'); continue
            if s.t[s.i] == '}': s.i += 1; return d
            s.err('expected , or }')
    def lst(s):
        s.i += 1; s.ws(); typed = None
        m = re.compile(r'([BIL]);').match(s.t, s.i)
        if m: typed = m.group(1); s.i = m.end()
        out = []; s.ws()
        if s.t[s.i] == ']': s.i += 1; return ('arr', typed, out) if typed else out
        while True:
            out.append(s.val()); s.ws()
            if s.t[s.i] == ',': s.i += 1; s.ws(); (s.t[s.i] == ']') and s.err('trailing comma'); continue
            if s.t[s.i] == ']': s.i += 1; return ('arr', typed, out) if typed else out
            s.err('expected , or ]')

KJ = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mod_kinds.json')
_k = json.load(open(KJ))
TASK, REW = _k['task'], _k['reward']   # task and reward types of the mod, with their argument counts

root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', 'assets', 'examples')
bad = 0
trees = {}
for f in sorted(glob.glob(root + '/**/*.snbt', recursive=True)):
    try: d = P(open(f).read()).val()
    except Exception as e: print('SYNTAX', f, e); bad += 1; continue
    if 'nodes' not in d: print('ok(no tree)', os.path.relpath(f, root)); continue
    trees[d['id']] = (f, d)
ids = {k: {n['id'] for n in d['nodes']} for k, (f, d) in trees.items()}
for k, (f, d) in trees.items():
    rel = os.path.relpath(f, root)
    if os.path.basename(f) != k + '.snbt': print('NAME', rel, 'id', k); bad += 1
    seen = set()
    for n in d['nodes']:
        nid = n['id']
        if nid in seen: print('DUP', rel, nid); bad += 1
        seen.add(nid)
        for ref in n.get('parents', []) + n.get('excludes', []) + n.get('reveal_nodes', []):
            if '/' in ref:
                t, nn = ref.split('/')
                if t not in ids or nn not in ids[t]: print('REF', rel, nid, ref); bad += 1
            elif ref not in ids[k]: print('REF', rel, nid, ref); bad += 1
        for t in n.get('tasks', []):
            if t['type'] not in TASK: print('TASK?', rel, nid, t['type']); bad += 1
            elif len(t['args']) > max(TASK[t['type']], 1) + 3: print('TASKARGS', rel, nid, t); bad += 1
        for r in n.get('rewards', []):
            if r['type'] not in REW: print('REWARD?', rel, nid, r['type']); bad += 1
            elif r['type'] not in ('choice', 'wheel') and len(r['args']) != REW[r['type']]: print('REWARGS', rel, nid, r['type'], len(r['args']), REW[r['type']]); bad += 1
        if 'locks' in n:
            lm = n.get('lock_masks')
            if not (isinstance(lm, tuple) and lm[1] == 'I'): print('LOCKMASK not int array', rel, nid); bad += 1
            elif len(lm[2]) != len(n['locks']): print('LOCKMASK length', rel, nid); bad += 1
        for c in n.get('cost', []):
            if 'item' not in c or 'count' not in c: print('COST', rel, nid); bad += 1
    print('ok', rel, len(d['nodes']), 'nodes')
print('PROBLEMS:', bad); sys.exit(1 if bad else 0)
