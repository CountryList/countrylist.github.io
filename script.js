var apiurl = {
  countryData: "https://restcountries.eu/rest/v2/all"
}

var vm = new Vue({
  el: "#app",
  data: {
    items: [],
    countOfPage: 25,
    currPage: 1,
    filter_name: '',
    filteredRowCount: null,
  },
  computed: {
    pageStart: function(){
        return (this.currPage - 1) * this.countOfPage;
      },
    totalPage: function(){
      if( this.filter_name.trim() === '' ) {
        return Math.ceil(this.items.length / this.countOfPage);
      }
      else{
        return Math.ceil(this.filteredRowCount / this.countOfPage);
      }
    }
  },
  methods: {
    setPage: function(idx){
      if( idx <= 0 || idx > this.totalPage ){
        return;
      }
      this.currPage = idx;
    }
  },
  ready: function(){
    $.ajax({
      url: apiurl.countryData,
      type:'GET',
      dataType:'text',
      success: function(res){
        vm.items=JSON.parse(res);
      }
    }); 
    
  },
});