import React from 'react'

const MediaPlayer = ({ scr, id }) => {
	return (
		<video style={{ width: '100%', height: 'auto' }} key={id} controls loop autoPlay muted>
			<source src={scr} type='video/mp4' />
		</video>
	)
}

export default MediaPlayer
