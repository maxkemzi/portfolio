import {ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';
import {Color} from '../types';

const ChipColor = Color;
type ChipColorValue = (typeof ChipColor)[keyof typeof ChipColor];

const COLOR_TO_CLASS_NAME_MAPPING: Partial<Record<ChipColorValue, string>> = {
	[ChipColor.PRIMARY]: 'bg-primary-main',
	[ChipColor.PRIMARY_TEXT]: 'bg-primary-contrastText',
	[ChipColor.SECONDARY]: 'bg-secondary-main',
	[ChipColor.SECONDARY_TEXT]: 'bg-secondary-contrastText',
	[ChipColor.BACKGROUND]: 'bg-background-main',
	[ChipColor.BACKGROUND_TEXT]: 'bg-background-contrastText',
	[ChipColor.SURFACE]: 'bg-surface-main',
	[ChipColor.SURFACE_TEXT]: 'bg-surface-contrastText',
	[ChipColor.DANGER]: 'bg-danger-main',
	[ChipColor.DANGER_TEXT]: 'bg-danger-contrastText',
	[ChipColor.SUCCESS]: 'bg-success-main',
	[ChipColor.SUCCESS_TEXT]: 'bg-success-contrastText',
	[ChipColor.INFORMATION]: 'bg-information-main',
	[ChipColor.INFORMATION_TEXT]: 'bg-information-contrastText',
	[ChipColor.WARNING]: 'bg-warning-main',
	[ChipColor.WARNING_TEXT]: 'bg-warning-contrastText',
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
				'inline-block rounded-lg bg-opacity-25 py-1 px-2.5',
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
