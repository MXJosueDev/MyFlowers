import SidebarOption from './SidebarOption.Component';

export default function SidebarOptions() {
	return (
		<ul className='nav flex-column mt-3'>
			<SidebarOption
				optionName='Cumpleaños'
				optionSearchCategory='CUMPLEANOS'
				optionIcon='cake-fill'
			/>
			<SidebarOption
				optionName='Parejas'
				optionSearchCategory='PAREJAS'
				optionIcon='hearts'
			/>
			<SidebarOption
				optionName='Condolencias'
				optionSearchCategory='CONDOLENCIAS'
				optionIcon='emoji-tear-fill'
			/>
			<SidebarOption
				optionName='Graduación'
				optionSearchCategory='GRADUACION'
				optionIcon='mortarboard-fill'
			/>
			<SidebarOption
				optionName='Detalles'
				optionSearchCategory='DETALLES'
				optionIcon='flower2'
			/>
			<SidebarOption
				optionName='Bodas'
				optionSearchCategory='BODAS'
				optionIcon='person-hearts'
			/>
			<SidebarOption
				optionName='Aniversarios'
				optionSearchCategory='ANIVERSARIOS'
				optionIcon='stars'
			/>
		</ul>
	);
}
