import SidebarOption from './SidebarOption.Component';

export default function SidebarOptions() {
	return (
		<ul className='nav flex-column mt-3'>
			<SidebarOption
				optionName='Cumpleaños'
				optionSearchCategory='cumpleanos'
				optionIcon='cake-fill'
			/>
			<SidebarOption
				optionName='Parejas'
				optionSearchCategory='parejas'
				optionIcon='hearts'
			/>
			<SidebarOption
				optionName='Condolencias'
				optionSearchCategory='condolencias'
				optionIcon='emoji-tear-fill'
			/>
			<SidebarOption
				optionName='Graduación'
				optionSearchCategory='graduacion'
				optionIcon='mortarboard-fill'
			/>
			<SidebarOption
				optionName='Detalles'
				optionSearchCategory='detalles'
				optionIcon='flower2'
			/>
			<SidebarOption
				optionName='Bodas'
				optionSearchCategory='bodas'
				optionIcon='person-hearts'
			/>
			<SidebarOption
				optionName='Aniversarios'
				optionSearchCategory='aniversarios'
				optionIcon='stars'
			/>
		</ul>
	);
}
