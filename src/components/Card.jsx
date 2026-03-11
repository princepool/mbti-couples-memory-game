// Card.jsx

  const matchedEmojis = {
  "INTP 🫩": "🤓",      
  "INTJ 😐": "🥰",      
  "ENTJ 🤑": "🔥",
  "ENTP 😏": "😎",
  "INFJ 🙃": "💞",
  "ENFJ 😸": "😻",
  "ENFP 🤗": "💖",
  "INFP 😧": "💗",
  "ISTJ 👤": "💌",
  "ISFJ 🤱": "🧸",
  "ESTJ 🤨": "💘",
  "ESFJ ☺️": "❣️",
  "ISTP 🤠": "⚡",
  "ISFP 🙂": "🌸",
  "ESTP 😎": "🎯",
  "ESFP 🤪": "🎉"
}

export const Card = ({ card, onClick }) => {
  const type = card.value.split(" ")[0];
  const originalEmoji = card.value.split(" ")[1];

  let displayEmoji;
  if (card.isMatched) {
    displayEmoji = matchedEmojis[card.value];  // new "in love" emoji
  } else if (card.isFlipped) {
    displayEmoji = originalEmoji;              // original emoji when flipped
  } else {
    displayEmoji = "?";                        // hidden
  }

  return (
    <div 
      className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`} 
      onClick={() => onClick(card)}
    >
      <div className="card-front">?</div>
      <div className="card-back">{type} {displayEmoji}</div>
    </div>
  );
};