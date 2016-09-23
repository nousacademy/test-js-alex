import fetch from 'fetch-jsonp'
import moment from 'moment'
import lodash from 'lodash'

export function getPopularMovies() {
  return dispatch => {
    const fourStarUrl = 'https://itunes.apple.com/search?country=us&media=movie&entity=movie&limit=100&attribute=ratingIndex&term=4'
    const fiveStarUrl = 'https://itunes.apple.com/search?country=us&media=movie&entity=movie&limit=100&attribute=ratingIndex&term=5'
    const req1 = fetch(fourStarUrl)
    const req2 = fetch(fiveStarUrl)

    return Promise.all([req1, req2])
      .then(responses => responses.map(res => res.json()))
      .then(jsonPromises => Promise.all(jsonPromises))
      .then(jsonResponses => {
        // jsonResponses contains the results of two API requests
        let resOne = jsonResponses[0].results;
        let resTwo = jsonResponses[1].results;

        // merge array function
        function mergeArr(arr1, arr2){
          return arr2.concat(arr1);
        }

        // 1. combine the results of these requests
        let merged = mergeArr(resOne, resTwo);


        // 2. sort the results FIRST by year THEN by title (trackName)
        var byYear = _.sortBy(merged, 'releaseDate', function (n) {
          return Math.sin(n);
        });
      
        var byTitle = _.sortBy(merged, 'trackName', function (n) {
          return Math.sin(n);
        });
        
        var mergeYRandTitle = mergeArr(byTitle, byYear);
       
        // 3. each movie object in the results needs a releaseYear attribute added
        //    this is used in src/components/movies-list.js line 26
      
       function getYear(date){
         return moment(date.releaseDate).format('YYYY');
       }
        
      //  Kept breaking when I referenced the foreach loop, kept getting a dispatch error
      //  even debugger statements didnt do anything, I downloaded a React extension but that didnt help much
      // so I just tried to see what previously worked and referenced the point at which it did 
      // the results of question 2 automatically updated with what the for each loop spit out
        mergeYRandTitle.forEach(function(val, i){
          var year = {
          "releaseYear": getYear(val)
        }
          _.assign(val, year); 
        });

        const combinedResults = mergeYRandTitle ;
        // console.log(combinedResults)
        return dispatch({
          type: 'GET_MOVIES_SUCCESS',
          movies: combinedResults
        })
      })
  }
}


