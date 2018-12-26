using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAtlasCAH.API.Models
{
    public class Deck
    {
        public int DeckId { get; set; }
        public string DeckName { get; set; }
        public string DeckType { get; set; }
        public int BlackCards { get; set; }
        public int WhiteCards { get; set; }
        public int Total { get; set; }

        public ICollection<BlackCard> AllBlackCards { get; set; }
            = new List<BlackCard>();

        public ICollection<WhiteCard> AllWhiteCards { get; set; }
            = new List<WhiteCard>();
    }
}
