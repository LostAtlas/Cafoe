using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LostAtlasCAH.API.Entities;
using LostAtlasCAH.API.Models;
using LostAtlasCAH.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LostAtlasCAH.API.Controllers
{
    [Route("api/CAH")]
    [ApiController]
    public class CAHDeckController : Controller
    {
        private ICAHDeckRepository _cahDeckRepository;

        public CAHDeckController(ICAHDeckRepository cahDeckRepository)
        {
            _cahDeckRepository = cahDeckRepository;
        }

        [HttpGet()]
        //To obtain initial deck information.
        public IActionResult GetEmptyDecks()
        {
            var emptyDecks = _cahDeckRepository.GetEmptyDecks();

            if (emptyDecks == null)
            {
                return NotFound();
            }

            var deckResults = Mapper.Map<IEnumerable<Deck>>(emptyDecks);
            return Ok(deckResults);
        }

        [HttpGet("selected")] //api/CAH/selected?ids=1&ids=2&ids=3
        //TODO: Find a better way to to build query string. Maybe something like ex: selected?ids=1,2,3
        public IActionResult GetSelectedDecks([FromQuery(Name = "ids")] int[] ids)
        {
            var decks = _cahDeckRepository.GetDecks(ids);

            if (decks == null)
            {
                return NotFound();
            }

            var deckResult = Mapper.Map<ICollection<Deck>>(decks);
            return Ok(deckResult);
        }
    }
}