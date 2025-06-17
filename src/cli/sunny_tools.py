import json
import re
import hashlib
import base64
from datetime import datetime
from typing import Dict, Any, List
import requests

class SunnyTools:
    @staticmethod
    def format_code(code: str, language: str) -> str:
        """Format code snippets with proper indentation."""
        # Basic indentation formatting
        lines = code.split('\n')
        if not lines:
            return code
            
        # Remove common leading whitespace
        def get_leading_spaces(line: str) -> int:
            return len(line) - len(line.lstrip())
            
        non_empty_lines = [l for l in lines if l.strip()]
        if not non_empty_lines:
            return code
            
        min_indent = min(get_leading_spaces(l) for l in non_empty_lines)
        return '\n'.join(l[min_indent:] if l.strip() else '' for l in lines)

    @staticmethod
    def generate_hash(data: str, algorithm: str = 'sha256') -> str:
        """Generate a hash of the given data."""
        h = hashlib.new(algorithm)
        h.update(data.encode())
        return h.hexdigest()

    @staticmethod
    def encode_decode(text: str, operation: str = 'encode', encoding: str = 'base64') -> str:
        """Encode or decode text using various encodings."""
        if encoding == 'base64':
            if operation == 'encode':
                return base64.b64encode(text.encode()).decode()
            return base64.b64decode(text.encode()).decode()
        raise ValueError(f"Unsupported encoding: {encoding}")

    @staticmethod
    def validate_json(json_str: str) -> tuple[bool, str]:
        """Validate JSON string and format it."""
        try:
            parsed = json.loads(json_str)
            return True, json.dumps(parsed, indent=2)
        except json.JSONDecodeError as e:
            return False, str(e)

    @staticmethod
    def regex_test(pattern: str, test_string: str) -> Dict[str, Any]:
        """Test a regex pattern against a string."""
        try:
            regex = re.compile(pattern)
            matches = regex.finditer(test_string)
            results = []
            for match in matches:
                results.append({
                    'group': match.group(),
                    'start': match.start(),
                    'end': match.end(),
                    'groups': match.groups(),
                    'named_groups': match.groupdict()
                })
            return {
                'valid': True,
                'matches': results,
                'match_count': len(results)
            }
        except re.error as e:
            return {
                'valid': False,
                'error': str(e)
            }

    @staticmethod
    def convert_case(text: str, case_type: str) -> str:
        """Convert text between different case styles."""
        if case_type == 'camel':
            words = text.split('_')
            return words[0] + ''.join(word.capitalize() for word in words[1:])
        elif case_type == 'snake':
            return re.sub(r'(?<!^)(?=[A-Z])', '_', text).lower()
        elif case_type == 'kebab':
            return re.sub(r'(?<!^)(?=[A-Z])', '-', text).lower()
        elif case_type == 'pascal':
            return ''.join(word.capitalize() for word in re.split(r'[_-]', text))
        return text

    @staticmethod
    def timestamp_converter(timestamp: str, from_format: str, to_format: str) -> str:
        """Convert timestamps between different formats."""
        try:
            dt = datetime.strptime(timestamp, from_format)
            return dt.strftime(to_format)
        except ValueError as e:
            return str(e)

    @staticmethod
    def url_encode_decode(url: str, operation: str = 'encode') -> str:
        """Encode or decode URLs."""
        from urllib.parse import quote, unquote
        try:
            if operation == 'encode':
                return quote(url)
            return unquote(url)
        except Exception as e:
            return str(e)

    @staticmethod
    def validate_email(email: str) -> Dict[str, Any]:
        """Validate email address format."""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        match = re.match(pattern, email)
        if match:
            parts = email.split('@')
            return {
                'valid': True,
                'local': parts[0],
                'domain': parts[1]
            }
        return {
            'valid': False,
            'error': 'Invalid email format'
        }

    @staticmethod
    async def color_converter(color: str) -> Dict[str, Any]:
        """Convert between different color formats (hex, rgb, hsl)."""
        def hex_to_rgb(hex_color: str) -> tuple:
            hex_color = hex_color.lstrip('#')
            return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

        def rgb_to_hex(rgb: tuple) -> str:
            return '#{:02x}{:02x}{:02x}'.format(*rgb)

        try:
            if color.startswith('#'):
                rgb = hex_to_rgb(color)
                return {
                    'hex': color,
                    'rgb': f'rgb({rgb[0]}, {rgb[1]}, {rgb[2]})'
                }
            elif color.startswith('rgb'):
                values = re.findall(r'\d+', color)
                rgb = tuple(map(int, values))
                return {
                    'rgb': color,
                    'hex': rgb_to_hex(rgb)
                }
            raise ValueError("Unsupported color format")
        except Exception as e:
            return {'error': str(e)}
