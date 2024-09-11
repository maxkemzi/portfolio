enum Variant {
	H1 = 'h1',
	H2 = 'h2',
	H3 = 'h3',
	H4 = 'h4',
	BODY1 = 'body1',
	BODY2 = 'body2',
	INHERIT = 'inherit',
}
type VariantValue = `${Variant}`;

enum Size {
	'6XL' = '6xl',
	'5XL' = '5xl',
	'4XL' = '4xl',
	'2XL' = '2xl',
	XL = 'xl',
	BASE = 'base',
	SM = 'sm',
	INHERIT = 'inherit',
}
type SizeValue = `${Size}`;

enum Weight {
	BOLD = 'bold',
	SEMIBOLD = 'semibold',
	MEDIUM = 'medium',
	NORMAL = 'normal',
	INHERIT = 'inherit',
}
type WeightValue = `${Weight}`;

enum Color {
	PRIMARY = 'primary',
	PRIMARY_TEXT = 'primaryText',
	SECONDARY = 'secondary',
	SECONDARY_TEXT = 'secondaryText',
	BACKGROUND = 'background',
	BACKGROUND_TEXT = 'backgroundText',
	SURFACE = 'surface',
	SURFACE_TEXT = 'surfaceText',
	DANGER = 'danger',
	DANGER_TEXT = 'dangerText',
	SUCCESS = 'success',
	SUCCESS_TEXT = 'successText',
	INHERIT = 'inherit',
}
type ColorValue = `${Color}`;

enum LetterSpacing {
	WIDEST = 'widest',
	WIDER = 'wider',
	WIDE = 'wide',
	NORMAL = 'normal',
	INHERIT = 'inherit',
}
type LetterSpacingValue = `${LetterSpacing}`;

enum TextTransform {
	UPPERCASE = 'uppercase',
	CAPITALIZE = 'capitalize',
	LOWERCASE = 'lowercase',
	NONE = 'none',
	INHERIT = 'inherit',
}
type TextTransformValue = `${TextTransform}`;

enum Align {
	RIGHT = 'right',
	CENTER = 'center',
	LEFT = 'left',
	INHERIT = 'inherit',
}
type AlignValue = `${Align}`;

export {Variant, Size, Weight, Color, LetterSpacing, TextTransform, Align};
export type {
	VariantValue,
	SizeValue,
	WeightValue,
	ColorValue,
	LetterSpacingValue,
	TextTransformValue,
	AlignValue,
};
