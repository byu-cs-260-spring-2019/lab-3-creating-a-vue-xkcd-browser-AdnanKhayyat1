Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#app',
    data: {
      number: '',
      max: '',
      current: {
        title: '',
        img: '',
        alt: ''
      },
      comments: {},
      ratings: {},  
      loading: true,
      addedName: '',
      addedComment: '',
      comments: {},
      avgRating: {},
      nom: 0,
    },
    
    created() {
      this.xkcd();
    },
    methods: {
      setRating(rating){
        
        // Handle the rating
        if (!(this.number in this.ratings))
        Vue.set(this.ratings, this.number, {
          sum: 0,
          total: 0,
          avg: 0
        });
        this.nom = this.ratings[this.number].avg;
        this.ratings[this.number].sum += rating;
        this.ratings[this.number].total += 1;
        this.ratings[this.number].avg = this.ratings[this.number].sum / this.ratings[this.number].total;
        this.ratings[this.number].avg = Math.round(this.ratings[this.number].avg * 100) / 100;
        this.nom = this.ratings[this.number].avg;
        console.log(this.ratings[this.number].avg);
        
        
        
      },
      addComment() {
        if (!(this.number in this.comments))
          Vue.set(app.comments, this.number, new Array);
        this.comments[this.number].push({
          author: this.addedName,
          text: this.addedComment
        });
        this.addedName = '';
        this.addedComment = '';
      },
    getRandom(min, max) {
      
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomComic() {
      this.nom = 0;
      this.number = this.getRandom(1, this.max);
    },
    firstComic() {
      this.nom = 0;
      this.number = 1;
    },

    lastComic() {
      this.nom = 0;
      this.number = this.max;
    },

      previousComic() {
        this.nom = 0;
          this.number = this.current.num - 1;
        },
        nextComic() {
          this.nom = 0;
          this.number = this.current.num + 1;
        },
      async xkcd() {
        
        try{
            this.loading = true;
            const response = await axios.get('https://xkcd.now.sh/' + this.number)
            const data = response.data;
            console.log(data);
            this.current = response.data;
            this.loading = false;
            this.number = response.data.num;
            return true;
        }
        catch(error){
            console.log(error);
            this.loading = false;
            return false;
        }
      }
    },
    
      watch: {
        number(value, oldvalue) {
          if (oldvalue === '') {
            this.max = value;
          } else {
            this.xkcd();
          }
        },
      },
    computed: {
        month() {
          var month = new Array;
          if (this.current.month === undefined)
            return '';
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";
          return month[this.current.month - 1];
        }
      },
      getAverage: function() {
        return this.avgRating[this.number];
      }
      
 
  });