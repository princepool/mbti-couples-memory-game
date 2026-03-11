export const GameHeader = ({score, moves, onReset}) => {
    return (
    <div className="game-header">
      <h1>🎮 MBTI Memory Card Game</h1>
      <div className="stats">
        <div className="statitem">
            <span className="stat-label">Score:</span>{" "}
            <span className="stat-value">{score}</span>
        </div>
        <div className="statitem">
           <span className="stat-label">Moves:</span>{" "} 
           <span className="stat-value">{moves}</span>
        </div>
      </div>
      <button className="reset-btn" onClick={onReset}>New Game</button>
    </div>
  );
};
