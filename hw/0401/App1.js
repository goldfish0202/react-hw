import './App.css';

class Car extends React.Component {
	render() {
		return <h2> You are a car </h2>
	}
}

class Garage extends React.Component {
	render() {
		return(
			<div>
				<h1> Who lives in your garage? </h1>
				<Car />
			</div>
		)
	}
}

export default App;
