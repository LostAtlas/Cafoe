using System;
using System.Collections.Generic;

namespace LostAtlasCAH.API.Entities
{
    public partial class Decks
    {
        public Decks()
        {
            BlackCards = new HashSet<BlackCards>();
            WhiteCards = new HashSet<WhiteCards>();
        }

        public int DeckId { get; set; }
        public string DeckName { get; set; }
        public string DeckType { get; set; }
        public int TotalBlackCards { get; set; }
        public int TotalWhiteCards { get; set; }
        public int TotalCards { get; set; }

        public virtual ICollection<BlackCards> BlackCards { get; set; }
        public virtual ICollection<WhiteCards> WhiteCards { get; set; }
    }
}
