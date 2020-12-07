$(document).ready(function () {
  // Add item for a customer
  $('#addItem').click(function (event) {
    addItem()
  })
  // Remove item for a customer
  $('#removeItem').click(function (event) {
    removeItem()
  })
  // Get all items for a customer
  $('#getTab').click(function (event) {
    getTab()
  })
  // Reset tab for a customer
  $('#resetTab').click(function (event) {
    resetTab()
  })
})

function addItem() {
  let formData = {
    pubkey: $('#pubkey').val(),
    itemID: $('#item-id').val(),
    price: $('#price').val(),
  }
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: window.location + 'addItem',
    data: JSON.stringify(formData),
    dataType: 'json',
    success: (response) => {
      $('#addToTabMsg').html('TxHash: <strong>' + response[0] + '</strong>')
      console.log('ok')
    },
    error: (e) => {
      $('#addToTabMsg').html('<strong>Error</strong>')
      console.log('ERROR:', e)
    },
  })
}

async function removeItem() {
  let formData = {
    pubkey: $('#pubkey').val(),
    itemID: $('#item-id').val(),
  }
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: window.location + 'removeItem',
    data: JSON.stringify(formData),
    dataType: 'json',
    success: (response) => {
      $('#removeFromTabMsg').html('')
      $('#removeFromTabMsg').html(
        'TxHash: <strong>' + response[0] + '</strong>',
      )
      console.log('ok')
    },
    error: (e) => {
      $('#removeFromTabMsg').html('<strong>Error</strong>')
      console.log('ERROR removeItem:', e)
    },
  })
}

function getTab() {
  let formData = { pubkey: $('#pubkey').val() }
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: window.location + 'getTab', // location of function call in app.js
    data: JSON.stringify(formData),
    dataType: 'json',
    success: (response) => {
      $('#getTabDivError').html('')
      $('#getTabDiv ul').empty()
      $.each(response, (i, response) => {
        $('#getTabDiv .list-group').append(
          response[0],
          ' ',
          response[1],
          ' ',
          response[2] + '<br>',
        )
      })
      console.log('ok')
    },
    error: (e) => {
      $('#getTabDivError').html('<strong>Error</strong>')
      console.log('ERROR:', e)
    },
  })
}

function resetTab() {
  let formData = { pubkey: $('#pubkey').val() }
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: window.location + 'resetTab', // location of function call in app.js
    data: JSON.stringify(formData),
    dataType: 'json',
    success: (response) => {
      $('#emptyTabMsg').html('')
      $('#emptyTabMsg').html('TxHash: <strong>' + response[0] + '</strong>')
      console.log('ok')
    },
    error: (e) => {
      $('#emptyTabMsg').html('<strong>Error</strong>')
      console.log('ERROR:', e)
    },
  })
}
