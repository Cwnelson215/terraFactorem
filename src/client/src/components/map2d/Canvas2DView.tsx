import { useRef, useEffect, useCallback, useState } from "react";
import { useMapStore } from "../../hooks/useMapStore";
import { biomeToColor } from "../../utils/colormap";

export default function Canvas2DView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapData = useMapStore((s) => s.mapData);

  // Pan/zoom state
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mapData) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, biomes } = mapData;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < biomes.length; i++) {
      const [r, g, b] = biomeToColor(biomes[i]);
      const idx = i * 4;
      data[idx] = r;
      data[idx + 1] = g;
      data[idx + 2] = b;
      data[idx + 3] = 255;
    }

    // Clear and apply transform
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    // Create a temp canvas for the image data
    const tmp = document.createElement("canvas");
    tmp.width = width;
    tmp.height = height;
    tmp.getContext("2d")!.putImageData(imageData, 0, 0);

    // Center the map and apply pan/zoom
    const scale =
      zoom * Math.min(canvas.width / width, canvas.height / height);
    const cx = canvas.width / 2 + offset.x;
    const cy = canvas.height / 2 + offset.y;

    ctx.setTransform(scale, 0, 0, scale, cx - (width * scale) / 2, cy - (height * scale) / 2);
    ctx.drawImage(tmp, 0, 0);
    ctx.resetTransform();
  }, [mapData, offset, zoom]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => draw());
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [draw]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((z) => Math.max(0.1, Math.min(10, z * (e.deltaY > 0 ? 0.9 : 1.1))));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    setOffset((o) => ({
      x: o.x + e.clientX - lastMouse.current.x,
      y: o.y + e.clientY - lastMouse.current.y,
    }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", cursor: "grab" }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
