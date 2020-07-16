using Kosarkasi.Interfaces;
using Kosarkasi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;

namespace Kosarkasi.Repository
{
    public class KosarkasRepository : IDisposable, IKosarkasRepository
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        public void Add(Kosarkas kosarkas)
        {
            db.Kosarkasi.Add(kosarkas);
            db.SaveChanges();
        }

        public void Delete(Kosarkas kosarkas)
        {
            db.Kosarkasi.Remove(kosarkas);
            db.SaveChanges();
        }

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

        public IEnumerable<Kosarkas> GetAll()
        {
            return db.Kosarkasi.Include(x => x.Klub).OrderByDescending(x => x.BrojPoena);
        }

        public Kosarkas GetById(int id)
        {
            return db.Kosarkasi.Include(x => x.Klub).SingleOrDefault(x => x.Id == id);
        }

        public IEnumerable<Kosarkas> GetGodine(int godine)
        {
            return GetAll().Where(x => x.Godina > godine).OrderBy(x => x.Godina);
        }

        public IEnumerable<Kosarkas> Pretraga(int najmanje, int najvise)
        {
            return GetAll().Where(x => x.BrojUtakmica > najmanje && x.BrojUtakmica < najvise).OrderByDescending(x => x.BrojPoena);
        }

        public void Update(Kosarkas kosarkas)
        {
            db.Entry(kosarkas).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
        }
    }
}