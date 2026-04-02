import { Token } from "../tokenize";
import { useUIStore } from "../store/ui-store";
import { useDraggable } from "@dnd-kit/react";


function getSides(wordType: string): number {
  switch (wordType) {
    case "noun":
      return 3;
    case "verb":
      return 4;
    case "adj":
      return 5;
    default:
      return 6;
  }
}

function getPolygonPoints(sides: number): string {
  const centerX = 50;
  const centerY = 50;
  const radius = 45;
  const points: string[] = [];

  for (let i = 0; i < sides; i += 1) {
    const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return points.join(" ");
}


export function TokenizedString({tokens, onClick}: {tokens: Token[], onClick?: (token: Token) => void}) {
  const { activeToken, setActiveToken, isRevealed } = useUIStore();

  const handleTokenClick = (token: Token) => {
    setActiveToken(token);
    onClick?.(token);
  };


  return (
    <div className="tokenizedString">
      {tokens.map((token, index) => {
        const {ref} = useDraggable({
          id: `tokenized-string-${token.realText}`,
          data: token,
          type: "token",
        })

        if (token.dimensions && !isRevealed) {


          const [h, s, v] = token.dimensions;
          const sides = getSides(token.wordType);
          const isActive = activeToken === token;
          return (
            <svg
              ref={ref}
              key={index}
              viewBox="0 0 100 100"
              style={{ color: `hsl(${h * 360}, ${s * 100}%, ${v * 100}%)` }}
              className={`token tokenShape ${isActive ? "active" : ""}`}
              onClick={() => handleTokenClick(token)}
              aria-label={token.realText}
            >
              <polygon points={getPolygonPoints(sides)} stroke="black"/>
            </svg>
          );
        }
        
        const isActive = activeToken === token;
        return <span key={index} className={`token ${isActive ? "active" : ""}`} onClick={() => handleTokenClick(token)}>{token.realText}</span>
      })}
    </div>
  );
}