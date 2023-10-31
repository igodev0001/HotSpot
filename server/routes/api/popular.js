const express = require('express');
const router = express.Router();
const https = require("https");
const axios = require('axios');
const Place = require('../../models/Place');
const PopularTime = require('../../models/PopularTime');
const Neighbourhood = require('../../models/Neighbourhood');
const { escape } = require('querystring');
const mongoose = require('mongoose');
const apiKey = process.env.YelpApiKey

const headers = {
    'Authorization': `Bearer ${apiKey}`
};

router.get('/test', async (req, res) => {
    try {
        const url = 'https://api.yelp.com/v3/businesses/search?location=Texas';
        const response = await axios.get(url, { headers: headers })
        if (response.status == 200) {
            return res.status(200).json(response.data)
        }
    } catch (e) {
        res.status(500).send({
            message: e.response.data.message
        });
    }
});

const getDataFromThird = async () => {
    const neighbourhoods = ['Downtown Austin'];
    const categories = 'restaurants,clubs,bars';

    for (let i = 0; i < neighbourhoods.length; i++) {
        try {
            const url = `https://api.yelp.com/v3/businesses/search?location=${neighbourhoods[i]}&categories=${categories}&limit=40`;
            const response = await axios.get(url, { headers: headers })

            if (response.status == 200) {
                let businesses = response.data.businesses;
                let { latitude: centerlat, longitude: centerlng } = response.data.region.center;

                const newNeighbourhood = await new Neighbourhood({
                    name: neighbourhoods[i],
                    centerlat: centerlat,
                    centerlng: centerlng,
                    borderPoints: [
                        "812 Bute Street",
                        "Vancouver, BC V6E 1Y4",
                        "Canada"
                    ]
                })
                const savedNeighbourhood = await newNeighbourhood.save();
                for (let index = 0; index < businesses.length; index++) {
                    const { id, name, phone, display_phone, review_count, rating, price, url, image_url, coordinates, location, categories } = businesses[index];

                    const newPlace = new Place({
                        name,
                        address: location.address1,
                        lat: coordinates.latitude,
                        lng: coordinates.longitude,
                        rating,
                        rating_n: rating,
                        phone_number: phone ? phone : ' ',
                        current_popularity: 234,
                        time_spent_min: 20,
                        time_spent_max: 80,
                        postal_code: "wer",
                        google_price_level: 234,
                        yelp_id: id,
                        yelp_url: url,
                        yelp_phone: phone ? phone : ' ',
                        yelp_display_phone: display_phone ? display_phone : ' ',
                        yelp_review_count: review_count,
                        yelp_rating: rating,
                        yelp_price: price ? price : '$',
                        yelp_categories: categories,
                        yelp_photos: image_url,
                        neighbourhood_id: savedNeighbourhood._id
                    });
                    const savedPlace = await newPlace.save();

                    try {
                        const url_place = `https://api.yelp.com/v3/businesses/${id}`;
                        let res_place = await axios.get(url_place, { headers: headers })
                        if (res_place.status == 200) {
                            let data = res_place.data.hours[0].open;
                            for (let j = 0; j < data.length; j++) {
                                if (data[j].end == 0) {
                                    data[j].end = 2400;
                                }
                                for (let i = Math.floor(data[j].start / 100); i <= Math.floor(data[j].end / 100); i++) {
                                    const newPopularTime = new PopularTime({
                                        day_id: data[j].day,
                                        hour_id: i,
                                        busy_value: i,
                                        hot_score: (i * 2) + (rating * 10),
                                        place_id: savedPlace._id
                                    });
                                    const savedPopularTime = await newPopularTime.save();
                                }
                            }
                        }
                    } catch (error) {
                        console.error('Error saving data:', error.message);
                    }
                };
            }
        } catch (e) {
            return { status: 500, data: e.message }
        }
    }
    return { status: 200 }
}

