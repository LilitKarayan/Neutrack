using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NeutrackAPI.Migrations
{
    public partial class AddNewHistoryTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NutritionistPatientHistories",
                columns: table => new
                {
                    NutritionistId = table.Column<int>(type: "int", nullable: false),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NutritionistPatientHistories", x => new { x.NutritionistId, x.PatientId });
                    table.ForeignKey(
                        name: "FK_NutritionistPatientHistories_Nutritionists_NutritionistId",
                        column: x => x.NutritionistId,
                        principalTable: "Nutritionists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NutritionistPatientHistories_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PatientActivityHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PatientId = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getutcdate()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientActivityHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatientActivityHistories_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NutritionistPatientHistories_PatientId",
                table: "NutritionistPatientHistories",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientActivityHistories_PatientId",
                table: "PatientActivityHistories",
                column: "PatientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NutritionistPatientHistories");

            migrationBuilder.DropTable(
                name: "PatientActivityHistories");
        }
    }
}
