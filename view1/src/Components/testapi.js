function fetchData() {
  return fetch('http://31.125.147.193:8124/api/Portfolio/')
    .then(response => {
      console.log('Hello');
      console.log('HTTP response status:', response.status); // Log the HTTP response status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data returned by the API:', data); // Log the data returned by the API
      if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
      }
      return data;
    })
    .catch(error => console.error('Error:', error));
}

fetchData()
  .then(data => {
    // Handle the data here
    console.log(data);
  })
  .catch(error => {
    // Handle any errors here
    console.error(error);
  });