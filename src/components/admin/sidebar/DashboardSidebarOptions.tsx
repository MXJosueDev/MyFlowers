import DashboardSidebarOption from './DashboardSidebarOption.Component';

export default function DashboardSidebarOptions() {
	return (
		<ul className='nav flex-column mt-3'>
			<DashboardSidebarOption
				optionName='Ramos'
				optionType='products'
				optionIcon='flower3'
			/>
			<DashboardSidebarOption
				optionName='Flores'
				optionType='flowers'
				optionIcon='flower1'
			/>
			<DashboardSidebarOption
				optionName='Decoraciones'
				optionType='decorations'
				optionIcon='balloon-fill'
			/>
		</ul>
	);
}
