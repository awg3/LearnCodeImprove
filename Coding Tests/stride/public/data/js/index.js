'use strict';
$(document).ready(function(){
  var cart = new Cart();
  setInventoryData(cart);
  setModalPopup(cart);
});

class Cart {
  constructor() {
    this.items = [], // will contain objects
    this.total = 0
  }
};

Cart.prototype.getItems = function(){
  return this.items;
};

Cart.prototype.calculateTotal = function(items, item){
  var total = 0;

  $.each(items, function(key, value){
    total += value.price * value.count;
  });

  total += item.price * item.count;

  this.setTotal(total);
};

Cart.prototype.setTotal = function(total){
  this.total = total;
};

Cart.prototype.getTotal = function(items){
  return this.total;
};

Cart.prototype.addItem = function(newItem){
  var items = this.getItems(),
      spanTagTotal = $('.modal--cart .cart-info .cart-total span');

  // Calculate total items and set total items for the cart
  this.calculateTotal(items, newItem);
  spanTagTotal.text(this.getTotal());

  if(items.length > 0){
    var exists = false,
        index = -1;

    $.each(items, function(key, val){
      // Item exists, update the count property of the item.
      if(val.id === newItem.id){
        exists = true;
        index = key;
        return;
      }
    });

    if(exists){
      // Item exists, update the count property of the item.
      items[index].count += 1;
    }
    else {
      // Item does not exist, add it as a new item.
      items.push(newItem);
    }
  }
  // Initial state of cart: an empty cart.
  else {
    items.push(newItem);
  }
};

Cart.prototype.clearItems = function(){
  this.items = [];
}

function findItemInArray(id, arr){
  return $.grep(arr, function(elem){
    return elem.id === id;
  });
}

function displayCartData(cart){
  var emptyCartMessage = $(".modal--cart .cart-info .empty-cart-message"),
      cartTable = $('.modal--cart .cart-info table'),
      cartTotal = $('.modal--cart .cart-total'),
      cartItems = cart.items;

  // Items exist in the cart
  if(cartItems.length){
    var rowCartItems = $(".modal--cart .cart-info table"),
        rowCartHeading = $(".modal--cart .cart-info"),
        cartTotal = $(".modal--cart .cart-total");

    emptyCartMessage.hide();
    cartTable.show();
    cartTotal.show();

    $.each(cartItems, function(key, val){
      var row = rowCartItems.find('#' + val.id);

      // There should only exist one unique ID per row.
      if(row.length){
        row.replaceWith(
          '<tr class="items" id="' + val.id + '">' +
            '<td align="center">' +
              val.type +
            '</td>' +
            '<td align="center">' +
              val.price +
            '</td>' +
            '<td align="center">' +
              val.count +
            '</td>' +
            '<td style="width: 100px;">' +
              '<button type="button" name="Remove" class="remove-item">Remove</button>' +
            '</td>' +
          '</tr>'
        );
      }
      else {
        rowCartItems.append(
          '<tr class="items" id="' + val.id + '">' +
            '<td align="center">' +
              val.type +
            '</td>' +
            '<td align="center">' +
              val.price +
            '</td>' +
            '<td align="center">' +
              val.count +
            '</td>' +
            '<td style="width: 100px;">' +
              '<button type="button" name="Remove" class="remove-item" id="' + val.id + '">Remove</button>' +
            '</td>' +
          '</tr>'
        );
      }

      var removeItemButtons = rowCartItems.find('.remove-item');

      removeItemButtons.each(function() {
        var button = $(this),
            id = $(this).attr('id');
        button.click(function() {
          $.each(cart.items, function(key, val){
            if(val.id == id){
              // Substracting from the total.
              var total = cart.getTotal();
              total -= val.price;
              cart.setTotal(total);
              // Updating total in its container.
              cartTotal.find('span').text(cart.getTotal());
              // Removing from the cart array and the table.
              cart.items.slice(key);
              rowCartItems.find("#" + id).remove();
            }
          });

          if(rowCartItems.find(".items").length === 0){
            emptyCartMessage.show();
            cartTable.hide();
            cartTotal.hide();
          }
        });
      });
    });
  }
  // No items in cart.
  else {
    emptyCartMessage.show();
    cartTable.hide();
    cartTotal.hide();
  }
}

function setModalPopup(cart) {
  var overlay = $('.overlay'),
      viewCartButtons = $('.button--view-cart'),
      closeCartButton = $('.modal--cart .close-cart'),
      clearCartButton = $('.modal--cart .clear-cart');

  // Adding event handlers for each button in the cart modal popup
  viewCartButtons.each(function() {
    $(this).click(function() {
      overlay.show();
      // sets up the data to be displayed.
      displayCartData(cart);
    });
  });

  closeCartButton.click(function() {
    overlay.hide();
  });

  clearCartButton.click(function() {
    cart.clearItems();
    cart.setTotal(0);
    // Clears out any existing table data.
    $(".modal--cart .cart-info .items").remove();
    $(".modal--cart .cart-info .empty-cart-message").show();
    $(".modal--cart .cart-info table").hide();
    $(".modal--cart .cart-info .cart-total").hide();
  });
}

function setInventoryData(cart){
  var inventory = [],
      table = $(".inventory > form > table");

  // Grab data from JSON file.
  $.getJSON('data/inventory.json', function(data){
    // Loop through each entry in the chocolates object.
    $.each(data.chocolates, function(key, val) {
      // Create an array where each element will be a row in the table
      inventory.push(
          '<tr>' +
            '<td align="center">' +
              '<p class="text--left-align"><b>' + val.type.toUpperCase() + '</b><p>' +
            '</td>' +
            '<td align="center">' +
              '<p>$' + val.price + '<p>' +
            '</td>' +
            '<td class="button--add-to-cart">' +
              '<input type="button" name="Add to Cart" value="Add to Cart" id="' + val.id + '" "/>' +
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td colspan="3" class="description">' +
              '<p>' + val.description + '</p>' +
            '</td>' +
          '</tr>'
      );
    });

    // Add the contents of the inventory array to the table element.
    table.append(inventory);

    var addToCartButtons = $('.inventory table .button--add-to-cart input')

    // Setting up input event handlers for: add to cart.
    if(addToCartButtons.length > 0){
      setupAddToCartEventHandlers(addToCartButtons, cart);
    }
  });
}

function setupAddToCartEventHandlers(buttons, cart){
  // Sets up a click event handler for the add to cart buttons.
  buttons.each(function(){
    var button = $(this);

    button.click(function(){
      $.getJSON('data/inventory.json', function(data){
        $.each(data.chocolates, function(key, val){
          // Initializing a brand new item and adding it to the cart.
          if(val.id == button[0].id){
            cart.addItem({
              id: val.id,
              type: val.type,
              price: val.price,
              count: 1
            });
          }
        });
      });
    });
  });
}
