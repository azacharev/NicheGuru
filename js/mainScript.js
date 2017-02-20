$(document ).ready(function(){

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// var getSearchValue = $('#searchValue').val();
// console.log(getSearchValue);

// $(document).ready(function(e){
//   $('#formButton').on('submit', function(){
//     console.log($('#searchValue').val())
//   })
// })

console.log("scripts are connected");

});
