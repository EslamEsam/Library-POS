using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Library_POS.Migrations
{
    /// <inheritdoc />
    public partial class AddingCartProps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BookPrice",
                table: "carts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BookQuantity",
                table: "carts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "BookTitle",
                table: "carts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookPrice",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "BookQuantity",
                table: "carts");

            migrationBuilder.DropColumn(
                name: "BookTitle",
                table: "carts");
        }
    }
}
