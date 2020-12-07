$(document).ready(function () {
  // Add item to IPFS
  $('#ipfsAdd').click(function (event) {
    ipfsAdd()
  })
  // Retrieve item from IPFS
  $('#ipfsGet').click(function (event) {
    ipfsGet()
  })
})

function ipfsAdd() {
  let formData = {
    newInfo: $('#ipfsIn').val(),
  }
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: window.location + 'ipfsAdd',
    data: JSON.stringify(formData),
    dataType: 'json',
    success: (response) => {
      $('#ipfsOut').html('IPFS CID: <strong>' + response.path + '</strong>')
      console.log('ok')
    },
    error: (e) => {
      $('#ipfsOut').html('<strong>Error</strong>')
      console.log('ERROR:', e)
    },
  })
}

function ipfsGet() {
  let formData = {
    newInfo: $('#ipfsCid').val(),
  }
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: window.location + 'ipfsGet',
    data: JSON.stringify(formData),
    dataType: 'json',
    success: (response) => {
      $('#ipfsOut').html('Data: <strong>' + response[0] + '</strong>')
      console.log('ok')
    },
    error: (e) => {
      $('#ipfsOut').html('<strong>Error</strong>')
      console.log('ERROR:', e)
    },
  })
}
