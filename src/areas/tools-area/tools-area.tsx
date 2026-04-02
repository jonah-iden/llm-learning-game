
import { useUIStore } from "../../store/ui-store";

export function ToolsArea() {
  const { activeToken, setActiveToken, activeTool, setActiveTool } = useUIStore();

  return (
    <div className="toolsArea">
      <div style={{ marginBottom: "16px" }}>
        <h3>Active Token</h3>
        {activeToken ? (
          <div>
            <p><strong>{activeToken.realText}</strong></p>
            <p>Type: {activeToken.wordType}</p>
            <button onClick={() => setActiveToken(null)}>Clear</button>
          </div>
        ) : (
          <p>None selected</p>
        )}
      </div>

      <div>
        <h3>Tools</h3>
        <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
          {["label", "highlight", "group"].map((tool) => (
            <button
              key={tool}
              onClick={() => setActiveTool(activeTool === tool ? null : tool)}
              style={{
                padding: "8px",
                backgroundColor: activeTool === tool ? "#007bff" : "#f0f0f0",
                color: activeTool === tool ? "white" : "black",
                border: "1px solid #ccc",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}