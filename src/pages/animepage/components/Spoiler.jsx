import React from 'react'

const Spoiler = ({ title, isActive, setIsActive, currentAnime, genre }) => {
	return (
		<div className='accordion-item mt-3' style={{ border: '2px solid' }}>
			<h2 className='accordion-header'>
				<button
					className={isActive ? 'accordion-button' : 'collapsed accordion-button'}
					onClick={() => setIsActive(!isActive)}>
					{title}
				</button>
			</h2>
			<div className={isActive ? 'collapse show' : 'collapse'}>
				<div className='accordion-body'>
					{currentAnime}
					{genre && <h5>{genre}</h5>}
				</div>
			</div>
		</div>
	)
}

export default Spoiler
