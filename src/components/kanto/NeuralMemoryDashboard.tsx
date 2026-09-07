import { ReactFlow, Background, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { KantoModal } from "./KantoModal";

const nodeStyle = {
  background: "#FFFFFF",
  border: "1px solid #000000",
  borderRadius: 0,
  padding: "10px 14px",
  fontSize: 11,
  fontFamily: "ui-monospace, SFMono-Regular, monospace",
  textTransform: "uppercase" as const,
  letterSpacing: "0.14em",
  color: "#000000",
};

const nodes: Node[] = [
  {
    id: "1",
    position: { x: 40, y: 120 },
    data: { label: "Canter's Style" },
    style: nodeStyle,
  },
  { id: "2", position: { x: 300, y: 40 }, data: { label: "Flat UI" }, style: nodeStyle },
  {
    id: "3",
    position: { x: 300, y: 200 },
    data: { label: "Voice Protocol" },
    style: nodeStyle,
  },
  {
    id: "4",
    position: { x: 560, y: 120 },
    data: { label: "Kanto Constitution" },
    style: nodeStyle,
  },
];

const edgeStyle = { stroke: "#000000", strokeWidth: 1 };

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "straight", style: edgeStyle },
  { id: "e1-3", source: "1", target: "3", type: "straight", style: edgeStyle },
  { id: "e2-4", source: "2", target: "4", type: "straight", style: edgeStyle },
  { id: "e3-4", source: "3", target: "4", type: "straight", style: edgeStyle },
];

export function NeuralMemoryDashboard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <KantoModal
      open={open}
      onClose={onClose}
      title="Neural Memory"
      subtitle="Knowledge Graph"
    >
      <div className="h-full min-h-[420px] w-full bg-kanto-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          panOnScroll
        >
          <Background color="#000000" gap={28} size={1} />
        </ReactFlow>
      </div>
    </KantoModal>
  );
}
