import { Card } from '@data/graphql/generated/graphql';
import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

type cardStore = {
 cards: Card[];
 setCards: (cards: Card[]) => void;
 addCard: (card: Card) => void;
 updateCard: (card: Card) => void;
 removeCard: (cardId: string) => void;
};

export const useCardStorage = create<cardStore>()((set, _get) => ({
 cards: [],

 setCards: (cards: Card[]) =>
  set(() => ({
   cards,
  })),

 updateCard: (card: Card) =>
  set((state) => ({ cards: state.cards.map((cardState) => (cardState.id === card.id ? card : cardState)) })),

 addCard: (card: Card) => set((state) => ({ cards: [...state.cards, card] })),

 removeCard: (cardId: string) => set((state) => ({ cards: [...state.cards.filter((card) => card.id !== cardId)] })),
}));
