/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '2rem',
				screens: {
					'2xl': '1400px'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				serif: ['Cormorant Garamond', 'Georgia', 'serif'],
				sans: ['DM Sans', 'system-ui', 'sans-serif'],
			},
			boxShadow: {
				'elegant': '0 4px 24px -4px rgba(0,0,0,0.06), 0 8px 48px -8px rgba(0,0,0,0.04)',
				'soft': '0 2px 16px -2px rgba(0,0,0,0.05)',
				'inner-elegant': 'inset 0 1px 0 0 rgba(255,255,255,0.6)',
			},
			colors: {
				// Pastel & earthy palette – expanded with more shades and accent families
				sand: {
					50: '#FAF8F5',
					100: '#F5F0E8',
					200: '#E8E0D5',
					300: '#D4C8B8',
					400: '#B8A898',
				},
				sage: {
					50: '#F2F6EF',
					100: '#E4EDE0',
					200: '#D4E0C8',
					300: '#B8C9A8',
					400: '#9CB088',
					500: '#8A9B76',
					600: '#6B7C5A',
					700: '#556345',
				},
				terracotta: {
					50: '#FBF5F0',
					100: '#F5EBE3',
					200: '#E8D4C4',
					300: '#D4B89E',
					400: '#C4A080',
					500: '#B08868',
					600: '#987858',
					700: '#7D6248',
				},
				// Soft accent colors
				lavender: {
					100: '#EDE8F2',
					200: '#DDD4E8',
					300: '#C4B5D8',
					400: '#A890C4',
					500: '#8B6BAE',
				},
				amber: {
					100: '#FDF3E3',
					200: '#FAE8CC',
					300: '#F5D9A8',
					400: '#E8C078',
					500: '#D4A050',
				},
				slate: {
					100: '#E8ECF0',
					200: '#D4DCE6',
					300: '#B0BCC8',
					400: '#8A9AAA',
					500: '#6B7C8E',
				},
				moss: {
					400: '#7D9B76',
					500: '#6B8A64',
					600: '#5A7352',
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				rose: {
					'50': '#fff1f2'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
			},
			keyframes: {
				marquee: {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(calc(-100% - var(--gap)))' }
				},
				'marquee-vertical': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(calc(-100% - var(--gap)))' }
				},
				'gradient-x': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'gradient-y': {
					'0%, 100%': { backgroundPosition: '50% 0%' },
					'50%': { backgroundPosition: '50% 100%' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-12px) rotate(2deg)' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				marquee: 'marquee var(--duration) infinite linear',
				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
				'gradient-x': 'gradient-x 8s ease infinite',
				'gradient-y': 'gradient-y 8s ease infinite',
				float: 'float 4s ease-in-out infinite',
				'float-slow': 'float-slow 6s ease-in-out infinite',
				shimmer: 'shimmer 2.5s linear infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards'
			},
			backgroundSize: {
				'gradient-flow': '200% 200%'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}