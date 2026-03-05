import {ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';
import {Color} from '../types';

const ChipColor = Color;
type ChipColorValue = (typeof ChipColor)[keyof typeof ChipColor];

const COLOR_TO_CLASS_NAME_MAPPING: Partial<Record<ChipColorValue, string>> = {
	[ChipColor.PRIMARY]: 'bg-primary-main',
	[ChipColor.BACKGROUND]: 'bg-background-main',
	[ChipColor.SURFACE]: 'bg-surface-main',
	[ChipColor.SURFACE_LIGHT]: 'bg-surface-light',
	[ChipColor.DANGER]: 'bg-danger-main',
	[ChipColor.DANGER_DARK]: 'bg-danger-dark',
	[ChipColor.SUCCESS]: 'bg-success-main',
	[ChipColor.SUCCESS_DARK]: 'bg-success-dark',
	[ChipColor.INFORMATION]: 'bg-information-main',
	[ChipColor.INFORMATION_DARK]: 'bg-information-dark',
	[ChipColor.WARNING]: 'bg-warning-main',
	[ChipColor.WARNING_DARK]: 'bg-warning-dark',
} as const;

const Size = {
	LG: 'lg',
	MD: 'md',
} as const;
type SizeValue = (typeof Size)[keyof typeof Size];

const SIZE_TO_CLASS_NAMES_MAPPING: Record<SizeValue, string> = {
	[Size.LG]: 'py-2 px-3.5',
	[Size.MD]: 'py-1 px-2.5',
} as const;

interface Props {
	className?: string;
	children: ReactNode;
	color?: ChipColorValue;
	size?: SizeValue;
}

const Chip = (props: Props): JSX.Element => {
	const {className, children, color = 'surface', size = 'md'} = props;

	return (
		<div
			className={twMerge(
				'inline-block rounded-full py-1 px-2.5',
				color && COLOR_TO_CLASS_NAME_MAPPING[color],
				size && SIZE_TO_CLASS_NAMES_MAPPING[size],
				className,
			)}
		>
			{children}
		</div>
	);
};

export default Chip;
