using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAtlasCAH.API.Models
{
    public class Deck
    {
        public Deck()
        {
            BlackCards = new List<Card>();
            WhiteCards = new List<Card>();
        }

        public int DeckId { get; set; }
        public string DeckName { get; set; }
        public string DeckType { get; set; }
        public int TotalBlackCards { get; set; }
        public int TotalWhiteCards { get; set; }
        public int TotalCards { get; set; }
        public virtual ICollection<Card> BlackCards { get; set; }
        public virtual ICollection<Card> WhiteCards { get; set; }
    }
}
