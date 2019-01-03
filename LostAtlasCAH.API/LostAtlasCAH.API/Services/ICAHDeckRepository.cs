using LostAtlasCAH.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAtlasCAH.API.Services
{
    public interface ICAHDeckRepository
    {
        bool DeckExists(int deckId);
        Decks GetDeck(int deckId);
        IEnumerable<Decks> GetEmptyDecks();
        IEnumerable<Decks> GetDecks(int[] deckIds);
    }
}
