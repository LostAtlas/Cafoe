using LostAtlasCAH.API.cahdb_test;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAtlasCAH.API.Services
{
    public interface ICAHRepository
    {
        Alldecks GetDeckNameByID(int deckId);
        Alldecks GetDeck(int deckId, bool includeCards);
        ICollection<Alldecks> GetMultipleDecks(int[] deckIds, bool includeCards);
    }
}
