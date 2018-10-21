document.addEventListener('DOMContentLoaded', () => {
console.log('hey, you, i am here')

//get all blog posts from the database
function getPosts(){
  axios.get('/blog_post')
  .then( (response) => {
    console.log(response)
  })
}


})
