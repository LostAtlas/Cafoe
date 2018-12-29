using LostAtlasCAH.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAtlasCAH.API.Models
{
    public class Card
    {
        public int Id { get; set; }
        public int Deckid { get; set; }
        public string Text { get; set; }
        public string Pick { get; set; }
        public string Draw { get; set; }
        public string ComboDeck { get; set; }
    }
}
