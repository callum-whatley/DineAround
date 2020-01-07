const apiKey = process.env.REACT_APP_API_KEY;
//const apiKey = 'I_9yi_enpmsAMSZN-FxiH3jvh8bXdfZZDBN4OHP4PDTKBasFFyx3AFdyyz5LMJb1R0bLeqzclSInvbMUkxbWjixRywXaRXkuM1IorlojS5wXzRiQKdbaqkZ6oRj8XHYx';


const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, 
        { 
            headers: { 
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        url: business.url,
                        coordinates: business.coordinates,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                });
            }
        });
    }
};

export default Yelp;