using System;
using System.Collections.Generic;

namespace LostAtlasCAH.API.Entities
{
    public partial class BlackCards
    {
        public int Id { get; set; }
        public int DeckId { get; set; }
        public string DeckName { get; set; }
        public string Text { get; set; }
        public string Pick { get; set; }
        public string Draw { get; set; }
        public string ComboDeck { get; set; }

        public virtual Decks Deck { get; set; }
    }
}
