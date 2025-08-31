'use client';

import React from 'react';

// TypeScript/JavaScript Icon
export const JavaScriptIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
    <path d="M7.5 11.5v4.5c0 1.5-1 2-2.5 2s-2.5-.5-2.5-2h1.5c0 .5.5.5 1 .5s1-.5 1-1v-4h1.5zm4.5 0v3.5c0 1.5.5 2 2 2s2-.5 2-2h-1.5c0 .5-.5.5-1 .5s-.5-.5-.5-1v-3.5h-1zm3.5-2h1.5v1.5H15.5V9.5zm-7 0h1.5v1.5H8.5V9.5z" fill="#000"/>
  </svg>
);

export const TypeScriptIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#3178C6"/>
    <path d="M12.5 8.5h3v1.5h-1.25v6h-1.5v-6H12.5v-1.5zm-5 2.5v-1h4v1h-1.25v5h-1.5v-5H7.5z" fill="white"/>
  </svg>
);

// Python Icon
export const PythonIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="python-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3776AB"/>
        <stop offset="100%" stopColor="#FFD43B"/>
      </linearGradient>
    </defs>
    <path d="M12 2C7.5 2 8.5 4 8.5 4l.01 2h3.99v.5H7c0 0-3 .5-3 5.5s2.5 5 2.5 5h1.5v-2c0-2.5 2-4.5 4.5-4.5h3.5c1.5 0 2.5-1 2.5-2.5V4.5C18 3 16.5 2 12 2z" fill="url(#python-gradient)"/>
    <circle cx="10" cy="5.5" r="0.5" fill="white"/>
  </svg>
);

// Go Icon
export const GoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#00ADD8"/>
    <path d="M5 10.5h2.5c.5 0 1-.5 1-1s-.5-1-1-1H5v2zm0 3h2.5c.5 0 1-.5 1-1s-.5-1-1-1H5v2zm8.5-3.5c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5S11 13.5 11 12s1-2.5 2.5-2.5zm0 1c-.5 0-1 .5-1 1.5s.5 1.5 1 1.5 1-.5 1-1.5-.5-1.5-1-1.5z" fill="white"/>
  </svg>
);

// Java Icon
export const JavaIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#ED8B00"/>
    <path d="M8.5 16c0 .5.5 1 1 1h5c.5 0 1-.5 1-1s-.5-1-1-1h-5c-.5 0-1 .5-1 1zm1-3h4c.5 0 1-.5 1-1s-.5-1-1-1h-4c-.5 0-1 .5-1 1s.5 1 1 1zm0-3h4c.5 0 1-.5 1-1s-.5-1-1-1h-4c-.5 0-1 .5-1 1s.5 1 1 1z" fill="white"/>
  </svg>
);

// C# Icon
export const CSharpIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#239120"/>
    <path d="M12 8c-2 0-3.5 1.5-3.5 3.5S10 15 12 15s3.5-1.5 3.5-3.5S14 8 12 8zm0 5.5c-1 0-2-.5-2-2s1-2 2-2 2 .5 2 2-1 2-2 2zm4-3.5h1v1h-1v-1zm0 2h1v1h-1v-1zm2-2h1v1h-1v-1zm0 2h1v1h-1v-1z" fill="white"/>
  </svg>
);

// PHP Icon
export const PHPIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4"/>
    <path d="M8 9h1.5c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5H8.5v1H8V9zm.5 2.5h1c.25 0 .5-.25.5-.5s-.25-.5-.5-.5h-1v1zm5.5-2.5h1.5c1 0 1.5.5 1.5 1.5s-.5 1.5-1.5 1.5H14.5v1H14V9zm.5 2.5h1c.25 0 .5-.25.5-.5s-.25-.5-.5-.5h-1v1z" fill="white"/>
  </svg>
);

// Ruby Icon
export const RubyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#CC342D"/>
    <path d="M7 7l5 3-3 5-2-8zm5 3l5-3-2 8-3-5zm-5 7l8-2-3 5-5-3zm8-2l3 5-8-2 5-3z" fill="white"/>
  </svg>
);

// Rust Icon
export const RustIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#CE422B"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="white" strokeWidth="1.5"/>
    <path d="M12 8v8m-4-4h8" stroke="white" strokeWidth="1.5"/>
  </svg>
);

