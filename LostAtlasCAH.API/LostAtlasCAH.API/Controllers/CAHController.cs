using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LostAtlasCAH.API.cahdb_test;
using LostAtlasCAH.API.Services;
using LostAtlasCAH.API.Models;

namespace LostAtlasCAH.API.Controllers
{
    [Route("api/CAH")]
    [ApiController]
    public class CAHController : ControllerBase
    {
        private readonly cahdb_testContext _context;
        private ICAHRepository _cAHRepository;

        public CAHController(cahdb_testContext context, ICAHRepository cAHRepository)
        {
            _context = context;
            _cAHRepository = cAHRepository;
        }

        // GET: api/CAH
        [HttpGet]
        public IEnumerable<Alldecks> GetAlldecks()
        {
            return _context.Alldecks;
        }

        // GET: api/CAH/5
        [HttpGet("{id}")]
        public IActionResult GetDeck(int id, bool includeCards = true)
        {
            var deck = _cAHRepository.GetDeck(id, includeCards);

            if (deck == null)
            {
                return NotFound();
            }

            if (includeCards)
            {
                var cityResult = Mapper.Map<Deck>(deck);
                return Ok(cityResult);
            }

            var deckWithoutCards = Mapper.Map<Deck>(deck);
            return Ok(deckWithoutCards);
        }

        //https://localhost:5001/api/CAH/children?childrenIds=1&childrenIds=2&childrenIds=3
        [HttpGet("children")] //([FromQuery(Name="childrenIds")
        public IActionResult GetMultipleDeck([FromQuery(Name = "childrenIds")] int[] childrenIds, bool includeCards = true)
        {
            var deck = _cAHRepository.GetMultipleDecks(childrenIds, includeCards);

            if (deck == null)
            {
                return NotFound();
            }

            if (includeCards)
            {
                var deckResult = Mapper.Map<ICollection<Deck>>(deck);
                return Ok(deckResult);
            }

            var deckWithoutCards = Mapper.Map<Deck>(deck);
            return Ok(deckWithoutCards);
        }


        private bool AlldecksExists(int id)
        {
            return _context.Alldecks.Any(e => e.DeckId == id);
        }
    }
}