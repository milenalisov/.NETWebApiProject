using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Kosarkasi.Models
{
    public class Kosarkas
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(40)]
        public string ImeIPrezime { get; set; }
        [Required]
        [Range(1976, 1999)]
        public int Godina { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int BrojUtakmica { get; set; }
        [Required]
        [Range(0, 30)]
        public decimal BrojPoena { get; set; }

        public int KlubId { get; set; }
        public Klub Klub { get; set; }

    }
}