// Swift Icon
export const SwiftIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#FA7343"/>
    <path d="M8 8c0 2 2 4 4 4s4-2 4-4-2-4-4-4-4 2-4 4zm0 8c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" fill="white"/>
  </svg>
);

// Kotlin Icon
export const KotlinIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="kotlin-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7F52FF"/>
        <stop offset="100%" stopColor="#FF6B6B"/>
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="4" fill="url(#kotlin-gradient)"/>
    <path d="M6 6h6l-6 6zm0 6l6 6h6l-12-12v6z" fill="white"/>
  </svg>
);

// Dart Icon
export const DartIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#0175C2"/>
    <path d="M8 8l8 4-4 8-4-12zm4 4l4-4v8l-4-4z" fill="white"/>
  </svg>
);

// Elixir Icon
export const ElixirIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="4" fill="#4B275F"/>
    <path d="M12 6c-2 2-2 6 0 8s6 2 8 0-2-6 0-8-6-2-8 0z" fill="white"/>
  </svg>
);

// Language data with icons
export interface Language {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  popular?: boolean;
}

export const languages: Language[] = [
  {
    name: 'JavaScript',
    icon: JavaScriptIcon,
    color: 'from-yellow-400 to-yellow-500',
    description: 'Frontend & Node.js',
    popular: true
  },
  {
    name: 'TypeScript',
    icon: TypeScriptIcon,
    color: 'from-blue-500 to-blue-600',
    description: 'Type-safe JavaScript',
    popular: true
  },
  {
    name: 'Python',
    icon: PythonIcon,
    color: 'from-blue-600 to-yellow-400',
    description: 'Backend & AI/ML',
    popular: true
  },
  {
    name: 'Go',
    icon: GoIcon,
    color: 'from-cyan-400 to-cyan-500',
    description: 'High-performance APIs'
  },
  {
    name: 'Java',
    icon: JavaIcon,
    color: 'from-orange-500 to-red-500',
    description: 'Enterprise applications'
  },
  {
    name: 'C#',
    icon: CSharpIcon,
    color: 'from-green-500 to-green-600',
    description: '.NET ecosystem'
  },
  {
    name: 'PHP',
    icon: PHPIcon,
    color: 'from-indigo-500 to-purple-500',
    description: 'Web applications'
  },
  {
    name: 'Ruby',
    icon: RubyIcon,
    color: 'from-red-500 to-red-600',
    description: 'Ruby on Rails'
  },
  {
    name: 'Rust',
    icon: RustIcon,
    color: 'from-orange-600 to-red-600',
    description: 'Systems programming'
  },
  {
    name: 'Swift',
    icon: SwiftIcon,
    color: 'from-orange-400 to-red-500',
    description: 'iOS & macOS'
  },
  {
    name: 'Kotlin',
    icon: KotlinIcon,
    color: 'from-purple-500 to-pink-500',
    description: 'Android & JVM'
  },
  {
    name: 'Dart',
    icon: DartIcon,
    color: 'from-blue-500 to-blue-600',
    description: 'Flutter development'
  },
  {
    name: 'R',
    icon: ElixirIcon, // Reusing icon with different color
    color: 'from-blue-600 to-blue-700',
    description: 'Data science & ML'
  },
  {
    name: 'Scala',
    icon: JavaIcon, // Similar to Java
    color: 'from-red-600 to-red-700',
    description: 'Functional programming'
  },
  {
    name: 'Perl',
    icon: RubyIcon, // Reusing with different color
    color: 'from-purple-600 to-purple-700',
    description: 'System administration'
  },
  {
    name: 'Haskell',
    icon: ElixirIcon, // Functional language icon
    color: 'from-purple-500 to-purple-600',
    description: 'Pure functional'
  },
  {
    name: 'C++',
    icon: CSharpIcon, // Similar to C#
    color: 'from-blue-700 to-blue-800',
    description: 'Systems & performance'
  },
  {
    name: 'Lua',
    icon: RustIcon, // Reusing with different color
    color: 'from-indigo-500 to-indigo-600',
    description: 'Embedded scripting'
  },
  {
    name: 'OCaml',
    icon: ElixirIcon,
    color: 'from-orange-500 to-orange-600',
    description: 'Functional programming'
  },
  {
    name: 'F#',
    icon: CSharpIcon,
    color: 'from-blue-500 to-purple-500',
    description: 'Functional .NET'
  }
];
