const a = "";

export default function HeaderTitle() {
	return (
		<div>
			<h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
		</div>
	);
}
