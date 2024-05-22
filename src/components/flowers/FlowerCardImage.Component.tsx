import Image from 'next/image';

interface Props {
	img: string;
}

export default function FlowerCardImage({ img }: Props) {
	return (
		<div className='d-flex justify-content-center'>
			<Image
				className={`card-img`}
				alt=''
				width={160}
				height={160} // Always 160px ???
				src={img}
			/>
		</div>
	);
}
