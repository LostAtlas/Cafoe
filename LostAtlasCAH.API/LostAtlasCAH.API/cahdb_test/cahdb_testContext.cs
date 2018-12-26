using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LostAtlasCAH.API.cahdb_test
{
    public partial class cahdb_testContext : DbContext
    {
        public cahdb_testContext()
        {
        }

        public cahdb_testContext(DbContextOptions<cahdb_testContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Alldecks> Alldecks { get; set; }
        public virtual DbSet<Blackcardstable> Blackcardstable { get; set; }
        public virtual DbSet<Whitecardstable> Whitecardstable { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=Scorpio94!;database=cahdb_test");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Alldecks>(entity =>
            {
                entity.HasKey(e => e.DeckId);

                entity.ToTable("alldecks", "cahdb_test");

                entity.HasIndex(e => e.BlackCards)
                    .HasName("BlackCards_index");

                entity.HasIndex(e => e.Total)
                    .HasName("Total_index");

                entity.HasIndex(e => e.WhiteCards)
                    .HasName("WhiteCards_index");

                entity.Property(e => e.DeckId)
                    .HasColumnName("DeckID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.BlackCards).HasColumnType("int(11)");

                entity.Property(e => e.DeckName)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DeckType)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Total).HasColumnType("int(11)");

                entity.Property(e => e.WhiteCards).HasColumnType("int(11)");
            });

            modelBuilder.Entity<Blackcardstable>(entity =>
            {
                entity.ToTable("blackcardstable", "cahdb_test");

                entity.HasIndex(e => e.Deckid)
                    .HasName("DECKID_index");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ComboDeck)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Deckid)
                    .HasColumnName("DECKID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Draw)
                    .HasColumnName("DRAW")
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Pick)
                    .HasColumnName("PICK")
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("TEXT")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Whitecardstable>(entity =>
            {
                entity.ToTable("whitecardstable", "cahdb_test");

                entity.HasIndex(e => e.Deckid)
                    .HasName("DECKID_index");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ComboDeck)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Deckid)
                    .HasColumnName("DECKID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
