import React from 'react'

const Modal = ({ title, children }) => {
	return (
		<div className='modal fade' id='modal' tabIndex='-1' aria-labelledby='modalLabel' aria-hidden='true'>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='modalLabel'>
							{title}
						</h5>
						<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
					</div>
					<div className='modal-body'>{children}</div>
					<div className='modal-footer'>
						<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
							Закрыть
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
