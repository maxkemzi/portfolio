import {GithubLogo, TelegramLogo} from '@phosphor-icons/react';
import Link from 'next/link';

const SocialList = () => {
	return (
		<ul className="flex items-center">
			<li>
				<Link
					className="group inline-block px-3.5"
					href="https://github.com/maxkemzi"
					target="_blank"
					rel="noreferrer noopenner"
					aria-label="Github profile"
				>
					<GithubLogo
						className="fill-background-contrastText transition-colors duration-300 ease-out group-hover:fill-primary-main"
						size={28}
						weight="light"
					/>
				</Link>
			</li>
			<li>
				<Link
					className="group inline-block px-3.5"
					href="https://t.me/maxkemzi"
					target="_blank"
					rel="noreferrer noopenner"
					aria-label="Telegram profile"
				>
					<TelegramLogo
						className="fill-background-contrastText gtransition-colors duration-300 ease-out group-hover:fill-primary-main"
						size={28}
						weight="light"
					/>
				</Link>
			</li>
		</ul>
	);
};

export default SocialList;
