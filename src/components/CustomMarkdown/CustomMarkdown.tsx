import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {PropsWithChildren, AnchorHTMLAttributes} from 'react';
import {Typography, CustomLink} from '../ui';

const Paragraph = ({children}: PropsWithChildren): JSX.Element => (
	<Typography className="mb-4 last:mb-0">{children}</Typography>
);

const Anchor = ({
	children,
	href,
}: AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element => (
	<CustomLink href={href ?? '#'} external>
		{children}
	</CustomLink>
);

const UnorderedList = ({children}: PropsWithChildren): JSX.Element => (
	<ul className="flex flex-col gap-2 mb-4 last:mb-0">{children}</ul>
);

const ListItem = ({children}: PropsWithChildren): JSX.Element => (
	<li className='relative before:content-[""] before:inline-block before:absolute before:left-0 before:top-[6px] before:w-[12px] before:h-[12px] before:rounded-sm before:bg-secondary-main'>
		<Typography className="pl-[24px]">{children}</Typography>
	</li>
);

const Heading2 = ({children}: PropsWithChildren): JSX.Element => (
	<Typography className="mb-1" variant="h4">
		{children}
	</Typography>
);

const Strong = ({children}: PropsWithChildren): JSX.Element => (
	<Typography
		weight="semibold"
		variant="inherit"
		as="strong"
		textTransform="capitalize"
	>
		{children}
	</Typography>
);

interface Props {
	markdown: string;
}

const CustomMarkdown = ({markdown}: Props): JSX.Element => {
	return (
		<Markdown
			className="flex flex-col"
			remarkPlugins={[remarkGfm]}
			allowedElements={['p', 'a', 'ul', 'li', 'br', 'h2', 'strong']}
			unwrapDisallowed
			components={{
				p: Paragraph,
				a: Anchor,
				ul: UnorderedList,
				li: ListItem,
				h2: Heading2,
				strong: Strong,
			}}
		>
			{markdown}
		</Markdown>
	);
};

export default CustomMarkdown;
