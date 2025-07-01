import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import { defaultBoards } from '../data';

const Home = () => {
    const [boards, setBoards] = useState([]);

    // Check component is loading
    console.log("✅ Home component loaded");

    useEffect(() => {
        const saved = localStorage.getItem('kanban-data');
        console.log("📦 Fetched from localStorage:", saved);

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                console.log("✅ Parsed boards:", parsed);
                setBoards(parsed);
            } catch (error) {
                console.error("❌ Error parsing localStorage data:", error);
                setBoards(defaultBoards); // fallback
            }
        } else {
            console.log("📋 Using defaultBoards:", defaultBoards);
            setBoards(defaultBoards);
        }
    }, []);

    useEffect(() => {
        console.log("💾 Saving to localStorage:", boards);
        localStorage.setItem('kanban-data', JSON.stringify(boards));
    }, [boards]);

    const handleAddCard = (boardId, text) => {
        console.log("➕ Adding card to board:", boardId, text);
        const newBoards = boards.map((board) => {
            if (board.id === boardId) {
                const newCard = {
                    id: `card-${Date.now()}`,
                    title: text,
                };
                return {
                    ...board,
                    cards: [...board.cards, newCard],
                };
            }
            return board;
        });
        setBoards(newBoards);
    };

    const handleDeleteCard = (boardId, cardId) => {
        console.log("🗑️ Deleting card:", cardId, "from board:", boardId);
        const newBoards = boards.map((board) => {
            if (board.id === boardId) {
                return {
                    ...board,
                    cards: board.cards.filter((card) => card.id !== cardId),
                };
            }
            return board;
        });
        setBoards(newBoards);
    };

    return (
        <div className="kanban-container">
            <h2>📋 Kanban Boards</h2>
            {boards?.length > 0 ? (
                boards.map((board) => (
                    <Board
                        key={board.id}
                        board={board}
                        addCard={handleAddCard}
                        deleteCard={handleDeleteCard}
                    />
                ))
            ) : (
                <p>🚫 No boards found.</p>
            )}
        </div>
    );
};

export default Home;
