const sizes = {};

for (let i = 0; i < 500; i++) {
	sizes[i] = `${i / 4}rem`;
	sizes[`${i}.5`] = `${(i + 0.5) / 4}rem`;
}

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Helvetica Neue', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				serif: ['IBMPlexSerif', 'Palatino', 'ui-serif'],
				inter: ['inter', 'sans-serif']
			},
			fontSize: {
				xs: ['0.75rem', '1.125rem'],
				sm: ['0.875rem', '1.25rem'],
				md: ['1rem', '1.5rem'],
				lg: ['1.125rem', '1.75rem'],
				xl: ['1.25rem', '1.875rem'],
				'2xl': ['1.5rem', '2rem'] // H1
			},
			screens: {
				sm: '32em',
				md: '48em',
				lg: '64em',
				xl: '80em',
				'2xl': '96em',
				'sm-max': { max: '48em' },
				'sm-only': { min: '32em', max: '48em' },
				'md-only': { min: '48em', max: '64em' },
				'lg-only': { min: '64em', max: '80em' },
				'xl-only': { min: '80em', max: '96em' },
				'2xl-only': { min: '96em' },
				mobile: { max: '48em' },
				tablet: { min: '48em', max: '64em' },
				desktop: { min: '64em' }
			},
			spacing: {
				...sizes
			},
			height: {
				...sizes
			},
			width: {
				...sizes
			},
			padding: {
				button: '10px 18px' //p-button
			},
			boxShadow: {
				custom:
					'0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.10)'
			},
			colors: {
				//Primary
				gray: {
					25: '#FFFFFD',
					50: '#F9F9F6',
					100: '#F1F1F0',
					200: '#E0E0DF',
					300: '#C8C8C5',
					400: '#9C9C97',
					500: '#70706B',
					600: '#545450',
					700: '#3D3D3B',
					800: '#13131F',
					900: '#111110'
				},
				warning: {
					25: '#FFFCF5',
					50: '#FFFAEB',
					100: '#FEFC07',
					200: '#FEDF89',
					300: '#FEC84B',
					400: '#FD8022',
					500: '#F79009',
					600: '#DC6803',
					700: '#B54708',
					800: '#93370D',
					900: '#7A2E0E'
				},
				success: {
					25: '#F6EFE9',
					50: '#ECFDF3',
					100: '#D1FADF',
					200: '#A6F4C5',
					300: '#6CE9A6',
					400: '#32D583',
					500: '#12B76A',
					600: '#039855',
					700: '#027A48',
					800: '#05603A',
					900: '#054F31'
				},
				red: {
					600: '#E31B54'
				},
				orange: {
					600: '#DC6803'
				},
				//secondary
				bluegray: {
					25: '#FFFFFD',
					50: '#F8F9FC',
					100: '#EAECF5',
					200: '#D5D9EB',
					300: '#AFB5D9',
					400: '#717BBC',
					500: '#4E5BA6',
					600: '#3E4784',
					700: '#363F72',
					800: '#293056',
					900: '#101323'
				},
				rose: {
					25: '#FFF5F6',
					50: '#FFF1F3',
					100: '#FFE4E8',
					200: '#FECDD6',
					300: '#FEA3B4',
					400: '#FD6F8E',
					500: '#F63D68',
					600: '#E31B54',
					700: '#C01048',
					800: '#A11043',
					900: '#89123E'
				},
				bluelight: {
					25: '#F5FBFF',
					50: '#F0F9FF',
					100: '#E0F2FE',
					200: '#B9E6FE',
					300: '#7CD4FD',
					400: '#36BFFA',
					500: '#0BA5EC',
					600: '#0086C9',
					700: '#026AA2',
					800: '#065986',
					900: '#0B4A6F'
				}
			}
		}
	},
	plugins: []
};
