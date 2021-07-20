using Microsoft.EntityFrameworkCore.Migrations;

namespace NeutrackAPI.Migrations
{
    public partial class CompositeKeyOfPatientRecipeIsModified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PatientRecipes",
                table: "PatientRecipes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PatientRecipes",
                table: "PatientRecipes",
                columns: new[] { "RecipeID", "PatientID", "Day" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PatientRecipes",
                table: "PatientRecipes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PatientRecipes",
                table: "PatientRecipes",
                columns: new[] { "RecipeID", "PatientID" });
        }
    }
}
