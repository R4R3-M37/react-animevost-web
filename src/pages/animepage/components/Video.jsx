import React, { useEffect, useRef } from 'react'

const Video = ({ videoScr, initialVid }) => {
	const vidRef = useRef(null)

	useEffect(() => {
		vidRef.current?.load()
	}, [videoScr])

	return (
		<video ref={vidRef} style={{ width: '100%', height: 'auto' }} controls loop={true} autoPlay={true}>
			<source src={videoScr} type='video/mp4' />
		</video>
	)
}

export default Video
