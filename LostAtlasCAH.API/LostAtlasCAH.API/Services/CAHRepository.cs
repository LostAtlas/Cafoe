using LostAtlasCAH.API.cahdb_test;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAtlasCAH.API.Services
{
    public class CAHRepository : ICAHRepository
    {
        private cahdb_testContext _context;

        public CAHRepository(cahdb_testContext context)
        {
            _context = context;
        }

        public Alldecks GetDeckNameByID(int deckId)
        {
            return _context.Alldecks.Where(d => d.DeckId == deckId).FirstOrDefault();
        }

        //Get BlackCards Where DeckID = (Array of DeckID's)
        public IEnumerable<Blackcardstable> GetBlackCardForDeck(int deckID)
        {
            return _context.Blackcardstable
                           .Where(p => p.Deckid == deckID).ToList();
        }

        public Alldecks GetDeck(int deckId, bool includeCards)
        {
            if (includeCards)
            {
                // return _context.Alldecks.Include(c => c.AllBlackCards)
                //    .Where(c => c.DeckId == deckId).FirstOrDefault();

                return _context.Alldecks.Include(c => c.AllBlackCards).Include(c => c.AllWhiteCards).Where(c => c.DeckId == deckId).FirstOrDefault();
            }

            return _context.Alldecks.Where(c => c.DeckId == deckId).FirstOrDefault();
            //TODO: Null check.
        }

        public ICollection<Alldecks> GetMultipleDecks(int[] deckIds, bool includeCards)
        {
            ICollection<Alldecks> allDecks = new List<Alldecks>();
            if (includeCards)
            {
                foreach (int deckId in deckIds)
                {
                    allDecks.Add(_context.Alldecks.Include(c => c.AllBlackCards).Include(c => c.AllWhiteCards).Where(c => c.DeckId == deckId).FirstOrDefault());
                }

                //return _context.Alldecks.Include(c => c.AllBlackCards).Include(c => c.AllWhiteCards).Where(c => c.DeckId == deckId).FirstOrDefault();
            }

            return allDecks;
            //TODO: Null check.
        }

        //Get WhiteCards Where DeckID = (Array of DeckID's)
    }
}
