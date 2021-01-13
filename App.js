import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tour from './Tour';
import './index.css';

const url = 'https://course-api.com/react-tours-project';

function App() {
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		fetch(url).then((resp) => {
			if (resp.status >= 200 && resp.status <= 299) {
				setIsLoading(false);
			}
		});
	}, []);
	if (isLoading) {
		return <Loading />;
	} else {
		return (
			<section className='section'>
				<h2 className='title'>Our Tours</h2>
				<hr className='underline' />
				<Tour />
			</section>
		);
	}
}

export default App;
