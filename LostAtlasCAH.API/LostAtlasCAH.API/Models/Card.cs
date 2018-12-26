using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LostAtlasCAH.API.Models
{
    public abstract class Card
    {
        public int Id;
        public int DeckID;
        public string Text;
    }
}
