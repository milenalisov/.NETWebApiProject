using Kosarkasi.Interfaces;
using Kosarkasi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kosarkasi.Repository
{
    public class KlubRepository : IDisposable, IKlubRepository
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<Klub> Ekstremi()
        {
            List<Klub> rezultat = new List<Klub>();
            var klubovi = GetAll().OrderBy(x => x.Trofeji);
            rezultat.Add(klubovi.ElementAt(0));
            var duzina = klubovi.Count();
            rezultat.Add(klubovi.ElementAt(duzina - 1));
            return rezultat;

        }

        public IEnumerable<Klub> GetAll()
        {
            return db.Klubovi;
        }

        public Klub GetById(int id)
        {
            return db.Klubovi.Find(id);
        }
    }
}