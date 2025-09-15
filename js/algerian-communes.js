jQuery( document ).ready( function( $ ) {

    var communesData = algCommunes.communes; // Data passed from PHP

    // Function to populate the city dropdown
    function populateCityDropdown( countryCode, stateCode, cityField ) {
        var $cityField = $( cityField );
        var currentCity = $cityField.val(); // Keep the current value if any
        $cityField.empty(); // Clear existing options

        // Add a default "Select a commune" option
        $cityField.append( $( '<option></option>' ).attr( 'value', '' ).text( 'Select a commune' ) );

        if ( communesData[ stateCode ] ) {
            $.each( communesData[ stateCode ], function( index, communeName ) {
                $cityField.append( $( '<option></option>' ).attr( 'value', communeName ).text( communeName ) );
            } );
        }

        // Try to re-select the previous city if it exists in the new list
        if ( currentCity && $cityField.find( 'option[value="' + currentCity + '"]' ).length > 0 ) {
            $cityField.val( currentCity );
        } else {
            $cityField.val( '' ).change(); // Trigger change if city is not found or cleared
        }
        $cityField.trigger('change'); // Trigger change event for WooCommerce updates
    }

    // Bind to billing state change
    $( document.body ).on( 'change', 'select#billing_state', function() {
        var countryCode = $( 'select#billing_country' ).val();
        var stateCode = $( this ).val();
        populateCityDropdown( countryCode, stateCode, '#billing_city' );
    } );

    // Bind to shipping state change (if shipping address is separate)
    $( document.body ).on( 'change', 'select#shipping_state', function() {
        var countryCode = $( 'select#shipping_country' ).val();
        var stateCode = $( this ).val();
        populateCityDropdown( countryCode, stateCode, '#shipping_city' );
    } );

    // Initial population on page load for existing values (e.g., if user has saved addresses)
    // Billing
    var initialBillingCountry = $( 'select#billing_country' ).val();
    var initialBillingState = $( 'select#billing_state' ).val();
    if ( initialBillingCountry === 'DZ' && initialBillingState ) {
        populateCityDropdown( initialBillingCountry, initialBillingState, '#billing_city' );
    }

    // Shipping
    var initialShippingCountry = $( 'select#shipping_country' ).val();
    var initialShippingState = $( 'select#shipping_state' ).val();
    if ( initialShippingCountry === 'DZ' && initialShippingState ) {
        populateCityDropdown( initialShippingCountry, initialShippingState, '#shipping_city' );
    }

    // Re-populate if country changes to Algeria
    $( document.body ).on( 'change', 'select#billing_country', function() {
        if ( $( this ).val() === 'DZ' ) {
            var stateCode = $( 'select#billing_state' ).val();
            populateCityDropdown( 'DZ', stateCode, '#billing_city' );
        } else {
            // If country changes away from DZ, revert city to text input
            var $cityField = $( '#billing_city' );
            if ( $cityField.is( 'select' ) ) {
                $cityField.replaceWith( '<input type="text" class="input-text" name="billing_city" id="billing_city" placeholder="" value="" autocomplete="address-level2" />' );
            }
        }
    } );

    $( document.body ).on( 'change', 'select#shipping_country', function() {
        if ( $( this ).val() === 'DZ' ) {
            var stateCode = $( 'select#shipping_state' ).val();
            populateCityDropdown( 'DZ', stateCode, '#shipping_city' );
        } else {
            var $cityField = $( '#shipping_city' );
            if ( $cityField.is( 'select' ) ) {
                $cityField.replaceWith( '<input type="text" class="input-text" name="shipping_city" id="shipping_city" placeholder="" value="" autocomplete="address-level2" />' );
            }
        }
    } );

    // *** ADD THESE LINES TO PRE-SELECT DZ-31 AND POPULATE CITY DROPDOWN ***
    // Ensure the country is set to Algeria first if it's not already
    if ( $( 'select#billing_country' ).val() !== 'DZ' ) {
        $( 'select#billing_country' ).val( 'DZ' ).change();
    }

    // Pre-select state DZ-31 for billing and trigger change
    $( 'select#billing_state' ).val( 'DZ-31' ).change();

    // If you also need to pre-select for shipping, uncomment and adjust these lines:
    // if ( $( 'select#shipping_country' ).val() !== 'DZ' ) {
    //     $( 'select#shipping_country' ).val( 'DZ' ).change();
    // }
    // $( 'select#shipping_state' ).val( 'DZ-31' ).change();
    // *******************************************************************

} );


document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            // Check if nodes have been added to the body
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const shippingList = document.querySelector('.woocommerce-shipping-methods');
                if (shippingList) {
                    // Once the element is found, disconnect the initial observer
                    observer.disconnect();
                    
                    // Now, handle the shipping methods logic
                    const updateShippingMethods = () => {
                        let freeShippingAvailable = false;
                        const shippingInputs = shippingList.querySelectorAll('input[type="radio"].shipping_method');

                        shippingInputs.forEach(input => {
                            if (input.value.includes('free_shipping')) {
                                freeShippingAvailable = true;
								let free_shipping_label = input.parentElement.querySelector('label');
								if(free_shipping_label){
									free_shipping_label.innerText = "توصيل مجاني";
								}
                            }
                        });

                        shippingInputs.forEach(input => {
                            const listItem = input.closest('li');
                            if (freeShippingAvailable && !input.value.includes('free_shipping')) {
                                listItem.style.display = 'none';
                                input.disabled = true;
                            } else {
                                listItem.style.display = '';
                                input.disabled = false;
                            }
                        });
                    };

                    // Run the function initially
                    updateShippingMethods();

                    // Observe the shipping list itself for future changes (e.g., address changes)
                    const shippingObserver = new MutationObserver(updateShippingMethods);
                    shippingObserver.observe(shippingList, { childList: true, subtree: true });
                    
                    // Exit the loop and function after finding the element
                    return;
                }
            }
        }
    });

    // Start observing the entire document body for any changes
    observer.observe(document.body, { childList: true, subtree: true });
});