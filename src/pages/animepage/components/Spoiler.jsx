import React from 'react'

const Spoiler = ({ children, title, className }) => {
	const option = title.replace(/\s+/g, '')

	return (
		<div
			className={className ? `mt-3 accordion accordion-flush ${className}` : 'mt-3 accordion accordion-flush'}
			id='accordionExample'
			style={{ boxShadow: '0 0 0 0.25rem rgb(13 110 253 / 25%)' }}
		>
			<div className='accordion-item'>
				<h2 className='accordion-header'>
					<button
						className='accordion-button'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target={`#collapse${option}`}
						aria-expanded='false'
					>
						{title}
					</button>
				</h2>
				<div
					id={`collapse${option}`}
					className='accordion-collapse collapse show'
					data-bs-parent={`#accordion${option}`}
				>
					<div className='accordion-body'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Spoiler
