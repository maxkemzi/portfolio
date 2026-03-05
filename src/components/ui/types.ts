const Color = {
	PRIMARY: 'primary',
	PRIMARY_TEXT: 'primaryText',
	BACKGROUND: 'background',
	BACKGROUND_TEXT: 'backgroundText',
	SURFACE: 'surface',
	SURFACE_LIGHT: 'surfaceLight',
	SURFACE_TEXT: 'surfaceText',
	DANGER: 'danger',
	DANGER_DARK: 'dangerDark',
	DANGER_TEXT: 'dangerText',
	SUCCESS: 'success',
	SUCCESS_DARK: 'successDark',
	SUCCESS_TEXT: 'successText',
	INFORMATION: 'information',
	INFORMATION_DARK: 'informationDark',
	INFORMATION_TEXT: 'informationText',
	WARNING: 'warning',
	WARNING_DARK: 'warningDark',
	WARNING_TEXT: 'warningText',
	INHERIT: 'inherit',
} as const;
type ColorValue = (typeof Color)[keyof typeof Color];

export {Color};
export type {ColorValue};
