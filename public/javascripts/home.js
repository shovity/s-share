$(document).ready(function(){
  // Globle varible
  files = JSON.parse($('<div>').html(files).text())

  $('[data-toggle="tooltip"]').tooltip();

  $('.click').click((event) => {
  	let target = event.target.parentNode,
      uri = target.getAttribute("uri"),
      fileName = target.getAttribute('fileName'),
      fileType = target.getAttribute('fileType'),
  	  file = files.find(file => file.name == fileName)

    if (fileType == 'd') {
      if (location.href[location.href.length - 1] == '/') {
        location.href +=  fileName
      } else {
        location.href +=  '/' + fileName
      }
    } else {
      // Join path skill
      location.href = ['/view/' + uri].join('/').split('//').join('/')
    }
  })

  $('.remove').click(() => {
    alert('That too danger to active now!')
  })

  newFile.addEventListener('click', () => {
    $.post('/api/newFile', { uri, fileName: fileName.value }, (data, stat) => {
      if (data.ok) {
        location.reload()
      } else {
        alert('Nope! We had protector. ' + data.err)
      }
    })
  })

  newFolder.addEventListener('click', () => {
    $.post('/api/newFolder', { uri, fileName: fileName.value }, (data, stat) => {
      if (data.ok) {
        location.reload()
      } else {
        alert('Nope! We had protector. ' + data.err)
      }
    })
  })

})
