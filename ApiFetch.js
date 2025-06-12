async function ApiFetch(city) {
    const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cecc3d592199a4284feba85d76d40eb&units=metric`);
     const CityWiseData= await res.json();
    return(CityWiseData)
}

export default ApiFetch;
