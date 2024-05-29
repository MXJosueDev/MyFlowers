'use client';

import Container from '../Container.Component';
import ContainerFluid from '../ContainerFluid.Component';
import Row from '../Row.Component';
import { FooterSocialOption } from './FooterSocialOption.Component';

export default function Footer() {
	return (
		<ContainerFluid className='bg-primary text-center py-5'>
			<Container>
				<Row className='justify-content-around g-1 row-cols-1 row-cols-sm-2 row-cols-md-3'>
					<div className='col'>
						<h5 className='fs-4'>
							{process.env.NEXT_PUBLIC_APP_NAME}
						</h5>
					</div>
					<div className='col'>
						<ul className='list-inline'>
							<FooterSocialOption
								optionIcon='whatsapp'
								optionUrl={
									process.env.NEXT_PUBLIC_WHATSAPP_LINK
								}
							/>
							<FooterSocialOption
								optionIcon='facebook'
								optionUrl={
									process.env.NEXT_PUBLIC_FACEBOOK_LINK
								}
							/>
							<FooterSocialOption
								optionIcon='instagram'
								optionUrl={
									process.env.NEXT_PUBLIC_INSTAGRAM_LINK
								}
							/>
						</ul>
					</div>
					<div className='col'>
						<p className='fs-6'>&copy; All rights reserved</p>
					</div>
				</Row>
			</Container>
		</ContainerFluid>
	);
}
