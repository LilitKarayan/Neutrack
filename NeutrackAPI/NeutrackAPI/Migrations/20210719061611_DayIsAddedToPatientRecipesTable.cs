using Microsoft.EntityFrameworkCore.Migrations;

namespace NeutrackAPI.Migrations
{
    public partial class DayIsAddedToPatientRecipesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Day",
                table: "PatientRecipes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Day",
                table: "PatientRecipes");
        }
    }
}
