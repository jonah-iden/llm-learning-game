import { useUIStore } from "../store/ui-store";
import { useDraggable } from "@dnd-kit/react";
import type { Token } from "../tokenize";
import { useCallback, useId } from "react";

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


export function TokenizedString({ tokens }: { tokens: Token[] }) {
  const { activeToken, setActiveToken, isRevealed } = useUIStore();

  const handleTokenClick = (token: Token) => {
    setActiveToken(token);
  };


  return (
    <div className="tokenizedString">
      {tokens.map((token, index) => {
        if (token.dimensions && !isRevealed) {

          return (
            <Token key={index} token={token} />
          );
        }

        const isActive = activeToken === token;
        return <span key={index} className={`token ${isActive ? "active" : ""}`} onClick={() => handleTokenClick(token)}>{token.realText}</span>
      })}
    </div>
  );
}

export function Token({ token, canActivate = true }: { token: Token, canActivate?: boolean }) {
  const { activeToken, setActiveToken } = useUIStore();
  const id = useId();

  const handleTokenClick = useCallback((token: Token) => {
    if (canActivate) {
      setActiveToken(token);
    }
  }, [setActiveToken, canActivate]);

  const { ref } = useDraggable({
    id: `${token.realText}-${id}`,
    data: token,
    type: "token",

  });

  const isActive = activeToken?.realText === token.realText;
  const [h, rot, scale] = token.dimensions;
  const sides = getSides(token.wordType);

  return (
    <div ref={ref}
      onClick={() => handleTokenClick(token)}
      className={`token ${isActive ? "active" : ""}`}>
      <svg
        viewBox="0 0 100 100"
        style={{ color: `hsl(${h * 300}, 100%, 50%)`, transform: `rotate(${rot * 360}deg) scale(${scale + 0.4})` }}
        className={`tokenShape ${isActive ? "active" : ""}`}
        aria-label={token.realText}
        id={id}
      >
        <polygon points={getPolygonPoints(sides)} stroke="black" />
        <circle cx="50" cy="10" r="10" fill="black" />
      </svg>
    </div>)

}