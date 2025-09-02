import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Filter, Save, Star, Trash2, Search, X } from "lucide-react";
import { mallsTree } from "@/data/malls";
import { AnyNode, FilterPreset, FilterSelection } from "@/types/filters";

type Props = {
  selection: FilterSelection;
  onChange: (sel: FilterSelection) => void;
};

const emptySel: FilterSelection = { 
    malls: [], 
    //floors: [], 
    //places: [] 
};

const PRESET_KEY = "myio_dashboard_filter_presets_v1";

function flatten(): AnyNode[] {
  const list: AnyNode[] = [];
  for (const mall of mallsTree) {
    list.push(mall);
    for (const fl of mall.children) {
      list.push(fl);
      for (const pl of fl.children) list.push(pl);
    }
  }
  return list;
}

function nodeMatchesQuery(node: AnyNode, q: string) {
  if (!q) return true;
  return node.name.toLowerCase().includes(q.toLowerCase());
}

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

function countSelected(sel: FilterSelection) {
  return sel.malls.length;// + sel.floors.length + sel.places.length;
}

export function AdvancedFilter({ selection, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [presets, setPresets] = useState<FilterPreset[]>([]);
  const [draft, setDraft] = useState<FilterSelection>(selection ?? emptySel);

  useEffect(() => setDraft(selection), [selection]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRESET_KEY);
      if (raw) setPresets(JSON.parse(raw));
    } catch {}
  }, []);

  const allNodes = useMemo(() => flatten(), []);
  const filteredNodes = useMemo(() => allNodes.filter(n => nodeMatchesQuery(n, q)), [allNodes, q]);

  const selectedCount = countSelected(draft);

  function savePreset() {
    const name = prompt("Nome do preset:");
    if (!name) return;
    const preset: FilterPreset = {
      id: crypto.randomUUID(),
      name,
      selection: draft,
      createdAt: Date.now()
    };
    const next = [preset, ...presets].slice(0, 12);
    setPresets(next);
    localStorage.setItem(PRESET_KEY, JSON.stringify(next));
  }

  function applyPreset(p: FilterPreset) {
    setDraft(p.selection);
  }

  function deletePreset(p: FilterPreset) {
    const next = presets.filter(x => x.id !== p.id);
    setPresets(next);
    localStorage.setItem(PRESET_KEY, JSON.stringify(next));
  }

  function clearAll() {
    setDraft(emptySel);
  }

  function confirm() {
    onChange(draft);
    setOpen(false);
  }

  // helpers de seleção hierárquica
  function isMallChecked(mallId: string) {
    return draft.malls.includes(mallId);
  }

  /*
  function isFloorChecked(floorId: string) {
    return draft.floors.includes(floorId);
  }
  function isPlaceChecked(placeId: string) {
    return draft.places.includes(placeId);
  }
    */

  function toggleMall(mallId: string, floorsIds: string[], placeIds: string[]) {
    const checked = !isMallChecked(mallId);

    /*
    setDraft(d => ({
      malls: checked ? [...new Set([...d.malls, mallId])] : d.malls.filter(id => id !== mallId),
      floors: checked ? [...new Set([...d.floors, ...floorsIds])] : d.floors.filter(id => !floorsIds.includes(id)),
      places: checked ? [...new Set([...d.places, ...placeIds])] : d.places.filter(id => !placeIds.includes(id)),
    }));

    */

    setDraft(d => ({
      malls: checked ? [...new Set([...d.malls, mallId])] : d.malls.filter(id => id !== mallId),
    }));
  }

  /*
  function toggleFloor(floorId: string, mallId: string, placeIds: string[]) {
    const checked = !isFloorChecked(floorId);
    setDraft(d => ({
      malls: checked ? [...new Set([...d.malls, mallId])] : d.malls, // mantém mall se outros pisos/lojas ainda marcados
      floors: toggle(d.floors, floorId),
      places: checked ? [...new Set([...d.places, ...placeIds])] : d.places.filter(id => !placeIds.includes(id)),
    }));
  }

  function togglePlace(placeId: string, floorId: string, mallId: string) {
    const checked = !isPlaceChecked(placeId);
    setDraft(d => ({
      malls: checked ? [...new Set([...d.malls, mallId])] : d.malls,
      floors: checked ? [...new Set([...d.floors, floorId])] : d.floors,
      places: toggle(d.places, placeId),
    }));
  }
    */

  // chips
  const chips = useMemo(() => {
    const map = new Map<string, string>();
    for (const n of allNodes) map.set(n.id, n.name);
    return [
      ...draft.malls.map(id => ({ id, label: map.get(id)!, kind: "mall" })),
      //...draft.floors.map(id => ({ id, label: map.get(id)!, kind: "floor" })),
      //...draft.places.map(id => ({ id, label: map.get(id)!, kind: "place" })),
    ];
  }, [draft, allNodes]);

  function removeChip(id: string) {
    setDraft(d => ({
      malls: d.malls.filter(x => x !== id),
      //floors: d.floors.filter(x => x !== id),
      //places: d.places.filter(x => x !== id),
    }));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtro {selectedCount > 0 && <Badge variant="secondary" className="ml-1">{selectedCount}</Badge>}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Filtro avançado</DialogTitle>
        </DialogHeader>

        {/* Busca + chips */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <Input placeholder="Buscar shopping, piso, loja/ambiente…" value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
            </div>
            <Button variant="ghost" onClick={clearAll} className="gap-2">
              <Trash2 className="w-4 h-4" /> Limpar
            </Button>
            <Button variant="secondary" onClick={savePreset} className="gap-2">
              <Save className="w-4 h-4" /> Salvar preset
            </Button>
          </div>

          {/* Chips das seleções */}
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chips.map(c => (
                <Badge key={c.id} variant="outline" className="gap-1">
                  {c.label}
                  <button className="ml-1 opacity-70 hover:opacity-100" onClick={() => removeChip(c.id)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Árvore */}
        <div className="max-h-[46vh] overflow-auto pr-2 space-y-3">
          {mallsTree.map(mall => {
            const floorIds = mall.children.map(f => f.id);
            const placeIds = mall.children.flatMap(f => f.children.map(p => p.id));

            return (
              <div key={mall.id} className="rounded-xl border p-4">
                <label className="flex items-center gap-2">
                  <Checkbox checked={isMallChecked(mall.id)} onCheckedChange={() => toggleMall(mall.id, floorIds, placeIds)} />
                  <span className="font-medium">{mall.name}</span>
                  <Badge variant="outline" className="ml-2">{mall.children.length} pisos</Badge>
                </label>


              </div>
            );
          })}
        </div>

        {/* Presets */}
        {presets.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4" /> Presets salvos
              </div>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <div key={p.id} className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <button className="text-sm underline" onClick={() => applyPreset(p)}>{p.name}</button>
                    <button className="opacity-60 hover:opacity-100" onClick={() => deletePreset(p)} title="Excluir">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Ações */}
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={confirm}>Aplicar filtro</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
