#!/usr/bin/env python3
import argparse
import sys
import os
import readline
import json
from pathlib import Path
import logging
from rich.console import Console
from rich.markdown import Markdown
from rich.prompt import Prompt
from rich.panel import Panel

console = Console()

class SunnyCLI:
    def __init__(self):
        self.console = Console()
        self.history_file = Path.home() / ".sunny_history"
        self.context = {
            "conversation_history": [],
            "settings": self.load_settings()
        }
        self.setup_history()

    def load_settings(self):
        settings_path = Path.home() / ".sunny_config"
        if settings_path.exists():
            try:
                return json.loads(settings_path.read_text())
            except:
                return {"model": "sunny-chat-v1", "temperature": 0.7}
        return {"model": "sunny-chat-v1", "temperature": 0.7}

    def setup_history(self):
        try:
            if not self.history_file.exists():
                self.history_file.touch()
            readline.read_history_file(str(self.history_file))
        except Exception as e:
            logging.warning(f"Could not set up history: {e}")

    def save_history(self):
        try:
            readline.write_history_file(str(self.history_file))
        except Exception as e:
            logging.warning(f"Could not save history: {e}")

    def start_chat(self):
        console.print(Panel.fit(
            "Welcome to Sunny Chat! Type your messages and press Enter. Use /help for commands. Press Ctrl+C to exit.",
            title="🌞 Sunny Chat",
            border_style="yellow"
        ))

        while True:
            try:
                user_input = Prompt.ask("\n[yellow]You[/yellow]")
                
                if user_input.lower() in ['/exit', '/quit']:
                    break
                    
                if user_input.startswith('/'):
                    self.handle_command(user_input)
                    continue

                # Here we would normally send the message to the AI model
                # For now, we'll just echo a placeholder response
                response = self.get_ai_response(user_input)
                
                console.print("\n[green]Sunny[/green]:", style="bold")
                console.print(Markdown(response))

            except KeyboardInterrupt:
                console.print("\nGoodbye! 👋")
                break
            except Exception as e:
                console.print(f"[red]Error: {str(e)}[/red]")

        self.save_history()

    async def handle_command(self, command):
        try:
            from command_processor import CommandProcessor
            
            if command.lower() == '/clear':
                os.system('clear')
                return
            elif command.lower() == '/settings':
                self.show_settings()
                return
                
            # Split command and arguments
            parts = command.split(maxsplit=1)
            cmd = parts[0].lower()
            args = parts[1] if len(parts) > 1 else ""
            
            processor = CommandProcessor(self.console)
            await processor.process_command(cmd, args)
        except ImportError as e:
            console.print("[red]Could not load command processor. Some features may be unavailable.[/red]")
        except Exception as e:
            console.print(f"[red]Error processing command: {str(e)}[/red]")

    def show_help(self):
        help_text = """
        Available Commands:
        /help     - Show this help message
        /clear    - Clear the screen
        /settings - Show current settings
        /exit     - Exit the chat
        """
        console.print(Panel(help_text, title="Help", border_style="blue"))

    def show_settings(self):
        settings = json.dumps(self.context["settings"], indent=2)
        console.print(Panel(settings, title="Current Settings", border_style="blue"))

    def get_ai_response(self, user_input):
        try:
            from model_connector import ModelConnector
            connector = ModelConnector()
            
            if not connector.validate_message(user_input):
                return "I apologize, but I cannot process requests related to system access or sensitive operations."
            
            import asyncio
            response = asyncio.run(connector.get_response(
                user_input,
                context=self.context
            ))
            return response
        except ImportError:
            return "Model connection not available. Please ensure the model server is running."
        except Exception as e:
            logging.error(f"Error getting AI response: {e}")
            return "I apologize, but I encountered an error processing your request."

def main():
    parser = argparse.ArgumentParser(description="Sunny Chat CLI")
    parser.add_argument('--model', help='Specify the model to use')
    parser.add_argument('--no-color', action='store_true', help='Disable colored output')
    args = parser.parse_args()

    if args.no_color:
        console = Console(force_terminal=False)

    cli = SunnyCLI()
    cli.start_chat()

if __name__ == "__main__":
    main()
