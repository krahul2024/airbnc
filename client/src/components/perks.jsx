import React from 'react' 
import {NavLink} from 'react-router-dom' 

const Perks = ({selectedPerks , onChange}) => {
	function displayLabelAndIcon(label , icon ){
		return (<> 	
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-6">
				  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
				</svg>
				<span>{label}</span>
			</>)
	}
	function inputTitleAndDescription(title , description) {
		return (
			<>
				<h1 className="p-2 text-xl font-semibold text-sky-800">{title}</h1>
				<p className="px-3 -mt-1 text-sm text-sky-800">{description}</p>
			</>
			
		)
	}
	const handleCheck = async(e) => {
		// e.preventDefault() 
		const {checked , name } = e.target  
		// console.log(checked , name) 
		let values = selectedPerks  
		if(checked) values.push(name) 
		else values = values.filter(item => item!==name) 
		onChange(values)  
	}

	return (<> 
			<div className="p-2">
				{inputTitleAndDescription('Perks' , 'check all the perks which your place has to offer.')}
				<div className="p-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 flex items-center gap-2 mx-auto">
					<label className="flex gap-3 py-4 px-4 text-sky-800 border-2 w-auto rounded-xl cursor-pointer">
						<input type="checkbox"  className="cursor-pointer" name="wifi" 
						 	onChange = { handleCheck}	/>
						{displayLabelAndIcon('Wi-Fi','M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z')}
					</label>

					<label className="flex gap-3 p-4 xl:p-4 text-sky-800 border-2 w-auto rounded-xl cursor-pointer">
						<input type="checkbox" className="cursor-pointer" name="parking" 
							onChange = {handleCheck}	/>
						{displayLabelAndIcon('Free parking',"M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12")}
					</label>

					<label className="flex gap-3 py-4 px-4 text-sky-800 border-2 w-auto rounded-xl cursor-pointer">
						<input type="checkbox" className="cursor-pointer" name="pets" 
							onChange = { handleCheck}	/>
						{displayLabelAndIcon("Pets allowed","M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z")}
					</label>

					<label className="flex gap-3 py-4 px-4 text-sky-800 border-2 w-auto rounded-xl cursor-pointer">
						<input type="checkbox" className="cursor-pointer" name="entrance" 
							onChange = {handleCheck}	/>
						{displayLabelAndIcon('Private entrance',"M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" )}
					</label>

					<label className="flex gap-3 py-4 px-4 text-sky-800 border-2 w-auto rounded-xl cursor-pointer">
						<input type="checkbox" className="cursor-pointer" name="tv" 
							onChange = {handleCheck}	 />
						{displayLabelAndIcon('TV','M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z')}
					</label>

					<label className="flex gap-3 py-4 px-4 text-sky-800 border-2 w-auto rounded-xl cursor-pointer">
						<input type="checkbox" className="cursor-pointer" name="kitchen"  
						 	onChange = {handleCheck}	/>
						{displayLabelAndIcon('Kitchen/Meals','M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z')}
					</label>
				</div>
				</div>
		</>)
}

export default Perks 