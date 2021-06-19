using Microsoft.EntityFrameworkCore.Migrations;

namespace NeutrackAPI.Migrations
{
    public partial class AddPatientsAndNutritionistTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Users_FeedbackFromId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Users_FeedbackToId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_NutritionistRates_Users_UserId",
                table: "NutritionistRates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NutritionistRates",
                table: "NutritionistRates");

            migrationBuilder.DropColumn(
                name: "ActivityLevel",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Goal",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "YearsOfExperience",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "NutritionistRates",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "FeedbackToId",
                table: "Feedbacks",
                newName: "PatientId");

            migrationBuilder.RenameColumn(
                name: "FeedbackFromId",
                table: "Feedbacks",
                newName: "NutritionistId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_FeedbackToId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_FeedbackFromId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_NutritionistId");

            migrationBuilder.AddColumn<int>(
                name: "NutritionistId",
                table: "NutritionistRates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_NutritionistRates",
                table: "NutritionistRates",
                columns: new[] { "NutritionistId", "RateId" });

            migrationBuilder.CreateTable(
                name: "Nutritionists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    YearsOfExperience = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nutritionists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Nutritionists_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    Height = table.Column<double>(type: "float", nullable: false),
                    Weight = table.Column<double>(type: "float", nullable: false),
                    Goal = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    ActivityLevel = table.Column<int>(type: "int", nullable: false),
                    NutritionistId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Patients_Nutritionists_NutritionistId",
                        column: x => x.NutritionistId,
                        principalTable: "Nutritionists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Patients_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Nutritionists_UserId",
                table: "Nutritionists",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_NutritionistId",
                table: "Patients",
                column: "NutritionistId");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_UserId",
                table: "Patients",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Nutritionists_NutritionistId",
                table: "Feedbacks",
                column: "NutritionistId",
                principalTable: "Nutritionists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Patients_PatientId",
                table: "Feedbacks",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NutritionistRates_Nutritionists_NutritionistId",
                table: "NutritionistRates",
                column: "NutritionistId",
                principalTable: "Nutritionists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Nutritionists_NutritionistId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Patients_PatientId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_NutritionistRates_Nutritionists_NutritionistId",
                table: "NutritionistRates");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "Nutritionists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NutritionistRates",
                table: "NutritionistRates");

            migrationBuilder.DropColumn(
                name: "NutritionistId",
                table: "NutritionistRates");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "NutritionistRates",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "PatientId",
                table: "Feedbacks",
                newName: "FeedbackToId");

            migrationBuilder.RenameColumn(
                name: "NutritionistId",
                table: "Feedbacks",
                newName: "FeedbackFromId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_PatientId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_FeedbackToId");

            migrationBuilder.RenameIndex(
                name: "IX_Feedbacks_NutritionistId",
                table: "Feedbacks",
                newName: "IX_Feedbacks_FeedbackFromId");

            migrationBuilder.AddColumn<int>(
                name: "ActivityLevel",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Goal",
                table: "Users",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Height",
                table: "Users",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "Users",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "YearsOfExperience",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_NutritionistRates",
                table: "NutritionistRates",
                columns: new[] { "UserId", "RateId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Users_FeedbackFromId",
                table: "Feedbacks",
                column: "FeedbackFromId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Users_FeedbackToId",
                table: "Feedbacks",
                column: "FeedbackToId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_NutritionistRates_Users_UserId",
                table: "NutritionistRates",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
