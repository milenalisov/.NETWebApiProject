using Kosarkasi.Interfaces;
using Kosarkasi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Kosarkasi.Controllers
{
    public class KluboviController : ApiController
    {
        IKlubRepository _repository { get; set; }

        public KluboviController(IKlubRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Klub> GetKlubovi()
        {
            return _repository.GetAll();
        }

        [ResponseType(typeof(Klub))]
        public IHttpActionResult GetKlub(int id)
        {
            var klub = _repository.GetById(id);
            if (klub == null)
            {
                return NotFound();
            }

            return Ok(klub);
        }
        
        [Route("api/ekstremi")]
        public IEnumerable<Klub> GetEkstremi()
        {
            return _repository.Ekstremi();
        }
    }
}
