import React, { useState, useEffect } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "react-flow-renderer";
import malla from "./malla.json";
import "./app.css";

function layoutNodes(nodes, cyclesCount = 11) {
  // Agrupar por ciclo y asignar posiciones
  const grouped = Array.from({ length: cyclesCount }, () => []);
  nodes.forEach((node) => grouped[node.cycle]?.push(node));

  let elements = [];
  const nodeWidth = 260, nodeHeight = 70;
  grouped.forEach((cycle, i) => {
    cycle.forEach((node, j) => {
      elements.push({
        id: node.id,
        type: "default",
        data: { label: node.label },
        position: { x: i * nodeWidth * 1.1, y: j * (nodeHeight + 20) },
        style: {
          background: node.color,
          borderRadius: 10,
          border: "2px solid #333",
          color: "#222",
          width: nodeWidth,
          fontSize: 14,
          boxShadow: "0px 2px 8px #0002",
        },
      });
    });
  });
  return elements;
}

function buildEdges(edges) {
  return edges.map((e, idx) => ({
    id: `e-${e.from}-${e.to}-${idx}`,
    source: e.from,
    target: e.to,
    animated: true,
    style: { stroke: "#333", strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      color: "#333",
    },
  }));
}

export default function App() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const nodeElems = layoutNodes(malla.nodes);
    const edgeElems = buildEdges(malla.edges);
    setElements([...nodeElems, ...edgeElems]);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f4f7fa" }}>
      <h1 className="titulo">Malla Interactiva - Finanzas (2022-1)</h1>
      <div style={{ width: "100%", height: "92vh" }}>
        <ReactFlow
          elements={elements}
          nodesDraggable={false}
          zoomOnScroll={true}
          zoomOnPinch={true}
          panOnScroll={true}
          minZoom={0.2}
          maxZoom={2.5}
          snapToGrid={true}
          snapGrid={[16, 16]}
        >
          <MiniMap nodeColor={(n) => n.style.background} />
          <Controls />
          <Background gap={18} color="#bbb" />
        </ReactFlow>
      </div>
      <footer className="footer">
        Basado en el plan de estudios 2022-1 · Facultad de Economía y Finanzas
      </footer>
    </div>
  );
}