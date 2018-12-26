using System;
using System.Collections.Generic;

namespace LostAtlasCAH.API.cahdb_test
{
    public partial class Alldecks
    {
        public int DeckId { get; set; }
        public string DeckName { get; set; }
        public string DeckType { get; set; }
        public int BlackCards { get; set; }
        public int WhiteCards { get; set; }
        public int Total { get; set; }
        public ICollection<Blackcardstable> AllBlackCards { get; set; }
            = new List<Blackcardstable>();

        public ICollection<Whitecardstable> AllWhiteCards { get; set; }
            = new List<Whitecardstable>();
    }
}
