namespace Kosarkasi.Migrations
{
    using Kosarkasi.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Kosarkasi.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Kosarkasi.Models.ApplicationDbContext context)
        {

            context.Klubovi.AddOrUpdate(
                new Klub { Id = 1, Naziv = "Sacramento Kings", Liga = "NBA", Godina = 1985, Trofeji = 5 },
                new Klub { Id = 2, Naziv = "Dallas Mavericks", Liga = "NBA", Godina = 1980, Trofeji = 6 },
                new Klub { Id = 3, Naziv = "Indiana Pacers", Liga = "NBA", Godina = 1967, Trofeji = 13 }
                );
            context.SaveChanges();

            context.Kosarkasi.AddOrUpdate(
                new Kosarkas { Id = 1, ImeIPrezime = "Bogdan Bogdanovic", Godina = 1992, BrojUtakmica = 96, BrojPoena = 12.3m, KlubId = 1 },
                new Kosarkas { Id = 2, ImeIPrezime = "Luka Doncic", Godina = 1999, BrojUtakmica = 26, BrojPoena = 18.2m, KlubId = 2 },
                new Kosarkas { Id = 3, ImeIPrezime = "Bojan Bogdanovic", Godina = 1989, BrojUtakmica = 105, BrojPoena = 14.8m, KlubId = 3 },
                new Kosarkas { Id = 4, ImeIPrezime = "Nemanja Bjelica", Godina = 1988, BrojUtakmica = 25, BrojPoena = 10.8m, KlubId = 1 }
                );
            context.SaveChanges();
        }
    }
}
