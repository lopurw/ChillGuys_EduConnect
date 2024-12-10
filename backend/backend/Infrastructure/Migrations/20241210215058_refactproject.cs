using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduConnect.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class refactproject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Courses_CourseId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_CourseId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Deadline",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Projects");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Projects",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Deadline",
                table: "Projects",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_CourseId",
                table: "Projects",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Courses_CourseId",
                table: "Projects",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
