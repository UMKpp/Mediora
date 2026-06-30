using Mediora.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Mediora.Api.Data;

public class MedioraDbContext : DbContext
{
    public MedioraDbContext(DbContextOptions<MedioraDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Doctor> Doctors => Set<Doctor>();
    public DbSet<Pharmacy> Pharmacies => Set<Pharmacy>();
    public DbSet<EmergencyService> EmergencyServices => Set<EmergencyService>();
    public DbSet<Symptom> Symptoms => Set<Symptom>();
    public DbSet<Condition> Conditions => Set<Condition>();
    public DbSet<ConditionSymptom> ConditionSymptoms => Set<ConditionSymptom>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(user => user.Email).IsUnique();
            entity.HasIndex(user => user.Username).IsUnique();
            entity.Property(user => user.FullName).HasMaxLength(160).IsRequired();
            entity.Property(user => user.Username).HasMaxLength(80).IsRequired();
            entity.Property(user => user.Email).HasMaxLength(160).IsRequired();
            entity.Property(user => user.PasswordHash).IsRequired();
            entity.Property(user => user.Role).HasMaxLength(40).IsRequired();
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.Property(doctor => doctor.Rating).HasPrecision(3, 2);
        });

        modelBuilder.Entity<Pharmacy>(entity =>
        {
            entity.Property(pharmacy => pharmacy.Rating).HasPrecision(3, 2);
        });

        modelBuilder.Entity<ConditionSymptom>()
            .HasOne(mapping => mapping.Condition)
            .WithMany(condition => condition.ConditionSymptoms)
            .HasForeignKey(mapping => mapping.ConditionId);

        modelBuilder.Entity<ConditionSymptom>()
            .HasOne(mapping => mapping.Symptom)
            .WithMany(symptom => symptom.ConditionSymptoms)
            .HasForeignKey(mapping => mapping.SymptomId);

        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder modelBuilder)
    {
        var createdAt = new DateTime(2026, 6, 30, 0, 0, 0, DateTimeKind.Utc);

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                FullName = "Mediora Admin",
                Username = "admin",
                Email = "admin@mediora.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "Admin",
                CreatedAt = createdAt
            },
            new User
            {
                Id = 2,
                FullName = "Mediora User",
                Username = "mediorauser",
                Email = "user@mediora.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("user12345"),
                Role = "User",
                CreatedAt = createdAt
            });

        modelBuilder.Entity<Doctor>().HasData(
            new Doctor { Id = 1, Name = "Dr. Nuwan Silva", Specialization = "General Physician", Province = "Western", District = "Colombo", City = "Colombo", Hospital = "National Hospital of Colombo", Symptoms = "fever,cough,headache", Experience = "12 years", Rating = 4.7m, Availability = "Weekdays", Phone = "011 269 1111", ConsultationHours = "8:00 AM - 4:00 PM", Languages = "Sinhala, English" },
            new Doctor { Id = 2, Name = "Dr. Amara Jayasinghe", Specialization = "Cardiologist", Province = "Central", District = "Kandy", City = "Kandy", Hospital = "Kandy General Hospital", Symptoms = "chest pain,shortness of breath", Experience = "15 years", Rating = 4.8m, Availability = "Mon, Wed, Fri", Phone = "081 222 2222", ConsultationHours = "9:00 AM - 3:00 PM", Languages = "Sinhala, Tamil, English" },
            new Doctor { Id = 3, Name = "Dr. Harini Fernando", Specialization = "Dermatologist", Province = "Southern", District = "Galle", City = "Galle", Hospital = "Karapitiya Teaching Hospital", Symptoms = "rash,itching,skin irritation", Experience = "9 years", Rating = 4.5m, Availability = "Weekends", Phone = "091 224 1880", ConsultationHours = "10:00 AM - 2:00 PM", Languages = "Sinhala, English" });

        modelBuilder.Entity<Pharmacy>().HasData(
            new Pharmacy { Id = 1, Name = "City Health Pharmacy", Province = "Western", District = "Colombo", City = "Colombo", Address = "12 Hospital Road, Colombo", Phone = "011 245 7788", OpeningHours = "8:00 AM - 10:00 PM", IsOpenNow = true, Is24Hours = false, HomeDelivery = true, Rating = 4.6m },
            new Pharmacy { Id = 2, Name = "Green Cross Pharmacy", Province = "Central", District = "Kandy", City = "Kandy", Address = "45 Temple Street, Kandy", Phone = "081 223 4455", OpeningHours = "24 hours", IsOpenNow = true, Is24Hours = true, HomeDelivery = false, Rating = 4.4m },
            new Pharmacy { Id = 3, Name = "MediQuick Pharmacy", Province = "Southern", District = "Galle", City = "Galle", Address = "8 Main Street, Galle", Phone = "091 224 1880", OpeningHours = "9:00 AM - 9:00 PM", IsOpenNow = true, Is24Hours = false, HomeDelivery = true, Rating = 4.3m });

        modelBuilder.Entity<EmergencyService>().HasData(
            new EmergencyService { Id = 1, ServiceName = "Suwa Seriya Ambulance", Hotline = "1990", ServiceType = "Ambulance", Description = "Free island-wide pre-hospital emergency ambulance service.", Email = null, IsUrgent = true },
            new EmergencyService { Id = 2, ServiceName = "Sri Lanka Police", Hotline = "119", ServiceType = "Police", Description = "Public safety emergencies, accidents, and emergency coordination.", Email = null, IsUrgent = true },
            new EmergencyService { Id = 3, ServiceName = "Fire & Rescue Service", Hotline = "110", ServiceType = "Fire and Rescue", Description = "Emergency rescue from accidents or fire hazards.", Email = null, IsUrgent = true },
            new EmergencyService { Id = 4, ServiceName = "National Mental Health Helpline", Hotline = "1926", ServiceType = "Mental Health", Description = "24/7 psychiatric support and crisis intervention.", Email = null, IsUrgent = false });

        modelBuilder.Entity<Symptom>().HasData(
            new Symptom { Id = 1, Name = "Fever", Category = "General" },
            new Symptom { Id = 2, Name = "Cough", Category = "Respiratory" },
            new Symptom { Id = 3, Name = "Headache", Category = "General" },
            new Symptom { Id = 4, Name = "Chest Pain", Category = "Cardiac" },
            new Symptom { Id = 5, Name = "Shortness of Breath", Category = "Respiratory" },
            new Symptom { Id = 6, Name = "Rash", Category = "Skin" });

        modelBuilder.Entity<Condition>().HasData(
            new Condition { Id = 1, Name = "Common Viral Illness", RiskLevel = "Low", Recommendation = "Rest, hydrate, and monitor symptoms. Seek care if symptoms worsen." },
            new Condition { Id = 2, Name = "Respiratory Infection", RiskLevel = "Medium", Recommendation = "Consult a doctor if cough or breathing symptoms persist." },
            new Condition { Id = 3, Name = "Possible Cardiac Emergency", RiskLevel = "High", Recommendation = "Seek emergency care immediately or call 1990." },
            new Condition { Id = 4, Name = "Skin Irritation", RiskLevel = "Low", Recommendation = "Avoid triggers and consult a dermatologist if symptoms persist." });

        modelBuilder.Entity<ConditionSymptom>().HasData(
            new ConditionSymptom { Id = 1, ConditionId = 1, SymptomId = 1 },
            new ConditionSymptom { Id = 2, ConditionId = 1, SymptomId = 3 },
            new ConditionSymptom { Id = 3, ConditionId = 2, SymptomId = 1 },
            new ConditionSymptom { Id = 4, ConditionId = 2, SymptomId = 2 },
            new ConditionSymptom { Id = 5, ConditionId = 2, SymptomId = 5 },
            new ConditionSymptom { Id = 6, ConditionId = 3, SymptomId = 4 },
            new ConditionSymptom { Id = 7, ConditionId = 3, SymptomId = 5 },
            new ConditionSymptom { Id = 8, ConditionId = 4, SymptomId = 6 });
    }
}
