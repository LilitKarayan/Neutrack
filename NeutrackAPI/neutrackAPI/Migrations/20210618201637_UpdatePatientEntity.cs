using Microsoft.EntityFrameworkCore.Migrations;

namespace NeutrackAPI.Migrations
{
    public partial class UpdatePatientEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Nutritionists_NutritionistId",
                table: "Patients");

            migrationBuilder.AlterColumn<int>(
                name: "NutritionistId",
                table: "Patients",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Nutritionists_NutritionistId",
                table: "Patients",
                column: "NutritionistId",
                principalTable: "Nutritionists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Nutritionists_NutritionistId",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "NutritionistId",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Nutritionists_NutritionistId",
                table: "Patients",
                column: "NutritionistId",
                principalTable: "Nutritionists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
