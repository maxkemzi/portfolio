const Spinner = () => {
	return (
		<div className="relative size-24 inline-block overflow-hidden bg-transparent">
			<div className="absolute size-20 top-2.5 left-2.5 rounded-full shadow-[0_3px_0_0] shadow-primary-main origin-[40px_41.5px] animate-spin" />
		</div>
	);
};

export default Spinner;
