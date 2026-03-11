import { GameHeader } from "./components/Gameheader"
import { Card } from "./components/Card";
import { useState, useEffect } from "react"; 

const cardValues = [
  "INTP 🫩",
  "INTJ 😐",
  "ENTJ 🤑",
  "ENTP 😏",
  "INFJ 🙃",
  "ENFJ 😸",
  "ENFP 🤗",
  "INFP 😧",
  "ISTJ 👤",
  "ISFJ 🤱",
  "ESTJ 🤨",
  "ESFJ ☺️",
  "ISTP 🤠",
  "ISFP 🙂",
  "ESTP 😎",
  "ESFP 🤪",
]

const matches = {
  "INFP 😧": "ENFJ 😸",
  "ENFJ 😸": "INFP 😧",

  "INFJ 🙃": "ENFP 🤗",
  "ENFP 🤗": "INFJ 🙃",

  "INTJ 😐": "ENTJ 🤑",
  "ENTJ 🤑": "INTJ 😐",

  "INTP 🫩": "ISTP 🤠",
  "ISTP 🤠": "INTP 🫩",

  "ISTJ 👤": "ESTP 😎",
  "ESTP 😎": "ISTJ 👤",

  "ISFJ 🤱": "ESFP 🤪",
  "ESFP 🤪": "ISFJ 🤱",

  "ISFP 🙂": "ESFJ ☺️",
  "ESFJ ☺️": "ISFP 🙂",

  "ENTP 😏": "ESTJ 🤨",
  "ESTJ 🤨": "ENTP 😏"
};

function App() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  const initializeGame = () => {
    // 1️⃣ shuffle first
    const shuffledValues = [...cardValues].sort(() => Math.random() - 0.5);

    // 2️⃣ give ids after shuffle
    const finalCards = shuffledValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardCliCk = (card) => {
    // dont allow cards to clicked if flipped, matched
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length == 2) {
      return;
    }

    // update card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return {...c, isFlipped: true};
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id]
    setFlippedCards(newFlippedCards)

      if (flippedCards.length === 1) {
        setIsLocked(true)
        const firstCard = cards[flippedCards[0]]

        if (matches[firstCard.value] === card.value) {

          setTimeout(() => {

            setMatchedCards((prev) => [...prev, firstCard.id, card.id])

            setCards((prev) =>
              prev.map((c) => {
                if (c.id === firstCard.id || c.id === card.id) {
                  return { ...c, isMatched: true }
                }
                return c
              })
            )
            
            setFlippedCards([])
            setIsLocked(false)

          }, 500)
          setScore((prev) => prev + 1)

        } else {

          setTimeout(() => {

            const flippedBackCards = newCards.map((c) => {
              if (newFlippedCards.includes(c.id)) {
                return { ...c, isFlipped: false }
              }
              return c
            })

            setCards(flippedBackCards)
            setFlippedCards([])
            setIsLocked(false)
          }, 1000)

        }
        setMoves((prev) => prev + 1)
      }
    };

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame}/>

      <div className="cards-grid">
        {cards.map((card) => (
            <Card card={card} onClick={handleCardCliCk} />
        ))}
      </div>
    </div>

    
  );
};

export default App
