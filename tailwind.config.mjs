/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			p1: {
  				light: '#e8effd',
  				DEFAULT: '#007DD0',
  				dark: '#1447b2',
  				darker: '#092153'
  			},
  			p2: {
  				light: '#e8effd',
  				DEFAULT: '#1b5fee',
  				dark: '#1447b3',
  				darker: '#092153'
  			},
  			p4: {
  				light: '#ffe9f2',
  				DEFAULT: '#fd217b',
  				dark: '#be195c',
  				darker: '#590c2b'
  			},
  			p5: {
  				light: '#ece9ff',
  				DEFAULT: '#441eff',
  				dark: '#3317bf',
  				darker: '#180b59'
  			},
  			danger: '#ca0b00',
  			muted: '#727272',
  			'light-sky-blue': '#E9F6FF'
  		},
  		fontFamily: {
  			quicksand: [
  				'var(--font-quicksand)'
  			],
  			roboto: [
  				'var(--font-roboto'
  			]
  		},
  		fontSize: {
  			h1: '3rem',
  			h2: '2.5rem',
  			h3: '2rem',
  			h4: '1.5rem',
  			h5: '1.25rem',
  			h6: '1.15rem',
  			base: '1rem'
  		},
  		transitionTimingFunction: {
  			'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)'
  		},
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1440px',
  		'3xl': '1640px'
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    require("tailwindcss-debug-screens"),
    require("tailwindcss-mixins"),
  ],
};
