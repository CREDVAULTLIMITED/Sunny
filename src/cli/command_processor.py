from typing import Dict, Any, Optional
from sunny_tools import SunnyTools
import json
from rich.table import Table
from rich.panel import Panel
from rich.syntax import Syntax

class CommandProcessor:
    def __init__(self, console):
        self.console = console
        self.tools = SunnyTools()
        self.commands = {
            '/format': self.format_code,
            '/hash': self.generate_hash,
            '/encode': self.encode_text,
            '/decode': self.decode_text,
            '/json': self.validate_json,
            '/regex': self.test_regex,
            '/case': self.convert_case,
            '/time': self.convert_timestamp,
            '/url': self.url_tool,
            '/email': self.validate_email,
            '/color': self.convert_color,
            '/help': self.show_help
        }

    async def process_command(self, command: str, args: str) -> None:
        cmd = self.commands.get(command)
        if cmd:
            await cmd(args)
        else:
            self.console.print("[red]Unknown command. Type /help for available commands.[/red]")

    async def format_code(self, args: str) -> None:
        """Format code with syntax highlighting."""
        if not args:
            self.console.print("[red]Usage: /format <language> <code>[/red]")
            return

        try:
            lang, *code_parts = args.split(maxsplit=1)
            if not code_parts:
                self.console.print("[red]Please provide code to format[/red]")
                return

            code = code_parts[0]
            formatted = self.tools.format_code(code, lang)
            self.console.print(Syntax(formatted, lang, theme="monokai"))
        except Exception as e:
            self.console.print(f"[red]Error formatting code: {e}[/red]")

    async def generate_hash(self, text: str) -> None:
        """Generate hash of text."""
        if not text:
            self.console.print("[red]Usage: /hash <text> [algorithm][/red]")
            return

        parts = text.split()
        algorithm = 'sha256' if len(parts) == 1 else parts[-1]
        text = ' '.join(parts[:-1] if len(parts) > 1 else parts)
        
        try:
            result = self.tools.generate_hash(text, algorithm)
            self.console.print(Panel(result, title=f"{algorithm} Hash", border_style="green"))
        except Exception as e:
            self.console.print(f"[red]Error generating hash: {e}[/red]")

    async def encode_text(self, text: str) -> None:
        """Encode text in various formats."""
        if not text:
            self.console.print("[red]Usage: /encode <text> [encoding][/red]")
            return

        parts = text.split()
        encoding = 'base64' if len(parts) == 1 else parts[-1]
        text = ' '.join(parts[:-1] if len(parts) > 1 else parts)
        
        try:
            result = self.tools.encode_decode(text, 'encode', encoding)
            self.console.print(Panel(result, title=f"{encoding} Encoded", border_style="green"))
        except Exception as e:
            self.console.print(f"[red]Error encoding text: {e}[/red]")

    async def decode_text(self, text: str) -> None:
        """Decode text from various formats."""
        if not text:
            self.console.print("[red]Usage: /decode <text> [encoding][/red]")
            return

        parts = text.split()
        encoding = 'base64' if len(parts) == 1 else parts[-1]
        text = ' '.join(parts[:-1] if len(parts) > 1 else parts)
        
        try:
            result = self.tools.encode_decode(text, 'decode', encoding)
            self.console.print(Panel(result, title=f"{encoding} Decoded", border_style="green"))
        except Exception as e:
            self.console.print(f"[red]Error decoding text: {e}[/red]")

    async def validate_json(self, json_str: str) -> None:
        """Validate and format JSON."""
        if not json_str:
            self.console.print("[red]Usage: /json <json_string>[/red]")
            return

        valid, result = self.tools.validate_json(json_str)
        if valid:
            self.console.print(Syntax(result, "json", theme="monokai"))
        else:
            self.console.print(f"[red]Invalid JSON: {result}[/red]")

    async def test_regex(self, args: str) -> None:
        """Test regex pattern."""
        if not args or len(args.split()) < 2:
            self.console.print("[red]Usage: /regex <pattern> <test_string>[/red]")
            return

        pattern, test_string = args.split(maxsplit=1)
        result = self.tools.regex_test(pattern, test_string)
        
        if result['valid']:
            table = Table(title="Regex Matches")
            table.add_column("Match", style="cyan")
            table.add_column("Position", style="green")
            table.add_column("Groups", style="yellow")
            
            for match in result['matches']:
                table.add_row(
                    match['group'],
                    f"{match['start']}-{match['end']}",
                    str(match['groups'])
                )
            
            self.console.print(table)
        else:
            self.console.print(f"[red]Invalid regex pattern: {result['error']}[/red]")

    async def convert_case(self, args: str) -> None:
        """Convert between different case styles."""
        if not args or len(args.split()) < 2:
            self.console.print("[red]Usage: /case <text> <case_type>[/red]")
            return

        text, case_type = args.rsplit(maxsplit=1)
        result = self.tools.convert_case(text, case_type)
        self.console.print(Panel(result, title=f"Converted to {case_type} case", border_style="green"))

    async def convert_timestamp(self, args: str) -> None:
        """Convert between timestamp formats."""
        if not args or len(args.split()) < 3:
            self.console.print("[red]Usage: /time <timestamp> <from_format> <to_format>[/red]")
            return

        timestamp, from_format, to_format = args.split(maxsplit=2)
        result = self.tools.timestamp_converter(timestamp, from_format, to_format)
        self.console.print(Panel(result, title="Timestamp Conversion", border_style="green"))

    async def url_tool(self, args: str) -> None:
        """Encode or decode URLs."""
        if not args:
            self.console.print("[red]Usage: /url <encode|decode> <url>[/red]")
            return

        operation, url = args.split(maxsplit=1)
        if operation not in ['encode', 'decode']:
            self.console.print("[red]Operation must be either 'encode' or 'decode'[/red]")
            return

        result = self.tools.url_encode_decode(url, operation)
        self.console.print(Panel(result, title=f"URL {operation}d", border_style="green"))

    async def validate_email(self, email: str) -> None:
        """Validate email address."""
        if not email:
            self.console.print("[red]Usage: /email <email_address>[/red]")
            return

        result = self.tools.validate_email(email)
        if result['valid']:
            table = Table(title="Email Validation")
            table.add_column("Component", style="cyan")
            table.add_column("Value", style="green")
            
            table.add_row("Local Part", result['local'])
            table.add_row("Domain", result['domain'])
            
            self.console.print(table)
        else:
            self.console.print(f"[red]{result['error']}[/red]")

    async def convert_color(self, color: str) -> None:
        """Convert between color formats."""
        if not color:
            self.console.print("[red]Usage: /color <color_value>[/red]")
            return

        result = await self.tools.color_converter(color)
        if 'error' in result:
            self.console.print(f"[red]{result['error']}[/red]")
        else:
            table = Table(title="Color Conversion")
            table.add_column("Format", style="cyan")
            table.add_column("Value", style="green")
            
            for format_name, value in result.items():
                table.add_row(format_name, value)
            
            self.console.print(table)

    async def show_help(self, _: str = None) -> None:
        """Show help information."""
        help_text = """
Available Commands:
/format <language> <code>  - Format and highlight code
/hash <text> [algorithm]   - Generate hash of text
/encode <text> [encoding]  - Encode text (base64, etc)
/decode <text> [encoding]  - Decode text
/json <json_string>        - Validate and format JSON
/regex <pattern> <text>    - Test regular expressions
/case <text> <type>        - Convert case (camel, snake, kebab, pascal)
/time <stamp> <from> <to>  - Convert timestamps
/url <encode|decode> <url> - Encode/decode URLs
/email <address>           - Validate email address
/color <value>            - Convert color formats
/help                      - Show this help message
/exit                      - Exit the chat
        """
        self.console.print(Panel(help_text, title="Available Commands", border_style="blue"))
