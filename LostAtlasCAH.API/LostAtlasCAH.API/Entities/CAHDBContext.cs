using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LostAtlasCAH.API.Entities
{
    public partial class CAHDbContext : DbContext
    {
        public CAHDbContext()
        {
        }

        public CAHDbContext(DbContextOptions<CAHDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<BlackCards> Blackcards { get; set; }
        public virtual DbSet<Decks> Decks { get; set; }
        public virtual DbSet<WhiteCards> Whitecards { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("server=localhost;port=3306;user=testuser;password=root;database=cahdb");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<BlackCards>(entity =>
            {
                entity.ToTable("blackcards", "cahdb");

                entity.HasIndex(e => e.DeckId)
                    .HasName("DeckID_index");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ComboDeck)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DeckId)
                    .HasColumnName("DeckID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.DeckName)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);

                entity.Property(e => e.Draw)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Pick)
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Deck)
                    .WithMany(p => p.BlackCards)
                    .HasForeignKey(d => d.DeckId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("blackcards_ibfk_1");
            });

            modelBuilder.Entity<Decks>(entity =>
            {
                entity.HasKey(e => e.DeckId);

                entity.ToTable("decks", "cahdb");

                entity.HasIndex(e => e.TotalBlackCards)
                    .HasName("BlackCards_index");

                entity.HasIndex(e => e.TotalCards)
                    .HasName("Total_index");

                entity.HasIndex(e => e.TotalWhiteCards)
                    .HasName("WhiteCards_index");

                entity.Property(e => e.DeckId)
                    .HasColumnName("DeckID")
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever();

                entity.Property(e => e.DeckName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DeckType)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.TotalBlackCards).HasColumnType("int(11)");

                entity.Property(e => e.TotalCards).HasColumnType("int(11)");

                entity.Property(e => e.TotalWhiteCards).HasColumnType("int(11)");
            });

            modelBuilder.Entity<WhiteCards>(entity =>
            {
                entity.ToTable("whitecards", "cahdb");

                entity.HasIndex(e => e.DeckId)
                    .HasName("DeckID_index");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("int(11)")
                    .ValueGeneratedNever();

                entity.Property(e => e.ComboDeck)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DeckId)
                    .HasColumnName("DeckID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.DeckName)
                    .IsRequired()
                    .HasMaxLength(45)
                    .IsUnicode(false);

                entity.Property(e => e.Text)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Deck)
                    .WithMany(p => p.WhiteCards)
                    .HasForeignKey(d => d.DeckId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("whitecards_ibfk_1");
            });
        }
    }
}
