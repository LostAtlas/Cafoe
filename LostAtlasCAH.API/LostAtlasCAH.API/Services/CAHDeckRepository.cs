using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LostAtlasCAH.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace LostAtlasCAH.API.Services
{
    public class CAHDeckRepository : ICAHDeckRepository
    {
        private CAHDbContext _context;
        public CAHDeckRepository(CAHDbContext context)
        {
            _context = context;
        }

        public bool DeckExists(int deckId)
        {
            return _context.Decks.Any(c => c.DeckId == deckId);
        }

        public IEnumerable<Decks> GetEmptyDecks()
        {
            return _context.Decks.OrderBy(c => c.DeckId).ToList();
        }

        public Decks GetDeck(int deckId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Decks> GetDecks(int[] deckIds)
        {
            ICollection<Decks> allDecks = new HashSet<Decks>();

            foreach (int deckId in deckIds)
            {
                if(deckId == 8) //RedBox Combo Deck
                {
                    allDecks.Add(_context.Decks.Include(c => c.BlackCards).Include(c => c.WhiteCards).Where(c => c.DeckId == 2).FirstOrDefault());
                    allDecks.Add(_context.Decks.Include(c => c.BlackCards).Include(c => c.WhiteCards).Where(c => c.DeckId == 3).FirstOrDefault());
                    allDecks.Add(_context.Decks.Include(c => c.BlackCards).Include(c => c.WhiteCards).Where(c => c.DeckId == 4).FirstOrDefault());
                }
                else if (deckId == 9) //BlueBox Combo Deck
                {
                    allDecks.Add(_context.Decks.Include(c => c.BlackCards).Include(c => c.WhiteCards).Where(c => c.DeckId == 5).FirstOrDefault());
                    allDecks.Add(_context.Decks.Include(c => c.BlackCards).Include(c => c.WhiteCards).Where(c => c.DeckId == 6).FirstOrDefault());
                    allDecks.Add(_context.Decks.Include(c => c.BlackCards).Include(c => c.WhiteCards).Where(c => c.DeckId == 7).FirstOrDefault());
                }
                else
                {
                    allDecks.Add(_context.Decks.Include(c => c.BlackCards).Include(c => c.WhiteCards).Where(c => c.DeckId == deckId).FirstOrDefault());
                }
            }

            return allDecks;
        }
    }
}
