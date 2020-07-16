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
    public class KosarkasiController : ApiController
    {
       IKosarkasRepository _repository { get; set; }

        public KosarkasiController(IKosarkasRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<Kosarkas> GetKosarkasi()
        {
            return _repository.GetAll();
        }

        [ResponseType(typeof(Kosarkas))]
        public IHttpActionResult GetKosarkas(int id)
        {
            var kosarkas = _repository.GetById(id);
            if (kosarkas == null)
            {
                return NotFound();
            }

            return Ok(kosarkas);
        }

        public IEnumerable<Kosarkas> GetGodine(int godine)
        {
            return _repository.GetGodine(godine);
        }

        [ResponseType(typeof(Kosarkas))]
        public IHttpActionResult PostKosarkas(Kosarkas kosarkas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repository.Add(kosarkas);
            return CreatedAtRoute("DefaultApi", new { id = kosarkas.Id }, kosarkas);
        }

        private bool KosarkasExists(int id)
        {
            return _repository.GetAll().Count(x => x.Id == id) > 0;
        }

        [ResponseType(typeof(Kosarkas))]
        [Authorize]
        public IHttpActionResult PutKosarkas(int id, Kosarkas kosarkas)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kosarkas.Id)
            {
                return BadRequest();
            }

            try
            {
                _repository.Update(kosarkas);
            }
            catch 
            {
                if (!KosarkasExists(id))
                {
                    return NotFound();
                }
                else 
                {
                    throw;
                }
               
            }

            return Ok(kosarkas);
        }

        [ResponseType(typeof(void))]
        [Authorize]
        public IHttpActionResult DeleteKosarkas(int id)
        {
            var kosarkas = _repository.GetById(id);

            if (kosarkas == null)
            {
                return NotFound();
            }

            _repository.Delete(kosarkas);
            return Ok();
        }

        public class ApiModel {
            public int najmanje { get; set; }
            public int najvise { get; set; }
        }

        [ResponseType(typeof(Kosarkas))]
        [Route("api/pretraga")]
        [Authorize]
        public IHttpActionResult PostPretraga([FromBody]ApiModel model)
        {
            var rezultat = _repository.Pretraga(model.najmanje, model.najvise);
            if (rezultat == null)
            {
                return NotFound();
            }

            return Ok(rezultat);
        }
    }
}
