import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { ReactNode } from 'react';
import { SignInRequest, AuthResponse, UserAccountType, SignUpRequest, SocialAuthRequest } from '@sunny/shared-types';
export { AuthProvider, AuthResponse, MFAType, Session, SignInRequest, SignUpRequest, SocialAuthRequest, User, UserAccountType } from '@sunny/shared-types';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import { VariantProps } from 'class-variance-authority';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    showBackButton?: boolean;
    backButtonText?: string;
    backButtonHref?: string;
    backgroundVariant?: 'gradient' | 'pattern' | 'simple';
    className?: string;
}
declare function AuthLayout({ children, title, subtitle, showBackButton, backButtonText, backButtonHref, backgroundVariant, className }: AuthLayoutProps): react_jsx_runtime.JSX.Element;

interface AuthPageLayoutProps {
    children: React__default.ReactNode;
    title: string;
    subtitle: string;
    showBackButton?: boolean;
    backButtonText?: string;
    backButtonHref?: string;
    className?: string;
}
declare function AuthPageLayout({ children, title, subtitle, showBackButton, backButtonText, backButtonHref, className, }: AuthPageLayoutProps): react_jsx_runtime.JSX.Element;

interface SignInFormProps {
    onSubmit: (data: SignInRequest) => Promise<AuthResponse>;
    defaultAccountType?: UserAccountType;
    redirectUrl?: string;
    className?: string;
}
declare function SignInForm({ onSubmit, defaultAccountType, redirectUrl, className }: SignInFormProps): react_jsx_runtime.JSX.Element;

interface SimpleSignInFormProps {
    onSubmit: (data: SignInRequest) => Promise<AuthResponse>;
    redirectUrl?: string;
    isLoading?: boolean;
}
declare function SimpleSignInForm({ onSubmit, redirectUrl, isLoading: externalLoading }: SimpleSignInFormProps): react_jsx_runtime.JSX.Element;

interface SignUpFormProps {
    onSubmit: (data: SignUpRequest) => Promise<AuthResponse>;
    defaultAccountType?: UserAccountType;
    redirectUrl?: string;
    className?: string;
}
declare function SignUpForm({ onSubmit, defaultAccountType, redirectUrl, className }: SignUpFormProps): react_jsx_runtime.JSX.Element;

interface SocialAuthButtonsProps {
    onSocialAuth: (data: SocialAuthRequest) => Promise<AuthResponse>;
    accountType?: UserAccountType;
    mode?: 'signin' | 'signup';
    className?: string;
}
declare function SocialAuthButtons({ onSocialAuth, accountType, mode, className }: SocialAuthButtonsProps): react_jsx_runtime.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "default" | "link" | "outline" | "destructive" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface DashboardLayoutProps {
    children: React__default.ReactNode;
    variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
    showHeader?: boolean;
    showFooter?: boolean;
    showSidebar?: boolean;
    sidebarCollapsed?: boolean;
    className?: string;
}
declare const DashboardLayout: React__default.FC<DashboardLayoutProps>;

interface HeroSectionProps {
    variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
    title: string;
    subtitle: string;
    description?: string;
    primaryAction?: {
        text: string;
        href: string;
        onClick?: () => void;
    };
    secondaryAction?: {
        text: string;
        href: string;
        onClick?: () => void;
    };
    backgroundImage?: string;
    showStats?: boolean;
    stats?: Array<{
        label: string;
        value: string;
        description?: string;
    }>;
    className?: string;
}
declare const HeroSection: React__default.FC<HeroSectionProps>;

interface Feature {
    id: string;
    title: string;
    description: string;
    icon: React__default.ReactNode;
    link?: string;
    badge?: string;
    stats?: {
        value: string;
        label: string;
    };
}
interface FeatureGridProps {
    variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
    title?: string;
    subtitle?: string;
    features: Feature[];
    columns?: 2 | 3 | 4;
    showBorder?: boolean;
    showHover?: boolean;
    className?: string;
}
declare const FeatureGrid: React__default.FC<FeatureGridProps>;

