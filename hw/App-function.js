import './App.css';

function Car(){
  return (<h2> You are a car!!! </h2>);
}
function App(){
  return (
    <div>
			<h1> Who lives in your garage? </h1>
			<Car />
		</div>
  );
}
export default App;
