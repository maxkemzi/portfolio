const Color = {
	PRIMARY: 'primary',
	PRIMARY_TEXT: 'primaryText',
	SECONDARY: 'secondary',
	SECONDARY_TEXT: 'secondaryText',
	BACKGROUND: 'background',
	BACKGROUND_TEXT: 'backgroundText',
	SURFACE: 'surface',
	SURFACE_TEXT: 'surfaceText',
	DANGER: 'danger',
	DANGER_TEXT: 'dangerText',
	SUCCESS: 'success',
	SUCCESS_TEXT: 'successText',
	INFORMATION: 'information',
	INFORMATION_TEXT: 'informationText',
	WARNING: 'warning',
	WARNING_TEXT: 'warningText',
	INHERIT: 'inherit',
} as const;
type ColorValue = (typeof Color)[keyof typeof Color];

export {Color};
export type {ColorValue};