interface Stat {
    id: string;
    value: string;
    label: string;
    description?: string;
    trend?: {
        value: number;
        label: string;
        direction: 'up' | 'down' | 'neutral';
    };
    icon?: React__default.ReactNode;
}
interface StatsSectionProps {
    variant: 'user' | 'business' | 'institution' | 'admin' | 'developer';
    title?: string;
    subtitle?: string;
    stats: Stat[];
    layout?: 'horizontal' | 'grid';
    showTrends?: boolean;
    showIcons?: boolean;
    backgroundVariant?: 'light' | 'dark' | 'gradient';
    className?: string;
}
declare const StatsSection: React__default.FC<StatsSectionProps>;

/**
 * Global theme configuration for all Sunny platform applications
 * Extended theme system with dashboard-specific variants
 */
type Theme = 'light' | 'dark' | 'system';
type DashboardVariant = 'marketing' | 'user' | 'business' | 'institution' | 'admin' | 'developer';
interface ThemeColors {
    background: {
        primary: string;
        secondary: string;
        tertiary: string;
        elevated: string;
        card: string;
        surface: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inverse: string;
        muted: string;
    };
    border: {
        primary: string;
        secondary: string;
        accent: string;
        muted: string;
    };
    brand: {
        primary: string;
        secondary: string;
        accent: string;
        light: string;
        dark: string;
    };
    status: {
        success: string;
        warning: string;
        error: string;
        info: string;
    };
    dashboard: {
        marketing: string;
        user: string;
        business: string;
        institution: string;
        admin: string;
        developer: string;
    };
}
interface ThemeConfig {
    name: string;
    colors: ThemeColors;
    shadows: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        inner: string;
    };
    gradients: {
        primary: string;
        secondary: string;
        accent: string;
        dashboard: {
            marketing: string;
            user: string;
            business: string;
            institution: string;
            admin: string;
            developer: string;
        };
    };
    animations: {
        duration: {
            fast: string;
            normal: string;
            slow: string;
        };
        easing: {
            default: string;
            bounce: string;
            smooth: string;
        };
    };
}
declare const lightTheme: ThemeConfig;
declare const darkTheme: ThemeConfig;
declare const themes: {
    readonly light: ThemeConfig;
    readonly dark: ThemeConfig;
};
type ThemeName = keyof typeof themes;

interface ThemeContextType {
    theme: Theme;
    actualTheme: 'light' | 'dark';
    dashboardVariant: DashboardVariant;
    setTheme: (theme: Theme) => void;
    setDashboardVariant: (variant: DashboardVariant) => void;
    toggleTheme: () => void;
    themeConfig: ThemeConfig;
}
interface ThemeProviderProps {
    children: React__default.ReactNode;
    defaultTheme?: Theme;
    dashboardVariant?: DashboardVariant;
    storageKey?: string;
    attribute?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
}
declare function ThemeProvider({ children, defaultTheme, dashboardVariant, storageKey, attribute, enableSystem, disableTransitionOnChange, }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useTheme(): ThemeContextType;
declare function useSafeTheme(): ThemeContextType | null;
declare function useThemeColors(): ThemeColors;
declare function useIsDarkMode(): boolean;
declare function useDashboardColors(): {
    primary: string;
    gradient: string;
};

export { AuthLayout, AuthPageLayout, Button, type ButtonProps, DashboardLayout, type DashboardLayoutProps, type DashboardVariant, type Feature, FeatureGrid, type FeatureGridProps, HeroSection, type HeroSectionProps, SignInForm, SignUpForm, SimpleSignInForm, SocialAuthButtons, type Stat, StatsSection, type StatsSectionProps, type Theme, type ThemeColors, type ThemeConfig, type ThemeContextType, type ThemeName, ThemeProvider, type ThemeProviderProps, buttonVariants, darkTheme, lightTheme, themes, useDashboardColors, useIsDarkMode, useSafeTheme, useTheme, useThemeColors };
