document.addEventListener('DOMContentLoaded', () => {
console.log('hey, you, i am here')

M.AutoInit()
getPosts()
editPost()
newPost()


//get all blog posts from the database
function getPosts(){
  return axios.get('/blog_post')
  .then( (response) => {
    // console.log(response.data)
    response.data.forEach((post) => {
      let tbody = document.getElementById("blogPostsTable")
      let trow = document.createElement('tr')
      let title = document.createElement('td')
      let content = document.createElement('td')
      let editButton = document.createElement('button')
      let deleteButton = document.createElement('button')


      tbody.appendChild(trow)
      trow.appendChild(title)
      trow.appendChild(content)
      trow.appendChild(editButton)
      trow.appendChild(deleteButton)

      title.innerText = post.title
      content.innerText = post.content
      editButton.innerText = "edit"
      deleteButton.innerText = 'delete'

      editButton.setAttribute('class', 'waves-effect waves-light btn modal-trigger')
      editButton.setAttribute('href', "#modal2")
      deleteButton.setAttribute('class', 'deleteButton')
      title.setAttribute('class', 'title')
      content.setAttribute('class', 'content')

      //edit button to grab title + content and put into modal form for edit/view
      editButton.setAttribute('editB-id', post.id)
      editButton.addEventListener('click', (ev) => {
        console.log('edit clicked', post.id)


        let etitle = document.getElementById('editTitle')
        let econtent = document.getElementById('editContent')
        let postId = document.getElementById('postId')
        postId.setAttribute('data-id', post.id)

        etitle.value = post.title
        econtent.value = post.content
        postId.value = post.id

        var instance = M.Modal.getInstance(elem)
        instance.open()
      })
      deleteButton.setAttribute('post-id', post.id)
        deleteButton.addEventListener('click', (ev) => {
          let dPostId = ev.target.getAttribute('post-id')

          //Delete the movie
          axios.delete(`blog_post/${dPostId}`)
          .then( (response) => {
            // console.log(response)
            setTimeout(function(){ev.target.parentElement.parentElement.remove()}, 600)
            let tbody = document.getElementById('blogPostsTable')
            while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
          }
          getPosts()
          })
          .catch((error) => {
            console.log(error)
          })
        })

    return response
    })
  })
}

//edit a post and refresh the page with new data
function editPost() {
  //variable for the edit form so event listener can be added
  let editSubmit = document.getElementById('editForm')

  editSubmit.addEventListener('submit', (ev) => {

    ev.preventDefault()

    let etitle = document.getElementById('editTitle')
    let econtent = document.getElementById('editContent')
    // let postId = document.getElementById('postId')

    const id = postId.getAttribute("data-id")
    axios.put(`/blog_post/${id}`, {

    title: etitle.value,
    content: econtent.value,
    })

    .then(function(response) {
      let tbody = document.getElementById('blogPostsTable')
      while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild)
}
getPosts()
    })
    .catch((error) => {
      console.log(error)
      })
    })
  }

function addPostButton () {
  let addButton = document.getElementById('modalB')
  addButton.addEventListener('click', (ev) => {

    var instance1 = M.Modal.getInstance(elem)
    instance1.open()

  })
}

//create a new blog post
  function newPost() {
  let form = document.getElementById('form')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    axios.post('/blog_post',{
      title: title.value,
      content: content.value,
    })
    .then(function(response) {
      let tbody = document.getElementById('blogPostsTable')
      while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild)
  }
  getPosts()
    })
    .catch((error) => {
      console.log(error)
    })
  })
}
})
