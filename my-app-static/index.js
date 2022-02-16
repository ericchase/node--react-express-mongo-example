function MyComponent(props) {
    const [array, setArray] = React.useState(null);

    React.useEffect(() => {
        fetch('http://localhost:8080/mongoose', { mode: 'cors' })
            .then(res => res.json())
            .then(setArray);
    }, []);

    return React.createElement(
        'div', { className: 'App' }, React.createElement(
            'div', null, array
            ? array.map(item => Object.entries(item).map(([key, value]) =>
                React.createElement('p', { key }, `${key}: ${JSON.stringify(value)}`)
            )) : 'Loading...'
        )
    );
}

ReactDOM.render(React.createElement(MyComponent), document.getElementById('root'));