router.get('/neighbourhoods', async (req, res) => {
    try {
        await Neighbourhood.deleteMany({});
        await Place.deleteMany({});
        await PopularTime.deleteMany({});
        const result = await getDataFromThird();
        if (result.status == 200) {
        const neighbourhoods = await Neighbourhood.find({}, '_id name centerlat centerlng borderPoints');
        const neighbourhoods_data = neighbourhoods.map((neighbourhood) => {
            const { _id, centerlat, centerlng, ...rest } = neighbourhood.toObject();
            return { id: _id, center: { lat: centerlat, lng: centerlng }, ...rest };
        });

        const places = await Place.find({}, '_id name neighbourhood_id lat lng rating_n address yelp_price yelp_display_phone yelp_id yelp_photos yelp_review_count yelp_categories time_spent_max time_spent_min')

        const places_data = places.map((place) => {
            const { _id, ...rest } = place.toObject();
            return { id: _id, ...rest };
        });
        const hotScoreApiPipeline = [
            {
                $group: {
                    _id: "$place_id",
                    current_hot_score: { $avg: "$hot_score" }
                }
            }
        ];

        let hot_scores = await PopularTime.aggregate(hotScoreApiPipeline);
        let hotScoreList = [];
        for (let i = 0; i < hot_scores.length; i++) {
            for (let j = 0; j < places_data.length; j++) {
                if (hot_scores[i]._id.toString() === places_data[j].id.toString()) {
                    let tmpItem = {
                        ...places_data[j],
                        current_hot_score: parseInt(hot_scores[i].current_hot_score),
                        busy_value:10
                    }
                    hotScoreList = [...hotScoreList, tmpItem]
                }
            }
        }
        return res.status(200).json({ status: "success", neighbourhoods_data: neighbourhoods_data, places_data: hotScoreList, message: "Receive the Data" });
        }
        else if (result.status == 400) {
            return res.status(400).json({ status: "failed", message: "Something went wrong" });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get('/day/:day/hour/:hour', async (req, res) => {
    try {
        if (req.params.hour == 24) {
            req.params.hour = 0;
        }
        const all_placeid = await PopularTime.distinct('place_id');
        let array_hotscores = [];
        for (let i = 0; i < all_placeid.length; i++) {
            let hot_score = await PopularTime.findOne({ place_id: all_placeid[i].toString(), day_id: req.params.day, hour_id: req.params.hour });
            if (hot_score == null) {
                array_hotscores.push({
                    id: all_placeid[i],
                    hot_score: 0
                });
            }
            else {
                array_hotscores.push({
                    id: all_placeid[i],
                    hot_score: hot_score.hot_score
                });
            }
        }
        res.json({ 'hot_scores': array_hotscores });
    } catch (e) {
        res.status(400).send({ message: 'An error occurred' });
    }
});

router.get('/day/:day', async (req, res) => {
    try {
        const places = await Place.find({}, 'yelp_id lat lng');
        const arr = [];
        for (const place of places) {
            const hot_scores = await PopularTime.find(
                {
                    day_id: req.params.day,
                    $or: [
                        { hour_id: { $gt: 17 } },
                        { hour_id: { $lt: 3 } }
                    ]
                },
                'busy_value hour_id -_id'
            );
            const hot_scores_arr = hot_scores.map(element => element.toObject());
            const hash = place.toObject();
            hash.hot_scores = hot_scores_arr;
            arr.push(hash);
        }
        res.json({ 'hot_scores': arr });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred' });
    }
});

router.get('/:id', async (req, res) => {
    const day = whatDayIsIt(new Date());
    const {_id:id,name} = await Place.findOne({yelp_id : req.params.id});
    // console.log('id', id)
    const hot_scores = await PopularTime.find({ day_id: day, place_id:id }, {hour_id: 1, busy_value: 1})
    const data = {hot_scores:hot_scores}
    res.json({ hot_scores });
});

function whatDayIsIt(date) {
    let day = date.getDay();
    if (day === 0) {
        day += 7;
    }
    return day;
}

module.exports = router;