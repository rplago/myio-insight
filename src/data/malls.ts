import { MallNode } from "@/types/filters";

export const mallsTree: MallNode[] = [
  {
    id: "mallA",
    name: "Shopping A",
    kind: "mall",
    children: [
      {
        id: "mallA-L1",
        mallId: "mallA",
        name: "Piso L1",
        kind: "floor",
        children: [
          { id: "mallA-L1-mcd", name: "Mc Donald’s", kind: "place", mallId: "mallA", floorId: "mallA-L1" },
          { id: "mallA-L1-praca", name: "Praça de Alimentação", kind: "place", mallId: "mallA", floorId: "mallA-L1" }
        ]
      },
      {
        id: "mallA-L2",
        mallId: "mallA",
        name: "Piso L2",
        kind: "floor",
        children: [
          { id: "mallA-L2-lojaX", name: "Loja X", kind: "place", mallId: "mallA", floorId: "mallA-L2" }
        ]
      }
    ]
  },
  {
    id: "mallB",
    name: "Shopping B",
    kind: "mall",
    children: [
      {
        id: "mallB-L3",
        mallId: "mallB",
        name: "Piso L3",
        kind: "floor",
        children: [
          { id: "mallB-L3-mcd", name: "Mc Donald’s", kind: "place", mallId: "mallB", floorId: "mallB-L3" }
        ]
      }
    ]
  },
  {
    id: "mallC",
    name: "Shopping C",
    kind: "mall",
    children: [
      {
        id: "mallC-L4",
        mallId: "mallC",
        name: "Piso L4",
        kind: "floor",
        children: [
          { id: "mallC-L4-mcd", name: "Mc Donald’s", kind: "place", mallId: "mallC", floorId: "mallC-L4" }
        ]
      }
    ]
  }
];
