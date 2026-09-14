"use client";

import { useEffect, useRef, useState } from "react";

const flowerImages = [
  "/flowers/flower1.png",
  "/flowers/flower2.png",
  "/flowers/flower3.png",
  "/flowers/flower4.png",
  "/flowers/flower5.png",
];

const gifts = [
  {
    id: 1,
    image: "/gifts/teddy-gift.png",
    title: "A Teddy For My Precious Girl 🧸",
    frontText: "A little teddy for someone special 💗",
    note: "A tiny teddy for a precious person. I hope this little surprise makes you smile and adds a little extra warmth to your birthday. Keep smiling and keep being wonderfully you. 🧸💗",
  },
  {
    id: 2,
    image: "/gifts/flower-gift.png",
    title: "A Flower For You 🌸",
    frontText: "A little flower to brighten your day",
    note: "A little flower for a beautiful day. I hope it reminds you that even the smallest things can make a moment feel special. Wishing you a birthday full of happiness and smiles. 🌸✨",
  },
  {
    id: 3,
    image: "/gifts/chocolate-gift.png",
    title: "A Little Sweetness 🍫",
    frontText: "Something sweet for your special day",
    note: "Because a birthday should always have a little sweetness. I hope this tiny surprise makes your day just a little happier and gives you one more reason to smile. 🍫💗",
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [showScrollMessage, setShowScrollMessage] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [giftFlipped, setGiftFlipped] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const giftSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!cardOpen) return;

    const timer = setTimeout(() => {
      setShowScrollMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [cardOpen]);

  const openSurprise = () => {
    setStarted(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(() => {});
    }
  };

  const openLetter = () => {
    setCardOpen(true);
  };

  const chooseGift = (id: number) => {
    setSelectedGift(id);
    setGiftFlipped(false);
  };

  const selectedGiftData = gifts.find(
    (gift) => gift.id === selectedGift
  );

  return (
    <main className="birthday-page">

      <audio
        ref={audioRef}
        src="/music/your-birthday-music.mp3"
        loop
      />

      {/* BACKGROUND DECORATIONS */}

      <div className="background-decor">
        {Array.from({ length: 9 }).map((_, index) => (
          <img
          key={index}
          src={flowerImages[index % flowerImages.length]}
          className={`floating-flower flower-position-${index + 1}`}
          alt=""
            />
        ))}
        
      </div>

      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      {/* ================================
          OPENING
      ================================= */}

      {!started && (
        <section className="opening-screen">

          <div className="tiny-text">
            A little surprise for you...
          </div>

          <h1>
            Happy Birthday
            <span>🎂</span>
          </h1>

          <p className="subtitle">
            Made with a little bit of magic ✨
          </p>

          <button onClick={openSurprise}>
            🎁 Open Your Surprise
          </button>

        </section>
      )}

      {/* ================================
          ENVELOPE
      ================================= */}

      {started && !cardOpen && (
        <section className="ecard-section">

          <div className="section-label">
            ✨ Something special for you ✨
          </div>

          <div
            className="envelope-wrapper"
            onClick={openLetter}
          >

            <div className="envelope">

              <div className="envelope-flap"></div>

              <div className="envelope-front">

                <div className="heart-seal">
                  💗
                </div>

                <p>
                  For Salsa
                </p>

                <span>
                  💌
                </span>

              </div>

            </div>

            <p className="click-text">
              Tap the envelope to open it ✨
            </p>

          </div>

        </section>
      )}

      {/* ================================
          LETTER + GIFTS
      ================================= */}

      {started && cardOpen && (
        <>

          {/* LETTER */}

          <section className="letter-section">

            <div className="birthday-card">

              <div className="card-decoration top-left">
                🌸
              </div>

              <div className="card-decoration top-right">
                🎀
              </div>

              <div className="card-decoration bottom-left">
                ✨
              </div>

              <div className="card-decoration bottom-right">
                🦋
              </div>

              <div className="card-inner">

                <div className="card-small-title">
                  A little birthday note
                </div>

                <h2>
                  Happy Birthday, Salsa! 🎂
                </h2>

                <div className="card-divider">
                  ♡ ✦ ♡
                </div>

                <p>
                  Wishing you a day filled with happiness,
                  laughter, good vibes and lots of little
                  moments that make you smile.
                </p>

                <p>
                  I hope this year brings you plenty of
                  beautiful memories, exciting adventures
                  and reasons to be happy.
                </p>

                <div className="signature">
                  -- Yash 💗
                </div>

              </div>

            </div>

            {/* 5 SECOND MESSAGE */}

            {showScrollMessage && (
              <div className="scroll-message">

                <div className="scroll-sparkle">
                  ✨
                </div>

                <p>
                  Wait... there's a little more for you 💗
                </p>

                <div className="scroll-down">
                  Scroll down
                </div>

                <div className="scroll-arrow">
                  ↓
                </div>

              </div>
            )}

          </section>


          {/* ================================
              GIFT SECTION
          ================================= */}

          <section
            className="gift-section"
            ref={giftSectionRef}
          >

            <div className="section-label">
              🎁 A Little Surprise 🎁
            </div>

            {!selectedGift && (
              <>

                <h2 className="gift-heading">
                  Choose one gift...
                </h2>

                <p className="gift-subtitle">
                  One of these little surprises is waiting
                  for you 💗
                </p>

                <div className="gift-boxes">

                  {gifts.map((gift) => (
                    <div
                      key={gift.id}
                      className="gift-choice"
                      onClick={() => chooseGift(gift.id)}
                    >

                      <img
                        src="/giftbox/giftbox.png"
                        alt="Gift box"
                      />

                      <span>
                        Gift {gift.id}
                      </span>

                      <small>
                        Choose me ✨
                      </small>

                    </div>
                  ))}

                </div>

              </>
            )}


            {/* SELECTED GIFT */}

            {selectedGift && selectedGiftData && (
              <div className="chosen-gift-area">

                <p className="chosen-message">
                  You chose Gift {selectedGift} 💗
                </p>

                <div
                  className={`gift-card ${
                    giftFlipped ? "flipped" : ""
                  }`}
                  onClick={() =>
                    setGiftFlipped(!giftFlipped)
                  }
                >

                  <div className="gift-card-inner">

                    {/* FRONT */}

                    <div className="gift-card-front">

                      <div className="gift-sparkles">
                        ✨ ✦ ✨
                      </div>

                      <img
                        src={selectedGiftData.image}
                        alt={selectedGiftData.title}
                      />

                      <h2>
                        {selectedGiftData.title}
                      </h2>

                      <p>
                        {selectedGiftData.frontText}
                      </p>

                      <div className="flip-hint">
                        Tap to see your little note 💌
                      </div>

                    </div>


                    {/* BACK */}

                    <div className="gift-card-back">

                      <div className="back-decoration">
                        💗 ✨ 🌸
                      </div>

                      <h2>
                        A Little Note For You 💌
                      </h2>

                      <p>
                        {selectedGiftData.note}
                      </p>

                      <div className="back-decoration">
                        🌸 🎀 🦋
                      </div>

                    </div>

                  </div>

                </div>

                <p className="gift-click-note">
                  Tap the card to turn it over ✨
                </p>

              </div>
            )}

          </section>


          {/* ================================
              GOODBYE
          ================================= */}

          {selectedGift && (
            <section className="goodbye-section">

              <div className="teddy-decoration">
                <img
                  src="/teddy/teddy.png"
                  alt=""
                />
              </div>

              <div className="goodbye-card">

                <div className="goodbye-stars">
                  ✨ ⭐ ✨
                </div>

                <h2>
                  That's the little surprise... 💗
                </h2>

                <p>
                  I hope this tiny birthday surprise
                  made your day a little brighter.
                </p>

                <p>
                  Keep smiling, keep shining, and have
                  the happiest birthday ever. 🎂✨
                </p>

                <div className="final-name">
                  Happy Birthday, Salsa! 🎀
                </div>

                <div className="final-hearts">
                  ♡ 💗 ♡
                </div>

              </div>

            </section>
          )}

        </>
      )}

    </main>
  );
}
