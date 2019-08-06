
$('.add').click(function () {
  $('.toast').show();

})

$('.sum_search>ul').on('click', 'li', function () {
  $(this).css("background-color", "#f67c63").siblings().css("background-color","#fff");
})

$('.first_circle').on('click','',function (){
  $(this).show()
})
// .click(function (){
//   $('.chosen').show()
// })
function toName(id){
  document.getElementById(id).scrollIntoView()
}